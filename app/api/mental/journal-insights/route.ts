import { NextRequest, NextResponse } from "next/server";
import { grokChat, safeParseJSON } from "@/lib/grok";
import {
  JOURNAL_INSIGHTS_SYSTEM,
  type JournalInsightsResult,
} from "@/lib/prompts/mental";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { entries } = (await req.json()) as {
      entries?: {
        date: string;
        mood: string;
        score: number;
        note: string;
        gratitude?: string;
        trigger?: string;
      }[];
    };
    if (!entries || entries.length === 0) {
      return NextResponse.json({ error: "entries required" }, { status: 400 });
    }

    // Compact the payload
    const text = entries
      .map(
        (e, i) =>
          `Entry ${i + 1} (${e.date}): mood=${e.mood} (${e.score}/10). Note: ${
            e.note
          }${e.trigger ? ` | Trigger: ${e.trigger}` : ""}${
            e.gratitude ? ` | Grateful for: ${e.gratitude}` : ""
          }`
      )
      .join("\n");

    const res = await grokChat({
      messages: [
        { role: "system", content: JOURNAL_INSIGHTS_SYSTEM },
        {
          role: "user",
          content: `Here are my recent journal entries (${entries.length} total):\n\n${text}\n\nPlease give me gentle insights. JSON only.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 1500,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const parsed = safeParseJSON<JournalInsightsResult>(content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw: content },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Journal insights failed";
    console.error("[mental/journal-insights]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
