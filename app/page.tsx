import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SketchButton from "@/components/sketch/SketchButton";
import SketchCard from "@/components/sketch/SketchCard";
import SketchHeading from "@/components/sketch/SketchHeading";
import Hero from "@/components/landing/Hero";
import Reveal from "@/components/landing/Reveal";
import AnimatedCounter from "@/components/landing/AnimatedCounter";
import ScrollProgress from "@/components/landing/ScrollProgress";
import SuiteCard from "@/components/landing/SuiteCard";
import Testimonials from "@/components/landing/Testimonials";
import WavyDivider from "@/components/landing/WavyDivider";
import {
  DoodleStar,
  DoodleCheck,
  DoodleLightning,
  DoodleHeart,
  DoodleArrow,
} from "@/components/sketch/Doodles";
import Link from "next/link";
import {
  Shirt,
  Utensils,
  HeartPulse,
  Sparkles,
  ArrowRight,
  Camera,
  MessageCircleHeart,
  TrendingUp,
  ChefHat,
  Brain,
  Leaf,
  Zap,
  Globe,
  Crown,
} from "lucide-react";

/* ============================================================= */
/* SUITE DATA                                                     */
/* ============================================================= */

// inline JSX mockups shown inside each suite card
const FashionPreview = (
  <div className="relative">
    <div className="font-hand text-xs text-ink-faded mb-1">outfit analyzer output</div>
    <div className="flex items-center gap-2 mb-1">
      <div className="font-scribble font-bold text-2xl text-phoenix-flame">8</div>
      <div className="font-hand text-xs text-ink-faded">/10 style score</div>
    </div>
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 border border-ink rounded-sm ${
            i < 8 ? "bg-phoenix-flame" : "bg-paper-dark"
          }`}
        />
      ))}
    </div>
    <div className="flex flex-wrap gap-1">
      {["hourglass", "streetwear", "vibrant"].map((t) => (
        <span key={t} className="px-1.5 py-0.5 bg-sketch-pink/30 border border-ink rounded-full font-note text-[10px]">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const FoodPreview = (
  <div>
    <div className="font-hand text-xs text-ink-faded mb-1">detected from fridge</div>
    <div className="flex flex-wrap gap-1 mb-2">
      {["🍅 tomato", "🧅 onion", "🧀 paneer", "🌿 dhaniya"].map((t) => (
        <span key={t} className="px-1.5 py-0.5 bg-sketch-green/20 border border-ink rounded-full font-note text-[10px]">
          {t}
        </span>
      ))}
    </div>
    <div className="font-hand text-xs text-ink-faded mb-0.5">→ recipes</div>
    <div className="font-scribble text-sm font-bold">Paneer Bhurji · Tamatar Chutney · Onion Paratha</div>
  </div>
);

const MentalPreview = (
  <div>
    <div className="font-hand text-xs text-ink-faded mb-1">mood trend · 7 days</div>
    <div className="flex items-end gap-0.5 h-10 mb-1">
      {[4, 5, 3, 6, 7, 6, 8].map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-sketch-purple/60 border border-ink rounded-t"
          style={{ height: `${v * 10}%` }}
        />
      ))}
    </div>
    <div className="font-note text-[11px] text-ink-soft italic">"trending up — keep going 💜"</div>
  </div>
);

const suites = [
  {
    title: "Fashion & Style",
    tag: "look your best",
    icon: <Shirt size={28} strokeWidth={2.2} className="text-sketch-pink" />,
    bg: "bg-sketch-pink/20",
    href: "/fashion",
    tilt: "left" as const,
    preview: FashionPreview,
    features: [
      "AI Outfit Analyzer",
      "Live Trend Radar",
      "Occasion Complete Package ✨",
      "Mood-Based Styling ✨",
    ],
  },
  {
    title: "Food & Nutrition",
    tag: "eat smarter",
    icon: <Utensils size={28} strokeWidth={2.2} className="text-sketch-green" />,
    bg: "bg-sketch-green/20",
    href: "/food",
    tilt: "none" as const,
    preview: FoodPreview,
    features: [
      "Fridge-to-Recipe AI",
      "Body-Type Meal Planner",
      "Dadi-Nani Ke Nuskhe",
    ],
  },
  {
    title: "Mental Health",
    tag: "feel lighter",
    icon: <HeartPulse size={28} strokeWidth={2.2} className="text-sketch-purple" />,
    bg: "bg-sketch-purple/20",
    href: "/mental-health",
    tilt: "right" as const,
    preview: MentalPreview,
    features: [
      "Anonymous AI Chat · 8 languages",
      "Mood Journal + AI Insights",
      "Crisis support · peer circles",
    ],
  },
];

const heroStats = [
  { n: 3, label: "AI suites", suffix: "" },
  { n: 12, label: "features", suffix: "+" },
  { n: "24/7", label: "support", suffix: "" },
  { n: 8, label: "languages", suffix: "" },
];

const howItWorks = [
  { n: 1, title: "Pick your vibe", desc: "Fashion · food · mental — choose your suite.", Icon: Sparkles },
  { n: 2, title: "Tell / show us", desc: "Photo upload karo, feelings likho, ya pucho.", Icon: Camera },
  { n: 3, title: "Get glow-up", desc: "Grok AI turant personalized advice deta hai.", Icon: Zap },
];

const whyPhoenix = [
  { Icon: Brain, title: "Grok-powered", desc: "Latest x.ai reasoning." },
  { Icon: Globe, title: "Hindi + English", desc: "Desi context, regional." },
  { Icon: Leaf, title: "Holistic", desc: "Mind · body · style in one." },
  { Icon: MessageCircleHeart, title: "Empathetic", desc: "Judgement-free zone." },
];

const marqueeItems = [
  "AI outfit analyzer",
  "fridge to recipe",
  "mood journal",
  "crisis helpline",
  "trend radar",
  "dadi ke nuskhe",
  "occasion planner",
  "peer support",
  "hindi support",
  "body-type meals",
];

/* ============================================================= */
/* PAGE                                                           */
/* ============================================================= */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main className="px-4 md:px-8 max-w-7xl mx-auto">
        <Navbar />

        <Hero />

        {/* ============ STATS ROW (counter-animated) ============ */}
        <section className="py-6">
          <SketchCard variant="paper" className="!p-6 bg-ink/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heroStats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="font-scribble text-5xl md:text-6xl font-bold text-phoenix-flame leading-none">
                      <AnimatedCounter value={s.n} suffix={s.suffix} />
                    </div>
                    <div className="font-hand text-sm text-ink-faded mt-2">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </SketchCard>
        </section>

        {/* ============ MARQUEE STRIP ============ */}
        <section className="relative my-2 py-3 bg-ink text-paper-cream overflow-hidden border-y-[3px] border-ink -mx-4 md:-mx-8">
          <div className="flex gap-10 animate-marquee whitespace-nowrap font-hand text-xl">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-3 shrink-0">
                <DoodleStar size={18} color="#ffba08" />
                {item}
              </span>
            ))}
          </div>
        </section>

        <WavyDivider color="#ff4500" />

        {/* ============ THREE SUITES ============ */}
        <section id="suites" className="py-10">
          <Reveal>
            <div className="text-center mb-8">
              <div className="font-hand text-phoenix-flame text-lg mb-1">// three suites</div>
              <SketchHeading as="h2" underline className="!text-4xl md:!text-5xl">
                Pick Your Path
              </SketchHeading>
              <p className="font-hand text-lg text-ink-faded mt-3 max-w-xl mx-auto">
                Each suite is a mini AI studio. Use one. Use all three. Phoenix remembers your vibe.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suites.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.15}>
                <SuiteCard {...s} />
              </Reveal>
            ))}
          </div>
        </section>

        <WavyDivider color="#9d4edd" />

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="py-10 relative">
          <Reveal>
            <div className="text-center mb-8">
              <div className="font-hand text-phoenix-flame text-lg mb-1">// 3 steps</div>
              <SketchHeading as="h2" underline tilt="right" className="!text-4xl md:!text-5xl">
                How it works
              </SketchHeading>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {howItWorks.map((step, i) => {
              const Icon = step.Icon;
              return (
                <Reveal key={step.n} delay={i * 0.15}>
                  <div className="relative h-full">
                    <SketchCard
                      variant="paper"
                      tilt={i % 2 === 0 ? "left" : "right"}
                      className="h-full"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-12 h-12 rounded-full bg-phoenix-flame text-white font-scribble text-3xl font-bold flex items-center justify-center border-[2.5px] border-ink shadow-[3px_3px_0_#1a1a1a]"
                          style={{ filter: "url(#sketch-roughen)" }}
                        >
                          {step.n}
                        </div>
                        <Icon size={30} className="text-ink" strokeWidth={2} />
                      </div>
                      <SketchHeading as="h4" font="scribble" className="!text-2xl mb-1">
                        {step.title}
                      </SketchHeading>
                      <p className="font-note text-base text-ink-soft">{step.desc}</p>
                    </SketchCard>
                    {i < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-5 z-10 -translate-y-1/2 animate-wobble-slow">
                        <DoodleArrow size={40} color="#ff4500" />
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============ WHY PHOENIX ============ */}
        <section className="py-12">
          <Reveal>
            <div className="text-center mb-8">
              <div className="font-hand text-phoenix-flame text-lg mb-1">// why phoenix?</div>
              <SketchHeading as="h2" underline className="!text-4xl md:!text-5xl">
                Built different
              </SketchHeading>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whyPhoenix.map((w, i) => {
              const Icon = w.Icon;
              return (
                <Reveal key={w.title} delay={i * 0.1}>
                  <SketchCard
                    variant={i % 2 === 0 ? "cream" : "paper"}
                    tilt={i % 2 === 0 ? "left" : "right"}
                    className="text-center !p-4 h-full"
                  >
                    <Icon size={30} className="mx-auto mb-2 text-phoenix-flame" strokeWidth={2.2} />
                    <div className="font-scribble text-xl font-bold ink-text">{w.title}</div>
                    <p className="font-note text-sm text-ink-faded mt-1">{w.desc}</p>
                  </SketchCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        <WavyDivider color="#52b788" />

        {/* ============ FEATURE SPOTLIGHT ============ */}
        <section className="py-12">
          <Reveal>
            <SketchCard variant="paper" className="!p-8 md:!p-12 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 rotate-12 opacity-40 animate-wobble-slow">
                <DoodleStar size={80} color="#fcbf49" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="font-hand text-sketch-pink text-lg mb-1">
                    // feature spotlight
                  </div>
                  <SketchHeading as="h3" font="scribble" className="!text-4xl mb-3">
                    Fridge-to-Recipe in{" "}
                    <span className="sketch-highlight">10 seconds</span>
                  </SketchHeading>
                  <p className="font-note text-lg text-ink-soft mb-4 leading-relaxed">
                    Fridge ki photo. Grok Vision andar sab identify karega — tamatar, pyaaz, paneer
                    — aur 3 Indian recipes suggest karega. No more "kya banau?" drama.
                  </p>
                  <ul className="space-y-2 mb-5">
                    {[
                      "Desi ingredients first priority",
                      "Step-by-step recipe + cook time",
                      "Missing ingredient alternatives",
                    ].map((x) => (
                      <li key={x} className="flex gap-2 items-center font-note">
                        <DoodleCheck size={20} color="#52b788" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <Link href="/food/fridge-scanner">
                    <SketchButton variant="flame">
                      Try Fridge Scanner <Camera size={18} />
                    </SketchButton>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <SketchCard variant="cream" tilt="right" tape className="max-w-xs w-full">
                    <div className="aspect-square bg-gradient-to-br from-sketch-green/30 to-sketch-yellow/40 rounded-xl border-[2px] border-ink flex items-center justify-center relative overflow-hidden">
                      <ChefHat size={80} className="text-ink" strokeWidth={1.8} />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-phoenix-flame text-white text-xs font-hand rounded-full border-2 border-ink">
                        photo
                      </div>
                    </div>
                    <div className="mt-3 font-hand text-center text-ink-soft">
                      "aaj kya banau?" → <span className="text-phoenix-flame font-bold">solved</span>
                    </div>
                  </SketchCard>
                </div>
              </div>
            </SketchCard>
          </Reveal>
        </section>

        {/* ============ TESTIMONIALS — auto-sliding marquee ============ */}
        <section id="love" className="py-12">
          <Reveal>
            <div className="text-center mb-6">
              <div className="font-hand text-phoenix-flame text-lg mb-1">// loved by</div>
              <SketchHeading as="h2" underline tilt="left" className="!text-4xl md:!text-5xl">
                Real humans, real glow-ups
              </SketchHeading>
            </div>
          </Reveal>
          <Testimonials />
        </section>

        <WavyDivider color="#ff4500" />

        {/* ============ BIG CTA ============ */}
        <section className="py-14">
          <Reveal>
            <SketchCard
              variant="paper"
              className="!p-10 md:!p-14 text-center bg-phoenix-flame/15 relative overflow-hidden"
            >
              <div className="absolute top-4 left-4 animate-wobble-slow">
                <DoodleLightning size={42} color="#fcbf49" />
              </div>
              <div className="absolute bottom-4 right-4 animate-wobble-slow">
                <DoodleHeart size={38} color="#e63946" />
              </div>
              <div className="absolute top-6 right-10 animate-pulse-soft">
                <DoodleStar size={30} color="#ff4500" />
              </div>
              <TrendingUp size={48} className="mx-auto mb-3 text-phoenix-flame" strokeWidth={2.2} />
              <SketchHeading as="h2" className="mb-3 !text-4xl md:!text-6xl">
                Ready to <span className="sketch-highlight">rise?</span>
              </SketchHeading>
              <p className="font-hand text-xl text-ink-soft max-w-lg mx-auto mb-6">
                Free forever. No login drama. Bas shuru karo — Phoenix wait kar raha hai.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/fashion">
                  <SketchButton variant="flame" size="lg">
                    Start now <ArrowRight size={20} />
                  </SketchButton>
                </Link>
                <Link href="/premium">
                  <SketchButton variant="gold" size="lg">
                    <Crown size={18} /> Unlock Premium
                  </SketchButton>
                </Link>
              </div>
            </SketchCard>
          </Reveal>
        </section>

        <Footer />
      </main>
    </>
  );
}
