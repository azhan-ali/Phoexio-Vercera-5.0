import { NextRequest, NextResponse } from "next/server";
import { grokVision, grokImage, safeParseJSON } from "@/lib/grok";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Vision prompt for the PERSON photo.
 * We want EVERYTHING needed to recreate the exact frame: pose, crop, angle, lighting, background.
 * Pose is the hero — the whole try-on illusion depends on it.
 */
const PERSON_ANALYSIS_PROMPT = `You are a photo-description engine. Output ONLY a single JSON object. No prose. No markdown fences.
Describe the person photo in rich, concrete detail so another AI could reproduce the SAME photograph with a different outfit — keeping the SAME face, SAME pose, SAME background.
Return this EXACT JSON shape:
{
  "gender_presentation": "masculine" | "feminine" | "androgynous",
  "approx_age_range": string,
  "skin_tone": string,
  "hair": string,
  "build": string,
  "height_impression": string,
  "face_shape": string,
  "eye_color_and_shape": string,
  "eyebrows": string,
  "nose_shape": string,
  "lip_shape": string,
  "jawline": string,
  "facial_hair": string,
  "skin_details": string,
  "distinct_features": string[],
  "pose": string,
  "exact_pose_description": string,
  "body_orientation": string,
  "arm_positions": string,
  "leg_positions": string,
  "head_tilt_and_gaze": string,
  "facial_expression": string,
  "framing": string,
  "camera_angle": string,
  "background": string,
  "lighting": string,
  "time_of_day_feel": string
}
Rules:
- Be extremely specific about facial features — eye shape/color, eyebrow thickness, nose, lips, jawline, any moles/freckles/scars, beard/stubble.
- Be extremely specific about pose and body position.
- Describe background in enough detail to recreate it.
- Never name or identify the person. Only visible facts.
- Output MUST be valid JSON. Start with { and end with }.`;

const OUTFIT_ANALYSIS_PROMPT = `You are a fashion-description engine. Output ONLY a single JSON object. No prose. No markdown fences.
Describe the garment(s) so precisely that an image model could paint the same outfit from scratch.
Return this EXACT JSON shape:
{
  "garment_type": string,
  "primary_colors": string[],
  "secondary_colors": string[],
  "pattern": string,
  "pattern_details": string,
  "fabric_impression": string,
  "cut_and_silhouette": string,
  "length": string,
  "neckline_or_collar": string,
  "sleeves": string,
  "closures": string,
  "notable_details": string[],
  "style_category": string,
  "accessories_visible": string[],
  "footwear": string,
  "overall_vibe": string
}
Rules:
- Be maximally specific about colors (use precise names like "deep emerald", "dusty rose", "charcoal").
- Describe every visible detail: embroidery, buttons, pleats, trims, belts, hemlines.
- Output MUST be valid JSON. Start with { and end with }.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personImage, outfitImage, scene, keepBackground } = body as {
      personImage?: string;
      outfitImage?: string;
      scene?: string;
      keepBackground?: boolean;
    };

    if (!personImage || !outfitImage) {
      return NextResponse.json(
        { error: "Both personImage and outfitImage are required." },
        { status: 400 }
      );
    }

    // Parallel vision calls — JSON mode forces valid JSON output
    const [personRaw, outfitRaw] = await Promise.all([
      grokVision(
        personImage,
        "Analyze the person photo per the schema. Return ONLY the JSON object.",
        PERSON_ANALYSIS_PROMPT,
        { jsonMode: true }
      ),
      grokVision(
        outfitImage,
        "Analyze the outfit per the schema. Return ONLY the JSON object.",
        OUTFIT_ANALYSIS_PROMPT,
        { jsonMode: true }
      ),
    ]);

    const person = safeParseJSON<Record<string, unknown>>(personRaw);
    const outfit = safeParseJSON<Record<string, unknown>>(outfitRaw);

    if (!person || !outfit) {
      return NextResponse.json(
        {
          error:
            "Could not analyze the images. Try clearer, well-lit photos — person photo should show full body or upper body, outfit photo should clearly show the garment.",
          debug:
            process.env.NODE_ENV === "development"
              ? { personRaw, outfitRaw }
              : undefined,
        },
        { status: 422 }
      );
    }

    // Background handling
    const useOriginalBackground = keepBackground !== false && !scene?.trim();
    const backgroundClause = useOriginalBackground
      ? `Background: ${person.background || "a neutral studio backdrop"}. Lighting: ${person.lighting || "soft natural light"}. Keep the background IDENTICAL to the original photo — same scene, same colors, same mood.`
      : `Background: ${(scene && scene.trim()) || "a softly lit neutral studio with a warm beige backdrop, gentle daylight from the side"}.`;

    const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]).join(", ") : "");

    // Composed generation prompt — IDENTITY + POSE preservation are critical
    const generationPrompt = [
      `IMPORTANT: Use the reference photo as the ground truth for the person's IDENTITY, FACE, HAIR, BODY, POSE, and BACKGROUND. Recreate the SAME person in the SAME photograph — only change their clothing to the outfit described below.`,

      // Subject — identity lock
      `The person is a ${person.gender_presentation || "person"} in their ${person.approx_age_range || "20s"},`,
      `${person.skin_tone || "medium"} skin, ${person.hair || "natural hair"}, ${person.build || "average"} build, ${person.height_impression || "average height"}.`,
      `Face: ${person.face_shape || "oval"} shape, ${person.eye_color_and_shape || "natural eyes"}, ${person.eyebrows || "natural brows"}, ${person.nose_shape || "natural nose"}, ${person.lip_shape || "natural lips"}, ${person.jawline || "natural jawline"}.`,
      person.facial_hair && person.facial_hair !== "none" && `Facial hair: ${person.facial_hair}.`,
      person.skin_details && `Skin: ${person.skin_details}.`,
      arr(person.distinct_features) && `Identifying features (must be preserved): ${arr(person.distinct_features)}.`,
      `Facial expression: ${person.facial_expression || "relaxed neutral"}. Gaze: ${person.head_tilt_and_gaze || "looking at camera"}.`,
      `DO NOT change the face — keep the same exact person from the reference photo.`,

      // POSE — must be identical
      `POSE (must match the reference exactly): ${person.exact_pose_description || person.pose || "standing upright facing the camera"}.`,
      `Body orientation: ${person.body_orientation || "facing camera"}. Arms: ${person.arm_positions || "relaxed at sides"}. Legs: ${person.leg_positions || "standing naturally"}.`,
      `The subject's body position, limbs, head angle, and framing must match the reference pose precisely.`,

      // Outfit
      `The person is wearing a ${arr(outfit.primary_colors) || "styled"} ${outfit.pattern || "solid"} ${outfit.fabric_impression || ""} ${outfit.garment_type || "outfit"},`,
      `${outfit.cut_and_silhouette || "flattering"} silhouette, ${outfit.length || ""} length, ${outfit.neckline_or_collar || ""} neckline, ${outfit.sleeves || ""} sleeves.`,
      outfit.pattern_details && `Pattern details: ${outfit.pattern_details}.`,
      arr(outfit.notable_details) && `Details: ${arr(outfit.notable_details)}.`,
      arr(outfit.secondary_colors) && `Accent colors: ${arr(outfit.secondary_colors)}.`,
      outfit.closures && `Closures: ${outfit.closures}.`,
      arr(outfit.accessories_visible) && `Accessorised with: ${arr(outfit.accessories_visible)}.`,
      outfit.footwear && `Footwear: ${outfit.footwear}.`,

      // Scene + camera
      backgroundClause,
      `Framing: ${person.framing || "three-quarter body, centered"}. Camera angle: ${person.camera_angle || "eye level, straight on"}.`,

      // Quality directives
      `Photorealistic, magazine fashion editorial quality, natural skin texture, realistic fabric drape with visible folds and creases, soft accurate shadows, sharp focus, 85mm lens, shallow depth of field, colour-accurate.`,
      `Do NOT change the person's identity, body proportions, hair, or pose. Do NOT add cartoonish elements. Do NOT alter the background if matching original.`,
    ]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    // Generate image — pass BOTH photos as references so the model has
    // the actual face + actual outfit to work from (identity preservation).
    const { urls, revisedPrompts, usedReference } = await grokImage(
      generationPrompt,
      {
        n: 1,
        referenceImages: [personImage, outfitImage],
      }
    );

    if (!urls.length) {
      return NextResponse.json(
        { error: "Image generation returned no results. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      generatedImageUrl: urls[0],
      generatedImageUrls: urls,
      revisedPrompt: revisedPrompts?.[0] || null,
      prompt: generationPrompt,
      analysis: { person, outfit },
      settings: {
        keptOriginalBackground: useOriginalBackground,
        identityReferenceUsed: usedReference,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
