import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SketchButton from "@/components/sketch/SketchButton";
import SketchCard from "@/components/sketch/SketchCard";
import SketchHeading from "@/components/sketch/SketchHeading";
import Hero from "@/components/landing/Hero";
import Reveal from "@/components/landing/Reveal";
import SuiteCard from "@/components/landing/SuiteCard";
import ScrollProgress from "@/components/landing/ScrollProgress";
import WavyDivider from "@/components/landing/WavyDivider";
import {
  DoodleStar,
} from "@/components/sketch/Doodles";
import Link from "next/link";
import {
  Shirt,
  Utensils,
  HeartPulse,
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


        {/* ============ MARQUEE STRIP ============ */}
        <section className="relative my-2 py-4 bg-paper-dark/50 text-ink overflow-hidden border-y-[2.5px] border-dashed border-ink/40 -mx-4 md:-mx-8">
          <div className="flex gap-10 animate-marquee whitespace-nowrap font-note text-xl uppercase tracking-wider">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-3 shrink-0">
                <DoodleStar size={18} color="#ff4500" />
                {item}
              </span>
            ))}
          </div>
        </section>

        <WavyDivider color="#ff4500" />

        {/* ============ THREE SUITES ============ */}
        <section id="suites" className="py-20 relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
             <div className="absolute top-[10%] left-[5%] animate-drift-1 opacity-20">
                <DoodleStar size={120} color="#ff4500" />
             </div>
             <div className="absolute bottom-[10%] right-[5%] animate-drift-2 opacity-20">
                <DoodleStar size={100} color="#fcbf49" />
             </div>
          </div>

          <Reveal>
            <div className="text-center mb-16 relative">
              <div className="font-scribble text-phoenix-flame text-2xl mb-2 animate-bounce inline-block">
                Choose Your Vibe ✨
              </div>
              <SketchHeading as="h2" underline className="!text-5xl md:!text-7xl mb-6">
                Pick Your Path
              </SketchHeading>
              <p className="font-hand text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
                Each suite is a mini AI studio. Designed to evolve with you. 
                <span className="block mt-2 text-ink-faded italic text-base">One app. Three worlds. Infinite possibilities.</span>
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



        <Footer />
      </main>
    </>
  );
}
