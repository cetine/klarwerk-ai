import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { text, email } = await req.json();

    console.log("[Analyze] Starting analysis for:", email);
    console.log("[Analyze] Text length:", text?.length);

    if (!text || !email) {
      return NextResponse.json({ error: "Missing text or email" }, { status: 400 });
    }

    // Analyze with GPT-4o-mini using Chat Completions API
    console.log("[Analyze] Calling OpenAI Chat Completions API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Du bist ein erfahrener deutscher Rechtsanwalt, spezialisiert auf Vertragsanalyse. 

Deine Aufgabe ist es, Verträge zu analysieren und eine detaillierte, strukturierte Bewertung zu erstellen.

** Analysiere jeden Vertrag nach folgenden Kriterien:**
  1. ** Zusammenfassung **: Erstelle eine prägnante Zusammenfassung(2 - 3 Sätze)
2. ** Risikobewertung **: Bewerte das Gesamtrisiko als "red"(hoch), "yellow"(mittel) oder "green"(gering)
3. ** Kritische Klauseln **: Identifiziere problematische oder ungewöhnliche Klauseln
4. ** Empfehlungen **: Gib konkrete, umsetzbare Handlungsempfehlungen

  ** Antworte IMMER im folgenden JSON - Format:**
    {
      "summary": "Kurze Zusammenfassung des Vertrags (2-3 Sätze)",
      "riskLevel": "red" | "yellow" | "green",
      "riskExplanation": "Detaillierte Begründung für die Risikobewertung",
      "criticalClauses": [
        {
          "title": "Titel der Klausel",
          "content": "Relevanter Vertragstext",
          "risk": "Warum ist diese Klausel kritisch oder problematisch?"
        }
      ],
      "recommendations": [
        "Konkrete Empfehlung 1",
        "Konkrete Empfehlung 2"
      ]
    }

    ** Wichtige Regeln:**
      - Verwende professionelles Deutsch(Sie - Form)
        - Sei präzise und verständlich
          - Antworte NUR mit dem JSON - Objekt, ohne zusätzlichen Text
            - Wenn keine kritischen Klauseln gefunden werden, gib ein leeres Array zurück
              - Gib mindestens 2 - 3 Empfehlungen

                ** Risikobewertung:**
- ** red **: Vertrag enthält erhebliche Risiken oder unfaire Klauseln
  - ** yellow **: Vertrag ist akzeptabel, aber mit Vorsicht zu behandeln
    - ** green **: Vertrag ist fair und ausgewogen`,
        },
        {
          role: "user",
          content: `Bitte analysiere folgenden Vertrag: \n\n${text} `,
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
