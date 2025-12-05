import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]/50 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 text-[#1d1d1f] hover:text-[#0071e3] transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xl font-semibold tracking-tight">VertragsKlar</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm text-[#86868b]">
                            <Link href="/legal/impressum" className="hover:text-[#1d1d1f] transition-colors">Impressum</Link>
                            <Link href="/legal/datenschutz" className="hover:text-[#1d1d1f] transition-colors">Datenschutz</Link>
                            <Link href="/legal/agb" className="hover:text-[#1d1d1f] transition-colors">AGB</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
