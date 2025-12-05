import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
    throw new Error("STRIPE_SECRET_KEY is missing in production environment. Please add it to your Vercel project settings.");
}

export const stripe = new Stripe(apiKey || "mock_key", {
    typescript: true,
    timeout: 30000, // 30 seconds timeout
    maxNetworkRetries: 2,
});

