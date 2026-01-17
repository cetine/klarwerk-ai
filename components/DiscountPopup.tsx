"use client";

import * as React from "react";
import { X, Copy, Gift, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DiscountPopup() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isDismissed, setIsDismissed] = React.useState(false);
    const [timePassed, setTimePassed] = React.useState(false);
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    // Track time (5 seconds)
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setTimePassed(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Track scroll (> 100px)
    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setHasScrolled(true);
            }
        };

        // Initial check
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manage visibility
    React.useEffect(() => {
        if (timePassed && hasScrolled && !isDismissed) {
            setIsVisible(true);
        }
    }, [timePassed, hasScrolled, isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("Analyse20");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="glass-panel p-6 rounded-3xl shadow-2xl max-w-sm border border-white/20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0071e3]/10 rounded-full blur-3xl" />

                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-[#86868b] hover:text-[#1d1d1f] transition-colors p-1"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0 text-[#0071e3]">
                        <Gift className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-semibold text-[#1d1d1f] text-lg">
                            20% Rabatt für Sie!
                        </h3>
                        <p className="text-[#86868b] text-sm leading-relaxed mb-4">
                            Sichern Sie sich jetzt 20% Rabatt auf Ihre erste Vertragsanalyse.
                        </p>

                        <div
                            onClick={handleCopy}
                            className="flex items-center gap-3 bg-[#f5f5f7] p-1.5 pl-4 rounded-xl cursor-pointer hover:bg-[#e8e8ed] transition-colors group border border-[#d2d2d7]/50"
                        >
                            <code className="text-[#1d1d1f] font-semibold text-sm tracking-wide">
                                Analyse20
                            </code>
                            <div className="ml-auto bg-white shadow-sm rounded-lg px-3 py-1.5 text-xs font-medium text-[#1d1d1f] flex items-center gap-1.5 min-w-[90px] justify-center">
                                {copied ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-[#34c759]" />
                                        Kopiert
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5 text-[#86868b] group-hover:text-[#0071e3] transition-colors" />
                                        Kopieren
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
