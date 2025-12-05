import { Hero } from "@/components/Hero";
import { AICouncil } from "@/components/AICouncil";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <PromoBanner />
      <Hero />
      <AICouncil />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}

