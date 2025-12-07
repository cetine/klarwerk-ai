import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { extractText } from "unpdf";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = "";

        if (file.type === "application/pdf") {
            // Parse PDF using unpdf - simple and reliable
            try {
                // Convert Buffer to Uint8Array as required by unpdf
                const uint8Array = new Uint8Array(buffer);
                const { text: extractedText } = await extractText(uint8Array, { mergePages: true });
                text = extractedText || "PDF parsed successfully but contained no extractable text. It might be an image-only PDF.";
            } catch (error) {
                console.error("PDF parsing error:", error);
                text = "PDF parsing encountered an error. Please try uploading the document as DOCX or TXT format for best results.";
            }
        } else if (
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else if (file.type === "text/plain") {
            text = buffer.toString("utf-8");
        } else {
            return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
        }

        // Store file in Vercel Blob Storage
        let fileUrl: string | null = null;
        let fileId: string | null = null;

        if (process.env.BLOB_READ_WRITE_TOKEN) {
            try {
                // Generate unique file ID
                fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
                const filename = `uploads/${fileId}/${file.name}`;

                const blob = await put(filename, buffer, {
                    access: "public",
                    addRandomSuffix: false,
                });

                fileUrl = blob.url;
                console.log("File stored in Vercel Blob:", fileUrl);
            } catch (blobError) {
                console.error("Blob storage error:", blobError);
                // Continue without storing - file processing still works
            }
        } else {
            console.log("BLOB_READ_WRITE_TOKEN not set - file storage disabled");
        }

        return NextResponse.json({
            text,
            filename: file.name,
            fileId,
            fileUrl,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

