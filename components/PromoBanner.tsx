"use client";

import { Tag, X } from "lucide-react";
import { useState, useEffect } from "react";

export function PromoBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        // Check if offer has expired
        const expiryDate = new Date("2026-01-01T00:00:00");
        if (new Date() >= expiryDate) {
            setIsExpired(true);
        }
    }, []);

    if (!isVisible || isExpired) return null;

    return (
        <div className="relative bg-gradient-to-r from-[#ff375f] via-[#ff6b35] to-[#ff375f] bg-[length:200%_100%] animate-gradient text-white py-3 px-4">
            <div className="container mx-auto flex items-center justify-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-3 flex-wrap justify-center">
                    <div className="flex items-center gap-2 font-semibold">
                        <Tag className="w-4 h-4" />
                        <span>🎄 Weihnachtsaktion:</span>
                    </div>
                    <span className="font-medium">
                        Vertragsanalyse für nur <span className="font-bold">€0,99</span>{" "}
                        <span className="text-white/80 line-through">€3,99</span>
                    </span>
                    <span className="hidden md:inline text-white/90">|</span>
                    <span className="flex items-center gap-2">
                        Code: <code className="bg-white/20 px-2 py-0.5 rounded font-bold tracking-wider">Gutschein2025</code>
                    </span>
                    <span className="hidden sm:inline text-white/80 text-xs">• Gültig bis 01.01.2026</span>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Banner schließen"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
