"use client";

import { AlertCircle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CriticalClause {
    title: string;
    content: string;
    risk: string;
}

interface AnalysisData {
    summary: string;
    riskLevel: "red" | "yellow" | "green";
    riskExplanation: string;
    criticalClauses: CriticalClause[];
    recommendations: string[];
}

interface AnalysisResultsProps {
    analysis: AnalysisData;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
    const [expandedClauses, setExpandedClauses] = useState<Set<number>>(new Set());

    const toggleClause = (index: number) => {
        const newExpanded = new Set(expandedClauses);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedClauses(newExpanded);
    };

    const getRiskConfig = () => {
        switch (analysis.riskLevel) {
            case "red":
                return {
                    icon: AlertCircle,
                    color: "text-red-600",
                    bg: "bg-red-50",
                    border: "border-red-200",
                    label: "Hohes Risiko",
                };
            case "yellow":
                return {
                    icon: AlertTriangle,
                    color: "text-yellow-600",
                    bg: "bg-yellow-50",
                    border: "border-yellow-200",
                    label: "Mittleres Risiko",
                };
            case "green":
                return {
                    icon: CheckCircle2,
                    color: "text-green-600",
                    bg: "bg-green-50",
                    border: "border-green-200",
                    label: "Geringes Risiko",
                };
        }
    };

    const riskConfig = getRiskConfig();
    const RiskIcon = riskConfig.icon;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Ihre Vertragsanalyse</h1>
                <p className="text-slate-600">Detaillierte KI-gestützte Bewertung</p>
            </div>

            {/* Summary Card */}
            <Card className="border-2 border-slate-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📋</span>
                        Zusammenfassung
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
                </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className={`border-2 ${riskConfig.border} shadow-lg`}>
                <CardHeader className={riskConfig.bg}>
                    <CardTitle className="flex items-center gap-3">
                        <RiskIcon className={`w-8 h-8 ${riskConfig.color}`} />
                        <div>
                            <div className="text-xl">Risikobewertung</div>
                            <div className={`text-sm font-normal ${riskConfig.color}`}>
                                {riskConfig.label}
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-slate-700 leading-relaxed">{analysis.riskExplanation}</p>
                </CardContent>
            </Card>

            {/* Critical Clauses */}
            {analysis.criticalClauses && analysis.criticalClauses.length > 0 && (
                <Card className="border-2 border-slate-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">⚠️</span>
                            Kritische Klauseln
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        {analysis.criticalClauses.map((clause, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleClause(index)}
                                    className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between"
                                >
                                    <span className="font-semibold text-slate-900 text-left">
                                        {clause.title}
                                    </span>
                                    {expandedClauses.has(index) ? (
                                        <ChevronUp className="w-5 h-5 text-slate-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-600" />
                                    )}
                                </button>
                                {expandedClauses.has(index) && (
                                    <div className="p-4 space-y-3 bg-white">
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">
                                                Inhalt:
                                            </p>
                                            <p className="text-slate-700">{clause.content}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">
                                                Risiko:
                                            </p>
                                            <p className="text-slate-700">{clause.risk}</p>
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
                <Card className="border-2 border-slate-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">💡</span>
                            Empfehlungen
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ul className="space-y-3">
                            {analysis.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-4">
                <Button
                    onClick={() => window.print()}
                    variant="outline"
                    className="px-6"
                >
                    Drucken
                </Button>
                <Button
                    onClick={() => window.location.href = "/"}
                    className="px-6 bg-blue-600 hover:bg-blue-700"
                >
                    Neue Analyse
                </Button>
            </div>
        </div>
    );
}
