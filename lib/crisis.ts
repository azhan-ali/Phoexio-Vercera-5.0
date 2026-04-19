/**
 * Lightweight crisis keyword detection — runs on the server for every chat message.
 * NOT a replacement for clinical screening; just a safety net to surface helplines.
 */

const CRISIS_PATTERNS: RegExp[] = [
  // English
  /\b(kill|killing|ending)\s+(myself|my\s?self)\b/i,
  /\bsuicide\b/i,
  /\bsuicidal\b/i,
  /\bi\s+want\s+to\s+die\b/i,
  /\bi\s+don'?t\s+want\s+to\s+(live|be\s+here)\b/i,
  /\bhurt\s+myself\b/i,
  /\bself[-\s]?harm\b/i,
  /\bend\s+(it\s+all|my\s+life)\b/i,
  /\bno\s+point\s+(in\s+)?living\b/i,
  /\btake\s+my\s+(own\s+)?life\b/i,
  /\boverdose\b/i,
  /\bcutting\s+myself\b/i,

  // Hindi / Hinglish
  /\bmarna\s+hai\b/i,
  /\bkhud.?kushi\b/i,
  /\bjaan\s+dena\b/i,
  /\bjeene\s+ka\s+mann\s+nahi\b/i,
  /\bjee\s+nahi\s+sakta\b/i,
  /\bzindagi\s+khatam\b/i,
  /\bapne\s+aap\s+ko\s+(maar|chot)\b/i,
];

export interface CrisisCheckResult {
  triggered: boolean;
  level: "none" | "elevated";
  matched?: string;
}

export function detectCrisis(text: string): CrisisCheckResult {
  if (!text) return { triggered: false, level: "none" };
  for (const rx of CRISIS_PATTERNS) {
    const m = text.match(rx);
    if (m) return { triggered: true, level: "elevated", matched: m[0] };
  }
  return { triggered: false, level: "none" };
}

export const HELPLINES = [
  { name: "iCall (TISS)", phone: "9152987821", hours: "Mon-Sat, 8am-10pm" },
  { name: "Vandrevala Foundation", phone: "1860-2662-345", hours: "24/7" },
  { name: "AASRA", phone: "9820466726", hours: "24/7" },
];
