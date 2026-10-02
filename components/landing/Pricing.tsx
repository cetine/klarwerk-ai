import { PRICE_LABEL } from "@/lib/pricing";

const INCLUDED = [
    "Vertragstyp und Gesamteinschätzung mit Ampel",
    "Kritische Klauseln als Zitat, mit Paragraph und Erklärung",
    "Was an Ihrem Vertrag in Ordnung ist",
    "Punkte, über die Sie verhandeln können",
    "Bericht zum Speichern als PDF",
];

export function Pricing() {
    return (
        <section id="preis" className="scroll-mt-4 border-t border-rule bg-sheet">
            <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-[clamp(5rem,10vw,8rem)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 lg:gap-16">
                <div>
                    <h2 className="vk-narrow text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                        Ein Preis, ein Vertrag.
                    </h2>
                    <p className="vk-narrow mt-6 text-[clamp(3.5rem,8vw,5.5rem)] font-bold leading-none tracking-[-0.03em]">
                        {PRICE_LABEL}
                    </p>
                    <p className="mt-3 text-[1.0625rem] text-ink-soft">
                        pro Vertrag, einmalig bezahlt. Kein Konto, kein Abo, keine Folgekosten.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-ink-soft">Im Bericht enthalten</h3>
                    <ul data-reveal className="mt-3">
                        {INCLUDED.map((item) => (
                            <li key={item} className="border-t border-rule py-3 text-[1.0625rem] leading-[1.5]">
                                {item}
                            </li>
                        ))}
                    </ul>
                    <a
                        href="#pruefen"
                        className="vk-press mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-ink px-8 text-[1.0625rem] font-semibold text-sheet hover:bg-action-hover"
                    >
                        Vertrag hochladen <span aria-hidden className="vk-arrow">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
