import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/upload/route';
import { NextResponse } from 'next/server';

describe('/api/upload', () => {
    it('should return 400 if no file is provided', async () => {
        const { req } = createMocks({
            method: 'POST',
        });

        // Mock formData() since node-mocks-http doesn't fully support it for Next.js App Router Request
        req.formData = jest.fn().mockResolvedValue({
            get: jest.fn().mockReturnValue(null),
        });

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('No file provided');
    });

    it('should return 400 for unsupported file types', async () => {
        const { req } = createMocks({
            method: 'POST',
        });

        const mockFile = {
            name: 'test.png',
            type: 'image/png',
            arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('test')),
        };

        req.formData = jest.fn().mockResolvedValue({
            get: jest.fn().mockReturnValue(mockFile),
        });

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Unsupported file type');
    });

    it('should parse TXT files correctly', async () => {
        const { req } = createMocks({
            method: 'POST',
        });

        const mockFile = {
            name: 'test.txt',
            type: 'text/plain',
            arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('Hello World')),
        };

        req.formData = jest.fn().mockResolvedValue({
            get: jest.fn().mockReturnValue(mockFile),
        });

        const response = await POST(req as any);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.text).toBe('Hello World');
        expect(data.filename).toBe('test.txt');
    });
});
