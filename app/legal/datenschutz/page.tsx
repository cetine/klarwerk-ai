import { Shield, Upload, Trash2, Brain, UserCheck, CreditCard, Lock, Cookie, FileText } from "lucide-react";

export default function Datenschutz() {
    return (
        <div className="py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#34c759] to-[#30b0c7] rounded-2xl mb-6 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
                        Datenschutzerklärung
                    </h1>
                    <p className="text-lg text-[#86868b]">
                        Stand: Dezember 2024
                    </p>
                </div>

                {/* Quick Overview */}
                <div className="bg-gradient-to-br from-[#34c759]/10 to-[#30b0c7]/10 rounded-3xl p-8 mb-8 border border-[#34c759]/20">
                    <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Auf einen Blick</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#34c759] mb-2">24h</div>
                            <div className="text-sm text-[#86868b]">Auto-Löschung</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#0071e3] mb-2">🇪🇺</div>
                            <div className="text-sm text-[#86868b]">EU-Server</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#5856d6] mb-2">0</div>
                            <div className="text-sm text-[#86868b]">Tracking-Cookies</div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                    {/* Section 1 */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#0071e3]">1</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">Datenschutz auf einen Blick</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Allgemeine Hinweise</h3>
                                <p className="text-[#86868b] leading-relaxed">
                                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                                    personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                                    Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Verantwortliche Stelle</h3>
                                <p className="text-[#86868b] leading-relaxed">
                                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
                                    Enver Cetin, Lärchenstraße 20C, 84435 Lengdorf.
                                </p>
                                <p className="text-[#86868b] mt-2">
                                    Kontakt: <a href="mailto:noreply@vertragsklar.de" className="text-[#0071e3] hover:underline">noreply@vertragsklar.de</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#5856d6]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#5856d6]">2</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">Datenverarbeitung bei der Vertragsanalyse</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Document Processing */}
                            <div className="flex items-start gap-4 p-4 bg-[#f5f5f7] rounded-2xl">
                                <div className="w-10 h-10 bg-[#5856d6]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Upload className="w-5 h-5 text-[#5856d6]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1d1d1f] mb-2">Verarbeitung hochgeladener Dokumente</h3>
                                    <p className="text-[#86868b] text-sm leading-relaxed mb-3">
                                        Wenn Sie ein Dokument zur Analyse hochladen, wird dieses temporär auf unseren
                                        Servern gespeichert und durch unser Multi-KI-System verarbeitet.
                                    </p>
                                    <ul className="space-y-1 text-sm text-[#86868b]">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#5856d6] rounded-full"></span>
                                            Der Inhalt des hochgeladenen Dokuments
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#5856d6] rounded-full"></span>
                                            Ihre E-Mail-Adresse für die Zustellung
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#5856d6] rounded-full"></span>
                                            Zahlungsinformationen (über Stripe)
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Document Deletion */}
                            <div className="flex items-start gap-4 p-4 bg-[#f5f5f7] rounded-2xl">
                                <div className="w-10 h-10 bg-[#34c759]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Trash2 className="w-5 h-5 text-[#34c759]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1d1d1f] mb-2">Löschung der Dokumente</h3>
                                    <p className="text-[#86868b] text-sm leading-relaxed">
                                        Hochgeladene Dokumente werden nach Abschluss der Analyse und Zustellung des
                                        Ergebnisses <strong className="text-[#1d1d1f]">automatisch und unwiderruflich gelöscht</strong>.
                                        Die Speicherdauer beträgt maximal 24 Stunden. Wir speichern keine Kopien Ihrer Verträge.
                                    </p>
                                </div>
                            </div>

                            {/* AI Processing */}
                            <div className="flex items-start gap-4 p-4 bg-[#f5f5f7] rounded-2xl">
                                <div className="w-10 h-10 bg-[#0071e3]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Brain className="w-5 h-5 text-[#0071e3]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#1d1d1f] mb-2">KI-Verarbeitung</h3>
                                    <p className="text-[#86868b] text-sm leading-relaxed">
                                        Die Analyse erfolgt durch mehrere spezialisierte KI-Systeme, die nach deutschen
                                        Rechtsstandards entwickelt wurden. Die Verarbeitung findet auf europäischen Servern
                                        statt. Es erfolgt keine Weitergabe Ihrer Dokumente an Dritte zu Trainingszwecken.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 - Your Rights */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#ff9f0a]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#ff9f0a]">3</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">Ihre Rechte</h2>
                        </div>

                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 bg-[#ff9f0a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <UserCheck className="w-5 h-5 text-[#ff9f0a]" />
                            </div>
                            <p className="text-[#86868b]">Sie haben jederzeit das Recht:</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                            {[
                                "Auskunft über Ihre gespeicherten Daten",
                                "Berichtigung unrichtiger Daten",
                                "Löschung Ihrer Daten",
                                "Einschränkung der Verarbeitung",
                                "Widerspruch gegen die Verarbeitung",
                                "Datenübertragbarkeit"
                            ].map((right, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 bg-[#f5f5f7] rounded-xl">
                                    <span className="w-2 h-2 bg-[#34c759] rounded-full"></span>
                                    <span className="text-sm text-[#86868b]">{right}</span>
                                </div>
                            ))}
                        </div>

                        <p className="mt-4 text-sm text-[#86868b]">
                            Zur Ausübung dieser Rechte wenden Sie sich bitte an:{" "}
                            <a href="mailto:noreply@vertragsklar.de" className="text-[#0071e3] hover:underline">noreply@vertragsklar.de</a>
                        </p>
                    </div>

                    {/* Section 4 - Payment */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#30b0c7]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#30b0c7]">4</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">Zahlungsabwicklung</h2>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#30b0c7]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-5 h-5 text-[#30b0c7]" />
                            </div>
                            <div>
                                <p className="text-[#86868b] leading-relaxed">
                                    Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe, Inc.
                                </p>
                                <a
                                    href="https://stripe.com/de/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-3 text-[#0071e3] hover:underline text-sm"
                                >
                                    Datenschutzbestimmungen von Stripe →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 - SSL */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#34c759]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#34c759]">5</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">SSL-Verschlüsselung</h2>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#34c759]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Lock className="w-5 h-5 text-[#34c759]" />
                            </div>
                            <p className="text-[#86868b] leading-relaxed">
                                Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine
                                verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                                von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                            </p>
                        </div>
                    </div>

                    {/* Section 6 - Cookies */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#ff375f]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#ff375f]">6</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">Cookies</h2>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#ff375f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Cookie className="w-5 h-5 text-[#ff375f]" />
                            </div>
                            <p className="text-[#86868b] leading-relaxed">
                                Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den
                                Betrieb der Website erforderlich sind. Eine Einwilligung ist für diese Cookies
                                nicht erforderlich.
                            </p>
                        </div>
                    </div>

                    {/* Section 7 - Changes */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#d2d2d7]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-[#86868b]/10 rounded-xl flex items-center justify-center">
                                <span className="text-lg font-bold text-[#86868b]">7</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-[#1d1d1f]">Änderungen dieser Datenschutzerklärung</h2>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#86868b]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-[#86868b]" />
                            </div>
                            <p className="text-[#86868b] leading-relaxed">
                                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den
                                aktuellen rechtlichen Anforderungen anzupassen oder um Änderungen unserer
                                Leistungen umzusetzen. Die neue Datenschutzerklärung gilt dann für Ihren
                                nächsten Besuch.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
