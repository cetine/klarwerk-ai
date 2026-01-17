import { Check, Brain, Scale, Shield, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
    return (
        <section className="py-28 bg-[#f5f5f7]" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 stagger-children">
                    <h2 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl mb-6">
                        Professionelle Analyse.
                        <br />
                        <span className="text-[#86868b]">Fairer Preis.</span>
                    </h2>
                    <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
                        Kein Abo. Keine versteckten Kosten.
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover-lift">
                        {/* Badge */}
                        <div className="absolute top-6 right-6">
                            <div className="px-3 py-1 bg-[#0071e3] text-white text-xs font-semibold rounded-full">
                                Empfohlen
                            </div>
                        </div>

                        <div className="p-10 text-center border-b border-[#f5f5f7]">
                            <p className="text-[#86868b] font-medium mb-4">Expertenanalyse</p>
                            <div className="flex items-baseline justify-center gap-3 text-[#1d1d1f]">
                                <span className="text-6xl font-semibold">€3,99</span>
                            </div>
                            <p className="text-[#86868b] mt-2">pro Dokument</p>
                        </div>

                        <div className="p-10">
                            <ul className="space-y-5">
                                {[
                                    { icon: Brain, text: "Multi-KI-Analyse mit spezialisierten Modellen" },
                                    { icon: Scale, text: "Juristische Prüfung nach BGB & AGB-Recht" },
                                    { icon: Shield, text: "Risikobewertung mit Ampelsystem" },
                                    { icon: Check, text: "Konkrete Verhandlungsempfehlungen" },
                                    { icon: Check, text: "Rechtliche Grundlagen mit Paragraphen" },
                                    { icon: Check, text: "PDF-Bericht per E-Mail" },
                                ].map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <li key={index} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Icon className="w-3.5 h-3.5 text-[#0071e3]" />
                                            </div>
                                            <span className="text-[#1d1d1f]">{feature.text}</span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <a href="#upload">
                                <Button className="w-full mt-8 bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold py-7 text-lg rounded-xl transition-all duration-300">
                                    Jetzt Vertrag prüfen
                                </Button>
                            </a>
                        </div>
                    </div>

                    <p className="text-center text-sm text-[#86868b] mt-6">
                        Sichere Zahlung über Stripe · Daten werden nach Analyse gelöscht
                    </p>
                </div>

                {/* Trust */}
                <div className="mt-20 text-center">
                    <div className="flex flex-wrap justify-center gap-10 text-[#86868b]">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span>DSGVO-konform</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Scale className="w-5 h-5" />
                            <span>Deutsche Rechtsstandards</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            <span>Spezialisierte Algorithmen</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
