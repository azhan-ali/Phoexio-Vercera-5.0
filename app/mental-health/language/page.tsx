import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { SUPPORTED_LANGUAGES } from "@/lib/prompts/mental";
import { DoodleHeart } from "@/components/sketch/Doodles";
import { Languages, MessageCircleHeart, BookHeart, ArrowRight } from "lucide-react";
import Link from "next/link";

const sampleTranslations = [
  { lang: "Hindi", text: "मैं तुम्हारी बात सुनने के लिए हूँ। बताओ क्या चल रहा है मन में।" },
  { lang: "Marathi", text: "मी तुमचं ऐकण्यासाठी आहे. काय चाललंय मनात सांग." },
  { lang: "Tamil", text: "நான் உங்கள் பேச்சைக் கேட்க இருக்கிறேன். மனதில் என்ன நடக்கிறது சொல்லுங்கள்." },
  { lang: "Bengali", text: "আমি শুনতে আছি। মনে কী চলছে বলো।" },
  { lang: "Gujarati", text: "હું તમારી વાત સાંભળવા માટે છું. મનમાં શું ચાલી રહ્યું છે કહો." },
  { lang: "Hinglish", text: "Main sun raha hun yaar. Bata, mann mein kya chal raha hai?" },
];

export default function LanguagePage() {
  return (
    <main className="px-4 md:px-8 max-w-5xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/mental-health"
        backLabel="back to mental health"
        eyebrow="Mental Health · Feature 5"
        title="Hindi + Regional"
        highlight="Language Support"
        subtitle="Emotional nuance matter karta hai. Apni comfort language mein baat karo — Phoenix 8 Indian languages support karta hai."
        Icon={Languages}
      />

      {/* Supported languages */}
      <SketchCard variant="paper" className="!p-5 mb-6 bg-sketch-purple/10">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
          supported languages
        </SketchHeading>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LANGUAGES.map((l) => (
            <span
              key={l.code}
              className="px-3 py-1.5 bg-paper-cream border-[2px] border-ink rounded-full font-hand text-base"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              {l.label}
            </span>
          ))}
        </div>
        <p className="font-note text-sm text-ink-faded mt-3 italic">
          more languages coming soon — request via feedback
        </p>
      </SketchCard>

      {/* Sample tone */}
      <div className="mb-6">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3" underline>
          how it feels
        </SketchHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleTranslations.map((s, i) => (
            <SketchCard
              key={i}
              variant="cream"
              tilt={i % 2 === 0 ? "left" : "right"}
              tape={i === 0}
              className="bg-paper-cream"
            >
              <div className="font-hand text-xs text-ink-faded mb-1">{s.lang}</div>
              <p className="font-scribble text-xl text-ink leading-snug">"{s.text}"</p>
            </SketchCard>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <SketchCard variant="paper" className="!p-5 bg-sketch-blue/15 relative overflow-hidden">
          <div className="absolute top-3 right-3 animate-wobble-slow">
            <DoodleHeart size={24} color="#e63946" />
          </div>
          <MessageCircleHeart size={32} className="text-phoenix-flame mb-2" />
          <SketchHeading as="h4" font="scribble" className="!text-2xl mb-1">
            try it in chat
          </SketchHeading>
          <p className="font-note text-sm text-ink-soft mb-3">
            Language selector top-left me milega — select karke baat shuru karo.
          </p>
          <Link href="/mental-health/chat">
            <SketchButton variant="flame" size="sm">
              Open chat <ArrowRight size={14} />
            </SketchButton>
          </Link>
        </SketchCard>

        <SketchCard variant="paper" className="!p-5 bg-phoenix-gold/20">
          <BookHeart size={32} className="text-phoenix-flame mb-2" />
          <SketchHeading as="h4" font="scribble" className="!text-2xl mb-1">
            journal anywhere
          </SketchHeading>
          <p className="font-note text-sm text-ink-soft mb-3">
            Apni bhasha mein likho — AI insights bhi usi language ka context samjhega.
          </p>
          <Link href="/mental-health/journal">
            <SketchButton variant="gold" size="sm">
              Open journal <ArrowRight size={14} />
            </SketchButton>
          </Link>
        </SketchCard>
      </div>

      <Footer />
    </main>
  );
}
