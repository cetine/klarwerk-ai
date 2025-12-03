import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
    throw new Error("OPENAI_API_KEY is missing in production environment. Please add it to your Vercel project settings.");
}

export const openai = new OpenAI({
    apiKey: apiKey || "mock_key",
});
