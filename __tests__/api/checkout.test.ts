import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/checkout/route';
import { stripe } from '@/lib/stripe';

// Mock Stripe
jest.mock('@/lib/stripe', () => ({
    stripe: {
        checkout: {
            sessions: {
                create: jest.fn(),
            },
        },
    },
}));

const createRequest = (body: Record<string, unknown>) => {
    const { req } = createMocks({ method: 'POST' });
    req.json = jest.fn().mockResolvedValue(body);
    req.headers.get = jest.fn().mockReturnValue('http://localhost:3000');
    return req;
};

describe('/api/checkout', () => {
    const originalPriceId = process.env.STRIPE_PRICE_ID;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        if (originalPriceId === undefined) delete process.env.STRIPE_PRICE_ID;
        else process.env.STRIPE_PRICE_ID = originalPriceId;
        jest.restoreAllMocks();
    });

    it('refuses to create a session when STRIPE_PRICE_ID is not set', async () => {
        delete process.env.STRIPE_PRICE_ID;

        const response = await POST(createRequest({ email: 'a@b.de', fileId: 'file-1' }) as unknown as Request);

        expect(response.status).toBe(500);
        expect(stripe.checkout.sessions.create).not.toHaveBeenCalled();
    });

    it('creates a checkout session with the configured price', async () => {
        process.env.STRIPE_PRICE_ID = 'price_test_499';
        (stripe.checkout.sessions.create as jest.Mock).mockResolvedValue({
            id: 'cs_test_1',
            url: 'https://checkout.stripe.com/test',
        });

        const response = await POST(createRequest({ email: 'a@b.de', fileId: 'file-1' }) as unknown as Request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.url).toBe('https://checkout.stripe.com/test');
        expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
            expect.objectContaining({
                line_items: [{ price: 'price_test_499', quantity: 1 }],
                metadata: { fileId: 'file-1' },
            })
        );
    });
});
