/**
 * Phoenix — pricing + usage-limits data.
 * Single source of truth. All prices in INR (₹).
 *
 * Revenue model:
 *  1. FREE tier     — every user gets a monthly quota per feature.
 *  2. SOLO PACKS    — credits for a single feature (don't expire).
 *  3. COMBO PACKS   — 30-day unlimited access to a whole suite.
 *  4. PHOENIX PREMIUM — everything unlimited, monthly/yearly.
 */

export interface FeatureQuota {
  slug: string;
  name: string;
  category: "Fashion" | "Food" | "Mind";
  emoji: string;
  /** Free uses per month. null = unlimited on free. */
  freeMonthly: number | null;
  /** Unit label shown in UI ("use", "message", "recipe", etc.) */
  unit: string;
  /** One solo pack (credits, never expire). */
  soloPack: {
    uses: number;
    price: number; // INR
  };
}

export const FEATURE_QUOTAS: FeatureQuota[] = [
  // FASHION
  {
    slug: "outfit-analyzer",
    name: "Outfit Analyzer",
    category: "Fashion",
    emoji: "👗",
    freeMonthly: 10,
    unit: "analysis",
    soloPack: { uses: 25, price: 49 },
  },
  {
    slug: "trend-radar",
    name: "Live Trend Radar",
    category: "Fashion",
    emoji: "📡",
    freeMonthly: 10,
    unit: "scan",
    soloPack: { uses: 25, price: 49 },
  },
  {
    slug: "occasion-planner",
    name: "Occasion Planner",
    category: "Fashion",
    emoji: "🎉",
    freeMonthly: 5,
    unit: "plan",
    soloPack: { uses: 15, price: 99 },
  },
  {
    slug: "mood-style",
    name: "Mood-Based Styling",
    category: "Fashion",
    emoji: "🎨",
    freeMonthly: 5,
    unit: "styling",
    soloPack: { uses: 15, price: 99 },
  },
  {
    slug: "try-on",
    name: "Virtual Try-On",
    category: "Fashion",
    emoji: "✨",
    freeMonthly: 3,
    unit: "photo",
    soloPack: { uses: 10, price: 149 },
  },
  // FOOD
  {
    slug: "fridge-scanner",
    name: "Fridge-to-Recipe",
    category: "Food",
    emoji: "📸",
    freeMonthly: 10,
    unit: "scan",
    soloPack: { uses: 25, price: 49 },
  },
  {
    slug: "meal-planner",
    name: "Meal Planner",
    category: "Food",
    emoji: "🍱",
    freeMonthly: 5,
    unit: "plan",
    soloPack: { uses: 15, price: 79 },
  },
  {
    slug: "nuskha",
    name: "Dadi-Nani Nuskhe",
    category: "Food",
    emoji: "🌿",
    freeMonthly: 10,
    unit: "nuskha",
    soloPack: { uses: 50, price: 49 },
  },
  // MIND
  {
    slug: "companion-chat",
    name: "AI Companion Chat",
    category: "Mind",
    emoji: "🤗",
    freeMonthly: 50,
    unit: "message",
    soloPack: { uses: 500, price: 99 },
  },
  {
    slug: "journal-insights",
    name: "Journal AI Insights",
    category: "Mind",
    emoji: "📓",
    freeMonthly: 4,
    unit: "insight",
    soloPack: { uses: 20, price: 79 },
  },
];

/** Combo packs — 30 days unlimited access to a bundle. */
export interface ComboPack {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  includes: string[]; // feature slugs
  price: number;
  soloEquivalent: number; // cost if bought as solo packs, for "you save" label
  highlight?: boolean;
  bg: string;
}

export const COMBO_PACKS: ComboPack[] = [
  {
    slug: "fashion-pro",
    name: "Fashion Pro",
    emoji: "🎨",
    tagline: "all 5 fashion features",
    includes: ["outfit-analyzer", "trend-radar", "occasion-planner", "mood-style", "try-on"],
    price: 249,
    soloEquivalent: 49 + 49 + 99 + 99 + 149,
    bg: "bg-sketch-pink/20",
  },
  {
    slug: "food-feast",
    name: "Food Feast",
    emoji: "🍲",
    tagline: "every recipe, every plan",
    includes: ["fridge-scanner", "meal-planner", "nuskha"],
    price: 149,
    soloEquivalent: 49 + 79 + 49,
    bg: "bg-sketch-green/20",
  },
  {
    slug: "mind-peace",
    name: "Mind Peace",
    emoji: "🧘",
    tagline: "chat + journal unlimited",
    includes: ["companion-chat", "journal-insights"],
    price: 99,
    soloEquivalent: 99 + 79,
    bg: "bg-sketch-purple/20",
  },
  {
    slug: "phoenix-all-in",
    name: "Phoenix All-In",
    emoji: "🔥",
    tagline: "every feature, one price",
    includes: FEATURE_QUOTAS.map((f) => f.slug),
    price: 399,
    soloEquivalent: FEATURE_QUOTAS.reduce((s, f) => s + f.soloPack.price, 0),
    highlight: true,
    bg: "bg-phoenix-flame/15",
  },
];

/** Phoenix Premium — unlimited everything + priority AI + extras. */
export const PREMIUM_PLANS = {
  monthly: {
    price: 499,
    label: "per month",
    note: "billed monthly · cancel anytime",
  },
  yearly: {
    price: 299, // per month effective
    yearlyTotal: 3588, // 299 * 12
    label: "per month",
    note: "billed ₹3,588 yearly · save 40%",
    strikethrough: 5988, // 499 * 12
  },
} as const;

export const PREMIUM_PERKS = [
  "Unlimited uses of every feature",
  "Priority AI models (faster, smarter)",
  "Early access to new features",
  "Personalized memory across sessions",
  "No ads, no limits, ever",
  "Cancel anytime",
];

/** Helpers */
export function getFeature(slug: string) {
  return FEATURE_QUOTAS.find((f) => f.slug === slug);
}
export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
