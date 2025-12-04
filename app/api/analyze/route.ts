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
          content: `Du bist ein erfahrener deutscher Fachanwalt für Vertragsrecht mit über 20 Jahren Erfahrung. Du analysierst Verträge systematisch und gründlich nach der bewährten juristischen Methodik.

**DEINE ANALYSE-METHODIK:**

1. **Vertragstyp-Identifikation**: Bestimme zunächst den Vertragstyp (Kaufvertrag, Mietvertrag, Arbeitsvertrag, Dienstleistungsvertrag, AGB, etc.)

2. **Rechtliche Grundlagen**: Identifiziere die relevanten Gesetze und Paragraphen (BGB, HGB, AGB-Recht §§305-310 BGB, Mietrecht, Arbeitsrecht, etc.)

3. **Klausel-für-Klausel-Analyse**: Prüfe jede wesentliche Klausel auf:
   - Rechtmäßigkeit (insbesondere AGB-Kontrolle)
   - Ausgewogenheit der Interessen
   - Versteckte Risiken
   - Abweichungen vom gesetzlichen Leitbild

4. **Gesamtbewertung**: Erstelle eine fundierte Risikobewertung mit Punktzahl

**ANTWORTE IMMER IM FOLGENDEN JSON-FORMAT:**

{
  "contractType": "Art des Vertrags (z.B. Mietvertrag, Kaufvertrag, Arbeitsvertrag)",
  "contractScore": 75,
  "scoreBreakdown": {
    "rechtssicherheit": 80,
    "ausgewogenheit": 70,
    "transparenz": 75,
    "vollstaendigkeit": 75
  },
  "executiveSummary": "Prägnante Zusammenfassung in 3-4 Sätzen mit den wichtigsten Erkenntnissen",
  "riskLevel": "yellow",
  "riskExplanation": "Detaillierte Begründung für die Risikobewertung mit konkreten Verweisen",
  "legalBasis": [
    {
      "law": "Name des Gesetzes (z.B. BGB, HGB)",
      "sections": "Relevante Paragraphen (z.B. §§ 305-310)",
      "relevance": "Warum ist dies für den Vertrag relevant"
    }
  ],
  "positiveAspects": [
    {
      "title": "Titel des positiven Aspekts",
      "description": "Warum ist diese Klausel vorteilhaft für den Vertragspartner",
      "clause": "Relevanter Vertragstext (falls vorhanden)"
    }
  ],
  "criticalClauses": [
    {
      "title": "Titel der kritischen Klausel",
      "content": "Relevanter Vertragstext",
      "risk": "Detaillierte Erklärung des Risikos",
      "severity": "high" | "medium" | "low",
      "legalConcern": "Rechtliche Bedenken (z.B. möglicherweise unwirksam nach § 307 BGB)"
    }
  ],
  "riskMatrix": {
    "financial": { "level": "low" | "medium" | "high", "description": "Finanzielle Risiken" },
    "legal": { "level": "low" | "medium" | "high", "description": "Rechtliche Risiken" },
    "operational": { "level": "low" | "medium" | "high", "description": "Operative Risiken" }
  },
  "negotiationPoints": [
    {
      "priority": "high" | "medium" | "low",
      "clause": "Betroffene Klausel",
      "suggestion": "Konkrete Formulierungsvorschläge oder Verhandlungsansätze",
      "reasoning": "Begründung warum Verhandlung sinnvoll ist"
    }
  ],
  "recommendations": [
    "Konkrete, umsetzbare Handlungsempfehlung 1",
    "Konkrete, umsetzbare Handlungsempfehlung 2",
    "Konkrete, umsetzbare Handlungsempfehlung 3"
  ],
  "disclaimer": "Diese Analyse ersetzt keine individuelle Rechtsberatung. Bei komplexen Verträgen empfehlen wir die Konsultation eines Fachanwalts."
}

**WICHTIGE REGELN:**
- Verwende professionelles Deutsch (Sie-Form)
- Sei präzise, gründlich und verständlich
- Antworte NUR mit dem JSON-Objekt, ohne zusätzlichen Text
- contractScore ist eine Zahl von 0-100 (100 = optimal für den Vertragspartner)
- Jede Kategorie in scoreBreakdown ist 0-100
- Identifiziere IMMER mindestens 2-3 positive Aspekte (jeder Vertrag hat Vorteile)
- Gib mindestens 3 konkrete Empfehlungen
- Bei kritischen Klauseln: Zitiere wenn möglich den genauen Gesetzestext

**RISIKOBEWERTUNG:**
- **red** (Score 0-40): Erhebliche Risiken, unfaire Klauseln, dringender Handlungsbedarf
- **yellow** (Score 41-70): Akzeptabel mit Vorsicht, Nachverhandlung empfohlen
- **green** (Score 71-100): Fair und ausgewogen, geringe Risiken`,
        },
        {
          role: "user",
          content: `Bitte analysiere folgenden Vertrag gründlich und systematisch:\n\n${text}`,
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
