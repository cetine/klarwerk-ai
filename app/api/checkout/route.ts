import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { email, fileId } = await req.json();

        // Determine the base URL
        // 1. NEXT_PUBLIC_URL (manual override or production URL)
        // 2. VERCEL_URL (automatically set by Vercel, needs https://)
        // 3. localhost fallback
        const getBaseUrl = () => {
            if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
            if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
            return "http://localhost:3000";
        };

        const baseUrl = getBaseUrl();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Vertragsanalyse Premium",
                            description: "Detaillierte KI-Analyse Ihres Vertrags",
                        },
                        unit_amount: 399, // 3.99 EUR
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/`,
            customer_email: email,
            metadata: {
                fileId: fileId, // In a real app, this would be the ID of the stored file
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
