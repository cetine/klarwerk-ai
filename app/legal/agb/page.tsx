import { FileText, Globe, Zap, CreditCard, RotateCcw, Shield, AlertTriangle, Scale } from "lucide-react";

export default function AGB() {
    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#5856d6] to-[#0071e3] rounded-2xl mb-6 shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
                        Allgemeine Geschäftsbedingungen
                    </h1>
                    <p className="text-lg text-[#86868b]">
                        Stand: Dezember 2024
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                    {/* § 1 Geltungsbereich */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center">
                                <Globe className="w-5 h-5 text-[#0071e3]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 1 Geltungsbereich</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Diese Allgemeinen Geschäftsbedingungen (nachfolgend &quot;AGB&quot;) gelten für alle Verträge,
                                die zwischen Enver Cetin, Lärchenstraße 20C, 84435 Lengdorf (nachfolgend
                                &quot;Anbieter&quot;) und dem Kunden (nachfolgend &quot;Kunde&quot;) über die Website www.vertragsklar.de
                                geschlossen werden.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(2)</span> Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der
                                Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
                            </p>
                        </div>
                    </div>

                    {/* § 2 Leistungsbeschreibung */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#5856d6]/10 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-[#5856d6]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 2 Leistungsbeschreibung</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Der Anbieter bietet einen digitalen Dienst zur Analyse von Vertragsdokumenten
                                mittels spezialisierter juristischer Algorithmen und eines Multi-KI-Systems an.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(2)</span> Die Leistung umfasst:
                            </p>
                            <div className="grid md:grid-cols-2 gap-3 my-4">
                                {[
                                    "Automatisierte Analyse von Dokumenten (PDF, DOCX, TXT)",
                                    "Risikobewertung des analysierten Vertrags",
                                    "Identifikation kritischer Vertragsklauseln",
                                    "Handlungsempfehlungen nach deutschen Standards",
                                    "Bereitstellung per E-Mail"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 p-3 bg-[#f5f5f7] rounded-xl">
                                        <span className="w-2 h-2 bg-[#5856d6] rounded-full flex-shrink-0"></span>
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-[#ff375f]/5 border border-[#ff375f]/20 rounded-2xl">
                                <p className="text-sm">
                                    <span className="font-semibold text-[#ff375f]">⚠️ Wichtig:</span>{" "}
                                    <span className="text-[#1d1d1f]">Die Analyse stellt keine Rechtsberatung im Sinne des Rechtsdienstleistungsgesetzes
                                        (RDG) dar.</span> Die Ergebnisse dienen ausschließlich der ersten Orientierung und ersetzen
                                    nicht die Beratung durch einen zugelassenen Rechtsanwalt.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* § 3 Vertragsschluss */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#34c759]/10 rounded-xl flex items-center justify-center">
                                <FileText className="w-5 h-5 text-[#34c759]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 3 Vertragsschluss</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Die Darstellung der Dienstleistung auf der Website stellt kein rechtlich
                                bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(2)</span> Der Kunde gibt durch das Hochladen eines Dokuments, Eingabe seiner E-Mail-Adresse
                                und Abschluss des Zahlungsvorgangs ein verbindliches Angebot zum Vertragsschluss ab.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(3)</span> Der Vertrag kommt mit der Bestätigung der Zahlung und dem Beginn der
                                Analyseverarbeitung zustande.
                            </p>
                        </div>
                    </div>

                    {/* § 4 Preise und Zahlung */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#ff9f0a]/10 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-[#ff9f0a]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 4 Preise und Zahlung</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Die angegebenen Preise sind Endpreise und enthalten die gesetzliche Umsatzsteuer.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(2)</span> Die Zahlung erfolgt über den Zahlungsdienstleister Stripe. Es gelten zusätzlich
                                die Nutzungsbedingungen von Stripe.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(3)</span> Die Leistung wird erst nach erfolgreicher Zahlungsbestätigung erbracht.
                            </p>
                        </div>
                    </div>

                    {/* § 5 Widerrufsrecht */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#30b0c7]/10 rounded-xl flex items-center justify-center">
                                <RotateCcw className="w-5 h-5 text-[#30b0c7]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 5 Widerrufsrecht</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Als Verbraucher haben Sie grundsätzlich ein 14-tägiges Widerrufsrecht.
                            </p>
                            <div className="p-4 bg-[#ff9f0a]/5 border border-[#ff9f0a]/20 rounded-2xl">
                                <p className="text-sm">
                                    <span className="font-semibold text-[#ff9f0a]">📢 Hinweis:</span>{" "}
                                    <span className="font-medium text-[#1d1d1f]">Das Widerrufsrecht erlischt</span>, wenn die Dienstleistung vollständig erbracht wurde
                                    und mit der Ausführung der Dienstleistung erst begonnen wurde, nachdem der Kunde
                                    seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon
                                    bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung verliert.
                                </p>
                            </div>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(3)</span> Mit Abschluss der Zahlung stimmen Sie zu, dass die Analyse sofort beginnt,
                                und bestätigen Ihre Kenntnis über den Verlust des Widerrufsrechts bei vollständiger
                                Leistungserbringung.
                            </p>
                        </div>
                    </div>

                    {/* § 6 Datenschutz */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#34c759]/10 rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-[#34c759]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 6 Datenschutz und Dokumentenverarbeitung</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Hochgeladene Dokumente werden ausschließlich zum Zweck der Analyse verarbeitet.
                            </p>
                            <div className="flex items-center gap-4 p-4 bg-[#34c759]/5 border border-[#34c759]/20 rounded-2xl">
                                <div className="w-12 h-12 bg-[#34c759]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl">🗑️</span>
                                </div>
                                <p className="text-sm">
                                    <span className="font-medium text-[#1d1d1f]">Auto-Löschung:</span> Die Dokumente werden nach Abschluss der Analyse
                                    automatisch und unwiderruflich gelöscht. Maximale Speicherdauer: 24 Stunden.
                                </p>
                            </div>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(3)</span> Es erfolgt keine Weitergabe der Dokumente an Dritte. Die Verarbeitung findet
                                auf Servern innerhalb der Europäischen Union statt.
                            </p>
                        </div>
                    </div>

                    {/* § 7 Haftung */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#ff375f]/10 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-[#ff375f]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 7 Haftung</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Der Anbieter haftet unbeschränkt für Schäden aus der Verletzung des Lebens,
                                des Körpers oder der Gesundheit sowie für vorsätzlich oder grob fahrlässig
                                verursachte Schäden.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(2)</span> Für die inhaltliche Richtigkeit, Vollständigkeit und Aktualität der
                                Analyseergebnisse übernimmt der Anbieter keine Haftung. Die Analyse basiert auf
                                algorithmischer Verarbeitung und kann Fehler enthalten.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(3)</span> Der Anbieter haftet nicht für Schäden, die durch die Nutzung der
                                Analyseergebnisse ohne zusätzliche rechtliche Beratung entstehen.
                            </p>
                        </div>
                    </div>

                    {/* § 8 Schlussbestimmungen */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#86868b]/10 rounded-xl flex items-center justify-center">
                                <Scale className="w-5 h-5 text-[#86868b]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">§ 8 Schlussbestimmungen</h2>
                        </div>

                        <div className="space-y-4 text-[#86868b] leading-relaxed">
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(1)</span> Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                                UN-Kaufrechts.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(2)</span> Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
                                öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten
                                München.
                            </p>
                            <p>
                                <span className="font-medium text-[#1d1d1f]">(3)</span> Sollten einzelne Bestimmungen dieser AGB unwirksam sein, berührt dies die
                                Wirksamkeit der übrigen Bestimmungen nicht.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
