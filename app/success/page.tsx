"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Zahlung wird überprüft...");

    useEffect(() => {
        if (!sessionId) {
            setStatus("error");
            setMessage("Ungültige Sitzung.");
            return;
        }

        const analyzeContract = async () => {
            try {
                console.log("Starting analysis on domain:", window.location.origin);
                setMessage("Vertrag wird analysiert... Dies kann bis zu 30 Sekunden dauern.");

                const text = localStorage.getItem("contract_text");
                const email = localStorage.getItem("user_email");

                console.log("Storage check:", {
                    hasText: !!text,
                    textLength: text?.length,
                    email
                });

                if (!text || !email) {
                    console.error("Missing data in localStorage");
                    throw new Error("Vertragsdaten nicht gefunden.");
                }

                const res = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text, email }),
                });

                if (!res.ok) throw new Error("Analyse fehlgeschlagen.");

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

    return (
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <div className="mx-auto mb-4">
                    {status === "loading" && (
                        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    )}
                    {status === "success" && (
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    )}
                    {status === "error" && (
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    )}
                </div>
                <CardTitle>
                    {status === "loading" && "Einen Moment bitte"}
                    {status === "success" && "Analyse erfolgreich!"}
                    {status === "error" && "Ein Fehler ist aufgetreten"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-slate-600 mb-6">{message}</p>

                {status === "success" && (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500">
                            Wir haben die Analyse an Ihre E-Mail-Adresse gesendet.
                            Bitte überprüfen Sie auch Ihren Spam-Ordner.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/">Zurück zur Startseite</Link>
                        </Button>
                    </div>
                )}

                {status === "error" && (
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">Zurück</Link>
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="h-12 w-12 text-blue-600 animate-spin" />}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
