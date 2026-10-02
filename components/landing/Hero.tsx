import { UploadForm } from "@/components/UploadForm";
import { ContractSheet } from "./ContractSheet";
import { TrustFacts } from "./TrustFacts";
import { PRICE_LABEL } from "@/lib/pricing";

export function Hero() {
    return (
        <section id="pruefen" className="mx-auto max-w-[1200px] scroll-mt-4 px-4 pb-20 pt-7 md:px-8 md:pb-28 md:pt-16">
            <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
                <div className="max-w-[36rem]">
                    <h1 className="vk-narrow vk-balance text-[clamp(2.5rem,5.2vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.025em]">
                        Wissen, was Sie unterschreiben.
                    </h1>
                    <p className="mt-5 text-[1.1875rem] leading-[1.55] text-ink-soft">
                        Laden Sie Ihren Miet-, Arbeits- oder Kaufvertrag hoch. Nach wenigen Minuten sehen Sie, welche
                        Klauseln problematisch sein können: zitiert aus Ihrem Vertrag, mit Paragraph und einer Erklärung
                        in verständlichem Deutsch.
                    </p>

                    <div className="vk-sheet mt-7 px-5 pt-5 sm:px-7 sm:pt-6">
                        <div className="mb-4 flex items-baseline justify-between gap-4">
                            <h2 className="vk-narrow text-[1.375rem] font-bold leading-none">Vertrag prüfen lassen</h2>
                            <p className="shrink-0 text-[0.9375rem] font-semibold">{PRICE_LABEL} einmalig</p>
                        </div>
                        <UploadForm />
                        <TrustFacts className="-mx-5 mt-6 px-5 sm:-mx-7 sm:px-7 lg:hidden" />
                        <div className="hidden pb-6 lg:block" />
                    </div>
                </div>

                <div>
                    <ContractSheet />
                    <TrustFacts row className="mt-8 hidden lg:grid" />
                </div>
            </div>
        </section>
    );
}
