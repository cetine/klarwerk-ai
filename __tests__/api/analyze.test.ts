import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/analyze/route';
import { openai } from '@/lib/openai';

// Mock OpenAI
jest.mock('@/lib/openai', () => ({
    openai: {
        chat: {
            completions: {
                create: jest.fn(),
            },
        },
    },
}));

describe('/api/analyze', () => {
    it('should return 400 if text or email is missing', async () => {
        const { req } = createMocks({
            method: 'POST',
            body: {}, // Missing text and email
        });

        // Mock json()
        req.json = jest.fn().mockResolvedValue({});

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Missing text or email');
    });

    it('should analyze contract successfully', async () => {
        const mockAnalysis = {
            summary: 'Test Summary',
            riskLevel: 'green',
            riskExplanation: 'Low risk',
            criticalClauses: [],
            recommendations: ['Rec 1'],
        };

        (openai.chat.completions.create as jest.Mock).mockResolvedValue({
            choices: [
                {
                    message: {
                        content: JSON.stringify(mockAnalysis),
                    },
                },
            ],
        });

        const { req } = createMocks({
            method: 'POST',
        });

        req.json = jest.fn().mockResolvedValue({
            text: 'Contract text',
            email: 'test@example.com',
        });

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.analysis).toEqual(mockAnalysis);
    });
});
