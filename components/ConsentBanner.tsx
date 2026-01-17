"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConsentBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie_consent");
        if (consent === null) {
            setShowBanner(true);
        } else if (consent === "granted") {
            // Restore consent if previously granted
            updateConsent("granted");
        }
    }, []);

    const updateConsent = (status: "granted" | "denied") => {
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("consent", "update", {
                ad_storage: status,
                analytics_storage: status,
                ad_user_data: status,
                ad_personalization: status,
            });
        }
    };

    const handleAccept = () => {
        updateConsent("granted");
        localStorage.setItem("cookie_consent", "granted");
        setShowBanner(false);
    };

    const handleDecline = () => {
        updateConsent("denied");
        localStorage.setItem("cookie_consent", "denied");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-[#d2d2d7] animate-in slide-in-from-bottom-full duration-500">
            <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-2">
                    <h3 className="text-lg font-semibold text-[#1d1d1f]">
                        Wir respektieren Ihre Privatsphäre
                    </h3>
                    <p className="text-sm text-[#86868b] max-w-2xl leading-relaxed">
                        Wir nutzen Cookies und ähnliche Technologien, um Ihnen ein optimales Erlebnis zu bieten
                        und unsere Dienste zu verbessern. Sie können Ihre Einwilligung jederzeit widerrufen.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                        variant="ghost"
                        onClick={handleDecline}
                        className="rounded-full px-6 hover:bg-[#1d1d1f]/5 text-[#1d1d1f]"
                    >
                        Ablehnen
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="rounded-full px-8 bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium transition-all"
                    >
                        Alle akzeptieren
                    </Button>
                </div>
            </div>
        </div>
    );
}
