import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
    try {
        const { text, email, contractType } = await req.json();

        console.log("[Analyze] Starting analysis for:", email);
        console.log("[Analyze] Text length:", text?.length);

        if (!text || !email) {
            return NextResponse.json({ error: "Missing text or email" }, { status: 400 });
        }

        // 1. Analyze with GPT-4o-mini
        console.log("[Analyze] Calling OpenAI API...");
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Du bist ein erfahrener deutscher Rechtsanwalt. Analysiere den folgenden Vertrag (${contractType || "Allgemein"}).
          Erstelle eine detaillierte Analyse mit:
          1. Zusammenfassung
          2. Risikobewertung (Rot/Gelb/Grün) mit Begründung
          3. Kritische Klauseln und deren Bedeutung
          4. Verbesserungsvorschläge
          
          Antworte im HTML-Format für eine E-Mail. Verwende professionelles Deutsch (Sie-Form).`,
                },
                {
                    role: "user",
                    content: text,
                },
            ],
        });

        const analysis = completion.choices[0].message.content;
        console.log("[Analyze] OpenAI analysis complete. Length:", analysis?.length);

        // 2. Send Email
        console.log("[Analyze] Sending email to:", email);
        const emailResult = await sendEmail(
            email,
            "Ihre Vertragsanalyse ist bereit - VertragsKlar",
            analysis || "Leider konnte keine Analyse erstellt werden.",
        );

        if (!emailResult.success) {
            console.error("[Analyze] Email send failed:", emailResult.error);
            return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
        }

        console.log("[Analyze] Email sent successfully");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
