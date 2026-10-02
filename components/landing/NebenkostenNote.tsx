"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { nebenkostenNinjaUrl } from "@/lib/crosssell";

const SEEN_KEY = "vk_nk_note_seen";
const TRIGGER_SECTION_ID = "faq";

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

/**
 * Margin note pointing to Nebenkosten-Ninja. Appears once per visitor, after the visitor has
 * scrolled past the price into the FAQ, so it never competes with the offer itself.
 * Waits for the cookie decision because the consent banner occupies the same corner.
 */
export function NebenkostenNote() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (readStorage(SEEN_KEY)) return;
        const section = document.getElementById(TRIGGER_SECTION_ID);
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || readStorage("cookie_consent") === null) return;
                writeStorage(SEEN_KEY, "1");
                setOpen(true);
                observer.disconnect();
            },
            { rootMargin: "0px 0px -35% 0px" }
        );
        observer.observe(section);
        return () => observer.disconnect();
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
            className="vk-note vk-sheet fixed inset-x-4 bottom-4 z-40 p-5 pr-12 md:inset-x-auto md:right-8 md:bottom-8 md:w-[22rem]"
        >
            <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Hinweis schließen"
                className="absolute right-1 top-1 inline-flex size-11 items-center justify-center text-ink-soft hover:text-ink"
            >
                <X className="size-4" aria-hidden />
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Randnotiz</p>
            <p className="vk-narrow vk-balance mt-2 text-[1.375rem] font-bold leading-[1.15] tracking-[-0.01em]">
                Ihr Mietvertrag ist nur die halbe Miete.
            </p>
            <p className="mt-2 text-[0.9375rem] leading-[1.45] text-ink-soft">
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
                className="vk-press mt-4 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-ink"
            >
                <span className="vk-link">Zu Nebenkosten-Ninja</span>
                <span className="vk-arrow" aria-hidden>
                    →
                </span>
            </a>
        </aside>
    );
}
