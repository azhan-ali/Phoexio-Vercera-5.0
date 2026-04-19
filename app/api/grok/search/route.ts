import { NextRequest, NextResponse } from "next/server";
import { grokLiveSearch } from "@/lib/grok";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/grok/search
 * Body: { query: string, systemPrompt?: string }
 * Returns: { content: string, citations: string[] }
 *
 * Uses Grok's live web search — fetches real-time web, news, and X posts
 * before composing the answer.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { query, systemPrompt } = body as { query?: string; systemPrompt?: string };

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "`query` is required." }, { status: 400 });
    }

    const { content, citations } = await grokLiveSearch(query, systemPrompt);
    return NextResponse.json({ content, citations: citations ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Grok search error";
    console.error("[grok/search]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
