"use client";

import * as React from "react";
import { UploadCloud, FileText, X, CheckCircle, Shield, Zap, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function UploadForm() {
    const [isDragging, setIsDragging] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);
    const [email, setEmail] = React.useState("");
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (file: File) => {
        if (file.size > 50 * 1024 * 1024) {
            alert("Datei ist zu groß (Max 50MB)");
            return;
        }
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
        ];
        if (!allowedTypes.includes(file.type)) {
            alert("Ungültiges Dateiformat. Bitte PDF, DOC, DOCX oder TXT hochladen.");
            return;
        }
        setFile(file);
    };

    const removeFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !email) return;

        setIsUploading(true);
        setUploadProgress(0);

        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Upload failed");
            const { text } = await uploadRes.json();

            setUploadProgress(95);
            localStorage.setItem("contract_text", text);
            localStorage.setItem("user_email", email);

            const checkoutRes = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, fileId: "temp-id" }),
            });

            if (!checkoutRes.ok) throw new Error("Checkout failed");
            const { url } = await checkoutRes.json();

            setUploadProgress(100);
            clearInterval(progressInterval);
            window.location.href = url;
        } catch (error) {
            console.error(error);
            clearInterval(progressInterval);
            alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const getFileIcon = (type: string) => {
        if (type.includes("pdf")) return "📄";
        if (type.includes("word") || type.includes("document")) return "📝";
        if (type.includes("text")) return "📃";
        return "📎";
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Apple-style card with glass effect */}
            <div className={cn(
                "glass-panel rounded-3xl transition-all duration-500 overflow-hidden",
                isDragging && "scale-[1.02]"
            )}>
                <div className="p-8">
                    {!file ? (
                        <div
                            className={cn(
                                "relative flex flex-col items-center justify-center py-14 px-6 transition-all duration-500 rounded-2xl cursor-pointer",
                                isDragging
                                    ? "bg-[#0071e3]/5 border-2 border-[#0071e3]/30"
                                    : "bg-[#f5f5f7] border-2 border-dashed border-[#d2d2d7] hover:border-[#0071e3]/40 hover:bg-[#0071e3]/[0.02]"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {/* Upload Icon */}
                            <div className={cn(
                                "relative mb-6 transition-all duration-500",
                                isDragging && "scale-110 -translate-y-2"
                            )}>
                                <div className="w-16 h-16 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0071e3]/25">
                                    <UploadCloud className={cn(
                                        "w-8 h-8 text-white transition-transform duration-300",
                                        isDragging && "animate-bounce"
                                    )} />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">
                                {isDragging ? "Jetzt loslassen" : "Vertrag hochladen"}
                            </h3>
                            <p className="text-[#86868b] text-center mb-2 text-sm">
                                Ziehen Sie Ihre Datei hierher oder{" "}
                                <span className="text-[#0071e3] font-medium">durchsuchen</span>
                            </p>
                            <p className="text-xs text-[#86868b]/60 flex items-center gap-2">
                                PDF, DOCX, TXT • Max 50MB
                            </p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileChange}
                            />
                        </div>
                    ) : (
                        <div className="animate-fadeIn">
                            {/* File Preview */}
                            <div className="relative bg-[#34c759]/5 p-5 rounded-2xl mb-6 border border-[#34c759]/20">
                                <div className="absolute top-4 right-4">
                                    <CheckCircle className="w-5 h-5 text-[#34c759]" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{getFileIcon(file.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#1d1d1f] truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-[#34c759] flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            Bereit zur Analyse
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={removeFile}
                                        className="text-[#86868b] hover:text-[#ff3b30] hover:bg-[#ff3b30]/10 rounded-full transition-all duration-300"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[#1d1d1f] mb-2"
                                    >
                                        Wohin sollen wir die Analyse senden?
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-4 bg-[#f5f5f7] border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071e3] text-[#1d1d1f] text-base transition-all duration-300 placeholder:text-[#86868b]"
                                            placeholder="ihre@email.de"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {email && email.includes("@") && (
                                            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#34c759]" />
                                        )}
                                    </div>
                                </div>

                                {/* CTA Button - Apple style */}
                                <Button
                                    type="submit"
                                    className={cn(
                                        "w-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold py-7 text-lg rounded-xl transition-all duration-300",
                                        isUploading && "opacity-90"
                                    )}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <span>Wird vorbereitet...</span>
                                            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-white rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Zap className="w-5 h-5" />
                                            Jetzt analysieren · €3,99
                                        </span>
                                    )}
                                </Button>

                                {/* Trust Indicators */}
                                <div className="flex items-center justify-center gap-6 pt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                                        <Lock className="w-3.5 h-3.5" />
                                        <span>Sichere Zahlung</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
                                        <Shield className="w-3.5 h-3.5" />
                                        <span>DSGVO-konform</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Features below */}
            <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                    { icon: "⚡", label: "< 2 Minuten", sublabel: "Schnelle Analyse" },
                    { icon: "🔒", label: "Auto-Löschung", sublabel: "Nach 24 Stunden" },
                    { icon: "🇩🇪", label: "Made in Germany", sublabel: "Deutsche Standards" },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#d2d2d7]/50 hover-lift"
                    >
                        <div className="text-2xl mb-1">{feature.icon}</div>
                        <div className="text-sm font-semibold text-[#1d1d1f]">{feature.label}</div>
                        <div className="text-xs text-[#86868b]">{feature.sublabel}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
