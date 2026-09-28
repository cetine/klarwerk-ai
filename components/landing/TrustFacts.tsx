import { Clock, MapPin, ShieldCheck, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const FACTS = [
    { icon: ShieldCheck, title: "DSGVO-konform", text: "Verschlüsselte Übertragung" },
    { icon: Clock, title: "Auto-Löschung", text: "Nach 24 Stunden" },
    { icon: MapPin, title: "Serverstandort", text: "Deutschland" },
    { icon: Scale, title: "Made in Germany", text: "Nach deutschem Recht" },
];

export function TrustFacts({ className, row = false }: { className?: string; row?: boolean }) {
    if (row) {
        return (
            <ul className={cn("grid grid-cols-2 border-y border-ink", className)}>
                {FACTS.map(({ icon: Icon, title, text }, index) => (
                    <li key={title} className={cn("flex items-start gap-3 border-rule py-4", index % 2 === 1 && "border-l pl-5", index < 2 && "border-b")}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} aria-hidden />
                        <span className="leading-[1.3]">
                            <span className="block text-[0.9375rem] font-semibold text-ink">{title}</span>
                            <span className="block text-sm text-ink-soft">{text}</span>
                        </span>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <ul className={cn("grid grid-cols-2 border-t border-rule", className)}>
            {FACTS.map(({ icon: Icon, title, text }, index) => (
                <li
                    key={title}
                    className={cn(
                        "flex items-start gap-3 border-rule py-4",
                        index % 2 === 0 ? "border-r pr-4" : "pl-4",
                        index < 2 && "border-b"
                    )}
                >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink" strokeWidth={1.75} aria-hidden />
                    <span className="leading-[1.3]">
                        <span className="block text-[0.9375rem] font-semibold text-ink">{title}</span>
                        <span className="block text-sm text-ink-soft">{text}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
}
