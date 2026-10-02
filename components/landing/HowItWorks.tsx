import { Check } from "lucide-react";
import { PRICE_LABEL } from "@/lib/pricing";

const STEPS = [
    {
        title: "Vertrag hochladen",
        text: "PDF, Word oder Text, bis 50 MB. Am besten eine Datei mit markierbarem Text: Eingescannte Seiten ohne Textebene können wir nicht lesen.",
    },
    {
        title: `${PRICE_LABEL} bezahlen`,
        text: "Die Zahlung läuft über Stripe. An Ihre E-Mail-Adresse geht die Quittung.",
    },
    {
        title: "Bericht lesen",
        text: "Die Prüfung startet direkt nach der Zahlung und braucht meist weniger als zwei Minuten. Lassen Sie das Fenster so lange offen. Den Bericht können Sie als PDF speichern.",
    },
];

const EXAMINERS = [
    { name: "Vertragsrecht", task: "Vertragsart, Pflichten, Laufzeit und Kündigung nach BGB" },
    { name: "AGB-Recht", task: "Überraschende und benachteiligende Klauseln, §§ 305–310 BGB" },
    { name: "Mietrecht", task: "Kaution, Schönheitsreparaturen, Nebenkosten, Mieterhöhung" },
    { name: "Arbeitsrecht", task: "Probezeit, Überstunden, Wettbewerbsverbot, Ausschlussfristen" },
    { name: "Kosten & Fristen", task: "Was Sie im schlimmsten Fall zahlen und bis wann" },
];

const DATA_PATH = [
    { when: "Beim Upload", what: "Verschlüsselte Übertragung auf Server in Deutschland." },
    { when: "Während der Prüfung", what: "Nur der Vertragstext wird verarbeitet, nicht zum Training von KI-Modellen genutzt." },
    { when: "Nach 24 Stunden", what: "Datei und Bericht werden automatisch und endgültig gelöscht." },
];

function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="vk-narrow text-[1.375rem] font-bold leading-[1.15]">{children}</h3>
    );
}

export function HowItWorks() {
    return (
        <section id="ablauf" className="scroll-mt-4 border-t border-rule">
            <div className="mx-auto max-w-[1200px] px-4 py-[clamp(5rem,10vw,8rem)] md:px-8">
                <h2 className="vk-narrow text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                    So läuft es ab.
                </h2>

                <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
                    {STEPS.map((step, index) => (
                        <li
                            key={step.title}
                            data-reveal
                            style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                            className="border-t-2 border-ink pt-4"
                        >
                            <p className="vk-narrow text-[1.375rem] font-bold">
                                <span className="text-ink-soft">{index + 1}.</span> {step.title}
                            </p>
                            <p className="mt-2 max-w-[36ch] text-[1.0625rem] leading-[1.6] text-ink-soft">{step.text}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
                    <div>
                        <Heading>Der KI-Expertenrat: fünf Prüfer, ein Bericht.</Heading>
                        <p className="mt-3 max-w-[58ch] text-[1.0625rem] leading-[1.6] text-ink-soft">
                            Ihr Vertrag geht nicht an eine einzelne KI, sondern an fünf spezialisierte Prüfer mit eigener
                            Prüfanleitung. Jeder sieht den Vertrag aus seinem Fachgebiet. Die Schlussprüfung gleicht die
                            Ergebnisse ab, streicht Doppeltes und schreibt Ihren Bericht.
                        </p>

                        <div data-reveal className="vk-sheet mt-6 px-5 py-5 sm:px-7 sm:py-6">
                            <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
                                <p className="vk-narrow text-[1.0625rem] font-bold">Umlaufzettel · Prüfung Ihres Vertrags</p>
                                <p className="hidden text-sm text-ink-soft sm:block">parallel geprüft</p>
                            </div>
                            <ol>
                                {EXAMINERS.map((examiner, index) => (
                                    <li
                                        key={examiner.name}
                                        className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-rule py-3"
                                    >
                                        <span className="text-sm text-ink-soft">{index + 1}</span>
                                        <span>
                                            <span className="block font-semibold">{examiner.name}</span>
                                            <span className="block text-sm leading-[1.4] text-ink-soft">{examiner.task}</span>
                                        </span>
                                        <span
                                            className="vk-stamp inline-flex items-center gap-1 text-sm font-semibold"
                                            style={{ "--stamp-delay": `${index * 160}ms` } as React.CSSProperties}
                                        >
                                            <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                                            geprüft
                                        </span>
                                    </li>
                                ))}
                            </ol>
                            <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-3 pt-4">
                                <span aria-hidden className="text-sm text-ink-soft">→</span>
                                <span>
                                    <span className="block font-semibold">Schlussprüfung</span>
                                    <span className="block text-sm leading-[1.4] text-ink-soft">
                                        Ergebnisse abgleichen, Widersprüche klären, Bericht in verständlichem Deutsch
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Heading>Was mit Ihrer Datei passiert.</Heading>
                        <ol data-reveal className="mt-5 border-l-2 border-ink pl-6">
                            {DATA_PATH.map((step) => (
                                <li key={step.when} className="relative pb-7 last:pb-0">
                                    <span
                                        aria-hidden
                                        className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-desk"
                                    />
                                    <p className="font-semibold">{step.when}</p>
                                    <p className="mt-1 max-w-[40ch] text-[1.0625rem] leading-[1.55] text-ink-soft">{step.what}</p>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-7 text-[0.9375rem] leading-[1.5] text-ink-soft">
                            DSGVO-konform, entwickelt und betrieben in Deutschland. Details in der{" "}
                            <a href="/legal/datenschutz" className="font-semibold text-ink underline underline-offset-2">
                                Datenschutzerklärung
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
