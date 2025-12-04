import { Check, Brain, Scale, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing() {
    return (
        <section className="py-24 bg-slate-50" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Professionelle Analyse zum fairen Preis
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Kein Abo. Keine versteckten Kosten. Zahlen Sie nur für das, was Sie brauchen –
                        mit der Qualität spezialisierter Rechtsanalyse.
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <Card className="border-blue-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            EMPFOHLEN
                        </div>
                        <CardHeader className="text-center pb-8 border-b border-slate-100">
                            <CardTitle className="text-xl font-medium text-slate-500 mb-2">
                                Expertenanalyse
                            </CardTitle>
                            <div className="flex items-baseline justify-center text-slate-900">
                                <span className="text-5xl font-bold">€3,99</span>
                                <span className="text-slate-500 ml-2">/ Dokument</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <ul className="space-y-4">
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
                                        <li key={index} className="flex items-start">
                                            <Icon className="h-5 w-5 text-blue-600 mr-3 shrink-0" />
                                            <span className="text-slate-700">{feature.text}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-slate-50 p-6">
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg">
                                Jetzt Vertrag prüfen
                            </Button>
                        </CardFooter>
                    </Card>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        Preise inkl. MwSt. Sichere Zahlung über Stripe. Daten werden nach Analyse gelöscht.
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-slate-500 mb-6">Entwickelt für den deutschen Rechtsraum</p>
                    <div className="flex flex-wrap justify-center gap-8 text-slate-400">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span className="text-sm">DSGVO-konform</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Scale className="w-5 h-5" />
                            <span className="text-sm">Deutsche Rechtsstandards</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Brain className="w-5 h-5" />
                            <span className="text-sm">Spezialisierte Algorithmen</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
