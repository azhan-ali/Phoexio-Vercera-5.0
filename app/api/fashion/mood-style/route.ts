import { NextRequest, NextResponse } from "next/server";
import { grokChat, safeParseJSON } from "@/lib/grok";
import { MOOD_STYLE_SYSTEM, type MoodStyleResult } from "@/lib/prompts/fashion";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { mood, freeText, bodyType, gender } = (await req.json()) as {
      mood?: string;
      freeText?: string;
      bodyType?: string;
      gender?: string;
    };
    if (!mood && !freeText) {
      return NextResponse.json({ error: "mood is required" }, { status: 400 });
    }

    const userMsg = `My current mood: ${mood || "unspecified"}
${freeText ? `More context: ${freeText}` : ""}
${bodyType ? `Body type: ${bodyType}` : ""}
${gender ? `Gender: ${gender}` : ""}

Suggest colors + outfits that will support me today. JSON only.`;

    const res = await grokChat({
      messages: [
        { role: "system", content: MOOD_STYLE_SYSTEM },
        { role: "user", content: userMsg },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const parsed = safeParseJSON<MoodStyleResult>(content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw: content },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Mood style failed";
    console.error("[fashion/mood-style]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
