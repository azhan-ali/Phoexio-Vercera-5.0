import { NextRequest, NextResponse } from "next/server";
import { grokVision, safeParseJSON } from "@/lib/grok";
import {
  OUTFIT_ANALYZER_SYSTEM,
  OUTFIT_ANALYZER_USER,
  type OutfitAnalysis,
} from "@/lib/prompts/fashion";

export const runtime = "nodejs";
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = (await req.json()) as { imageUrl?: string };
    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const raw = await grokVision(imageUrl, OUTFIT_ANALYZER_USER, OUTFIT_ANALYZER_SYSTEM);
    const parsed = safeParseJSON<OutfitAnalysis>(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON.", raw },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Outfit analyzer failed";
    console.error("[fashion/outfit-analyzer]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
