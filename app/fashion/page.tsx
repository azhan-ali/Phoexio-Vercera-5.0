import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHero from "@/components/layout/SectionHero";
import FeatureTile from "@/components/layout/FeatureTile";
import SketchHeading from "@/components/sketch/SketchHeading";
import {
  Shirt,
  Camera,
  CalendarHeart,
  TrendingUp,
  Smile,
  Wand2,
} from "lucide-react";

const features = [
  {
    href: "/fashion/outfit-analyzer",
    title: "Outfit Analyzer",
    tagline: "scan your look",
    description:
      "Apni photo upload karo — AI detect karega body type, current outfit style, aur suggest karega improvements.",
    Icon: Camera,
    bullets: ["Body type detection", "Style category identification", "Personalized suggestions"],
    bg: "bg-sketch-pink/20",
    tilt: "left" as const,
    tape: true,
  },
  {
    href: "/fashion/trend-radar",
    title: "Trend Radar",
    tagline: "live from the web",
    description:
      "Grok ka live web search — is week India & globally kya trending hai, aur ye trends tumhare body type ke saath kaise match honge.",
    Icon: TrendingUp,
    bullets: ["India + global trends", "Seasonal (summer/winter/festive)", "Body-type matched"],
    bg: "bg-sketch-blue/20",
    tilt: "right" as const,
  },
  {
    href: "/fashion/occasion-planner",
    title: "Occasion Package",
    tagline: "poori shaam plan",
    description:
      "'Date night' chuno — outfit + restaurant vibe + 2–3 dish suggestions + playlist mood. Sirf fashion nahi, poori evening.",
    Icon: CalendarHeart,
    bullets: ["Holistic AI reasoning", "Outfit + dining + music", "Multiple occasions"],
    bg: "bg-phoenix-gold/25",
    tilt: "left" as const,
    premium: true,
  },
  {
    href: "/fashion/try-on",
    title: "Virtual Try-On",
    tagline: "see it before you buy",
    description:
      "Apni photo + outfit ki photo daalo \u2014 Grok AI generate karega ek naya image jisme tum that exact outfit pehne hue ho. Studio / outdoor / wedding \u2014 any vibe.",
    Icon: Wand2,
    bullets: ["Grok Vision reads you + outfit", "Grok Image paints the result", "Choose your own scene"],
    bg: "bg-phoenix-flame/15",
    tilt: "left" as const,
    tape: true,
    premium: true,
  },
  {
    href: "/fashion/mood-style",
    title: "Mood-Based Styling",
    tagline: "feel it, wear it",
    description:
      "Aaj ka mood batao — sad / confident / anxious — AI suggest karega colors & outfits jo us vibe ko uplift karein.",
    Icon: Smile,
    bullets: ["Color psychology", "Mood-lifting outfits", "Daily recommendations"],
    bg: "bg-sketch-purple/20",
    tilt: "right" as const,
    premium: true,
  },
];

export default function FashionPage() {
  return (
    <main className="px-4 md:px-8 max-w-7xl mx-auto">
      <Navbar />

      <SectionHero
        eyebrow="Fashion & Style Suite"
        title="Dress like the"
        highlight="best version of you"
        subtitle="AI-powered outfit analysis, live trend radar, and holistic occasion planning. Your personal stylist, sketched in pencil."
        Icon={Shirt}
        accentColor="bg-sketch-pink/40"
        doodleColors={["#ff6b9d", "#e63946", "#fcbf49", "#9d4edd"]}
      />

      <section className="pb-10">
        <div className="text-center mb-6">
          <div className="font-hand text-phoenix-flame text-lg">// 5 features</div>
          <SketchHeading as="h2" underline className="!text-3xl md:!text-4xl">
            What's inside
          </SketchHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <FeatureTile key={f.href} {...f} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
