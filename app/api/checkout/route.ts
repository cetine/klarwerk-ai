import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const { email, fileId } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "sepa_debit", "paypal"], // Add German methods
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
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
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
