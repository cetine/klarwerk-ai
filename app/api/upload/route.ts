import { NextResponse } from "next/server";
import mammoth from "mammoth";
import PDFParser from "pdf2json";

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
            // Parse PDF using pdf2json with error handling
            try {
                const pdfParser = new (PDFParser as any)(null, 1);

                text = await new Promise<string>((resolve, reject) => {
                    let timeout: NodeJS.Timeout;

                    pdfParser.on("pdfParser_dataError", (errData: any) => {
                        clearTimeout(timeout);
                        reject(new Error(errData.parserError || "PDF parsing failed"));
                    });

                    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                        clearTimeout(timeout);
                        try {
                            // Extract text from parsed data manually to avoid getRawTextContent issues
                            const pages = pdfData.Pages || [];
                            const textParts: string[] = [];

                            pages.forEach((page: any) => {
                                const texts = page.Texts || [];
                                const pageText = texts.map((text: any) => {
                                    return decodeURIComponent(text.R?.[0]?.T || "");
                                }).join(" ");
                                textParts.push(pageText);
                            });

                            resolve(textParts.join("\n") || "PDF content extracted successfully but no text found.");
                        } catch (err) {
                            resolve("PDF parsed but text extraction failed. Please try a different format.");
                        }
                    });

                    // Set timeout for parsing
                    timeout = setTimeout(() => {
                        reject(new Error("PDF parsing timeout"));
                    }, 30000); // 30 second timeout

                    pdfParser.parseBuffer(buffer);
                });
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
