import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { text, email } = await req.json();

    console.log("[Analyze] Starting analysis for:", email);
    console.log("[Analyze] Text length:", text?.length);

    if (!text || !email) {
      return NextResponse.json({ error: "Missing text or email" }, { status: 400 });
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      throw new Error("OPENAI_ASSISTANT_ID is not configured");
    }

    // 1. Create a Thread
    console.log("[Analyze] Creating thread...");
    const thread = await openai.beta.threads.create();
    console.log("[Analyze] Thread created:", thread.id);

    // 2. Add message to thread with the contract text
    console.log("[Analyze] Adding message to thread...");
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Bitte analysiere folgenden Vertrag:\n\n${text}`,
    });

    // 3. Run the assistant
    console.log("[Analyze] Running assistant:", assistantId);
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // 4. Poll for completion
    console.log("[Analyze] Polling for completion...");
    let runStatus = await openai.beta.threads.runs.retrieve(run.id, {
      thread_id: thread.id,
    });

    while (runStatus.status === "queued" || runStatus.status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
      runStatus = await openai.beta.threads.runs.retrieve(run.id, {
        thread_id: thread.id,
      });
      console.log("[Analyze] Run status:", runStatus.status);
    }

    if (runStatus.status !== "completed") {
      console.error("[Analyze] Run failed with status:", runStatus.status);
      throw new Error(`Assistant run failed with status: ${runStatus.status}`);
    }

    // 5. Retrieve messages
    console.log("[Analyze] Retrieving messages...");
    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find((msg) => msg.role === "assistant");

    if (!assistantMessage || !assistantMessage.content[0]) {
      throw new Error("No response from assistant");
    }

    // Extract text content
    const content = assistantMessage.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected content type from assistant");
    }

    const analysisText = content.text.value;
    console.log("[Analyze] Assistant response length:", analysisText?.length);

    // Parse the JSON response
    const analysis = JSON.parse(analysisText);

    console.log("[Analyze] Analysis parsed successfully");
    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
