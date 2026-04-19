import { NextRequest, NextResponse } from "next/server";
import { grokVision } from "@/lib/grok";

export const runtime = "nodejs";
export const maxDuration = 90;

// 10 MB max base64 payload
const MAX_BYTES = 10 * 1024 * 1024;

/**
 * POST /api/grok/vision
 * Body:
 *   { imageUrl: string, prompt: string, systemPrompt?: string }
 *   — imageUrl can be a public https URL OR a data URL (data:image/jpeg;base64,...)
 *
 * Returns: { content: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { imageUrl, prompt, systemPrompt } = body as {
      imageUrl?: string;
      prompt?: string;
      systemPrompt?: string;
    };

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "`imageUrl` (https URL or data URL) is required." },
        { status: 400 }
      );
    }
    if (!prompt) {
      return NextResponse.json({ error: "`prompt` is required." }, { status: 400 });
    }

    // Guard against oversized data URLs
    if (imageUrl.startsWith("data:") && imageUrl.length > MAX_BYTES * 1.37) {
      return NextResponse.json(
        { error: "Image too large. Max ~10MB." },
        { status: 413 }
      );
    }

    const content = await grokVision(imageUrl, prompt, systemPrompt);
    return NextResponse.json({ content });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Grok vision error";
    console.error("[grok/vision]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
