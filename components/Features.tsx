import { Brain, Scale, Shield, Zap, FileText, CheckCircle } from "lucide-react";

export function Features() {
    const features = [
        {
            icon: Brain,
            title: "Multi-KI-System",
            description: "Mehrere spezialisierte KI-Modelle arbeiten zusammen für präzisere Ergebnisse als einzelne Systeme.",
            color: "blue",
        },
        {
            icon: Scale,
            title: "Juristische Algorithmen",
            description: "Nach deutschem Recht entwickelt: BGB, AGB-Recht, Mietrecht und Arbeitsrecht integriert.",
            color: "indigo",
        },
        {
            icon: Shield,
            title: "Maximale Sicherheit",
            description: "DSGVO-konform, SSL-verschlüsselt, automatische Löschung nach 24 Stunden.",
            color: "emerald",
        },
        {
            icon: Zap,
            title: "Sofortergebnis",
            description: "Vollständige Analyse in unter 30 Sekunden – keine Wartezeiten, keine Termine.",
            color: "amber",
        },
        {
            icon: FileText,
            title: "Detaillierter Bericht",
            description: "Klausel-für-Klausel-Analyse mit Risikobewertung und konkreten Handlungsempfehlungen.",
            color: "purple",
        },
        {
            icon: CheckCircle,
            title: "Verhandlungshilfe",
            description: "Konkrete Vorschläge welche Klauseln Sie nachverhandeln sollten – mit Begründung.",
            color: "rose",
        },
    ];

    const colorClasses = {
        blue: { bg: "bg-blue-50", icon: "text-blue-600", ring: "ring-blue-100" },
        indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", ring: "ring-indigo-100" },
        emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", ring: "ring-emerald-100" },
        amber: { bg: "bg-amber-50", icon: "text-amber-600", ring: "ring-amber-100" },
        purple: { bg: "bg-purple-50", icon: "text-purple-600", ring: "ring-purple-100" },
        rose: { bg: "bg-rose-50", icon: "text-rose-600", ring: "ring-rose-100" },
    };

    return (
        <section className="py-24 bg-white" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-600 mb-6">
                        <Brain className="w-4 h-4 mr-2 text-blue-600" />
                        Spezialisierte Technologie
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                        Warum VertragsKlar?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Entwickelt für den deutschen Rechtsraum – mit Technologie,
                        die speziell für juristische Dokumentenanalyse optimiert wurde.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const colors = colorClasses[feature.color as keyof typeof colorClasses];

                        return (
                            <div
                                key={index}
                                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`${colors.bg} ${colors.ring} ring-1 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Stats */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                        {[
                            { value: "< 30s", label: "Analysezeit" },
                            { value: "24h", label: "Auto-Löschung" },
                            { value: "100%", label: "DSGVO-konform" },
                            { value: "€3,99", label: "Pro Dokument" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400">
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
