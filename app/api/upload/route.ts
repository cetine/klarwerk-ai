import { NextResponse } from "next/server";
import mammoth from "mammoth";
import { extractText } from "unpdf";

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
                const { text: extractedText } = await extractText(buffer, { mergePages: true });
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

        // In a real app, store text in DB and return ID.
        // For this demo, we return the text to the client to pass to the analyze endpoint later.
        return NextResponse.json({ text, filename: file.name });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
