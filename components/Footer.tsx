import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold text-slate-900">
                            VertragsKlar
                        </Link>
                        <p className="mt-4 text-slate-500 text-sm max-w-xs">
                            Ihre intelligente Vertragsanalyse. Wir helfen Ihnen, rechtliche Dokumente zu verstehen und Risiken zu minimieren.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Rechtliches</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/legal/impressum" className="hover:text-blue-600">
                                    Impressum
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/datenschutz" className="hover:text-blue-600">
                                    Datenschutz
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/agb" className="hover:text-blue-600">
                                    AGB
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4">Kontakt</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <a href="mailto:support@vertragsklar.de" className="hover:text-blue-600">
                                    support@vertragsklar.de
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} VertragsKlar. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
