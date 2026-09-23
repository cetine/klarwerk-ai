import { verifyPaidSession, MAX_ANALYSES_PER_SESSION } from '@/lib/payment';
import { stripe } from '@/lib/stripe';
import { put } from '@vercel/blob';

jest.mock('@/lib/stripe', () => ({
    stripe: { checkout: { sessions: { retrieve: jest.fn() } } },
}));

jest.mock('@vercel/blob', () => ({
    put: jest.fn(),
}));

// Mirrors the real Blob API: a second put to the same pathname with allowOverwrite: false is rejected.
const alreadyExists = () => new Error('Vercel Blob: This blob already exists, use `allowOverwrite: true` if you want to overwrite it.');
const fakeStore = (taken: string[] = []) => {
    const paths = new Set<string>();
    const takenCount = taken.length;
    (put as jest.Mock).mockImplementation(async (pathname: string) => {
        const slot = Number(pathname.split('/').pop());
        if (paths.has(pathname) || slot <= takenCount) throw alreadyExists();
        paths.add(pathname);
        return { url: `https://blob.test/${pathname}` };
    });
    return paths;
};

const retrieve = stripe.checkout.sessions.retrieve as jest.Mock;
const nowSec = () => Math.floor(Date.now() / 1000);

const session = (overrides: Record<string, unknown> = {}) => ({
    id: 'cs_test_123',
    status: 'complete',
    payment_status: 'paid',
    created: nowSec() - 60,
    metadata: { fileId: 'file-1' },
    ...overrides,
});

describe('verifyPaidSession', () => {
    const originalToken = process.env.BLOB_READ_WRITE_TOKEN;

    beforeEach(() => {
        jest.clearAllMocks();
        delete process.env.BLOB_READ_WRITE_TOKEN;
    });

    afterAll(() => {
        process.env.BLOB_READ_WRITE_TOKEN = originalToken;
    });

    it('rejects a missing session id without calling Stripe', async () => {
        const result = await verifyPaidSession(undefined, 'file-1');
        expect(result.ok).toBe(false);
        expect(retrieve).not.toHaveBeenCalled();
    });

    it('rejects a session id that Stripe does not know', async () => {
        retrieve.mockRejectedValue(new Error('No such checkout.session'));
        const result = await verifyPaidSession('cs_test_unknown', 'file-1');
        expect(result).toMatchObject({ ok: false, status: 402 });
    });

    it('rejects an unpaid session', async () => {
        retrieve.mockResolvedValue(session({ status: 'open', payment_status: 'unpaid' }));
        const result = await verifyPaidSession('cs_test_123', 'file-1');
        expect(result).toMatchObject({ ok: false, status: 402 });
    });

    it('accepts a paid session', async () => {
        retrieve.mockResolvedValue(session());
        expect(await verifyPaidSession('cs_test_123', 'file-1')).toEqual({ ok: true });
    });

    it('accepts a session fully covered by a 100 % promotion code', async () => {
        retrieve.mockResolvedValue(session({ payment_status: 'no_payment_required' }));
        expect(await verifyPaidSession('cs_test_123', 'file-1')).toEqual({ ok: true });
    });

    it('rejects a session paid for a different contract', async () => {
        retrieve.mockResolvedValue(session({ metadata: { fileId: 'file-other' } }));
        const result = await verifyPaidSession('cs_test_123', 'file-1');
        expect(result).toMatchObject({ ok: false, status: 403 });
    });

    it('rejects a session older than the analysis window', async () => {
        retrieve.mockResolvedValue(session({ created: nowSec() - 3 * 24 * 3600 }));
        const result = await verifyPaidSession('cs_test_123', 'file-1');
        expect(result).toMatchObject({ ok: false, status: 403 });
    });

    it('allows retries but caps analyses per session', async () => {
        process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
        retrieve.mockResolvedValue(session());

        fakeStore(new Array(MAX_ANALYSES_PER_SESSION - 1).fill('x'));
        expect(await verifyPaidSession('cs_test_123', 'file-1')).toEqual({ ok: true });
        const claimed = (put as jest.Mock).mock.calls.at(-1)[0] as string;
        expect(claimed.endsWith(`/${MAX_ANALYSES_PER_SESSION}`)).toBe(true);
        expect(claimed).not.toContain('cs_test_123');

        expect(await verifyPaidSession('cs_test_123', 'file-1')).toMatchObject({ ok: false, status: 429 });
    });

    it('cannot be exceeded by parallel requests', async () => {
        process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
        retrieve.mockResolvedValue(session());
        fakeStore();

        const results = await Promise.all(
            Array.from({ length: MAX_ANALYSES_PER_SESSION + 3 }, () => verifyPaidSession('cs_test_123', 'file-1'))
        );
        expect(results.filter((r) => r.ok)).toHaveLength(MAX_ANALYSES_PER_SESSION);
        expect(results.filter((r) => !r.ok && r.status === 429)).toHaveLength(3);
    });

    it('does not block a paying customer when the usage store is down', async () => {
        process.env.BLOB_READ_WRITE_TOKEN = 'test-token';
        retrieve.mockResolvedValue(session());
        (put as jest.Mock).mockRejectedValue(new Error('Vercel Blob: The service is currently not available.'));

        expect(await verifyPaidSession('cs_test_123', 'file-1')).toEqual({ ok: true });
        expect(put).toHaveBeenCalledTimes(1);
    });
});
