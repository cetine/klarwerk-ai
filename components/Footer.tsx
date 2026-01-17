import Link from "next/link";
import { Brain, Scale, Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-semibold text-[#1d1d1f]">
                            VertragsKlar
                        </Link>
                        <p className="mt-4 text-[#86868b] text-sm max-w-sm leading-relaxed">
                            Professionelle Vertragsanalyse durch spezialisierte juristische Algorithmen.
                            Unser Multi-KI-System prüft Ihre Verträge nach deutschen Rechtsstandards.
                        </p>
                        <div className="flex gap-5 mt-6">
                            <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                                <Brain className="w-4 h-4" />
                                Multi-KI
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                                <Scale className="w-4 h-4" />
                                Rechtskonform
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                                <Shield className="w-4 h-4" />
                                DSGVO
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f] mb-5 text-sm">Rechtliches</h3>
                        <ul className="space-y-3 text-sm text-[#86868b]">
                            <li>
                                <Link href="/legal/impressum" className="hover:text-[#0071e3] transition-colors">
                                    Impressum
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/datenschutz" className="hover:text-[#0071e3] transition-colors">
                                    Datenschutz
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/agb" className="hover:text-[#0071e3] transition-colors">
                                    AGB
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f] mb-5 text-sm">Kontakt</h3>
                        <ul className="space-y-3 text-sm text-[#86868b]">
                            <li>
                                <a href="mailto:noreply@vertragsklar.de" className="hover:text-[#0071e3] transition-colors">
                                    noreply@vertragsklar.de
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#d2d2d7] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#86868b] text-xs">
                        © {new Date().getFullYear()} VertragsKlar. Alle Rechte vorbehalten.
                    </p>
                    <p className="text-[#86868b] text-xs">
                        Keine Rechtsberatung · Entwickelt in Deutschland 🇩🇪
                    </p>
                </div>
            </div>
        </footer>
    );
}
