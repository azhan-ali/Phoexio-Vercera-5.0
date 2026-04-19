import { NextRequest, NextResponse } from "next/server";
import { grokVision, grokImage, safeParseJSON } from "@/lib/grok";

export const runtime = "nodejs";
export const maxDuration = 60;

const PERSON_ANALYSIS_PROMPT = `You are a visual analyst. Look at this photo of a person and describe ONLY their physical appearance — never their identity.
Return STRICT JSON (no prose, no markdown) with this exact schema:
{
  "gender_presentation": "masculine" | "feminine" | "androgynous",
  "approx_age_range": string,            // e.g. "20-25"
  "skin_tone": string,                   // e.g. "warm medium brown", "fair with pink undertones"
  "hair": string,                        // length + color + style, e.g. "shoulder-length wavy black hair"
  "build": string,                       // "slim", "average athletic", "curvy", "plus-size", etc.
  "height_impression": string,           // "tall", "average", "petite"
  "face_shape": string,                  // "oval", "round", "heart", etc.
  "distinct_features": string[],         // glasses, beard, freckles, piercings — neutral facts only
  "current_pose": string                 // "standing facing camera", "slight side angle", etc.
}
Only include what is clearly visible. If unsure, use best estimate. NEVER name or identify the person.`;

const OUTFIT_ANALYSIS_PROMPT = `You are a fashion analyst. Look at this outfit/clothing photo and describe the garment(s) in rich detail.
Return STRICT JSON (no prose) with this exact schema:
{
  "garment_type": string,                // e.g. "midi dress", "kurta set", "oversized blazer and trousers"
  "primary_colors": string[],            // e.g. ["deep emerald green", "ivory"]
  "pattern": string,                     // "solid", "floral", "geometric", "striped"
  "fabric_impression": string,           // "flowing silk", "crisp cotton", "denim", etc.
  "cut_and_silhouette": string,          // "A-line", "bodycon", "oversized boxy", "tailored"
  "length": string,                      // "mini", "knee-length", "floor-length", "cropped"
  "neckline_or_collar": string,          // "v-neck", "boat neck", "shirt collar", "n/a"
  "sleeves": string,                     // "sleeveless", "puff sleeves", "long", "half"
  "notable_details": string[],           // embroidery, buttons, belt, pleats, ruffles
  "style_category": string,              // "formal", "casual", "ethnic Indian", "streetwear", "bohemian"
  "accessories_visible": string[]        // if any shown with outfit
}
Focus on what could be recreated in a generated image. Be specific about colors and details.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personImage, outfitImage, scene } = body as {
      personImage?: string;
      outfitImage?: string;
      scene?: string;
    };

    if (!personImage || !outfitImage) {
      return NextResponse.json(
        { error: "Both personImage and outfitImage are required (data URLs or public URLs)." },
        { status: 400 }
      );
    }

    // Step 1 + 2 run in parallel — two vision calls
    const [personRaw, outfitRaw] = await Promise.all([
      grokVision(personImage, "Analyze this person as instructed.", PERSON_ANALYSIS_PROMPT),
      grokVision(outfitImage, "Analyze this outfit as instructed.", OUTFIT_ANALYSIS_PROMPT),
    ]);

    const person = safeParseJSON<Record<string, unknown>>(personRaw);
    const outfit = safeParseJSON<Record<string, unknown>>(outfitRaw);

    if (!person || !outfit) {
      return NextResponse.json(
        {
          error: "Could not understand the uploaded images. Try clearer, well-lit photos.",
          debug: { personRaw, outfitRaw },
        },
        { status: 422 }
      );
    }

    // Step 3 — compose image generation prompt
    const background =
      scene?.trim() ||
      "a softly lit neutral studio with a warm beige backdrop, gentle daylight from the side";

    const generationPrompt = [
      `Full-body fashion editorial photograph of a ${person.gender_presentation || "person"} in their ${person.approx_age_range || "20s"},`,
      `${person.skin_tone || "medium"} skin tone, ${person.hair || "styled hair"}, ${person.build || "average"} build, ${person.height_impression || "average"} height, ${person.face_shape || "oval"} face shape`,
      Array.isArray(person.distinct_features) && person.distinct_features.length
        ? `(${(person.distinct_features as string[]).join(", ")})`
        : "",
      `wearing a ${outfit.primary_colors ? (outfit.primary_colors as string[]).join(" and ") : ""} ${outfit.pattern || ""} ${outfit.fabric_impression || ""} ${outfit.garment_type || "outfit"}`,
      `with ${outfit.cut_and_silhouette || "flattering"} silhouette, ${outfit.length || ""} length, ${outfit.neckline_or_collar || ""}, ${outfit.sleeves || ""} sleeves`,
      Array.isArray(outfit.notable_details) && outfit.notable_details.length
        ? `featuring ${(outfit.notable_details as string[]).join(", ")}`
        : "",
      Array.isArray(outfit.accessories_visible) && outfit.accessories_visible.length
        ? `accessorized with ${(outfit.accessories_visible as string[]).join(", ")}`
        : "",
      `${person.current_pose || "standing confidently facing the camera"}.`,
      `Setting: ${background}.`,
      `High-quality fashion photography, natural skin texture, realistic fabric drape, soft shadows, sharp focus, 85mm lens look, magazine editorial quality, photorealistic.`,
    ]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const { urls, revisedPrompts } = await grokImage(generationPrompt, { n: 1 });

    if (!urls.length) {
      return NextResponse.json(
        { error: "Image generation returned no results. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      generatedImageUrl: urls[0],
      generatedImageUrls: urls,
      revisedPrompt: revisedPrompts?.[0] || null,
      prompt: generationPrompt,
      analysis: { person, outfit },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
