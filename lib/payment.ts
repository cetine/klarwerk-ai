import { createHash } from "node:crypto";
import { put } from "@vercel/blob";
import { stripe } from "@/lib/stripe";

// A paid session may be retried a few times (e.g. after a timeout), but not reused indefinitely.
export const MAX_ANALYSES_PER_SESSION = 3;
const ANALYSIS_WINDOW_SECONDS = 24 * 60 * 60;
const PAID_STATUSES = new Set(["paid", "no_payment_required"]);

export type PaymentCheck =
    | { ok: true }
    | { ok: false; status: 402 | 403 | 429; error: string };

const fail = (status: 402 | 403 | 429, error: string): PaymentCheck => ({ ok: false, status, error });

export async function verifyPaidSession(
    sessionId: string | undefined,
    fileId: string | undefined
): Promise<PaymentCheck> {
    if (!sessionId || !sessionId.startsWith("cs_")) {
        return fail(402, "Zahlung konnte nicht bestätigt werden.");
    }

    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
        console.error("[Payment] Session lookup failed:", error instanceof Error ? error.message : error);
        return fail(402, "Zahlung konnte nicht bestätigt werden.");
    }

    if (session.status !== "complete" || !PAID_STATUSES.has(session.payment_status)) {
        console.warn("[Payment] Session not paid:", session.id, session.status, session.payment_status);
        return fail(402, "Zahlung konnte nicht bestätigt werden.");
    }

    const paidFileId = session.metadata?.fileId;
    if (paidFileId && paidFileId !== fileId) {
        console.warn("[Payment] fileId mismatch for session:", session.id);
        return fail(403, "Diese Zahlung gehört zu einem anderen Vertrag.");
    }

    if (Date.now() / 1000 - session.created > ANALYSIS_WINDOW_SECONDS) {
        return fail(403, "Diese Zahlung ist abgelaufen. Bitte kontaktieren Sie den Support.");
    }

    return consumeAnalysisSlot(session.id);
}

const isAlreadyClaimed = (error: unknown) =>
    error instanceof Error && error.message.includes("already exists");

// Each session owns fixed slots 1..MAX. Blob rejects a second put to the same pathname
// server-side, so claiming a slot is atomic and parallel requests cannot exceed the cap.
async function consumeAnalysisSlot(sessionId: string): Promise<PaymentCheck> {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return { ok: true };

    // Hashed so the public blob path never exposes the Stripe session id.
    const key = createHash("sha256").update(sessionId).digest("hex").slice(0, 32);
    for (let slot = 1; slot <= MAX_ANALYSES_PER_SESSION; slot++) {
        try {
            await put(`usage/${key}/${slot}`, "1", { access: "public", addRandomSuffix: false, allowOverwrite: false });
            return { ok: true };
        } catch (error) {
            if (isAlreadyClaimed(error)) continue;
            // Counter outage must not block a paying customer; the Stripe check above already passed.
            console.error("[Payment] Usage counter unavailable:", error instanceof Error ? error.message : error);
            return { ok: true };
        }
    }
    console.warn("[Payment] Analysis limit reached for session:", sessionId);
    return fail(429, "Für diese Zahlung wurden bereits alle Analysen durchgeführt.");
}
