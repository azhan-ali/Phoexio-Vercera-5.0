import { NextRequest, NextResponse } from "next/server";
import { grokChat, safeParseJSON } from "@/lib/grok";
import { MEAL_PLANNER_SYSTEM, type MealPlannerResult } from "@/lib/prompts/food";

export const runtime = "nodejs";
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as {
      age?: number;
      gender?: string;
      heightCm?: number;
      weightKg?: number;
      bodyType?: string;
      activityLevel?: string;
      goal?: string;
      diet?: string;
      region?: string;
      allergies?: string;
    };

    const {
      age,
      gender,
      heightCm,
      weightKg,
      bodyType,
      activityLevel,
      goal,
      diet,
      region,
      allergies,
    } = data;

    if (!age || !gender || !heightCm || !weightKg || !goal) {
      return NextResponse.json(
        { error: "age, gender, heightCm, weightKg, goal are required" },
        { status: 400 }
      );
    }

    const userMsg = `Plan my meals based on these details:
- Age: ${age}
- Gender: ${gender}
- Height: ${heightCm} cm
- Weight: ${weightKg} kg
- Body type: ${bodyType || "unsure — analyze from data"}
- Activity level: ${activityLevel || "moderate"}
- Goal: ${goal}
- Diet: ${diet || "vegetarian"}
- Region preference: ${region || "pan-India"}
${allergies ? `- Allergies/avoid: ${allergies}` : ""}

Return complete JSON per the schema.`;

    const res = await grokChat({
      messages: [
        { role: "system", content: MEAL_PLANNER_SYSTEM },
        { role: "user", content: userMsg },
      ],
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 3000,
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const parsed = safeParseJSON<MealPlannerResult>(content);
    if (!parsed) {
      return NextResponse.json(
        { error: "Grok returned invalid JSON", raw: content },
        { status: 502 }
      );
    }
    return NextResponse.json({ result: parsed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Meal planner failed";
    console.error("[food/meal-planner]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
