import { Marker, RISK_LABEL, type Risk } from "./Marker";

type Finding = {
    risk: Risk;
    clause: string;
    before: string;
    marked: string;
    after: string;
    title: string;
    why: string;
    basis: string;
};

// Synthetic sample, mirrors the fields /api/analyze returns (criticalClauses, positiveAspects, negotiationPoints).
const FINDINGS: Finding[] = [
    {
        risk: "red",
        clause: "§ 8 Abs. 2",
        before: "(2) Diese sind ",
        marked: "in Küche, Bad und Dusche alle drei Jahre, in Wohn- und Schlafräumen alle fünf Jahre",
        after: " durchzuführen.",
        title: "Starrer Fristenplan",
        why: "Die Klausel verlangt Renovierung nach Kalender, egal wie die Wohnung aussieht. Ist sie unwirksam, müssen Sie keine Schönheitsreparaturen übernehmen.",
        basis: "§ 307 Abs. 1 BGB · BGH, VIII ZR 361/03",
    },
    {
        risk: "red",
        clause: "§ 9",
        before: "Die Kosten kleinerer Instandsetzungen trägt der Mieter ",
        marked: "bis zu einem Betrag von 150 € im Einzelfall",
        after: ".",
        title: "Kleinreparaturen ohne Jahresgrenze",
        why: "Es fehlt eine Obergrenze pro Jahr, und 150 € je Reparatur liegt über dem, was Gerichte meist akzeptieren. Ohne Jahresgrenze ist die ganze Klausel unwirksam, und Sie zahlen Kleinreparaturen gar nicht.",
        basis: "§ 307 Abs. 1 BGB · BGH, VIII ZR 91/88",
    },
    {
        risk: "yellow",
        clause: "§ 5 Abs. 1",
        before: "Die Kaution ist ",
        marked: "bei Vertragsbeginn in einer Summe",
        after: " zu zahlen.",
        title: "Kaution auf einmal",
        why: "Das Gesetz erlaubt Ihnen drei gleiche Monatsraten, die erste mit Beginn des Mietverhältnisses. Die Pflicht zur Einmalzahlung müssen Sie nicht erfüllen.",
        basis: "§ 551 Abs. 2 BGB",
    },
    {
        risk: "green",
        clause: "§ 12",
        before: "Für die Kündigung gelten ",
        marked: "die gesetzlichen Fristen",
        after: ".",
        title: "Kündigungsfrist fair",
        why: "Sie können mit drei Monaten Frist kündigen, wie im Gesetz vorgesehen.",
        basis: "§ 573c BGB",
    },
];

const NEGOTIATION = [
    "Kaution in drei Monatsraten vereinbaren.",
    "Bei den Kleinreparaturen eine Jahresobergrenze ergänzen lassen.",
    "Vor dem Einzug ein Übergabeprotokoll mit Fotos erstellen.",
];

function FindingRow({ finding }: { finding: Finding }) {
    return (
        <li data-reveal className="grid gap-x-10 gap-y-3 border-t border-rule py-6 md:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
                <p className="text-sm text-ink-soft">{finding.clause}</p>
                <p className="mt-1 font-contract text-[1.0625rem] leading-[1.6] text-ink">
                    {finding.before}
                    <Marker risk={finding.risk} drawOnView>
                        {finding.marked}
                    </Marker>
                    {finding.after}
                </p>
            </div>
            <div className="text-[0.9375rem] leading-[1.45]">
                <p className="font-semibold text-ink">
                    {finding.title}
                    <span className="font-normal text-ink-soft"> · {RISK_LABEL[finding.risk]}</span>
                </p>
                <p className="mt-1 text-ink-soft">{finding.why}</p>
                <p className="mt-2 text-sm font-medium text-ink">{finding.basis}</p>
            </div>
        </li>
    );
}

export function SampleReport() {
    return (
        <section id="beispiel" className="scroll-mt-4 border-t border-rule">
            <div className="mx-auto max-w-[1200px] px-4 py-[clamp(5rem,10vw,8rem)] md:px-8">
                <div className="max-w-[40rem]">
                    <h2 className="vk-narrow vk-balance text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                        Das steht in Ihrem Bericht.
                    </h2>
                    <p className="mt-4 text-[1.0625rem] leading-[1.6] text-ink-soft">
                        Auszug aus einem Beispielbericht zu einem erfundenen Mietvertrag. Ihr Bericht zitiert die Stellen
                        aus Ihrem eigenen Vertrag.
                    </p>
                </div>

                <article data-reveal className="vk-sheet mt-10 px-5 py-8 sm:px-10 sm:py-10" aria-label="Beispielbericht">
                    <header className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-4">
                        <p className="vk-narrow text-[1.375rem] font-bold">Prüfbericht · Mietvertrag über Wohnraum</p>
                        <p className="text-sm text-ink-soft">Auszug, fiktiver Vertrag</p>
                    </header>

                    <div className="grid gap-x-10 gap-y-6 py-8 md:grid-cols-[minmax(0,1fr)_18rem]">
                        <div>
                            <h3 className="text-sm font-semibold text-ink-soft">Zusammenfassung</h3>
                            <p className="mt-2 max-w-[62ch] text-[1.0625rem] leading-[1.6]">
                                Ein üblicher Formularmietvertrag mit zwei Klauseln, die Sie sehr wahrscheinlich nicht
                                binden, und einer, die Sie anders handhaben dürfen, als sie verlangt. Unterschreiben ist
                                vertretbar, wenn Sie die markierten Punkte vorher ansprechen.
                            </p>
                        </div>
                        <dl className="grid grid-cols-2 gap-4 self-start md:grid-cols-1">
                            <div>
                                <dt className="text-sm font-semibold text-ink-soft">Einschätzung</dt>
                                <dd className="mt-1 text-[1.0625rem] font-semibold">
                                    <Marker risk="yellow">Mittleres Risiko</Marker>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-semibold text-ink-soft">Bewertung</dt>
                                <dd className="vk-narrow mt-1 text-[1.75rem] font-bold leading-none">
                                    58<span className="text-[1.0625rem] font-normal text-ink-soft"> / 100</span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <h3 className="text-sm font-semibold text-ink-soft">Klauseln im Einzelnen</h3>
                    <ul className="mt-3">
                        {FINDINGS.map((finding) => (
                            <FindingRow key={finding.clause} finding={finding} />
                        ))}
                    </ul>

                    <div className="grid gap-x-10 gap-y-3 border-t-2 border-ink pt-6 md:grid-cols-[minmax(0,1fr)_18rem]">
                        <div>
                            <h3 className="text-sm font-semibold text-ink-soft">Worüber Sie verhandeln können</h3>
                            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[1.0625rem] leading-[1.55]">
                                {NEGOTIATION.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ol>
                        </div>
                        <p className="self-end text-sm leading-[1.45] text-ink-soft">
                            Dieser Bericht ist eine automatisierte Ersteinschätzung und ersetzt keine Rechtsberatung.
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
}
