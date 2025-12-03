import { NextResponse } from "next/server";
// const pdf = require("pdf-parse");
import mammoth from "mammoth";

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
            // const data = await pdf(buffer);
            // text = data.text;
            text = "PDF parsing is temporarily disabled due to build environment constraints. Please use DOCX or TXT.";
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
