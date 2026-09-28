"use client";

import { useEffect } from "react";

/**
 * Arms every [data-reveal] element that starts below the fold and marks it
 * visible once it scrolls in. Without JS (or above the fold) nothing is hidden.
 */
export function RevealObserver() {
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        const belowFold = elements.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
        if (belowFold.length === 0 || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    entry.target.setAttribute("data-visible", "");
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -12% 0px" }
        );

        for (const el of belowFold) {
            el.setAttribute("data-armed", "");
            observer.observe(el);
        }
        return () => observer.disconnect();
    }, []);

    return null;
}
