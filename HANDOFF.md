# 🔥 Phoenix — AI Handoff Document

> **Purpose:** Complete context for the next AI assistant to pick up work on this project without any loss of continuity.
> **Last updated:** 2026-04-20
> **Repo:** https://github.com/azhan-ali/Phoexio-Vercera-5.0.git
> **Local path:** `c:\Users\Asus\Downloads\Vercera Hackathon\phoenix`

---

## 1. Project at a Glance

**Phoenix** is a Next.js 14 web app built for the **Vercera Hackathon**. It's an AI-powered lifestyle companion with 3 suites (Fashion, Food, Mental Health), all powered by **xAI's Grok**. The entire UI is a warm, hand-drawn "sketchbook" aesthetic — wobbly borders, handwritten fonts, paper textures, tape corners.

### Tech Stack
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript 5
- **Styling:** Tailwind CSS + custom paper-texture CSS + Google handwritten fonts (Caveat, Kalam, Patrick Hand)
- **Animation:** Framer Motion 12 + custom keyframes
- **AI:** Grok via `https://api.x.ai/v1` (chat, vision, live-search, image generation)
- **State:** React hooks + `localStorage` (mood journal, premium flag)
- **Image processing:** `sharp` (devDep, used for logo conversion)
- **Deploy target:** Vercel (primary); Netlify config included

---

## 2. Repository Structure (key paths)

```
phoenix/
├── app/
│   ├── api/
│   │   ├── fashion/
│   │   │   ├── outfit-analyzer/route.ts
│   │   │   ├── trend-radar/route.ts
│   │   │   ├── occasion-planner/route.ts
│   │   │   ├── mood-style/route.ts
│   │   │   └── try-on/route.ts              # NEW — virtual try-on
│   │   ├── food/
│   │   │   ├── fridge-scanner/route.ts
│   │   │   ├── meal-planner/route.ts
│   │   │   └── nuskha/route.ts
│   │   ├── mental/
│   │   │   ├── chat/route.ts
│   │   │   └── journal-insights/route.ts
│   │   └── grok/                            # low-level (chat, vision, search)
│   ├── fashion/
│   │   ├── page.tsx                          # suite landing (now 5 features)
│   │   ├── outfit-analyzer/page.tsx
│   │   ├── trend-radar/page.tsx
│   │   ├── occasion-planner/page.tsx
│   │   ├── mood-style/page.tsx
│   │   └── try-on/page.tsx                  # NEW — virtual try-on UI
│   ├── food/…
│   ├── mental-health/…
│   ├── premium/page.tsx
│   ├── page.tsx                              # landing page (the hero showpiece)
│   ├── layout.tsx                            # root layout, fonts, metadata, favicon
│   └── globals.css                           # paper texture, wobble filters
├── components/
│   ├── brand/PhoenixLogo.tsx                 # uses /public/phoenix-logo.png
│   ├── sketch/                               # SketchButton, SketchCard, SketchInput, Doodles
│   ├── landing/Hero.tsx                      # giant animated phoenix
│   ├── layout/{Navbar,Footer,SectionHero,FeatureTile}.tsx
│   ├── feature/{ImageUploader,PremiumGate,Loading,ErrorBox}.tsx
│   └── premium/{CheckoutModal,PremiumBadge}.tsx
├── lib/
│   ├── grok.ts                               # unified Grok client (chat/vision/search/image)
│   ├── prompts/                              # system prompts + JSON schemas per feature
│   ├── crisis.ts                             # crisis keyword regex + Indian helplines
│   ├── premium.ts                            # localStorage premium state
│   └── utils.ts                              # cn() class merger
├── public/
│   ├── phoenix-logo.png                      # 427x492 transparent PNG (after processing)
│   └── phoenix-logo.jpg                      # 1024x560 original (source)
├── scripts/
│   └── process-logo.js                       # one-off JPG → transparent PNG converter
├── .env.example
├── .env.local                                # user-filled, git-ignored
├── tailwind.config.ts
├── next.config.mjs
├── package.json
├── README.md
└── HANDOFF.md                                # THIS FILE
```

---

## 3. Environment Variables

**File:** `.env.local` (git-ignored). Copy from `.env.example`.

```ini
GROK_API_KEY=xai-xxxxxxxxxxxxxxxxxxxxxxxx
GROK_API_BASE_URL=https://api.x.ai/v1

# All modern Grok language models accept image input, so VISION_MODEL = TEXT_MODEL by default
GROK_TEXT_MODEL=grok-4-1-fast-non-reasoning
GROK_VISION_MODEL=grok-4-1-fast-non-reasoning

# Image generation (use grok-imagine-image-pro for higher quality)
GROK_IMAGE_MODEL=grok-imagine-image
```

### Current available xAI models (confirmed from console screenshot)

| Category | Model | Modality |
|---|---|---|
| Language | `grok-4.20-0309-reasoning` | T + image → T |
| Language | `grok-4.20-0309-non-reasoning` | T + image → T |
| Language | `grok-4.20-multi-agent-0309` | T + image → T |
| Language | **`grok-4-1-fast-reasoning`** | T + image → T |
| Language | **`grok-4-1-fast-non-reasoning`** ← current default | T + image → T |
| Image gen | **`grok-imagine-image`** ← current default | T + image → image |
| Image gen | `grok-imagine-image-pro` | T + image → image |
| Video gen | `grok-imagine-video` | T + image + video → video |
| Realtime / TTS / STT | Realtime API, Text to Speech, Speech to Text | — |

**IMPORTANT:** The OpenAI-style `grok-2-*` model names no longer work — they return `400 Model not found`. All references have been migrated.

---

## 4. Grok Client (`lib/grok.ts`)

All Grok calls go through this single module. Key exports:

| Function | Purpose |
|---|---|
| `grokChat(opts)` | Raw chat-completions call. Supports `response_format: { type: "json_object" }` |
| `grokText(userMsg, systemPrompt?, opts?)` | Simple text wrapper |
| `grokVision(imageUrl, prompt, systemPrompt?, { jsonMode })` | Vision analysis. `jsonMode: true` forces strict JSON output. |
| `grokVisionMulti(imageUrls[], prompt, systemPrompt?)` | Multi-image vision |
| `grokLiveSearch(userMsg, systemPrompt?)` | Web-search assisted chat |
| `grokImage(prompt, { n, referenceImages, model, responseFormat })` | Image generation. **Falls back gracefully:** tries `/chat/completions` with `modalities:["image"]` when `referenceImages` is provided, then `/images/generations` with `image` + `reference_images` fields, then text-only. Returns `{ urls, b64?, revisedPrompts?, usedReference }`. |
| `safeParseJSON<T>(raw)` | Strips ```json fences, parses tolerantly |

**Note:** xAI's image-gen API shape for reference images is not publicly documented. `grokImage` tries multiple endpoint/payload shapes; in production test this and simplify once the real shape is known.

---

## 5. Features Built (9 total — "5 + 3 + 2")

### 🎨 Fashion Suite (5 features)
| Feature | Route | API | Status |
|---|---|---|---|
| Outfit Analyzer | `/fashion/outfit-analyzer` | `/api/fashion/outfit-analyzer` | ✅ works |
| Trend Radar | `/fashion/trend-radar` | `/api/fashion/trend-radar` (live search) | ✅ works |
| Occasion Planner | `/fashion/occasion-planner` | `/api/fashion/occasion-planner` | ✅ works (premium) |
| Mood-Based Styling | `/fashion/mood-style` | `/api/fashion/mood-style` | ✅ works (premium) |
| **Virtual Try-On** | `/fashion/try-on` | `/api/fashion/try-on` | ⚠️ works but face-preservation depends on xAI supporting reference images — needs live testing |

### 🍲 Food Suite (3 features)
| Feature | Route | Status |
|---|---|---|
| Fridge-to-Recipe | `/food/fridge-scanner` | ✅ |
| Smart Meal Planner | `/food/meal-planner` | ✅ (premium) |
| Dadi-Nani Nuskhe | `/food/nuskha` | ✅ |

### 🧠 Mental Health Suite (3 features)
| Feature | Route | Status |
|---|---|---|
| Empathetic Chat | `/mental-health/chat` | ✅ (crisis detection active) |
| Mood Journal + Insights | `/mental-health/journal` | ✅ (localStorage) |
| Peer Circles | `/mental-health/circles` | ✅ (mock anonymous threads) |

### Extra pages
- `/` — animated landing page with hero, testimonials, parallax doodles
- `/premium` — fake checkout (localStorage flag unlocks premium features)
- `/playground` — Grok chat playground

---

## 6. Recent Work Log (Session Ending 2026-04-20)

### Session goal: build the Virtual Try-On feature + polish branding.

1. **Built full Virtual Try-On feature** (`/fashion/try-on`)
   - 2 uploaders (person + outfit) + scene picker + "keep original background" toggle
   - `/api/fashion/try-on` runs: vision on person → vision on outfit → prompt composition → image generation
   - Result view shows before/after polaroid strip + analysis cards + prompt reveal
2. **Migrated models** from deprecated `grok-2-vision-*` / `grok-2-image-*` to current `grok-4-1-fast-non-reasoning` / `grok-imagine-image`
3. **Fixed "Invalid JSON" error** by adding `response_format: { type: "json_object" }` via a `jsonMode` flag on `grokVision`
4. **Added pose/identity preservation** in try-on:
   - Richer vision schema (face features, body position, background, lighting)
   - Strong "DO NOT change face/pose" prompt directives
   - **Passes person + outfit photos as `referenceImages`** to `grokImage` for true image-to-image
   - New grokImage falls back through multiple endpoints when refs are provided
5. **Brand logo work:**
   - User provided custom phoenix artwork (`photo_2026-04-19_22-20-25.jpg`)
   - Saved to `public/phoenix-logo.jpg`
   - CSS blend-mode approach (multiply/darken) **failed** because `ParallaxDoodle` creates an isolated stacking context in the hero
   - **Final fix:** wrote `scripts/process-logo.js` using `sharp` to:
     - Trim white borders (now 427×492 tight crop)
     - Smooth-remove white pixels → true alpha channel
     - Output `public/phoenix-logo.png`
   - Rewrote `PhoenixLogo.tsx` to use the PNG + added an optional `glow` prop (pulsing aura for the hero)
   - Bumped navbar sizes (52→64, 40→52) and hero size (280→320)
   - Updated favicon in `app/layout.tsx` to use the logo

### Files touched in this session
- `lib/grok.ts` (major additions: `grokImage` overhaul, `jsonMode` on vision, new models)
- `app/api/fashion/try-on/route.ts` (new)
- `app/fashion/try-on/page.tsx` (new)
- `app/fashion/page.tsx` (added 5th feature tile)
- `components/brand/PhoenixLogo.tsx` (rewritten)
- `components/layout/Navbar.tsx` (logo sizes)
- `components/landing/Hero.tsx` (logo size 320 + glow)
- `components/feature/ImageUploader.tsx` (now accepts `id` prop so 2 uploaders can coexist)
- `app/layout.tsx` (favicon metadata)
- `.env.example` (new model env vars)
- `public/phoenix-logo.png` (new)
- `public/phoenix-logo.jpg` (new, source)
- `scripts/process-logo.js` (new, one-off)
- `package.json` (added `sharp` devDep)
- `README.md` (user added earlier, before this session)
- `HANDOFF.md` (this file)

### Commits pushed
- `98e582b` — readme
- `5c89866` — Change the Logo (first attempt — blend mode)
- `1f5a466` — Change the Logo (sizes)
- (pending) — transparent PNG + glow + try-on model fixes

---

## 7. Known Issues / TODO (for the next model)

### High priority
1. **Virtual Try-On — verify face preservation actually works**
   The code passes `referenceImages: [personImage, outfitImage]` to `grokImage`. We **assumed** xAI's `grok-imagine-image` supports this via `/chat/completions` with `modalities: ["image"]` OR `/images/generations` with `image` / `reference_images` fields. **None of these shapes are documented.** The user needs to actually run it and either:
   - Confirm it works → ship it
   - If it fails → check Network tab for the actual 4xx response, then either:
     (a) try a different payload key xAI expects, or
     (b) fall back to integrating a dedicated try-on API (e.g. `fal.ai` IDM-VTON) as a supplementary step while keeping Grok for analysis.

2. **Logo cache**
   Users who visited the site before the PNG update may still see the old white-box JPG. Hard refresh (Ctrl+Shift+R) clears it. Deploy will serve the new PNG to all new visitors.

### Nice-to-have
- Real payment integration (Razorpay) — currently fake localStorage flag
- Supabase auth + cloud-synced journal (currently localStorage only)
- Voice-first journaling (Whisper → xAI Speech-to-Text is available in catalogue)
- iOS/Android via Capacitor
- Better OG/social-share image using the new logo

### Known quirks
- `.env.local` env vars require a **dev server restart** to load (not hot-reloaded)
- `.next` build cache sometimes gets stale between route additions — run `Remove-Item -Recurse -Force .next` if you see weird module errors
- Stale TS server errors after deleting + recreating a file — they clear on next compile

---

## 8. Running Locally

```powershell
cd "c:\Users\Asus\Downloads\Vercera Hackathon\phoenix"
npm install
# Copy .env.example to .env.local and fill in GROK_API_KEY
npm run dev                        # http://localhost:3000
# or
npm run build                      # production build — must pass before deploy
npm start                          # serve the build locally
```

**Re-processing the logo** (if source artwork changes):
```powershell
node scripts/process-logo.js
```

---

## 9. User Context & Communication Style

- User speaks mostly **Hinglish** (Hindi + English romanized).
- Prefers short, direct replies — no fluff, no acknowledgments.
- Likes seeing files changed summarized in tables + actionable next steps.
- Is on **Windows / PowerShell** — never use `cd` inline, pass `cwd` as a separate param to `run_command`.
- IDE: Cascade-compatible (VSCode-like).
- Hackathon context — speed matters, but prefers root-cause fixes over workarounds.

---

## 10. Starter Context String for the Next Model

Paste this into the new model's conversation:

> "I'm working on **Phoenix** — a Next.js 14 hackathon app with 3 AI suites (Fashion, Food, Mental Health) powered by xAI Grok. The full handoff, including file structure, env vars, Grok model catalogue, recent changes, and open issues, is in `HANDOFF.md` in the repo root. Please read it first before making any changes. My OS is Windows/PowerShell. I prefer terse Hinglish-friendly replies and minimal code edits. The repo is at `c:\Users\Asus\Downloads\Vercera Hackathon\phoenix`. Continue from where the previous assistant left off — specifically, help me verify/fix the Virtual Try-On face preservation and anything else I ask."

---

## 11. Quick Reference — Grok API Request Shapes

### Standard chat completion
```json
POST /v1/chat/completions
{
  "model": "grok-4-1-fast-non-reasoning",
  "messages": [{ "role": "user", "content": "Hi" }]
}
```

### Vision (image + text → text)
```json
POST /v1/chat/completions
{
  "model": "grok-4-1-fast-non-reasoning",
  "response_format": { "type": "json_object" },
  "messages": [{
    "role": "user",
    "content": [
      { "type": "image_url", "image_url": { "url": "<data: or https:>", "detail": "high" } },
      { "type": "text", "text": "Analyze this per the schema…" }
    ]
  }]
}
```

### Image generation (text only)
```json
POST /v1/images/generations
{
  "model": "grok-imagine-image",
  "prompt": "A photorealistic phoenix…",
  "n": 1,
  "response_format": "url"
}
```

### Image generation WITH reference (best guess — still unverified)
```json
POST /v1/chat/completions
{
  "model": "grok-imagine-image",
  "modalities": ["image"],
  "messages": [{
    "role": "user",
    "content": [
      { "type": "image_url", "image_url": { "url": "<person.jpg>", "detail": "high" } },
      { "type": "image_url", "image_url": { "url": "<outfit.jpg>", "detail": "high" } },
      { "type": "text", "text": "Put this person in this outfit, same pose…" }
    ]
  }]
}
```

### Live search
```json
POST /v1/chat/completions
{
  "model": "grok-4-1-fast-non-reasoning",
  "messages": [...],
  "search_parameters": { "mode": "on" }
}
```

---

**Good luck to the next assistant. Phoenix rises again. 🔥**
