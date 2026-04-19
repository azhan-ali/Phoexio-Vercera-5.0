import { NextRequest, NextResponse } from "next/server";
import { grokChat, type ChatMessage } from "@/lib/grok";
import { chatSystemPrompt, type LanguageCode } from "@/lib/prompts/mental";
import { detectCrisis, HELPLINES } from "@/lib/crisis";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { messages, language } = (await req.json()) as {
      messages?: { role: "user" | "assistant"; content: string }[];
      language?: LanguageCode;
    };
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    // Crisis check on latest user message
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const crisis = detectCrisis(lastUser?.content || "");

    const systemPrompt = chatSystemPrompt(language || "hinglish");
    const finalMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...(crisis.triggered
        ? [
            {
              role: "system" as const,
              content: `IMPORTANT: The user just expressed possible self-harm or suicidal thoughts ("${crisis.matched}"). Respond with immediate care and warmth. Validate their pain. Remind them they are not alone and that real trained humans are available right now. MUST include these helplines verbatim: iCall 9152987821, Vandrevala 1860-2662-345. Keep reply short, warm, no lectures.`,
            },
          ]
        : []),
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const res = await grokChat({
      messages: finalMessages,
      temperature: 0.85,
      max_tokens: 400,
    });
    const content = res.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({
      content,
      crisis: crisis.triggered
        ? { triggered: true, helplines: HELPLINES }
        : { triggered: false },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Chat failed";
    console.error("[mental/chat]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
