import { NextRequest, NextResponse } from "next/server";
import { grokChat, grokText, type ChatMessage } from "@/lib/grok";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/grok/chat
 * Body:
 *   { prompt: string, systemPrompt?: string, temperature?: number, jsonMode?: boolean }
 *   OR
 *   { messages: ChatMessage[], temperature?: number, jsonMode?: boolean, model?: string }
 *
 * Returns: { content: string, raw?: unknown }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      prompt,
      systemPrompt,
      messages,
      temperature,
      max_tokens,
      jsonMode,
      model,
    } = body as {
      prompt?: string;
      systemPrompt?: string;
      messages?: ChatMessage[];
      temperature?: number;
      max_tokens?: number;
      jsonMode?: boolean;
      model?: string;
    };

    if (!prompt && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: "Provide either `prompt` or `messages`." },
        { status: 400 }
      );
    }

    // Quick path: single-turn prompt
    if (prompt && !messages) {
      const content = await grokText(prompt, systemPrompt, {
        temperature,
        max_tokens,
        model,
        ...(jsonMode && { response_format: { type: "json_object" as const } }),
      });
      return NextResponse.json({ content });
    }

    // Multi-turn path
    const finalMessages: ChatMessage[] = [];
    if (systemPrompt && !messages!.some((m) => m.role === "system")) {
      finalMessages.push({ role: "system", content: systemPrompt });
    }
    finalMessages.push(...(messages || []));

    const res = await grokChat({
      messages: finalMessages,
      temperature,
      max_tokens,
      model,
      ...(jsonMode && { response_format: { type: "json_object" as const } }),
    });
    const content: string = res.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ content, usage: res.usage });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Grok error";
    console.error("[grok/chat]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
