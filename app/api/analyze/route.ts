import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
    try {
        const { text, email, contractType } = await req.json();

        console.log("[Analyze] Starting analysis for:", email);
        console.log("[Analyze] Text length:", text?.length);

        if (!text || !email) {
            return NextResponse.json({ error: "Missing text or email" }, { status: 400 });
        }

        // Analyze with GPT-4o-mini
        console.log("[Analyze] Calling OpenAI API...");
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `Du bist ein erfahrener deutscher Rechtsanwalt. Analysiere den folgenden Vertrag (${contractType || "Allgemein"}).
          
Erstelle eine detaillierte Analyse im JSON-Format mit folgender Struktur:
{
  "summary": "Kurze Zusammenfassung des Vertrags (2-3 Sätze)",
  "riskLevel": "red" | "yellow" | "green",
  "riskExplanation": "Begründung für die Risikobewertung",
  "criticalClauses": [
    {
      "title": "Titel der Klausel",
      "content": "Inhalt der Klausel",
      "risk": "Warum ist diese Klausel kritisch?"
    }
  ],
  "recommendations": [
    "Empfehlung 1",
    "Empfehlung 2"
  ]
}

Antworte NUR mit dem JSON-Objekt, ohne zusätzlichen Text. Verwende professionelles Deutsch (Sie-Form).`,
                },
                {
                    role: "user",
                    content: text,
                },
            ],
            response_format: { type: "json_object" },
        });

        const analysisText = completion.choices[0].message.content;
        console.log("[Analyze] OpenAI analysis complete. Length:", analysisText?.length);

        // Parse the JSON response
        const analysis = JSON.parse(analysisText || "{}");

        console.log("[Analyze] Analysis parsed successfully");
        return NextResponse.json({ success: true, analysis });
    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
