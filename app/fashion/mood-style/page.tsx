"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import PremiumGate from "@/components/feature/PremiumGate";
import Loading from "@/components/feature/Loading";
import ErrorBox from "@/components/feature/ErrorBox";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { SketchTextarea } from "@/components/sketch/SketchInput";
import { DoodleHeart, DoodleStar } from "@/components/sketch/Doodles";
import { Smile, Sparkles, Palette, Shirt } from "lucide-react";
import type { MoodStyleResult } from "@/lib/prompts/fashion";

const moods = [
  { label: "happy", emoji: "😊", color: "bg-sketch-yellow/40" },
  { label: "confident", emoji: "💪", color: "bg-phoenix-flame/30" },
  { label: "sad", emoji: "😔", color: "bg-sketch-blue/30" },
  { label: "anxious", emoji: "😰", color: "bg-sketch-purple/30" },
  { label: "excited", emoji: "🤩", color: "bg-sketch-pink/30" },
  { label: "tired", emoji: "😴", color: "bg-ink/10" },
  { label: "romantic", emoji: "🥰", color: "bg-sketch-red/20" },
  { label: "powerful", emoji: "🔥", color: "bg-phoenix-gold/40" },
];

export default function MoodStylePage() {
  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/fashion"
        backLabel="back to fashion"
        eyebrow="Fashion · Premium ✨"
        title="Mood-Based"
        highlight="Styling"
        subtitle="Aaj ka mood batao — Phoenix suggest karega colors aur outfits jo us feeling ko match ya uplift karein. Color psychology + empathy."
        Icon={Smile}
      />

      <PremiumGate featureName="Mood-Based Styling">
        <Inner />
      </PremiumGate>

      <div className="pb-10" />
      <Footer />
    </main>
  );
}

function Inner() {
  const [mood, setMood] = useState("confident");
  const [freeText, setFreeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MoodStyleResult | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/fashion/mood-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, freeText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!result && (
        <SketchCard variant="cream" className="!p-5 mb-6">
          <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
            how are you feeling today?
          </SketchHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`p-3 border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] font-scribble text-xl capitalize transition ${
                  mood === m.label
                    ? "bg-phoenix-flame text-white -translate-y-1"
                    : `${m.color} hover:-translate-y-0.5`
                }`}
                style={{ filter: "url(#sketch-roughen)" }}
              >
                <div className="text-3xl mb-1">{m.emoji}</div>
                <div>{m.label}</div>
              </button>
            ))}
          </div>

          <SketchTextarea
            label="want to share more? (optional)"
            rows={3}
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            placeholder="e.g. big meeting today, feeling jittery…"
          />

          <div className="mt-4">
            <SketchButton variant="flame" size="lg" onClick={analyze} disabled={loading}>
              <Sparkles size={18} />
              {loading ? "Feeling it…" : "Style my mood"}
            </SketchButton>
          </div>
        </SketchCard>
      )}

      {loading && <Loading label="Blending color psychology with your vibe…" />}
      {error && <ErrorBox message={error} />}

      {result && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <SketchHeading as="h2" className="!text-3xl md:!text-4xl" underline>
              For your {result.mood} mood
            </SketchHeading>
            <SketchButton variant="ghost" size="sm" onClick={() => setResult(null)}>
              Try another mood
            </SketchButton>
          </div>

          {/* Strategy */}
          <SketchCard variant="paper" className="!p-5 bg-phoenix-gold/20">
            <div className="flex items-center gap-3">
              <div
                className="px-3 py-1 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-scribble text-lg capitalize"
                style={{ filter: "url(#sketch-roughen)" }}
              >
                strategy: {result.strategy}
              </div>
            </div>
            <p className="font-note text-ink-soft mt-2">{result.strategyReason}</p>
          </SketchCard>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SketchCard variant="cream" className="!p-5 bg-sketch-green/10">
              <div className="flex items-center gap-2 mb-3">
                <Palette size={22} className="text-sketch-green" />
                <SketchHeading as="h3" font="scribble" className="!text-xl">
                  wear these
                </SketchHeading>
              </div>
              <div className="space-y-2">
                {result.colorsToWear.map((c, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-center p-3 bg-paper-cream border-[2px] border-ink rounded-xl"
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg border-[2.5px] border-ink shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <div className="font-scribble text-lg font-bold capitalize leading-none">
                        {c.name}
                      </div>
                      <div className="font-note text-xs text-ink-faded mb-0.5">{c.hex}</div>
                      <div className="font-note text-sm text-ink-soft">{c.why}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SketchCard>

            <SketchCard variant="cream" className="!p-5 bg-sketch-red/10">
              <div className="flex items-center gap-2 mb-3">
                <Palette size={22} className="text-sketch-red" />
                <SketchHeading as="h3" font="scribble" className="!text-xl">
                  skip these today
                </SketchHeading>
              </div>
              <ul className="space-y-2">
                {result.colorsToAvoid.map((c, i) => (
                  <li
                    key={i}
                    className="p-3 bg-paper-cream border-[2px] border-ink rounded-xl"
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    <div className="font-scribble text-lg font-bold capitalize line-through opacity-60">
                      {c.name}
                    </div>
                    <div className="font-note text-sm text-ink-soft">{c.why}</div>
                  </li>
                ))}
              </ul>
            </SketchCard>
          </div>

          {/* Outfits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {result.outfits.map((o, i) => (
              <SketchCard
                key={i}
                variant="paper"
                tilt={i === 0 ? "left" : "right"}
                tape={i === 0}
                className="bg-sketch-pink/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shirt size={22} className="text-phoenix-flame" />
                  <SketchHeading as="h3" font="scribble" className="!text-2xl">
                    {o.title}
                  </SketchHeading>
                </div>
                <span
                  className="inline-block px-2 py-0.5 bg-phoenix-gold/40 border-[2px] border-ink rounded-full font-hand text-xs mb-3"
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  {o.vibeTag}
                </span>
                <p className="font-note text-ink-soft mb-3">{o.description}</p>
                <ul className="space-y-1 font-note text-sm">
                  <li>
                    <span className="font-hand text-ink-faded">top:</span> {o.topIdea}
                  </li>
                  <li>
                    <span className="font-hand text-ink-faded">bottom:</span> {o.bottomIdea}
                  </li>
                  <li>
                    <span className="font-hand text-ink-faded">accessory:</span>{" "}
                    {o.accessoryIdea}
                  </li>
                </ul>
              </SketchCard>
            ))}
          </div>

          {/* Affirmation */}
          <SketchCard
            variant="paper"
            className="!p-6 text-center bg-phoenix-flame/15 relative overflow-hidden"
          >
            <div className="absolute top-3 left-3 animate-wobble-slow">
              <DoodleHeart size={28} color="#e63946" />
            </div>
            <div className="absolute bottom-3 right-3 animate-wobble-slow">
              <DoodleStar size={28} color="#ffba08" />
            </div>
            <div className="font-hand text-sm text-ink-faded mb-1">a note for you</div>
            <p className="font-scribble text-2xl md:text-3xl font-bold ink-text max-w-xl mx-auto leading-snug">
              "{result.affirmation}"
            </p>
          </SketchCard>
        </div>
      )}
    </>
  );
}
