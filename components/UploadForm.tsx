"use client";

import * as React from "react";
import { UploadCloud, FileText, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function UploadForm() {
    const [isDragging, setIsDragging] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);
    const [email, setEmail] = React.useState("");
    const [isUploading, setIsUploading] = React.useState(false);
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

            // Redirect to Stripe
            window.location.href = url;
        } catch (error) {
            console.error(error);
            alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="border-2 border-dashed border-slate-200 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                    {!file ? (
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center py-10 px-4 transition-colors duration-200 rounded-lg cursor-pointer",
                                isDragging ? "bg-blue-50 border-blue-200" : "hover:bg-slate-50"
                            )}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="bg-blue-100 p-4 rounded-full mb-4">
                                <UploadCloud className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                Vertrag hier ablegen
                            </h3>
                            <p className="text-sm text-slate-500 text-center mb-4">
                                oder klicken zum Auswählen
                            </p>
                            <p className="text-xs text-slate-400">
                                PDF, DOCX, TXT bis 50MB
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
                        <div className="py-6">
                            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <div className="bg-blue-100 p-2 rounded">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-sm font-medium text-slate-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={removeFile}
                                    className="text-slate-400 hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-slate-700 mb-1"
                                    >
                                        E-Mail für die Analyse
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="ihre@email.de"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        "Wird verarbeitet..."
                                    ) : (
                                        <>
                                            Jetzt prüfen für <span className="ml-1">€3,99</span>
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-center text-slate-400 mt-2">
                                    Sichere Zahlung via Stripe. Geld-zurück-Garantie.
                                </p>
                            </form>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
