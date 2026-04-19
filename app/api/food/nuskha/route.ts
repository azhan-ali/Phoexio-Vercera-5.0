import { NextRequest, NextResponse } from "next/server";
import { grokChat, safeParseJSON } from "@/lib/grok";
import { NUSKHA_SYSTEM, type NuskhaResult } from "@/lib/prompts/food";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { problem, details } = (await req.json()) as {
      problem?: string;
      details?: string;
    };
    if (!problem) {
      return NextResponse.json({ error: "problem is required" }, { status: 400 });
    }

    const userMsg = `My problem: ${problem}${
      details ? `\nMore context: ${details}` : ""
    }\n\nPlease suggest dadi-nani ke nuskhe. JSON only.`;

    const res = await grokChat({
      messages: [
        { role: "system", content: NUSKHA_SYSTEM },
        { role: "user", content: userMsg },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const parsed = safeParseJSON<NuskhaResult>(content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw: content },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Nuskha service failed";
    console.error("[food/nuskha]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
