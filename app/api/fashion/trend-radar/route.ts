import { NextRequest, NextResponse } from "next/server";
import { grokLiveSearch, safeParseJSON } from "@/lib/grok";
import { TREND_RADAR_SYSTEM, type TrendRadarResult } from "@/lib/prompts/fashion";

export const runtime = "nodejs";
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const { region, season, gender, bodyType } = (await req.json()) as {
      region?: string;
      season?: string;
      gender?: string;
      bodyType?: string;
    };

    const today = new Date().toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

    const query = `What are the top 5 fashion trends right now for ${gender || "all"} in ${
      region || "India"
    }, season: ${season || "current"} (${today})?${
      bodyType ? ` Prioritize trends that flatter ${bodyType} body type.` : ""
    } Search latest fashion publications, Instagram/X style accounts, Bollywood looks, and street style. Return JSON only per the specified schema.`;

    const { content, citations } = await grokLiveSearch(query, TREND_RADAR_SYSTEM);
    const parsed = safeParseJSON<TrendRadarResult>(content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw: content },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed, citations: citations || [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Trend radar failed";
    console.error("[fashion/trend-radar]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
