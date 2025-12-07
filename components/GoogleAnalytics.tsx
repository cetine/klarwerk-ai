"use client";

import Script from "next/script";

// Replace these with your actual IDs from Google Ads/Analytics
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

// Extend window type for gtag
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

export function GoogleAnalytics() {
    // Don't render if no IDs are configured
    if (!GA_MEASUREMENT_ID && !GOOGLE_ADS_ID) {
        return null;
    }

    const trackingId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}');` : ''}
                    ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
                `}
            </Script>
        </>
    );
}

// Conversion tracking function - call this after successful purchase
export function trackConversion(value: number = 3.99, currency: string = "EUR") {
    const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
    const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

    if (typeof window !== "undefined" && window.gtag) {
        // Google Ads Conversion
        if (conversionId && conversionLabel) {
            window.gtag("event", "conversion", {
                send_to: `${conversionId}/${conversionLabel}`,
                value: value,
                currency: currency,
            });
        }

        // Also track as a GA4 event
        window.gtag("event", "purchase", {
            transaction_id: Date.now().toString(),
            value: value,
            currency: currency,
            items: [
                {
                    item_name: "Vertragsanalyse",
                    price: value,
                    quantity: 1,
                },
            ],
        });
    }
}

// Track page views (optional, gtag does this automatically)
export function trackPageView(url: string) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
}
