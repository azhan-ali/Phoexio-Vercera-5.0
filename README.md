<div align="center">

# 🔥 Phoenix

### *Rebirth Yourself — One Sketch at a Time*

**An AI-powered lifestyle companion that helps you rise in three dimensions of your life: Fashion, Food, and Mental Health — all wrapped inside a warm, hand-drawn sketchbook universe.**

[![Next.js](https://img.shields.io/badge/Next.js-14-000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Grok AI](https://img.shields.io/badge/Powered%20by-Grok%204-ff6b35?style=for-the-badge)](https://x.ai)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](#-license)

[**Live Demo**](#) · [**Video Walkthrough**](#) · [**Report Bug**](#) · [**Request Feature**](#)

</div>

---

## ✨ The Story Behind Phoenix

> *"Every human has three fires inside them — the way they **look**, the way they **fuel themselves**, and the way they **feel**. When one flickers, the others dim. Phoenix is the first AI that tends to all three."*

Most lifestyle apps treat you like a machine — cold dashboards, generic advice, endless notifications. **Phoenix is different.** It feels like flipping through the diary of a kind friend who happens to be powered by the world's smartest AI. Wobbly borders, handwritten fonts, doodles in the margins, tape at the corners — every pixel is designed to remind you that **becoming a better version of yourself is a creative act, not a chore.**

---

## 🎯 What Phoenix Does — In 30 Seconds

Phoenix is a **single app with three AI-native lifestyle suites**, all powered by Grok 4:

| 🎨 Fashion Suite | 🍲 Food Suite | 🧠 Mental Health Suite |
|:---:|:---:|:---:|
| Stop staring at your closet | Stop wasting groceries | Stop suffering in silence |
| Look your best, every day | Eat healthy, save money | Feel heard, always |

It replaces **three separate $10/month apps** — a stylist, a nutritionist, and a wellness coach — with one beautifully crafted, AI-first experience.

---

## 🚀 The Three Suites — Nine Flagship Features

### 🎨 Fashion Suite — *Your Pocket Stylist*
| Feature | What it does | AI Magic |
|---|---|---|
| 👗 **Outfit Analyzer** | Upload any photo of yourself → get a style score, color palette, strengths, and tailored suggestions | Grok Vision |
| 📡 **Trend Radar** | Real-time global fashion trends with popularity scores and citations | Grok Live Search |
| 🎉 **Occasion Planner** | Tell it *"sister's wedding in Jaipur, December, budget ₹8000"* — get a complete package: outfit, venue vibe, food, music | Grok 4 Reasoning |
| 🌈 **Mood-Based Styling** | Feeling anxious? Confident? Dreamy? → Get colors and outfits that match your emotional state | Color psychology + AI |

### 🍲 Food Suite — *Your AI Chef & Dietician*
| Feature | What it does | AI Magic |
|---|---|---|
| 📸 **Fridge-to-Recipe** | Snap your fridge → detected ingredients + 3 recipes ranked by what you already have | Grok Vision |
| 📅 **Smart Meal Planner** | 7-day personalized plan with macros, shopping list, hydration, and warnings for your medical conditions | Grok 4 + nutrition logic |
| 🌿 **Dadi-Nani Nuskhe** | Traditional Indian home remedies with modern science notes, dosage, and cautions | Grok 4 + Ayurvedic knowledge |

### 🧠 Mental Health Suite — *Your 24/7 Companion*
| Feature | What it does | AI Magic |
|---|---|---|
| 💬 **Empathetic AI Chat** | Talk in English, Hindi, or Hinglish. Crisis keywords auto-trigger iCall / Vandrevala helplines | Grok 4 + multilingual prompts |
| 📓 **Mood Journal + Insights** | Daily entries → AI finds patterns, triggers, and positive streaks | Grok 4 + pattern analysis |
| 🫂 **Peer Support Circles** | Anonymous community threads on anxiety, burnout, relationships, and more | Moderated safe spaces |

---

## 🎨 Why Phoenix Feels Different

- **🖋️ Hand-drawn UI** — Every border wobbles (custom SVG filters), every card has tape corners, fonts are handwritten (`Caveat`, `Kalam`, `Patrick Hand`). It feels like a notebook, not a dashboard.
- **🎬 Cinematic Motion** — Framer Motion everywhere: parallax doodles that follow your cursor, scroll-triggered reveals, animated counters, a rotating orbit of icons around the phoenix logo.
- **🧭 Scroll Progress + Wavy Dividers** — Every section separated by hand-drawn SVG paths that draw themselves in as you scroll.
- **🔥 Giant Animated Phoenix Hero** — A living logo with pulsing aura rings, 4 floating tags, and draw-in underlines on the headline.
- **📱 Fully Responsive** — Slide-out drawer nav, touch-friendly tiles, mobile-optimized chat and journal.
- **♿ Accessible by Default** — Semantic HTML, keyboard nav, reduced-motion respected, color contrast AA+.

---

## 🏗️ Tech Stack

<table>
<tr>
<td><b>Frontend</b></td>
<td>Next.js 14 (App Router) · React 18 · TypeScript 5</td>
</tr>
<tr>
<td><b>Styling</b></td>
<td>Tailwind CSS · Custom paper-texture CSS · Google Fonts (handwritten) · SVG filter wobble</td>
</tr>
<tr>
<td><b>Animation</b></td>
<td>Framer Motion 12 · Custom keyframes · Scroll-triggered reveals · Spring physics parallax</td>
</tr>
<tr>
<td><b>AI</b></td>
<td>Grok 4 (text + reasoning) · Grok 2 Vision · Grok Live Search</td>
</tr>
<tr>
<td><b>State</b></td>
<td>React hooks · <code>localStorage</code> (mood journal, premium flag)</td>
</tr>
<tr>
<td><b>Icons</b></td>
<td>Lucide React · Custom hand-drawn SVG doodles</td>
</tr>
<tr>
<td><b>Deploy</b></td>
<td>Vercel (primary) · Netlify config included</td>
</tr>
</table>

---

## 📂 Project Structure

```
phoenix/
├── app/
│   ├── api/                      # Grok-powered API routes
│   │   ├── fashion/              # outfit-analyzer, trend-radar, occasion-planner, mood-style
│   │   ├── food/                 # fridge-scanner, meal-planner, nuskha
│   │   ├── mental/               # chat, journal-insights
│   │   └── grok/                 # low-level chat, vision, search wrappers
│   ├── fashion/                  # Fashion suite UI pages
│   ├── food/                     # Food suite UI pages
│   ├── mental-health/            # Mental Health suite UI pages
│   ├── premium/                  # Pricing + fake checkout
│   ├── page.tsx                  # Landing page (the showpiece)
│   ├── layout.tsx                # Root layout + fonts + metadata
│   ├── loading.tsx · error.tsx · not-found.tsx
│   └── globals.css               # Paper texture, wobble, sketch effects
├── components/
│   ├── brand/                    # PhoenixLogo (animated SVG)
│   ├── sketch/                   # SketchButton, SketchCard, SketchInput, Doodles, SVG defs
│   ├── landing/                  # Hero, SuiteCard, Testimonials, Reveal, ParallaxDoodle, ...
│   ├── layout/                   # Navbar, Footer, SectionHero, FeatureTile
│   ├── feature/                  # ImageUploader, PremiumGate, Loading, ErrorBox
│   └── premium/                  # CheckoutModal, PremiumBadge
├── lib/
│   ├── grok.ts                   # Unified Grok client (chat/vision/search + JSON parser)
│   ├── prompts/                  # System prompts + strict JSON schemas per feature
│   ├── crisis.ts                 # Crisis keyword regex + Indian helplines
│   ├── premium.ts                # LocalStorage premium state
│   └── utils.ts                  # cn() class merger
└── public/                       # Static assets
```

---

## ⚡ Quick Start (3 minutes)

### Prerequisites
- **Node.js 20+** and **npm**
- **Grok API key** → grab one at [x.ai](https://x.ai)

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/phoenix.git
cd phoenix
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```
Open `.env.local` and paste your key:
```ini
GROK_API_KEY=xai-xxxxxxxxxxxxxxxxxxxxxxxx
GROK_API_BASE_URL=https://api.x.ai/v1
GROK_TEXT_MODEL=grok-4-latest
GROK_VISION_MODEL=grok-2-vision-latest
```

### 3. Run
```bash
npm run dev
```
Open **http://localhost:3000** and watch the phoenix rise. 🔥

### 4. Production Build
```bash
npm run build && npm start
```

---

## 🌐 Deploy to Vercel in 60 Seconds

1. Push your fork to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Add `GROK_API_KEY` (and the 3 optional Grok env vars) under **Environment Variables**.
4. Click **Deploy**. Done. ☕

Full step-by-step with screenshots is in [`DEPLOY.md`](./DEPLOY.md).

---

## 🗺️ API Reference

All routes are `POST` and return strict JSON. Errors return `400` with `{ error: string }`.

| Endpoint | Purpose |
|---|---|
| `POST /api/fashion/outfit-analyzer` | Analyze uploaded outfit image |
| `POST /api/fashion/trend-radar` | Fetch current trends via live search |
| `POST /api/fashion/occasion-planner` | Full occasion package generation |
| `POST /api/fashion/mood-style` | Mood → colors + outfits |
| `POST /api/food/fridge-scanner` | Detect ingredients + suggest recipes |
| `POST /api/food/meal-planner` | 7-day personalized meal plan |
| `POST /api/food/nuskha` | Traditional Indian remedies |
| `POST /api/mental/chat` | Empathetic multi-turn chat w/ crisis detection |
| `POST /api/mental/journal-insights` | Pattern analysis across mood journal entries |

---

## 💳 Premium Model

Phoenix uses a **freemium** approach for the demo:
- **Free** — Outfit Analyzer, Trend Radar, Fridge Scanner, Nuskhe, AI Chat, Journal, Circles
- **Premium (₹299/mo)** — Occasion Planner, Mood-Based Styling, Smart Meal Planner, Priority AI

The checkout is **fake for the hackathon demo** — clicking "Pay" stores a flag in `localStorage` to unlock all features instantly. Swap in Stripe / Razorpay for production.

---

## 🛡️ Safety & Ethics

- **Crisis keyword detection** (English + Hindi + Hinglish regex) auto-prepends Indian helplines (iCall `9152987821`, Vandrevala `1860-266-2345`) in the chat response.
- **Medical remedies** ship with explicit disclaimers and "consult a doctor" warnings.
- **No PII stored** — everything lives in your browser's `localStorage`.
- **Anonymous circles** — no usernames, no tracking.

---

## 🧪 Scripts

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Serve production build
npm run lint     # Next.js ESLint
```

---

## 🗺️ Roadmap

- [ ] Real payment integration (Razorpay)
- [ ] Supabase auth + cloud-synced journal
- [ ] Voice-first journaling (Whisper)
- [ ] Fashion AR try-on
- [ ] Community challenges & streaks
- [ ] Push notifications via web-push
- [ ] iOS / Android via Capacitor

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first to discuss what you'd like to change. Please make sure to update tests as appropriate.

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

MIT © 2026 — Built with 🔥 for the **Vercera Hackathon**.

---

<div align="center">

### *"You don't need three apps. You need one that understands you."*

**⭐ Star this repo if Phoenix made you smile.**

Made with handwritten love, a lot of chai, and Grok 4.

</div>
