import { NextRequest, NextResponse } from "next/server";
import { grokVision, safeParseJSON } from "@/lib/grok";
import {
  FRIDGE_RECIPE_SYSTEM,
  FRIDGE_RECIPE_USER,
  type FridgeRecipeResult,
} from "@/lib/prompts/food";

export const runtime = "nodejs";
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, preferences } = (await req.json()) as {
      imageUrl?: string;
      preferences?: { vegOnly?: boolean };
    };
    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const prompt =
      FRIDGE_RECIPE_USER +
      (preferences?.vegOnly ? " Only suggest vegetarian recipes." : "");

    const raw = await grokVision(imageUrl, prompt, FRIDGE_RECIPE_SYSTEM);
    const parsed = safeParseJSON<FridgeRecipeResult>(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fridge scanner failed";
    console.error("[food/fridge-scanner]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
