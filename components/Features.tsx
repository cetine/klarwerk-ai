import { Brain, Scale, Shield, Zap, FileText, CheckCircle } from "lucide-react";

export function Features() {
    const features = [
        {
            icon: Brain,
            title: "Multi-KI-System",
            description: "Mehrere spezialisierte Modelle für präzisere Ergebnisse als einzelne Systeme.",
            color: "#0071e3",
        },
        {
            icon: Scale,
            title: "Juristische Algorithmen",
            description: "Entwickelt nach deutschem Recht: BGB, AGB-Recht, Mietrecht und Arbeitsrecht.",
            color: "#5856d6",
        },
        {
            icon: Shield,
            title: "Maximale Sicherheit",
            description: "DSGVO-konform, SSL-verschlüsselt, automatische Löschung nach 24 Stunden.",
            color: "#34c759",
        },
        {
            icon: Zap,
            title: "Sofortergebnis",
            description: "Vollständige Analyse in weniger als 2 Minuten – keine Wartezeiten.",
            color: "#ff9f0a",
        },
        {
            icon: FileText,
            title: "Detaillierter Bericht",
            description: "Klausel-für-Klausel-Analyse mit Risikobewertung und Empfehlungen.",
            color: "#af52de",
        },
        {
            icon: CheckCircle,
            title: "Verhandlungshilfe",
            description: "Konkrete Vorschläge welche Klauseln Sie nachverhandeln sollten.",
            color: "#ff375f",
        },
    ];

    return (
        <section className="py-28 bg-white" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20 stagger-children">
                    <div className="inline-flex items-center rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-medium text-[#1d1d1f] mb-8">
                        <Brain className="w-4 h-4 mr-2 text-[#0071e3]" />
                        Spezialisierte Technologie
                    </div>
                    <h2 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl mb-6">
                        Warum VertragsKlar?
                    </h2>
                    <p className="text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
                        Entwickelt für den deutschen Rechtsraum – mit Technologie,
                        die speziell für juristische Dokumentenanalyse optimiert wurde.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto stagger-children">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group p-8 rounded-3xl bg-[#f5f5f7] border border-transparent hover:border-[#d2d2d7] hover:bg-white hover-lift transition-all duration-500"
                            >
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundColor: `${feature.color}15` }}
                                >
                                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[#86868b] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Bar */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-3xl bg-[#1d1d1f]">
                        {[
                            { value: "< 2 Min.", label: "Analysezeit" },
                            { value: "24h", label: "Auto-Löschung" },
                            { value: "100%", label: "DSGVO-konform" },
                            { value: "€3,99", label: "Pro Analyse" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-semibold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
