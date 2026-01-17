"use client";

import { useEffect, useState } from "react";
import { Brain, Scale, FileText, Gavel, Building2, Users, ArrowDown, Sparkles } from "lucide-react";

interface AIAgent {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
}

const aiAgents: AIAgent[] = [
    {
        id: "bgb",
        name: "Vertragsrecht Analyst",
        icon: <Scale className="w-5 h-5" />,
        color: "blue",
    },
    {
        id: "agb",
        name: "AGB Experte",
        icon: <FileText className="w-5 h-5" />,
        color: "purple",
    },
    {
        id: "miet",
        name: "Miet Profi",
        icon: <Building2 className="w-5 h-5" />,
        color: "teal",
    },
    {
        id: "arbeit",
        name: "Arbeitsrecht Spezialist",
        icon: <Users className="w-5 h-5" />,
        color: "orange",
    },
    {
        id: "risk",
        name: "Risiko Berater",
        icon: <Gavel className="w-5 h-5" />,
        color: "pink",
    },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "bg-[#0071e3]/10", border: "border-[#0071e3]/20", text: "text-[#0071e3]" },
    purple: { bg: "bg-[#5856d6]/10", border: "border-[#5856d6]/20", text: "text-[#5856d6]" },
    teal: { bg: "bg-[#30b0c7]/10", border: "border-[#30b0c7]/20", text: "text-[#30b0c7]" },
    orange: { bg: "bg-[#ff9f0a]/10", border: "border-[#ff9f0a]/20", text: "text-[#ff9f0a]" },
    pink: { bg: "bg-[#ff375f]/10", border: "border-[#ff375f]/20", text: "text-[#ff375f]" },
};

export function AICouncil() {
    const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        const agentTimers = aiAgents.map((agent, index) => {
            return setTimeout(() => {
                setActiveAgents((prev) => new Set([...prev, agent.id]));
            }, index * 600);
        });

        const summaryTimer = setTimeout(() => {
            setShowSummary(true);
        }, aiAgents.length * 600 + 500);

        const resetTimer = setTimeout(() => {
            setActiveAgents(new Set());
            setShowSummary(false);
        }, aiAgents.length * 600 + 4000);

        return () => {
            agentTimers.forEach(clearTimeout);
            clearTimeout(summaryTimer);
            clearTimeout(resetTimer);
        };
    }, [activeAgents.size === 0 ? Date.now() : 0]);

    return (
        <section className="py-28 bg-[#1d1d1f] overflow-hidden" id="ki-expertenrat">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-20 stagger-children">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 mb-8">
                        <Sparkles className="w-4 h-4 mr-2 text-[#0071e3]" />
                        Made in Germany
                    </div>
                    <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl mb-6">
                        Der KI-Expertenrat
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Wie eine Kanzlei mit fünf Fachanwälten. Unsere spezialisierten Systeme
                        analysieren Ihren Vertrag parallel und konsolidieren ihre Erkenntnisse.
                    </p>
                </div>

                {/* AI Council Visualization */}
                <div className="max-w-4xl mx-auto">
                    {/* Center - Parent AI */}
                    <div className="flex justify-center mb-10">
                        <div className={`relative transition-all duration-700 ease-out ${showSummary ? "scale-105" : "scale-100"}`}>
                            {/* Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-[#0071e3] to-[#5856d6] rounded-3xl blur-2xl transition-opacity duration-700 ${showSummary ? "opacity-40" : "opacity-20"}`} />

                            {/* Card */}
                            <div className="relative glass-panel-dark rounded-3xl p-8 text-center min-w-[320px]">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#0071e3] to-[#5856d6] rounded-full text-xs font-semibold text-white uppercase tracking-wider">
                                    Parent AI
                                </div>
                                <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#0071e3] to-[#5856d6] rounded-2xl flex items-center justify-center shadow-lg">
                                    <Brain className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Parent AI</h3>
                                <p className="text-white/50 text-sm">Konsolidiert alle Fachgutachten</p>

                                {showSummary && (
                                    <div className="mt-5 p-4 bg-[#34c759]/10 rounded-xl border border-[#34c759]/20 animate-fadeIn">
                                        <p className="text-sm text-[#34c759] font-medium">
                                            ✓ Alle Gutachten ausgewertet
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Connection */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-3">
                            {aiAgents.map((_, i) => (
                                <ArrowDown
                                    key={i}
                                    className={`w-4 h-4 transition-all duration-500 ${activeAgents.size > i ? "text-[#0071e3]" : "text-white/20"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* AI Agents */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {aiAgents.map((agent) => {
                            const colors = colorClasses[agent.color];
                            const isActive = activeAgents.has(agent.id);

                            return (
                                <div
                                    key={agent.id}
                                    className={`transition-all duration-500 ease-out ${isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-30"}`}
                                >
                                    <div className={`relative p-5 rounded-2xl border transition-all duration-500 ${isActive
                                        ? "glass-panel-dark border-white/10"
                                        : "bg-white/5 border-white/5"
                                        }`}>
                                        {isActive && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3">
                                                <div className="absolute inset-0 bg-[#34c759] rounded-full animate-ping opacity-75" />
                                                <div className="absolute inset-0 bg-[#34c759] rounded-full" />
                                            </div>
                                        )}

                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${colors.bg} ${colors.border} border`}>
                                            <span className={colors.text}>{agent.icon}</span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-white">{agent.name}</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Process Steps */}
                    <div className="mt-20 grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Fachgutachten", desc: "Jeder Experte analysiert aus seiner Spezialisierung heraus" },
                            { step: "2", title: "Beratungsrunde", desc: "Die Experten tauschen Erkenntnisse aus und ergänzen sich" },
                            { step: "3", title: "Abschlussbericht", desc: "Die Parent AI erstellt eine fundierte Gesamtbewertung" },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover-lift">
                                <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-gradient-to-r from-[#0071e3] to-[#5856d6] flex items-center justify-center text-white font-semibold text-lg">
                                    {item.step}
                                </div>
                                <h4 className="text-white font-semibold mb-2 text-lg">{item.title}</h4>
                                <p className="text-white/50 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* German Badge */}
                    <div className="mt-16 text-center">
                        <p className="text-white/40 text-sm mb-2">
                            ⚡ Analysezeit unter 2 Minuten
                        </p>
                        <p className="text-white/40 text-sm">
                            🇩🇪 Entwickelt nach deutschen Rechtsstandards · Serverstandort Deutschland · DSGVO-konform
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
