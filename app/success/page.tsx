"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, FileText, Scale, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AnalysisResults } from "@/components/AnalysisResults";

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
    summary?: string;
    riskLevel: "red" | "yellow" | "green";
    riskExplanation: string;
    legalBasis?: Array<{
        law: string;
        sections: string;
        relevance: string;
    }>;
    positiveAspects?: Array<{
        title: string;
        description: string;
        clause?: string;
    }>;
    criticalClauses: Array<{
        title: string;
        content: string;
        risk: string;
        severity?: "high" | "medium" | "low";
        legalConcern?: string;
    }>;
    riskMatrix?: {
        financial: { level: "low" | "medium" | "high"; description: string };
        legal: { level: "low" | "medium" | "high"; description: string };
        operational: { level: "low" | "medium" | "high"; description: string };
    };
    negotiationPoints?: Array<{
        priority: "high" | "medium" | "low";
        clause: string;
        suggestion: string;
        reasoning: string;
    }>;
    recommendations: string[];
    disclaimer?: string;
}

const analysisSteps = [
    { icon: FileText, label: "Dokument wird vorbereitet", subtext: "Textextraktion und juristische Strukturanalyse" },
    { icon: Scale, label: "Multi-KI-Prüfung", subtext: "Spezialisierte Algorithmen nach BGB & AGB-Recht" },
    { icon: Shield, label: "Risikobewertung", subtext: "Identifikation kritischer und positiver Klauseln" },
    { icon: CheckCircle2, label: "Expertenbericht", subtext: "Zusammenstellung mit Handlungsempfehlungen" },
];

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Zahlung wird überprüft...");
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (status === "loading") {
            const interval = setInterval(() => {
                setCurrentStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [status]);

    useEffect(() => {
        if (!sessionId) {
            setStatus("error");
            setMessage("Ungültige Sitzung.");
            return;
        }

        const analyzeContract = async () => {
            try {
                console.log("Starting analysis on domain:", window.location.origin);
                setMessage("Vertrag wird analysiert...");

                const text = localStorage.getItem("contract_text");
                const email = localStorage.getItem("user_email");
                const fileId = localStorage.getItem("file_id");

                console.log("Storage check:", {
                    hasText: !!text,
                    textLength: text?.length,
                    email,
                    fileId
                });

                if (!text || !email) {
                    console.error("Missing data in localStorage");
                    throw new Error("Vertragsdaten nicht gefunden.");
                }

                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text, email, fileId }),
                });

                if (!res.ok) throw new Error("Analyse fehlgeschlagen.");

                const data = await res.json();
                setAnalysis(data.analysis);
                setStatus("success");

                // Clear storage
                localStorage.removeItem("contract_text");
                localStorage.removeItem("user_email");
            } catch (error) {
                console.error(error);
                setStatus("error");
                setMessage("Es gab ein Problem bei der Analyse. Bitte kontaktieren Sie den Support.");
            }
        };

        analyzeContract();
    }, [sessionId]);

    if (status === "loading") {
        return (
            <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-xl">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-6 relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse">
                            <Scale className="h-10 w-10 text-white" />
                        </div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-20" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                        Analyse läuft
                    </CardTitle>
                    <p className="text-slate-500 mt-2">
                        Unser Multi-KI-System mit spezialisierten juristischen Algorithmen prüft Ihren Vertrag
                    </p>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        {analysisSteps.map((step, index) => {
                            const StepIcon = step.icon;
                            const isActive = index === currentStep;
                            const isComplete = index < currentStep;

                            return (
                                <div
                                    key={index}
                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${isActive
                                        ? "bg-blue-50 border border-blue-200"
                                        : isComplete
                                            ? "bg-emerald-50 border border-emerald-200"
                                            : "bg-slate-50 border border-slate-100"
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive
                                            ? "bg-blue-100 text-blue-600"
                                            : isComplete
                                                ? "bg-emerald-100 text-emerald-600"
                                                : "bg-slate-100 text-slate-400"
                                            }`}
                                    >
                                        {isComplete ? (
                                            <CheckCircle2 className="w-5 h-5" />
                                        ) : isActive ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <StepIcon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p
                                            className={`font-medium transition-colors ${isActive
                                                ? "text-blue-900"
                                                : isComplete
                                                    ? "text-emerald-900"
                                                    : "text-slate-500"
                                                }`}
                                        >
                                            {step.label}
                                        </p>
                                        <p
                                            className={`text-sm transition-colors ${isActive
                                                ? "text-blue-600"
                                                : isComplete
                                                    ? "text-emerald-600"
                                                    : "text-slate-400"
                                                }`}
                                        >
                                            {step.subtext}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-sm text-slate-500 text-center mt-6">
                        Dies kann bis zu 30 Sekunden dauern
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (status === "error") {
        return (
            <Card className="w-full max-w-md text-center border-0 shadow-2xl">
                <CardHeader>
                    <div className="mx-auto mb-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                    </div>
                    <CardTitle className="text-xl">Ein Fehler ist aufgetreten</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600 mb-6">{message}</p>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">Zurück zur Startseite</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return analysis ? <AnalysisResults analysis={analysis} /> : null;
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
            <Suspense
                fallback={
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse">
                        <Scale className="h-10 w-10 text-white" />
                    </div>
                }
            >
                <SuccessContent />
            </Suspense>
        </div>
    );
}
