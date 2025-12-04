import { UploadForm } from "@/components/UploadForm";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                        Neu: Multi-KI Analyse
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
                        Verträge verstehen. <br />
                        <span className="text-blue-600">Risiken vermeiden.</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Laden Sie Ihren Mietvertrag, Arbeitsvertrag oder Kaufvertrag hoch.
                        Unsere KI analysiert das Kleingedruckte und findet versteckte Risiken
                        in Sekunden.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 mb-12">
                        <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                            <span>Sofortige Analyse</span>
                        </div>
                        <div className="flex items-center">
                            <ShieldCheck className="w-4 h-4 text-blue-500 mr-2" />
                            <span>Datenschutzkonform</span>
                        </div>
                        <div className="flex items-center">
                            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                            <span>Einfache Sprache</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-20">
                    <UploadForm />
                </div>
            </div>

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
        </section>
    );
}
