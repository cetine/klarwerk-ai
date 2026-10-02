"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { nebenkostenNinjaUrl } from "@/lib/crosssell";
import { CONSENT_DECIDED_EVENT } from "@/components/ConsentBanner";

const SEEN_KEY = "vk_nk_note_seen";
const SCROLL_TRIGGER_PX = 300;
const TIME_TRIGGER_MS = 6000;

function readStorage(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeStorage(key: string, value: string): void {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Blocked storage only means the note may show again; nothing else depends on it.
    }
}

function isTypingInForm(): boolean {
    return document.activeElement?.closest("form") != null;
}

/**
 * Margin note pointing to Nebenkosten-Ninja. Appears once per visitor, after a short scroll or
 * a few seconds on the page, whichever comes first. It then still waits for the cookie decision
 * (the consent banner occupies the same corner) and for the visitor to leave the upload form.
 */
export function NebenkostenNote() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (readStorage(SEEN_KEY)) return;
        let triggered = false;

        const tryOpen = () => {
            if (!triggered || readStorage("cookie_consent") === null || isTypingInForm()) return;
            writeStorage(SEEN_KEY, "1");
            setOpen(true);
            cleanup();
        };
        const trigger = () => {
            triggered = true;
            tryOpen();
        };
        const onScroll = () => {
            if (window.scrollY >= SCROLL_TRIGGER_PX) trigger();
            else tryOpen();
        };
        // Focus moves on after the form handler ran; check once it has settled.
        const onFocusOut = () => setTimeout(tryOpen, 0);

        const timer = setTimeout(trigger, TIME_TRIGGER_MS);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener(CONSENT_DECIDED_EVENT, tryOpen);
        document.addEventListener("focusout", onFocusOut);
        function cleanup() {
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener(CONSENT_DECIDED_EVENT, tryOpen);
            document.removeEventListener("focusout", onFocusOut);
        }
        return cleanup;
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    if (!open) return null;

    return (
        <aside
            aria-label="Hinweis auf Nebenkosten-Ninja"
            className="vk-note vk-sheet fixed inset-x-4 bottom-4 z-40 p-4 pr-12 md:inset-x-auto md:p-5 md:pr-12 md:right-8 md:bottom-8 md:w-[22rem]"
        >
            <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Hinweis schließen"
                className="absolute right-1 top-1 inline-flex size-11 items-center justify-center text-ink-soft hover:text-ink"
            >
                <X className="size-4" aria-hidden />
            </button>
            <p className="hidden text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft md:block">Randnotiz</p>
            <p className="vk-narrow vk-balance text-[1.1875rem] md:mt-2 md:text-[1.375rem] font-bold leading-[1.15] tracking-[-0.01em]">
                Ihr Mietvertrag ist nur die halbe Miete.
            </p>
            <p className="mt-1.5 text-sm leading-[1.45] text-ink-soft md:mt-2 md:text-[0.9375rem]">
                Die andere Hälfte steckt in der{" "}
                <mark className="vk-mark vk-mark-word vk-draw text-ink" style={{ "--d": "450ms" } as React.CSSProperties}>
                    Nebenkostenabrechnung
                </mark>
                . Die prüft unser Schwesterprodukt kostenlos.
            </p>
            <a
                href={nebenkostenNinjaUrl("popup")}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="vk-press mt-1 inline-flex min-h-11 md:mt-3 items-center gap-2 text-[0.9375rem] font-semibold text-ink"
            >
                <span className="vk-link">Zu Nebenkosten-Ninja</span>
                <span className="vk-arrow" aria-hidden>
                    →
                </span>
            </a>
        </aside>
    );
}
