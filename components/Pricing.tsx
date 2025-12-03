import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing() {
    return (
        <section className="py-24 bg-slate-50" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Einfache, transparente Preise
                    </h2>
                    <p className="text-lg text-slate-600">
                        Kein Abo. Keine versteckten Kosten. Zahlen Sie nur, was Sie brauchen.
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <Card className="border-blue-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            BELIEBT
                        </div>
                        <CardHeader className="text-center pb-8 border-b border-slate-100">
                            <CardTitle className="text-xl font-medium text-slate-500 mb-2">
                                Einzelanalyse
                            </CardTitle>
                            <div className="flex items-baseline justify-center text-slate-900">
                                <span className="text-5xl font-bold">€3,99</span>
                                <span className="text-slate-500 ml-2">/ Dokument</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <ul className="space-y-4">
                                {[
                                    "Vollständige KI-Analyse (GPT-4o)",
                                    "Risikobewertung (Ampelsystem)",
                                    "Konkrete Handlungsempfehlungen",
                                    "Rechtliche Erklärungen",
                                    "PDF-Export per E-Mail",
                                ].map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-5 w-5 text-blue-600 mr-3 shrink-0" />
                                        <span className="text-slate-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-slate-50 p-6">
                            <Button className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg">
                                Jetzt Vertrag prüfen
                            </Button>
                        </CardFooter>
                    </Card>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        Preise inkl. MwSt. Sicher bezahlen mit Stripe.
                    </p>
                </div>
            </div>
        </section>
    );
}
