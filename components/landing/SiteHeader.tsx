import Link from "next/link";

const NAV = [
    { href: "#beispiel", label: "Beispiel" },
    { href: "#ablauf", label: "Ablauf" },
    { href: "#vergleich", label: "Vergleich" },
    { href: "#preis", label: "Preis" },
    { href: "#faq", label: "FAQ" },
];

export function Wordmark() {
    return (
        <Link href="/" className="vk-narrow text-[1.375rem] font-bold tracking-[-0.02em] text-ink">
            Vertrags<span className="vk-mark vk-mark-word">Klar</span>
        </Link>
    );
}

export function SiteHeader() {
    return (
        <header className="border-b border-rule">
            <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 md:px-8">
                <Wordmark />
                <nav aria-label="Seitennavigation" className="flex items-center gap-1">
                    <ul className="hidden items-center gap-1 md:flex">
                        {NAV.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="inline-flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] text-ink-soft hover:text-ink"
                                >
                                    <span className="vk-link">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a
                        href="#pruefen"
                        className="vk-press ml-2 inline-flex min-h-11 items-center rounded-md border border-ink px-4 text-[0.9375rem] font-semibold text-ink hover:bg-ink hover:text-sheet"
                    >
                        Vertrag prüfen
                    </a>
                </nav>
            </div>
        </header>
    );
}
