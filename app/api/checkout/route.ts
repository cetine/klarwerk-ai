import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { email, fileId } = await req.json();

        // Determine the base URL
        // 1. Request Origin (Best for Vercel Previews & keeping user on same domain)
        // 2. NEXT_PUBLIC_URL (Manual override)
        // 3. VERCEL_URL (Fallback)
        // 4. localhost fallback
        const getBaseUrl = () => {
            const origin = req.headers.get("origin");
            if (origin) return origin;

            if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL;
            if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
            return "http://localhost:3000";
        };

        const baseUrl = getBaseUrl();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: "price_1RsjNR2aYP1cJiwgRm28FUpk",
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
