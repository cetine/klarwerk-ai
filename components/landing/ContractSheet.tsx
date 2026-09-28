import { Marker, RiskLegend, type Risk } from "./Marker";

type MarginNote = { risk: Risk; title: string; text: string };

function Note({ risk, title, text }: MarginNote) {
    return (
        <aside className="relative border-t border-ink/70 pt-2 text-[0.9375rem] leading-[1.4] md:before:absolute md:before:-left-8 md:before:top-[-1px] md:before:w-8 md:before:border-t md:before:border-dashed md:before:border-ink/70 md:before:content-['']">
            <p className="flex items-center gap-2 font-semibold text-ink">
                <span
                    aria-hidden
                    className="vk-swatch !w-4"
                    style={{ "--m": `var(--color-marker-${risk})` } as React.CSSProperties}
                />
                {title}
            </p>
            <p className="mt-1 text-ink-soft">{text}</p>
        </aside>
    );
}

/** Hero proof: a page of a (fictional) Mietvertrag, marked up the way the report marks it up. */
export function ContractSheet() {
    return (
        <figure className="relative">
            <div className="vk-sheet px-5 pb-7 pt-5 sm:px-8 sm:pt-6">
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3 text-sm text-ink-soft">
                    <span>Mietvertrag über Wohnraum · Seite 3</span>
                    <span className="shrink-0 font-semibold text-ink">Beispiel</span>
                </div>

                <div className="mt-6 grid gap-x-8 gap-y-5 md:grid-cols-[minmax(0,1fr)_14rem]">
                    <div className="font-contract text-[1rem] leading-[1.55] text-ink">
                        <p className="font-bold">§ 5 Mietsicherheit</p>
                        <p className="mt-2">
                            (1) Der Mieter leistet eine Kaution in Höhe von drei Nettokaltmieten. Die Kaution ist{" "}
                            <Marker risk="yellow" drawDelay={900}>
                                bei Vertragsbeginn in einer Summe
                            </Marker>{" "}
                            zu zahlen.
                        </p>
                    </div>
                    <Note
                        risk="yellow"
                        title="Nicht verbindlich"
                        text="Sie dürfen die Kaution in drei Monatsraten zahlen (§ 551 Abs. 2 BGB)."
                    />

                    <div className="font-contract text-[1rem] leading-[1.55] text-ink md:pt-2">
                        <p className="font-bold">§ 8 Schönheitsreparaturen</p>
                        <p className="mt-2">
                            (1) Der Mieter übernimmt die Schönheitsreparaturen auf eigene Kosten. (2) Diese sind{" "}
                            <Marker risk="red" drawDelay={400}>
                                in Küche, Bad und Dusche alle drei Jahre, in Wohn- und Schlafräumen alle fünf Jahre
                            </Marker>{" "}
                            durchzuführen.
                        </p>
                    </div>
                    <Note
                        risk="red"
                        title="Wahrscheinlich unwirksam"
                        text="Starre Fristen benachteiligen Mieter unangemessen (BGH, VIII ZR 361/03). Dann müssen Sie gar nicht renovieren."
                    />

                    <div className="font-contract text-[1rem] leading-[1.55] text-ink md:pt-2">
                        <p className="font-bold">§ 12 Kündigung</p>
                        <p className="mt-2">
                            Für die Kündigung gelten{" "}
                            <Marker risk="green" drawDelay={1400}>
                                die gesetzlichen Fristen
                            </Marker>
                            .
                        </p>
                    </div>
                    <Note risk="green" title="In Ordnung" text="Drei Monate Kündigungsfrist, wie im Gesetz (§ 573c BGB)." />
                </div>
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
                <span>Fiktiver Vertrag, Anmerkungen wie im Bericht:</span>
                <RiskLegend />
            </figcaption>
        </figure>
    );
}
