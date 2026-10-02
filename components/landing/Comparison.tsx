import { PRICE_LABEL } from "@/lib/pricing";

const COLUMNS = ["VertragsKlar", "Anwaltliche Erstberatung", "Selbst recherchieren"] as const;

type Row = { label: string; values: [string, string, string] };

const ROWS: Row[] = [
    { label: "Kosten", values: [PRICE_LABEL, "bis 226,10 € (§ 34 RVG)", "kostenlos"] },
    { label: "Dauer", values: ["wenige Minuten", "Termin, oft Tage", "Stunden"] },
    { label: "Jede Klausel geprüft", values: ["ja, fünf Fachprüfer", "ja", "selten vollständig"] },
    { label: "Mit Paragraph und Zitat", values: ["ja", "ja", "nein"] },
    { label: "Datenschutz", values: ["Löschung nach 24 h, Server in Deutschland", "Schweigepflicht", "je nach Dienst"] },
    { label: "Vertretung bei Streit", values: ["nein", "ja", "nein"] },
];

export function Comparison() {
    return (
        <section id="vergleich" className="scroll-mt-4 border-t border-rule">
            <div className="mx-auto max-w-[1200px] px-4 py-[clamp(5rem,10vw,8rem)] md:px-8">
                <div className="max-w-[44rem]">
                    <h2 className="vk-narrow vk-balance text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                        Die beste Wahl vor der Unterschrift.
                    </h2>
                    <p className="mt-4 text-[1.0625rem] leading-[1.6] text-ink-soft">
                        Für die erste Einschätzung ist VertragsKlar schneller und günstiger als jede Alternative. Wenn es
                        ernst wird und Sie Vertretung brauchen, ist die Anwältin oder der Anwalt die richtige Adresse. Ihr
                        Bericht hilft Ihnen, dort die richtigen Fragen zu stellen.
                    </p>
                </div>

                <div data-reveal className="mt-10 overflow-x-auto">
                    <table className="w-full min-w-[40rem] border-collapse text-left text-[1rem]">
                        <caption className="sr-only">Vergleich: VertragsKlar, anwaltliche Erstberatung, selbst recherchieren</caption>
                        <thead>
                            <tr className="border-b-2 border-ink">
                                <th scope="col" className="w-[24%] py-3 pr-4 text-sm font-semibold text-ink-soft">
                                    <span className="sr-only">Kriterium</span>
                                </th>
                                {COLUMNS.map((column, index) => (
                                    <th
                                        key={column}
                                        scope="col"
                                        className={
                                            index === 0
                                                ? "vk-narrow bg-sheet px-4 py-3 text-[1.1875rem] font-bold"
                                                : "px-4 py-3 text-[0.9375rem] font-semibold text-ink-soft"
                                        }
                                    >
                                        {index === 0 ? (
                                            <>
                                                Vertrags<span className="vk-mark vk-mark-word">Klar</span>
                                            </>
                                        ) : (
                                            column
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ROWS.map((row) => (
                                <tr key={row.label} className="border-b border-rule">
                                    <th scope="row" className="py-4 pr-4 font-semibold">
                                        {row.label}
                                    </th>
                                    {row.values.map((value, index) => (
                                        <td
                                            key={index}
                                            className={
                                                index === 0
                                                    ? "bg-sheet px-4 py-4 font-semibold"
                                                    : "px-4 py-4 text-ink-soft"
                                            }
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-ink-soft">
                    Erstberatung: gesetzliche Obergrenze für Verbraucher, 190 € zzgl. USt.
                </p>
            </div>
        </section>
    );
}
