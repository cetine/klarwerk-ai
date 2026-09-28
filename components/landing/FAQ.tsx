import { Plus } from "lucide-react";

const FAQS = [
    {
        q: "Welche Verträge kann ich prüfen lassen?",
        a: "Deutschsprachige Verbraucherverträge: Mietverträge, Arbeitsverträge, Kaufverträge, Dienstleistungsverträge und AGB. Am besten funktioniert es bei den üblichen Formularverträgen.",
    },
    {
        q: "Wie funktioniert die Prüfung?",
        a: "Ihr Vertrag wird vom KI-Expertenrat geprüft: fünf spezialisierte KI-Prüfer für Vertragsrecht, AGB-Recht, Mietrecht, Arbeitsrecht sowie Kosten und Fristen, jeder mit eigener Prüfanleitung. Eine Schlussprüfung gleicht die Ergebnisse ab und schreibt den Bericht in einer festen Gliederung.",
    },
    {
        q: "Ist das eine Rechtsberatung?",
        a: "Nein. VertragsKlar ist eine automatisierte Ersteinschätzung. Sie kann Klauseln übersehen oder falsch einordnen. Wenn Ihr Bericht rote Punkte zeigt oder viel auf dem Spiel steht, gehen Sie damit zum Mieterverein, zur Verbraucherzentrale oder zu einer Fachanwältin bzw. einem Fachanwalt. Der Bericht hilft Ihnen, dort die richtigen Fragen zu stellen.",
    },
    {
        q: "Welche Dateiformate gehen?",
        a: "PDF, DOC, DOCX und TXT bis 50 MB. Eingescannte PDFs ohne Textebene (reine Bilder) können wir nicht auslesen.",
    },
    {
        q: "Was passiert mit meinen Daten?",
        a: "Ihr Vertrag wird verschlüsselt übertragen und auf Servern in Deutschland verarbeitet. Nach 24 Stunden werden Datei und Bericht automatisch und endgültig gelöscht. Ihre Daten werden nicht zum Training von KI-Modellen verwendet. Die Verarbeitung ist DSGVO-konform; Details stehen in der Datenschutzerklärung.",
    },
];

export function FAQ() {
    return (
        <section id="faq" className="scroll-mt-4 border-t border-rule">
            <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-[clamp(5rem,10vw,8rem)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 lg:gap-16">
                <h2 className="vk-narrow text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                    Häufige Fragen
                </h2>

                <div className="border-b border-rule">
                    {FAQS.map((item) => (
                        <details key={item.q} className="group border-t border-rule">
                            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[1.0625rem] font-semibold [&::-webkit-details-marker]:hidden">
                                {item.q}
                                <Plus
                                    className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45"
                                    aria-hidden
                                />
                            </summary>
                            <p className="max-w-[62ch] pb-5 text-[1.0625rem] leading-[1.6] text-ink-soft">{item.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
