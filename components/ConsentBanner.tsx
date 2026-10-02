"use client";

import { useState, useEffect } from "react";

/** Fired on window once the visitor accepts or declines, so other corner UI can wait for it. */
export const CONSENT_DECIDED_EVENT = "vk:consent-decided";

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
        window.dispatchEvent(new Event(CONSENT_DECIDED_EVENT));
    };

    const handleDecline = () => {
        updateConsent("denied");
        localStorage.setItem("cookie_consent", "denied");
        setShowBanner(false);
        window.dispatchEvent(new Event(CONSENT_DECIDED_EVENT));
    };

    if (!showBanner) return null;

    return (
        <div
            role="region"
            aria-label="Cookie-Einstellungen"
            className="vk fixed inset-x-0 bottom-0 z-50 border-t border-ink bg-sheet px-4 py-3 md:px-8 md:py-4"
        >
            <div className="mx-auto flex max-w-[1200px] flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
                <p className="max-w-[62ch] text-sm leading-[1.45] text-ink-soft">
                    Google Analytics nur mit Ihrer Einwilligung, jederzeit widerrufbar.{" "}
                    <a href="/legal/datenschutz" className="underline underline-offset-2 hover:text-ink">
                        Datenschutz
                    </a>
                </p>
                <div className="grid shrink-0 grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={handleDecline}
                        className="vk-press inline-flex min-h-11 items-center justify-center rounded-md border border-ink px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-desk"
                    >
                        Ablehnen
                    </button>
                    <button
                        type="button"
                        onClick={handleAccept}
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-ink bg-ink px-5 text-[0.9375rem] font-semibold text-sheet transition-colors hover:bg-action-hover"
                    >
                        Akzeptieren
                    </button>
                </div>
            </div>
        </div>
    );
}
