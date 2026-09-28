import { cn } from "@/lib/utils";

export type Risk = "red" | "yellow" | "green";

export const RISK_LABEL: Record<Risk, string> = {
    red: "kritisch",
    yellow: "prüfen",
    green: "in Ordnung",
};

type MarkerProps = {
    risk: Risk;
    children: React.ReactNode;
    /** Draw the highlight once on first view; delay in ms. */
    drawDelay?: number;
    /** Draw when the surrounding [data-reveal] block scrolls into view. */
    drawOnView?: boolean;
    className?: string;
};

export function Marker({ risk, children, drawDelay, drawOnView, className }: MarkerProps) {
    const draws = drawDelay !== undefined;
    return (
        <mark
            data-risk={risk}
            data-draw-on-view={drawOnView || undefined}
            className={cn("vk-mark", draws && "vk-draw", className)}
            style={draws ? ({ "--d": `${drawDelay}ms` } as React.CSSProperties) : undefined}
        >
            {children}
            <span className="sr-only"> (markiert: {RISK_LABEL[risk]})</span>
        </mark>
    );
}

export function RiskLegend({ className }: { className?: string }) {
    const risks: Risk[] = ["red", "yellow", "green"];
    return (
        <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft", className)}>
            {risks.map((risk) => (
                <li key={risk} className="flex items-center gap-2">
                    <span
                        aria-hidden
                        className="vk-swatch"
                        style={{ "--m": `var(--color-marker-${risk})` } as React.CSSProperties}
                    />
                    {RISK_LABEL[risk]}
                </li>
            ))}
        </ul>
    );
}
