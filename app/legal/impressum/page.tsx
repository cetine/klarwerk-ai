import { User, Mail, Scale, Globe, MessageSquare, AlertTriangle } from "lucide-react";

export default function Impressum() {
    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#5856d6] rounded-2xl mb-6 shadow-lg">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
                        Impressum
                    </h1>
                    <p className="text-lg text-[#86868b]">
                        Angaben gemäß § 5 DDG
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="space-y-6">
                    {/* Main Contact Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#0071e3]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <User className="w-6 h-6 text-[#0071e3]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">Betreiber</h2>
                                <p className="text-[#1d1d1f] leading-relaxed">
                                    Enver Cetin<br />
                                    Lärchenstraße 20C<br />
                                    84435 Lengdorf
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#34c759]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-[#34c759]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">Kontakt</h2>
                                <a href="mailto:noreply@vertragsklar.de" className="text-[#0071e3] hover:underline">
                                    noreply@vertragsklar.de
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* EU Dispute Resolution */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#5856d6]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Globe className="w-6 h-6 text-[#5856d6]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">EU-Streitschlichtung</h2>
                                <p className="text-[#86868b] mb-3">
                                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                                </p>
                                <a
                                    href="https://ec.europa.eu/consumers/odr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#0071e3] hover:underline"
                                >
                                    https://ec.europa.eu/consumers/odr/
                                </a>
                                <p className="text-[#86868b] mt-3 text-sm">
                                    Unsere E-Mail-Adresse finden Sie oben im Impressum.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Consumer Dispute Resolution */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#ff9f0a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Scale className="w-6 h-6 text-[#ff9f0a]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">Verbraucherstreitbeilegung</h2>
                                <p className="text-[#86868b]">
                                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                                    Verbraucherschlichtungsstelle teilzunehmen.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* DSA Contact */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#30b0c7]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="w-6 h-6 text-[#30b0c7]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                                    Zentrale Kontaktstelle nach dem Digital Services Act
                                </h2>
                                <p className="text-sm text-[#86868b] mb-4">(Verordnung (EU) 2022/2065)</p>
                                <p className="text-[#86868b] mb-3">
                                    Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:
                                </p>
                                <p className="text-[#1d1d1f] mb-2">
                                    <strong>E-Mail:</strong>{" "}
                                    <a href="mailto:noreply@vertragsklar.de" className="text-[#0071e3] hover:underline">
                                        noreply@vertragsklar.de
                                    </a>
                                </p>
                                <p className="text-[#86868b] text-sm">
                                    Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Legal Notice */}
                    <div className="bg-gradient-to-br from-[#ff375f]/5 to-[#ff9f0a]/5 rounded-3xl p-8 border border-[#ff375f]/20">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#ff375f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-6 h-6 text-[#ff375f]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">Hinweis zur Vertragsanalyse</h2>
                                <p className="text-[#86868b]">
                                    Die von VertragsKlar angebotene Vertragsanalyse stellt <strong className="text-[#1d1d1f]">keine Rechtsberatung</strong> im
                                    Sinne des Rechtsdienstleistungsgesetzes (RDG) dar. Unsere Dienstleistung bietet eine
                                    technische Analyse von Vertragsdokumenten mittels spezialisierter Algorithmen und
                                    mehrerer KI-Systeme. Die Ergebnisse dienen ausschließlich der ersten Orientierung
                                    und ersetzen nicht die Beratung durch einen zugelassenen Rechtsanwalt.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center text-sm text-[#86868b]">
                    Quelle:{" "}
                    <a
                        href="https://www.e-recht24.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0071e3] hover:underline"
                    >
                        e-recht24.de
                    </a>
                </div>
            </div>
        </div>
    );
}
