import { verifyPaidSession, MAX_ANALYSES_PER_SESSION } from '@/lib/payment';
import { stripe } from '@/lib/stripe';
import { list, put } from '@vercel/blob';

jest.mock('@/lib/stripe', () => ({
    stripe: { checkout: { sessions: { retrieve: jest.fn() } } },
}));

jest.mock('@vercel/blob', () => ({
    list: jest.fn(),
    put: jest.fn(),
}));

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

        (list as jest.Mock).mockResolvedValue({ blobs: new Array(MAX_ANALYSES_PER_SESSION - 1).fill({}) });
        expect(await verifyPaidSession('cs_test_123', 'file-1')).toEqual({ ok: true });
        expect(put).toHaveBeenCalledTimes(1);
        const [marker] = (put as jest.Mock).mock.calls[0];
        expect(marker).not.toContain('cs_test_123');

        (list as jest.Mock).mockResolvedValue({ blobs: new Array(MAX_ANALYSES_PER_SESSION).fill({}) });
        expect(await verifyPaidSession('cs_test_123', 'file-1')).toMatchObject({ ok: false, status: 429 });
        expect(put).toHaveBeenCalledTimes(1);
    });
});
