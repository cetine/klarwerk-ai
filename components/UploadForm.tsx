"use client";

import * as React from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 50 * 1024 * 1024;
const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Short horizontal shake: "this field needs you". Feedback on a real error only. */
function shake(el: HTMLElement | null) {
    if (!el || prefersReducedMotion()) return;
    el.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-6px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(0)" },
        ],
        { duration: 320, easing: EASE_IN_OUT }
    );
}

/** One soft swell of the pay button once a file is ready: the next step is here. */
function announceReady(el: HTMLElement | null) {
    if (!el) return;
    el.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    if (prefersReducedMotion()) return;
    el.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
        { duration: 420, easing: EASE_OUT, delay: 180 }
    );
}

function formatSize(bytes: number) {
    return bytes < 1024 * 1024
        ? `${Math.max(1, Math.round(bytes / 1024))} KB`
        : `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function fileProblem(file: File): string | null {
    if (file.size > MAX_BYTES) return "Die Datei ist größer als 50 MB. Bitte eine kleinere Datei wählen.";
    if (!ALLOWED_TYPES.includes(file.type)) return "Dieses Format können wir nicht lesen. Bitte PDF, DOC, DOCX oder TXT hochladen.";
    return null;
}

export function UploadForm() {
    const [isDragging, setIsDragging] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);
    const [email, setEmail] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [invalidField, setInvalidField] = React.useState<"file" | "email" | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const fileButtonRef = React.useRef<HTMLButtonElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const submitRef = React.useRef<HTMLButtonElement>(null);
    const fileCardRef = React.useRef<HTMLDivElement>(null);

    const acceptFile = (candidate: File) => {
        const problem = fileProblem(candidate);
        setError(problem);
        if (problem) {
            shake(fileButtonRef.current ?? fileCardRef.current);
            return;
        }
        setFile(candidate);
        requestAnimationFrame(() => announceReady(submitRef.current));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) acceptFile(dropped);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const picked = e.target.files?.[0];
        if (picked) acceptFile(picked);
    };

    const removeFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError("Bitte zuerst Ihren Vertrag auswählen.");
            setInvalidField("file");
            fileButtonRef.current?.focus();
            shake(fileButtonRef.current);
            return;
        }
        if (!EMAIL_PATTERN.test(email.trim())) {
            setError("Bitte eine vollständige E-Mail-Adresse eingeben, z. B. name@beispiel.de.");
            setInvalidField("email");
            emailRef.current?.focus();
            shake(emailRef.current);
            return;
        }
        setInvalidField(null);

        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
            if (!uploadRes.ok) throw new Error("upload");
            const { text, fileId } = await uploadRes.json();

            localStorage.setItem("contract_text", text);
            localStorage.setItem("user_email", email.trim());
            if (fileId) localStorage.setItem("file_id", fileId);

            const checkoutRes = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Only bind the payment to a real stored file; /api/analyze rejects a session whose fileId does not match.
                body: JSON.stringify({ email: email.trim(), ...(fileId ? { fileId } : {}) }),
            });
            if (!checkoutRes.ok) throw new Error("checkout");
            const { url } = await checkoutRes.json();

            window.location.href = url;
        } catch (err) {
            console.error(err);
            const step = err instanceof Error ? err.message : "";
            setError(
                step === "upload"
                    ? "Die Datei konnte nicht gelesen werden. Ist es eine eingescannte PDF ohne Text? Bitte eine andere Datei versuchen."
                    : "Die Zahlungsseite konnte nicht geöffnet werden. Bitte noch einmal versuchen. Es wurde nichts abgebucht."
            );
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                id="contract-file"
                className="sr-only"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                tabIndex={-1}
                aria-hidden
            />

            {!file ? (
                <button
                    type="button"
                    ref={fileButtonRef}
                    aria-invalid={invalidField === "file" || undefined}
                    aria-describedby={invalidField === "file" ? "upload-error" : undefined}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                        "vk-dropzone flex w-full flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed px-5 py-7 text-center transition-colors sm:py-9",
                        isDragging ? "border-ink bg-desk" : "border-ink/60 bg-desk/60 hover:border-ink hover:bg-desk"
                    )}
                >
                    <span className="vk-nudge flex h-14 w-14 items-center justify-center rounded-md bg-ink text-sheet">
                        <Upload className="h-6 w-6" aria-hidden />
                    </span>
                    <span>
                        <span className="block text-[1.1875rem] font-bold text-ink">
                            {isDragging ? "Loslassen zum Hochladen" : "Vertrag auswählen"}
                        </span>
                        <span className="mt-1 block text-sm text-ink-soft">
                            oder hierher ziehen · PDF, DOC, DOCX, TXT · bis 50 MB
                        </span>
                    </span>
                </button>
            ) : (
                <div ref={fileCardRef} className="flex items-center gap-4 rounded-md border border-ink bg-sheet px-5 py-4">
                    <FileText className="h-6 w-6 shrink-0 text-ink" aria-hidden />
                    <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink">{file.name}</p>
                        <p className="text-sm text-ink-soft">{formatSize(file.size)} · bereit</p>
                    </div>
                    <button
                        type="button"
                        onClick={removeFile}
                        disabled={isSubmitting}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-desk hover:text-ink disabled:opacity-40"
                        aria-label="Datei entfernen"
                    >
                        <X className="h-5 w-5" aria-hidden />
                    </button>
                </div>
            )}

            <div className="mt-4">
                <label htmlFor="email" className="block text-[0.9375rem] font-semibold text-ink">
                    E-Mail-Adresse <span className="font-normal text-ink-soft">(für die Zahlungsquittung)</span>
                </label>
                <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    aria-invalid={invalidField === "email" || undefined}
                    aria-describedby={invalidField === "email" ? "upload-error" : undefined}
                    autoComplete="email"
                    inputMode="email"
                    required
                    placeholder="name@beispiel.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 h-[52px] w-full rounded-md border border-ink-soft bg-sheet px-4 text-base text-ink placeholder:text-ink-soft/80 focus:border-ink"
                />
            </div>

            {error && (
                <p id="upload-error" role="alert" className="mt-4 text-[0.9375rem] font-medium text-ink">
                    <span className="vk-mark" data-risk="red">Hinweis:</span> {error}
                </p>
            )}

            <button
                type="submit"
                ref={submitRef}
                disabled={isSubmitting}
                className="vk-press mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-md bg-ink px-6 text-[1.0625rem] font-semibold text-sheet hover:bg-action-hover disabled:cursor-wait disabled:bg-action-hover"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                        Datei wird gelesen …
                    </>
                ) : (
                    <>
                        Prüfen lassen <span className="font-normal opacity-80">·</span> 3,99 €
                        <span aria-hidden className="vk-arrow">→</span>
                    </>
                )}
            </button>

            <p className="mt-3 text-sm leading-[1.45] text-ink-soft">
                Kein Konto, kein Abo. Erst Upload, dann Zahlung über Stripe, danach erscheint Ihr Bericht hier im Browser.{" "}
                <a href="/legal/agb" className="underline underline-offset-2 hover:text-ink">AGB</a>
                {" · "}
                <a href="/legal/datenschutz" className="underline underline-offset-2 hover:text-ink">Datenschutz</a>
            </p>
        </form>
    );
}
