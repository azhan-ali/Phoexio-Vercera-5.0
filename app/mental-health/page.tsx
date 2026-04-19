import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHero from "@/components/layout/SectionHero";
import FeatureTile from "@/components/layout/FeatureTile";
import SketchHeading from "@/components/sketch/SketchHeading";
import SketchCard from "@/components/sketch/SketchCard";
import {
  HeartPulse,
  MessageCircleHeart,
  BookHeart,
  Users,
  LifeBuoy,
  Languages,
} from "lucide-react";

const features = [
  {
    href: "/mental-health/chat",
    title: "Anonymous AI Chat",
    tagline: "24/7, judgement-free",
    description:
      "Jab bhi mann bhaari lage — baat karo. Naam, login, kuch nahi chahiye. AI sune ga, samjhe ga, aur safe space de ga.",
    Icon: MessageCircleHeart,
    bullets: ["Fully anonymous", "Round the clock", "Empathetic AI-powered"],
    bg: "bg-sketch-purple/25",
    tilt: "left" as const,
    tape: true,
  },
  {
    href: "/mental-health/journal",
    title: "Mood Journal",
    tagline: "track your patterns",
    description:
      "Roz ek chhoti entry likh — mood, trigger, gratitude. AI pattern analyze kare ga aur weekly insights dikhayega.",
    Icon: BookHeart,
    bullets: ["Daily mood logs", "Pattern analysis", "Private & encrypted"],
    bg: "bg-sketch-blue/20",
    tilt: "right" as const,
  },
  {
    href: "/mental-health/crisis",
    title: "Crisis Support",
    tagline: "help is close",
    description:
      "Agar kabhi heavy feel ho — real Indian helplines (iCall, Vandrevala Foundation) instantly accessible. AI detect bhi karega warning signs.",
    Icon: LifeBuoy,
    bullets: ["Real helpline numbers", "Auto crisis detection", "Location-aware"],
    bg: "bg-sketch-red/20",
    tilt: "left" as const,
  },
  {
    href: "/mental-health/circles",
    title: "Peer Support Circles",
    tagline: "you're not alone",
    description:
      "Anonymous topic-based chat circles — anxiety, exam stress, heartbreak, career. Real humans, moderated, safe.",
    Icon: Users,
    bullets: ["Topic-based groups", "Moderated", "Anonymous handles"],
    bg: "bg-sketch-green/20",
    tilt: "right" as const,
  },
  {
    href: "/mental-health/language",
    title: "Hindi + Regional Support",
    tagline: "apni bhasha mein",
    description:
      "Hindi, Marathi, Tamil, Bengali — apni comfort language mein baat karo. Emotional nuance fully preserve.",
    Icon: Languages,
    bullets: ["7+ Indian languages", "Code-switch friendly", "Culturally aware"],
    bg: "bg-phoenix-gold/20",
    tilt: "left" as const,
  },
];

export default function MentalHealthPage() {
  return (
    <main className="px-4 md:px-8 max-w-7xl mx-auto">
      <Navbar />

      <SectionHero
        eyebrow="Mental Health First Responder"
        title="Feel"
        highlight="lighter"
        subtitle="India mein 150M+ log mental health issues face karte hain. Phoenix judgement-free AI + real crisis connect + community, sab ek jagah."
        Icon={HeartPulse}
        accentColor="bg-sketch-purple/40"
        doodleColors={["#9d4edd", "#4361ee", "#ff6b9d", "#52b788"]}
      />

      <section className="pb-10">
        <div className="text-center mb-6">
          <div className="font-hand text-phoenix-flame text-lg">// 5 features</div>
          <SketchHeading as="h2" underline className="!text-3xl md:!text-4xl">
            Safe space, always
          </SketchHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureTile key={f.href} {...f} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
