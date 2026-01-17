"use client";

import { ChevronDown } from "lucide-react";

export function FAQ() {
    const faqs = [
        {
            question: "Kann ich meinen Mietvertrag prüfen lassen?",
            answer: "Ja, VertragsKlar ist spezialisiert auf die Prüfung von Mietverträgen für Wohnungen und Gewerbe. Unsere KI erkennt ungültige Renovierungsklauseln, Mieterhöhungsstaffeln und Kündigungsverzichte nach aktuellem deutschen Mietrecht."
        },
        {
            question: "Ist die Analyse rechtsgültig?",
            answer: "Die Analyse dient als fundierte Ersteinschätzung und Orientierungshilfe. Sie basiert auf tausenden juristischen Vergleichsdaten, ersetzt jedoch keine anwaltliche Vertretung vor Gericht. Sie hilft Ihnen ideal, Risiken zu erkennen und Verhandlungen vorzubereiten."
        },
        {
            question: "Wie funktioniert der KI-Anwalt?",
            answer: "Unser 'KI-Anwalt' ist ein Ensemble aus spezialisierten Sprachmodellen, die auf das deutsche BGB und aktuelle Rechtsprechung trainiert sind. Sie scannen Ihren Vertrag Satz für Satz und gleichen ihn mit rechtlichen Standards ab, um Abweichungen sofort zu markieren."
        },
        {
            question: "Welche Dateiformate werden unterstützt?",
            answer: "Sie können Verträge als PDF, Word-Dokument (DOC, DOCX) oder als Textdatei (TXT) hochladen. Unser System konvertiert und analysiert den Inhalt automatisch, unabhängig von der Formatierung."
        },
        {
            question: "Was passiert mit meinen Daten?",
            answer: "Datenschutz hat höchste Priorität. Ihre Dokumente werden verschlüsselt übertragen, auf deutschen Servern analysiert und automatisch nach 24 Stunden unwiderruflich gelöscht. Wir trainieren keine Modelle mit Ihren persönlichen Daten."
        }
    ];

    return (
        <section className="py-24 bg-[#f5f5f7]" id="faq">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl mb-4">
                        Häufig gestellte Fragen
                    </h2>
                    <p className="text-lg text-[#86868b]">
                        Antworten zur Vertragsanalyse, Sicherheit und Technik.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden border border-transparent hover:border-[#d2d2d7] transition-all cursor-pointer"
                        >
                            <summary className="flex items-center justify-between font-medium text-[#1d1d1f] text-lg list-none">
                                {faq.question}
                                <span className="transition-transform group-open:rotate-180">
                                    <ChevronDown className="w-5 h-5 text-[#86868b]" />
                                </span>
                            </summary>
                            <div className="mt-4 text-[#86868b] leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
