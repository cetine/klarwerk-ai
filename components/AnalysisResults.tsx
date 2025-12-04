"use client";

import {
    AlertCircle,
    CheckCircle2,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Scale,
    Shield,
    TrendingUp,
    FileText,
    Lightbulb,
    Target,
    Download,
    ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface CriticalClause {
    title: string;
    content: string;
    risk: string;
    severity?: "high" | "medium" | "low";
    legalConcern?: string;
}

interface PositiveAspect {
    title: string;
    description: string;
    clause?: string;
}

interface LegalBasis {
    law: string;
    sections: string;
    relevance: string;
}

interface RiskMatrixItem {
    level: "low" | "medium" | "high";
    description: string;
}

interface NegotiationPoint {
    priority: "high" | "medium" | "low";
    clause: string;
    suggestion: string;
    reasoning: string;
}

interface AnalysisData {
    contractType?: string;
    contractScore?: number;
    scoreBreakdown?: {
        rechtssicherheit: number;
        ausgewogenheit: number;
        transparenz: number;
        vollstaendigkeit: number;
    };
    executiveSummary?: string;
    summary?: string; // Fallback for old format
    riskLevel: "red" | "yellow" | "green";
    riskExplanation: string;
    legalBasis?: LegalBasis[];
    positiveAspects?: PositiveAspect[];
    criticalClauses: CriticalClause[];
    riskMatrix?: {
        financial: RiskMatrixItem;
        legal: RiskMatrixItem;
        operational: RiskMatrixItem;
    };
    negotiationPoints?: NegotiationPoint[];
    recommendations: string[];
    disclaimer?: string;
}

interface AnalysisResultsProps {
    analysis: AnalysisData;
}

// Animated Score Ring Component
function ScoreRing({ score, size = 180 }: { score: number; size?: number }) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (animatedScore / 100) * circumference;

    const getScoreColor = () => {
        if (score >= 71) return { stroke: "#10b981", bg: "from-emerald-500/20 to-green-500/20" };
        if (score >= 41) return { stroke: "#f59e0b", bg: "from-amber-500/20 to-yellow-500/20" };
        return { stroke: "#ef4444", bg: "from-red-500/20 to-rose-500/20" };
    };

    const colors = getScoreColor();

    useEffect(() => {
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setAnimatedScore((prev) => {
                    if (prev >= score) {
                        clearInterval(interval);
                        return score;
                    }
                    return prev + 1;
                });
            }, 20);
            return () => clearInterval(interval);
        }, 300);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className={`relative inline-flex items-center justify-center bg-gradient-to-br ${colors.bg} rounded-full p-4`}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-slate-200"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colors.stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        transition: "stroke-dashoffset 1s ease-out",
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">{animatedScore}</span>
                <span className="text-sm text-slate-500 font-medium">von 100</span>
            </div>
        </div>
    );
}

// Score Breakdown Bar
function ScoreBar({ label, score, delay = 0 }: { label: string; score: number; delay?: number }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(score), delay);
        return () => clearTimeout(timer);
    }, [score, delay]);

    const getBarColor = () => {
        if (score >= 71) return "bg-emerald-500";
        if (score >= 41) return "bg-amber-500";
        return "bg-red-500";
    };

    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span className="text-slate-600 capitalize">{label}</span>
                <span className="font-semibold text-slate-900">{score}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getBarColor()} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}

// Severity Badge
function SeverityBadge({ severity }: { severity: "high" | "medium" | "low" }) {
    const config = {
        high: { bg: "bg-red-100", text: "text-red-700", label: "Hoch" },
        medium: { bg: "bg-amber-100", text: "text-amber-700", label: "Mittel" },
        low: { bg: "bg-blue-100", text: "text-blue-700", label: "Gering" },
    };
    const { bg, text, label } = config[severity];
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
            {label}
        </span>
    );
}

// Risk Matrix Cell
function RiskMatrixCell({ label, item }: { label: string; item: RiskMatrixItem }) {
    const config = {
        high: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-500" },
        medium: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-500" },
        low: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-500" },
    };
    const { bg, border, icon } = config[item.level];

    return (
        <div className={`${bg} ${border} border rounded-xl p-4 space-y-2`}>
            <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 text-sm">{label}</span>
                <div className={`w-3 h-3 rounded-full ${icon.replace("text", "bg")}`} />
            </div>
            <p className="text-sm text-slate-600">{item.description}</p>
        </div>
    );
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
    const [expandedClauses, setExpandedClauses] = useState<Set<number>>(new Set());
    const [expandedNegotiations, setExpandedNegotiations] = useState<Set<number>>(new Set());

    const toggleClause = (index: number) => {
        const newExpanded = new Set(expandedClauses);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedClauses(newExpanded);
    };

    const toggleNegotiation = (index: number) => {
        const newExpanded = new Set(expandedNegotiations);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedNegotiations(newExpanded);
    };

    const getRiskConfig = () => {
        switch (analysis.riskLevel) {
            case "red":
                return {
                    icon: AlertCircle,
                    color: "text-red-600",
                    bg: "bg-gradient-to-r from-red-50 to-rose-50",
                    border: "border-red-200",
                    label: "Hohes Risiko",
                    description: "Dringender Handlungsbedarf empfohlen",
                };
            case "yellow":
                return {
                    icon: AlertTriangle,
                    color: "text-amber-600",
                    bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
                    border: "border-amber-200",
                    label: "Mittleres Risiko",
                    description: "Überprüfung einzelner Klauseln empfohlen",
                };
            case "green":
                return {
                    icon: CheckCircle2,
                    color: "text-emerald-600",
                    bg: "bg-gradient-to-r from-emerald-50 to-green-50",
                    border: "border-emerald-200",
                    label: "Geringes Risiko",
                    description: "Vertrag erscheint ausgewogen",
                };
        }
    };

    const riskConfig = getRiskConfig();
    const RiskIcon = riskConfig.icon;
    const score = analysis.contractScore ?? 50;
    const summary = analysis.executiveSummary || analysis.summary || "";

    const handleDownload = () => {
        window.print();
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 p-4 md:p-6 animate-fadeIn">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-sm text-slate-600 mb-4">
                    <Scale className="w-4 h-4" />
                    <span>Rechtliche Vertragsanalyse</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Ihre Vertragsanalyse
                </h1>
                {analysis.contractType && (
                    <p className="text-lg text-slate-600">{analysis.contractType}</p>
                )}
            </div>

            {/* Score & Summary Section */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Contract Score Card */}
                <Card className="border-0 shadow-xl bg-white overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center justify-center space-y-6">
                        <h3 className="text-lg font-semibold text-slate-700">Vertragsbewertung</h3>
                        <ScoreRing score={score} />
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${riskConfig.bg} ${riskConfig.border} border`}>
                            <RiskIcon className={`w-5 h-5 ${riskConfig.color}`} />
                            <span className={`font-semibold ${riskConfig.color}`}>{riskConfig.label}</span>
                        </div>
                        <p className="text-sm text-slate-500 text-center">{riskConfig.description}</p>
                    </CardContent>
                </Card>

                {/* Score Breakdown */}
                {analysis.scoreBreakdown && (
                    <Card className="border-0 shadow-xl bg-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Bewertungsdetails
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ScoreBar label="Rechtssicherheit" score={analysis.scoreBreakdown.rechtssicherheit} delay={400} />
                            <ScoreBar label="Ausgewogenheit" score={analysis.scoreBreakdown.ausgewogenheit} delay={600} />
                            <ScoreBar label="Transparenz" score={analysis.scoreBreakdown.transparenz} delay={800} />
                            <ScoreBar label="Vollständigkeit" score={analysis.scoreBreakdown.vollstaendigkeit} delay={1000} />
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Executive Summary */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Zusammenfassung
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-700 leading-relaxed text-lg">{summary}</p>
                </CardContent>
            </Card>

            {/* Risk Explanation */}
            <Card className={`border-2 ${riskConfig.border} shadow-lg`}>
                <CardHeader className={riskConfig.bg}>
                    <CardTitle className="flex items-center gap-3">
                        <RiskIcon className={`w-6 h-6 ${riskConfig.color}`} />
                        <span>Risikobewertung</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-slate-700 leading-relaxed">{analysis.riskExplanation}</p>
                </CardContent>
            </Card>

            {/* Risk Matrix */}
            {analysis.riskMatrix && (
                <Card className="border-0 shadow-xl bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            Risikomatrix
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                            <RiskMatrixCell label="Finanziell" item={analysis.riskMatrix.financial} />
                            <RiskMatrixCell label="Rechtlich" item={analysis.riskMatrix.legal} />
                            <RiskMatrixCell label="Operativ" item={analysis.riskMatrix.operational} />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Legal Basis */}
            {analysis.legalBasis && analysis.legalBasis.length > 0 && (
                <Card className="border-0 shadow-xl bg-white">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="w-5 h-5 text-indigo-600" />
                            Rechtliche Grundlagen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {analysis.legalBasis.map((basis, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <span className="text-indigo-700 font-bold text-sm">{basis.sections}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{basis.law}</h4>
                                        <p className="text-slate-600 text-sm mt-1">{basis.relevance}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Positive Aspects */}
            {analysis.positiveAspects && analysis.positiveAspects.length > 0 && (
                <Card className="border-0 shadow-xl bg-white">
                    <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            Positive Aspekte
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            {analysis.positiveAspects.map((aspect, index) => (
                                <div key={index} className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                                    <h4 className="font-semibold text-emerald-900 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        {aspect.title}
                                    </h4>
                                    <p className="text-slate-600 text-sm mt-2">{aspect.description}</p>
                                    {aspect.clause && (
                                        <p className="text-xs text-slate-500 mt-2 italic border-l-2 border-emerald-300 pl-2">
                                            &ldquo;{aspect.clause}&rdquo;
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Critical Clauses */}
            {analysis.criticalClauses && analysis.criticalClauses.length > 0 && (
                <Card className="border-0 shadow-xl bg-white">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            Kritische Klauseln
                            <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-sm rounded-full">
                                {analysis.criticalClauses.length}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        {analysis.criticalClauses.map((clause, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleClause(index)}
                                    className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-slate-900 text-left">
                                            {clause.title}
                                        </span>
                                        {clause.severity && <SeverityBadge severity={clause.severity} />}
                                    </div>
                                    {expandedClauses.has(index) ? (
                                        <ChevronUp className="w-5 h-5 text-slate-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-600" />
                                    )}
                                </button>
                                {expandedClauses.has(index) && (
                                    <div className="p-5 space-y-4 bg-white border-t border-slate-100">
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                                                Vertragstext
                                            </p>
                                            <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border-l-4 border-slate-300 italic">
                                                &ldquo;{clause.content}&rdquo;
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                                                Risikoanalyse
                                            </p>
                                            <p className="text-slate-700">{clause.risk}</p>
                                        </div>
                                        {clause.legalConcern && (
                                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                                <p className="text-xs font-medium text-amber-700 mb-1 uppercase tracking-wide">
                                                    Rechtlicher Hinweis
                                                </p>
                                                <p className="text-amber-800 text-sm">{clause.legalConcern}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Negotiation Points */}
            {analysis.negotiationPoints && analysis.negotiationPoints.length > 0 && (
                <Card className="border-0 shadow-xl bg-white">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            Verhandlungspunkte
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        {analysis.negotiationPoints.map((point, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleNegotiation(index)}
                                    className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <SeverityBadge severity={point.priority} />
                                        <span className="font-semibold text-slate-900 text-left">
                                            {point.clause}
                                        </span>
                                    </div>
                                    {expandedNegotiations.has(index) ? (
                                        <ChevronUp className="w-5 h-5 text-slate-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-600" />
                                    )}
                                </button>
                                {expandedNegotiations.has(index) && (
                                    <div className="p-5 space-y-4 bg-white border-t border-slate-100">
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                                                Vorschlag
                                            </p>
                                            <p className="text-slate-700 flex items-start gap-2">
                                                <ArrowRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                {point.suggestion}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                                                Begründung
                                            </p>
                                            <p className="text-slate-600 text-sm">{point.reasoning}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
                <Card className="border-0 shadow-xl bg-white">
                    <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-teal-600" />
                            Handlungsempfehlungen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ul className="space-y-4">
                            {analysis.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <span className="text-slate-700 pt-1">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Disclaimer */}
            {analysis.disclaimer && (
                <div className="bg-slate-100 rounded-xl p-4 text-center">
                    <p className="text-sm text-slate-500">{analysis.disclaimer}</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="px-8 py-6 text-base gap-2"
                >
                    <Download className="w-5 h-5" />
                    Als PDF speichern
                </Button>
                <Button
                    onClick={() => (window.location.href = "/")}
                    className="px-8 py-6 text-base bg-blue-600 hover:bg-blue-700 gap-2"
                >
                    <FileText className="w-5 h-5" />
                    Neuen Vertrag analysieren
                </Button>
            </div>
        </div>
    );
}
