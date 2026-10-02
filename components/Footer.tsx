import Link from "next/link";
import { Wordmark } from "@/components/landing/SiteHeader";
import { nebenkostenNinjaUrl } from "@/lib/crosssell";

const LINKS = [
    { href: "/legal/impressum", label: "Impressum" },
    { href: "/legal/datenschutz", label: "Datenschutz" },
    { href: "/legal/agb", label: "AGB" },
];

export function Footer() {
    return (
        <footer className="vk border-t border-ink">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-8">
                <div className="max-w-sm">
                    <Wordmark />
                    <p className="mt-3 text-sm leading-[1.45] text-ink-soft">
                        Automatisierte Ersteinschätzung von Verträgen. Made in Germany, Serverstandort Deutschland. Keine Rechtsberatung.
                    </p>
                </div>
                <nav aria-label="Rechtliches">
                    <ul className="flex flex-wrap gap-x-2 text-sm">
                        {LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex min-h-11 items-center px-2 text-ink-soft hover:text-ink"
                                >
                                    <span className="vk-link">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href={nebenkostenNinjaUrl("footer")}
                                className="inline-flex min-h-11 items-center px-2 text-ink-soft hover:text-ink"
                            >
                                <span className="vk-link">Nebenkosten prüfen: Nebenkosten-Ninja</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:noreply@vertragsklar.de"
                                className="inline-flex min-h-11 items-center px-2 text-ink-soft hover:text-ink"
                            >
                                <span className="vk-link">noreply@vertragsklar.de</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mx-auto max-w-[1200px] px-4 pb-8 text-sm text-ink-soft md:px-8">
                © {new Date().getFullYear()} VertragsKlar
            </div>
        </footer>
    );
}
