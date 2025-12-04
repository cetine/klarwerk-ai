"use client";

import * as React from "react";
import { UploadCloud, FileText, X, CheckCircle, Shield, Zap, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        // Max 50MB
        if (file.size > 50 * 1024 * 1024) {
            alert("Datei ist zu groß (Max 50MB)");
            return;
        }
        // Allowed types
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

        // Simulate progress
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

            // 1. Upload and extract text
            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadRes.ok) throw new Error("Upload failed");
            const { text } = await uploadRes.json();

            setUploadProgress(95);

            // Save text to localStorage to retrieve after payment
            localStorage.setItem("contract_text", text);
            localStorage.setItem("user_email", email);

            // 2. Create Checkout Session
            const checkoutRes = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, fileId: "temp-id" }),
            });

            if (!checkoutRes.ok) throw new Error("Checkout failed");
            const { url } = await checkoutRes.json();

            setUploadProgress(100);
            clearInterval(progressInterval);

            // Redirect to Stripe
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
            <Card className={cn(
                "border-0 shadow-2xl bg-white/90 backdrop-blur-xl transition-all duration-500",
                isDragging && "scale-[1.02] shadow-3xl"
            )}>
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />

                <CardContent className="p-8">
                    {!file ? (
                        <div
                            className={cn(
                                "relative flex flex-col items-center justify-center py-12 px-6 transition-all duration-300 rounded-2xl cursor-pointer overflow-hidden",
                                isDragging
                                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 scale-[1.01]"
                                    : "bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-[0.03]">
                                <div className="absolute inset-0" style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                }} />
                            </div>

                            {/* Upload Icon with animation */}
                            <div className={cn(
                                "relative mb-6 transition-transform duration-300",
                                isDragging && "scale-110 -translate-y-2"
                            )}>
                                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
                                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
                                    <UploadCloud className={cn(
                                        "w-10 h-10 text-white transition-transform duration-300",
                                        isDragging && "animate-bounce"
                                    )} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {isDragging ? "Jetzt loslassen!" : "Vertrag hochladen"}
                            </h3>
                            <p className="text-sm text-slate-500 text-center mb-2">
                                Ziehen Sie Ihre Datei hierher oder{" "}
                                <span className="text-blue-600 font-medium">durchsuchen</span>
                            </p>
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                <Lock className="w-3 h-3" />
                                PDF, DOCX, TXT • Max 50MB • SSL-verschlüsselt
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
                        <div className="py-4 animate-fadeIn">
                            {/* File Preview Card */}
                            <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-2xl mb-6 border border-emerald-100 overflow-hidden">
                                {/* Success checkmark animation */}
                                <div className="absolute top-3 right-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md animate-ping" />
                                        <CheckCircle className="w-6 h-6 text-emerald-500 relative" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{getFileIcon(file.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-emerald-600 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            Bereit zur Analyse
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={removeFile}
                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-slate-700 mb-2"
                                    >
                                        Wohin sollen wir die Analyse senden?
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all bg-white hover:border-slate-300 pr-10"
                                            placeholder="ihre@email.de"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {email && email.includes("@") && (
                                            <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                                        )}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <Button
                                    type="submit"
                                    className={cn(
                                        "relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-7 text-lg rounded-xl shadow-lg transition-all duration-300 overflow-hidden",
                                        isUploading && "opacity-90"
                                    )}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center">
                                            <span>Dokument wird vorbereitet...</span>
                                            <div className="w-48 h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className="h-full bg-white rounded-full transition-all duration-300"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Zap className="w-5 h-5" />
                                            Jetzt analysieren • €3,99
                                        </span>
                                    )}
                                </Button>

                                {/* Trust Indicators */}
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <Lock className="w-3.5 h-3.5" />
                                        <span>Sichere Zahlung</span>
                                    </div>
                                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <Shield className="w-3.5 h-3.5" />
                                        <span>DSGVO-konform</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Features below the card */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                    { icon: "⚡", label: "30 Sek.", sublabel: "Schnelle Analyse" },
                    { icon: "🔒", label: "Auto-Löschung", sublabel: "Nach 24 Stunden" },
                    { icon: "🏛️", label: "BGB-konform", sublabel: "Deutsche Standards" },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="text-center p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300"
                    >
                        <div className="text-2xl mb-1">{feature.icon}</div>
                        <div className="text-sm font-semibold text-slate-800">{feature.label}</div>
                        <div className="text-xs text-slate-500">{feature.sublabel}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
