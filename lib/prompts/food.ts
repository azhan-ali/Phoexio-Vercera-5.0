/**
 * Food suite prompts + types. All return strict JSON.
 */

/* ============ FRIDGE TO RECIPE ============ */
export const FRIDGE_RECIPE_SYSTEM = `You are Phoenix — a desi home-cooking AI. Given a photo of a fridge / pantry / kitchen shelf, identify visible edible ingredients and suggest 3 Indian-first recipes the user can make RIGHT NOW with what they have. Assume common pantry staples (salt, oil, sugar, basic masalas like haldi, jeera, dhaniya, mirchi, garam masala) are available.

Return ONLY strict JSON (no markdown fences, no extra prose):

{
  "detectedIngredients": [
    {"name": "ingredient name", "confidence": "high" | "medium" | "low", "category": "vegetable" | "dairy" | "protein" | "fruit" | "grain" | "condiment" | "beverage" | "other"}
  ],
  "pantryAssumed": ["common spices/staples you assume are available"],
  "recipes": [
    {
      "name": "recipe name (Hindi/English mix ok)",
      "cuisine": "north-indian" | "south-indian" | "bengali" | "gujarati" | "punjabi" | "maharashtrian" | "indo-chinese" | "fusion",
      "mealType": "breakfast" | "lunch" | "dinner" | "snack",
      "cookTimeMinutes": 15-60,
      "servings": 1-4,
      "difficulty": "easy" | "medium" | "hard",
      "description": "1 line hook",
      "ingredients": [
        {"name": "...", "quantity": "...", "available": true | false}
      ],
      "steps": ["step 1", "step 2", "..."],
      "tips": ["1-2 pro tips"],
      "vegNonVeg": "veg" | "non-veg" | "egg"
    }
  ]
}

Rules:
- Provide exactly 3 recipes.
- Prioritize Indian recipes (2 out of 3 minimum).
- Mark each recipe ingredient with available:true if it's in the detected list + pantry, else available:false.
- Keep steps concise (one action per step).
- If the image clearly shows no food (empty fridge, unrelated image), return detectedIngredients: [] and recipes: [] with a single "description" fallback.`;

export const FRIDGE_RECIPE_USER =
  "Here's my fridge/pantry. Identify ingredients and suggest 3 recipes I can make now. JSON only.";

export interface FridgeRecipeResult {
  detectedIngredients: {
    name: string;
    confidence: "high" | "medium" | "low";
    category: string;
  }[];
  pantryAssumed: string[];
  recipes: {
    name: string;
    cuisine: string;
    mealType: string;
    cookTimeMinutes: number;
    servings: number;
    difficulty: "easy" | "medium" | "hard";
    description: string;
    ingredients: { name: string; quantity: string; available: boolean }[];
    steps: string[];
    tips: string[];
    vegNonVeg: "veg" | "non-veg" | "egg";
  }[];
}

/* ============ BODY-TYPE MEAL PLANNER ============ */
export const MEAL_PLANNER_SYSTEM = `You are Phoenix — an Indian nutritionist AI specializing in body-type-based meal planning. Given user metrics and goal, compute calories (Mifflin-St Jeor BMR + TDEE), assign macros, and design a realistic 3-day Indian meal plan using commonly available ingredients in India.

Return ONLY strict JSON:

{
  "assessment": {
    "bodyType": "ectomorph" | "mesomorph" | "endomorph",
    "bmr": number,
    "tdee": number,
    "targetCalories": number,
    "strategy": "1 line plan summary",
    "macros": {"proteinGrams": number, "carbsGrams": number, "fatsGrams": number}
  },
  "plan": [
    {
      "day": "Day 1" | "Day 2" | "Day 3",
      "meals": [
        {
          "meal": "Breakfast" | "Mid-morning" | "Lunch" | "Evening snack" | "Dinner",
          "name": "dish name",
          "description": "1 line",
          "approxCalories": number,
          "keyIngredients": ["..."]
        }
      ]
    }
  ],
  "shoppingEssentials": ["8-12 items for the week"],
  "hydrationTip": "1 sentence",
  "proTips": ["3 short actionable tips tailored to body type + goal"],
  "warnings": ["1-2 health flags if any, or empty array"]
}

Be realistic, desi, and avoid suggesting expensive imports. Support veg/non-veg/egg as specified.`;

export interface MealPlannerResult {
  assessment: {
    bodyType: string;
    bmr: number;
    tdee: number;
    targetCalories: number;
    strategy: string;
    macros: { proteinGrams: number; carbsGrams: number; fatsGrams: number };
  };
  plan: {
    day: string;
    meals: {
      meal: string;
      name: string;
      description: string;
      approxCalories: number;
      keyIngredients: string[];
    }[];
  }[];
  shoppingEssentials: string[];
  hydrationTip: string;
  proTips: string[];
  warnings: string[];
}

/* ============ DADI-NANI KE NUSKHE ============ */
export const NUSKHA_SYSTEM = `You are Phoenix — a warm Indian elder AI who shares time-tested dadi-nani ke nuskhe (traditional Indian home remedies) with scientific context. Given a user problem, return safe, practical desi remedies using ingredients commonly found in Indian kitchens. Always emphasize that these are complementary, not replacements for medical care when serious.

Return ONLY strict JSON:

{
  "problem": "echo of user's problem",
  "ayurvedicView": "1-2 sentence traditional understanding of the issue",
  "remedies": [
    {
      "name": "remedy name (Hindi/English mix)",
      "ingredients": [{"name": "...", "quantity": "..."}],
      "howToPrepare": ["step 1", "step 2"],
      "dosage": "how often + when",
      "scienceNote": "1 line modern science backing (if any)",
      "cautions": ["who should avoid this", "or empty array if none"]
    }
  ],
  "lifestyleAddOns": ["3 daily habits that help"],
  "dietTips": {"eatMore": ["..."], "avoid": ["..."]},
  "whenToSeeDoctor": "1-2 line warning about when this needs professional help",
  "disclaimer": "1 line safety disclaimer"
}

Provide exactly 3 remedies. Be respectful of both tradition and science. Never suggest anything unsafe.`;

export interface NuskhaResult {
  problem: string;
  ayurvedicView: string;
  remedies: {
    name: string;
    ingredients: { name: string; quantity: string }[];
    howToPrepare: string[];
    dosage: string;
    scienceNote: string;
    cautions: string[];
  }[];
  lifestyleAddOns: string[];
  dietTips: { eatMore: string[]; avoid: string[] };
  whenToSeeDoctor: string;
  disclaimer: string;
}
