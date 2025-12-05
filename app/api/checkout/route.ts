import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { email, fileId } = await req.json();

        // Get Price ID from environment or use default
        const priceId = process.env.STRIPE_PRICE_ID || "price_1RsjNR2aYP1cJiwgRm28FUpk";

        // Determine the base URL
        const getBaseUrl = () => {
            const origin = req.headers.get("origin");
            if (origin) return origin;

            if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
            if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
            return "http://localhost:3000";
        };

        const baseUrl = getBaseUrl();

        console.log("Creating Stripe session with:", {
            email,
            fileId,
            priceId,
            baseUrl,
            hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/`,
            customer_email: email,
            metadata: {
                fileId: fileId,
            },
        });

        console.log("Stripe session created:", session.id);

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            type: (error as { type?: string })?.type,
            code: (error as { code?: string })?.code,
            statusCode: (error as { statusCode?: number })?.statusCode,
        });
        return NextResponse.json(
            { error: "Checkout konnte nicht erstellt werden. Bitte versuchen Sie es erneut." },
            { status: 500 }
        );
    }
}

