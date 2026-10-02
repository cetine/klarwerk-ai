import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { SampleReport } from "@/components/landing/SampleReport";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Comparison } from "@/components/landing/Comparison";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/landing/RevealObserver";
import { NebenkostenNote } from "@/components/landing/NebenkostenNote";

/*
THESIS: The page is the product's output. A marked-up contract proves what 4,99 € buys; it refuses the AI-SaaS page of badges and icon grids; trust facts and the expert council are shown as document artifacts (fact row, Umlaufzettel), not tiles.
OWN-WORLD: White A4 sheets on a cool grey desk, black ink, highlighter swipes (red/yellow/green = risk), pencil-style margin notes. Archivo narrowed for headings, Tinos only for contract text. No blue, no gradients, no cards.
STORY: A tenant sees their kind of clause flagged with a § and a plain-German consequence, understands the order upload → Stripe → report, sees the limits stated honestly, uploads.
FIRST VIEWPORT: Left: headline, one paragraph, price line, upload form with the price on the button. Right: a contract page whose risky phrases get highlighted on load, notes in the margin. Phones: upload first, sheet below.
FORM: "Die Randnotiz", user-pinned direction; staging: document-as-hero. No seed roll (pinned).
*/
export default function Home() {
    return (
        <div className="vk min-h-screen">
            <SiteHeader />
            <main>
                <Hero />
                <SampleReport />
                <HowItWorks />
                <Comparison />
                <Pricing />
                <FAQ />
            </main>
            <Footer />
            <RevealObserver />
            <NebenkostenNote />
        </div>
    );
}
