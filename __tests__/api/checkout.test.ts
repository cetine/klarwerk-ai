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

describe('/api/checkout', () => {
    it('should return 400 if priceId is missing', async () => {
        const { req } = createMocks({
            method: 'POST',
        });

        req.json = jest.fn().mockResolvedValue({});

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Price ID is required');
    });

    it('should create a checkout session successfully', async () => {
        const mockSession = {
            url: 'https://checkout.stripe.com/test',
        };

        (stripe.checkout.sessions.create as jest.Mock).mockResolvedValue(mockSession);

        const { req } = createMocks({
            method: 'POST',
            headers: {
                origin: 'http://localhost:3000',
            },
        });

        req.json = jest.fn().mockResolvedValue({
            priceId: 'price_123',
        });

        // Mock headers.get
        req.headers.get = jest.fn().mockReturnValue('http://localhost:3000');

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.url).toBe(mockSession.url);
    });
});
