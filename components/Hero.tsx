import { UploadForm } from "@/components/UploadForm";
import { CheckCircle2, ShieldCheck, Zap, Scale, Brain } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-44">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16 stagger-children">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-medium text-[#1d1d1f] mb-8 hover-lift cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-[#34c759] mr-2.5 animate-pulse"></span>
                        Spezialisierte Rechtsanalyse-KI
                    </div>

                    {/* Headline - Apple style large and bold */}
                    <h1 className="text-5xl font-semibold tracking-tight text-[#1d1d1f] sm:text-7xl mb-6 leading-[1.1]">
                        Verträge verstehen.{" "}
                        <span className="gradient-text">Risiken vermeiden.</span>
                    </h1>

                    {/* Subheadline - Apple style lighter weight */}
                    <p className="text-xl text-[#86868b] mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
                        Unser KI-Expertenrat analysiert Ihren Vertrag mit spezialisierten
                        juristischen Algorithmen – entwickelt nach deutschen Rechtsstandards.
                    </p>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {[
                            { icon: Brain, label: "Multi-KI-System" },
                            { icon: Scale, label: "BGB & AGB-Recht" },
                            { icon: ShieldCheck, label: "DSGVO-konform" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-[#d2d2d7] text-sm font-medium text-[#1d1d1f] hover-lift"
                            >
                                <item.icon className="w-4 h-4 text-[#0071e3]" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upload Form */}
                <div className="relative z-20 animate-slideIn" style={{ animationDelay: "0.4s" }}>
                    <UploadForm />
                </div>

                {/* Bottom trust indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-[#86868b] stagger-children">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#34c759]" />
                        <span>Sofortergebnis in weniger als 2 Minuten</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#ff9f0a]" />
                        <span>Automatische Löschung nach 24h</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#0071e3]" />
                        <span>Serverstandort Deutschland</span>
                    </div>
                </div>
            </div>

            {/* Subtle background gradient - Apple style */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0071e3]/5 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#5856d6]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[#af52de]/5 rounded-full blur-[120px]"></div>
            </div>
        </section>
    );
}
