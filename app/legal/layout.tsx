import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 py-4">
                <div className="container mx-auto px-4">
                    <Link href="/" className="text-xl font-bold text-slate-900">
                        VertragsKlar
                    </Link>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl prose prose-slate">
                {children}
            </main>
            <Footer />
        </div>
    );
}
