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

    it('should analyze contract successfully with enhanced structure', async () => {
        const mockAnalysis = {
            contractType: 'Mietvertrag',
            contractScore: 72,
            scoreBreakdown: {
                rechtssicherheit: 80,
                ausgewogenheit: 65,
                transparenz: 75,
                vollstaendigkeit: 68,
            },
            executiveSummary: 'This is a standard rental agreement with some areas for improvement.',
            riskLevel: 'yellow',
            riskExplanation: 'Moderate risk due to certain clauses.',
            legalBasis: [
                {
                    law: 'BGB',
                    sections: '§§ 535-580a',
                    relevance: 'Mietrecht Grundlagen',
                },
            ],
            positiveAspects: [
                {
                    title: 'Klare Kündigungsfristen',
                    description: 'Die Kündigungsfristen entsprechen den gesetzlichen Vorgaben.',
                },
            ],
            criticalClauses: [
                {
                    title: 'Schönheitsreparaturen',
                    content: 'Der Mieter ist zu regelmäßigen Schönheitsreparaturen verpflichtet.',
                    risk: 'Diese Klausel könnte unwirksam sein.',
                    severity: 'medium',
                    legalConcern: 'Möglicherweise unwirksam nach § 307 BGB',
                },
            ],
            riskMatrix: {
                financial: { level: 'medium', description: 'Moderate finanzielle Belastung' },
                legal: { level: 'low', description: 'Geringe rechtliche Risiken' },
                operational: { level: 'low', description: 'Keine operativen Einschränkungen' },
            },
            negotiationPoints: [
                {
                    priority: 'high',
                    clause: 'Schönheitsreparaturen',
                    suggestion: 'Streichung oder Anpassung empfohlen',
                    reasoning: 'Klausel könnte vor Gericht nicht standhalten',
                },
            ],
            recommendations: [
                'Prüfen Sie die Schönheitsreparaturklausel',
                'Vergleichen Sie die Miethöhe mit dem Mietspiegel',
                'Dokumentieren Sie den Zustand bei Einzug',
            ],
            disclaimer: 'Diese Analyse ersetzt keine individuelle Rechtsberatung.',
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
        expect(data.analysis.contractScore).toBe(72);
        expect(data.analysis.contractType).toBe('Mietvertrag');
        expect(data.analysis.scoreBreakdown).toBeDefined();
        expect(data.analysis.positiveAspects).toHaveLength(1);
        expect(data.analysis.riskMatrix).toBeDefined();
        expect(data.analysis.negotiationPoints).toHaveLength(1);
    });
});
