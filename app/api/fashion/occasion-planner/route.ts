import { NextRequest, NextResponse } from "next/server";
import { grokChat, safeParseJSON } from "@/lib/grok";
import { OCCASION_PACKAGE_SYSTEM, type OccasionPackage } from "@/lib/prompts/fashion";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { occasion, gender, city, budget, notes } = (await req.json()) as {
      occasion?: string;
      gender?: string;
      city?: string;
      budget?: string;
      notes?: string;
    };
    if (!occasion) {
      return NextResponse.json({ error: "occasion is required" }, { status: 400 });
    }

    const userMsg = `Plan my complete evening:
- Occasion: ${occasion}
- Gender: ${gender || "unspecified"}
- City: ${city || "India (metro)"}
- Budget: ${budget || "mid-range"}
${notes ? `- Notes: ${notes}` : ""}

Give me the outfit + venue + food + music combo with holistic reasoning. JSON only.`;

    const res = await grokChat({
      messages: [
        { role: "system", content: OCCASION_PACKAGE_SYSTEM },
        { role: "user", content: userMsg },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const parsed = safeParseJSON<OccasionPackage>(content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw: content },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Occasion planner failed";
    console.error("[fashion/occasion-planner]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
