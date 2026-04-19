"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import ImageUploader from "@/components/feature/ImageUploader";
import Loading from "@/components/feature/Loading";
import ErrorBox from "@/components/feature/ErrorBox";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { DoodleCheck, DoodleStar } from "@/components/sketch/Doodles";
import { Camera, Sparkles, Shirt, Palette, Star } from "lucide-react";
import type { OutfitAnalysis } from "@/lib/prompts/fashion";

export default function OutfitAnalyzerPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OutfitAnalysis | null>(null);

  async function analyze() {
    if (!imageUrl) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/fashion/outfit-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setImageUrl(null);
    setError(null);
  }

  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/fashion"
        backLabel="back to fashion"
        eyebrow="Fashion · Feature 1"
        title="Outfit"
        highlight="Analyzer"
        subtitle="Apni photo upload karo — AI detect karega body type, style category, aur personalized suggestions de ga. Photo 100% private — kahi save nahi hoti."
        Icon={Camera}
      />

      {!result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          <SketchCard variant="cream" className="!p-5">
            <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
              Step 1 · upload photo
            </SketchHeading>
            <ImageUploader
              onImage={setImageUrl}
              label="click or drop your outfit photo"
              height="h-72"
            />
            <p className="font-note text-xs text-ink-faded mt-2 italic">
              💡 tip: full-body photo works best. Good lighting. Single person.
            </p>
            <div className="mt-4">
              <SketchButton
                variant="flame"
                size="lg"
                onClick={analyze}
                disabled={!imageUrl || loading}
              >
                <Sparkles size={18} />
                {loading ? "Analyzing…" : "Analyze my outfit"}
              </SketchButton>
            </div>
          </SketchCard>

          <SketchCard variant="paper" className="!p-5 bg-sketch-pink/10">
            <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
              what you'll get
            </SketchHeading>
            <ul className="space-y-2 font-note text-ink-soft">
              {[
                "Body type identified (hourglass, rectangle, pear, etc.)",
                "Outfit style category (casual, ethnic, streetwear…)",
                "Style score out of 10",
                "3 actionable improvement suggestions",
                "Colors to try · colors to avoid",
                "Occasions this outfit works for",
              ].map((x) => (
                <li key={x} className="flex gap-2 items-start">
                  <DoodleCheck size={18} color="#52b788" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </SketchCard>
        </div>
      )}

      {loading && <Loading label="Analyzing your look…" />}
      {error && (
        <div className="pb-10">
          <ErrorBox message={error} />
        </div>
      )}

      {result && (
        <div className="pb-10">
          <ResultView result={result} imageUrl={imageUrl} onReset={reset} />
        </div>
      )}

      <Footer />
    </main>
  );
}

/* ============ RESULT VIEW ============ */
function ResultView({
  result,
  imageUrl,
  onReset,
}: {
  result: OutfitAnalysis;
  imageUrl: string | null;
  onReset: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <SketchHeading as="h2" className="!text-3xl md:!text-4xl" underline>
          Your analysis
        </SketchHeading>
        <SketchButton variant="ghost" size="sm" onClick={onReset}>
          <Camera size={16} /> Try another photo
        </SketchButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Photo + score */}
        <SketchCard variant="cream" tape className="!p-4 md:col-span-1">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="your photo"
              className="w-full rounded-lg border-[2px] border-ink mb-3"
            />
          )}
          <div className="text-center">
            <div className="font-hand text-sm text-ink-faded">style score</div>
            <div className="font-scribble text-6xl font-bold text-phoenix-flame">
              {result.outfit.styleScore}
              <span className="text-2xl text-ink-faded">/10</span>
            </div>
            <div className="flex justify-center gap-0.5 mt-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < result.outfit.styleScore
                      ? "text-phoenix-flame fill-phoenix-flame"
                      : "text-ink-faded/30"
                  }
                />
              ))}
            </div>
          </div>
        </SketchCard>

        {/* Body type + outfit meta */}
        <SketchCard variant="paper" className="!p-5 md:col-span-2 bg-sketch-pink/15">
          <div className="mb-4">
            <div className="font-hand text-sm text-ink-faded">body type</div>
            <div className="font-scribble text-3xl font-bold ink-text capitalize">
              {result.bodyType.replace("-", " ")}
            </div>
            <p className="font-note text-sm text-ink-soft mt-1">{result.bodyTypeNote}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InfoChip label="category" value={result.outfit.category} Icon={Shirt} />
            <InfoChip label="vibe" value={result.outfit.vibe} Icon={Sparkles} />
          </div>
          <div className="mt-3">
            <div className="font-hand text-sm text-ink-faded mb-1">visible items</div>
            <div className="flex flex-wrap gap-1.5">
              {result.outfit.items.map((it) => (
                <Chip key={it}>{it}</Chip>
              ))}
            </div>
          </div>
        </SketchCard>
      </div>

      {/* Strengths */}
      <SketchCard variant="cream" className="!p-5 bg-sketch-green/15">
        <div className="flex items-center gap-2 mb-2">
          <DoodleStar size={24} color="#52b788" />
          <SketchHeading as="h3" font="scribble" className="!text-2xl">
            what's working
          </SketchHeading>
        </div>
        <ul className="space-y-1.5">
          {result.strengths.map((s) => (
            <li key={s} className="flex gap-2 items-start font-note">
              <DoodleCheck size={18} color="#52b788" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </SketchCard>

      {/* Suggestions */}
      <SketchCard variant="paper" className="!p-5">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
          💡 suggestions to level-up
        </SketchHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {result.suggestions.map((s, i) => (
            <div
              key={i}
              className="p-4 bg-phoenix-gold/20 border-[2px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px]"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              <div className="font-scribble text-xl font-bold mb-1">{s.title}</div>
              <p className="font-note text-sm text-ink-soft">{s.description}</p>
            </div>
          ))}
        </div>
      </SketchCard>

      {/* Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SketchCard variant="cream" className="!p-5 bg-sketch-green/10">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={22} className="text-sketch-green" />
            <SketchHeading as="h3" font="scribble" className="!text-xl">
              colors to try
            </SketchHeading>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.colorsToTry.map((c) => (
              <ColorChip key={c} name={c} variant="try" />
            ))}
          </div>
        </SketchCard>
        <SketchCard variant="cream" className="!p-5 bg-sketch-red/10">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={22} className="text-sketch-red" />
            <SketchHeading as="h3" font="scribble" className="!text-xl">
              colors to avoid
            </SketchHeading>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.colorsToAvoid.map((c) => (
              <ColorChip key={c} name={c} variant="avoid" />
            ))}
          </div>
        </SketchCard>
      </div>

      {/* Dominant colors + occasions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SketchCard variant="paper" className="!p-5">
          <SketchHeading as="h3" font="scribble" className="!text-xl mb-2">
            dominant colors in your outfit
          </SketchHeading>
          <div className="flex flex-wrap gap-1.5">
            {result.outfit.dominantColors.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        </SketchCard>
        <SketchCard variant="paper" className="!p-5 bg-phoenix-gold/15">
          <SketchHeading as="h3" font="scribble" className="!text-xl mb-2">
            perfect for
          </SketchHeading>
          <div className="flex flex-wrap gap-1.5">
            {result.occasionsThisWorksFor.map((o) => (
              <Chip key={o}>{o}</Chip>
            ))}
          </div>
        </SketchCard>
      </div>
    </div>
  );
}

function InfoChip({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: typeof Shirt;
}) {
  return (
    <div
      className="p-3 bg-paper-cream border-[2px] border-ink rounded-xl"
      style={{ filter: "url(#sketch-roughen)" }}
    >
      <div className="flex items-center gap-1.5 font-hand text-xs text-ink-faded">
        <Icon size={12} /> {label}
      </div>
      <div className="font-scribble text-lg font-bold capitalize">{value}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-3 py-0.5 bg-paper-cream border-[2px] border-ink rounded-full font-note text-sm capitalize"
      style={{ filter: "url(#sketch-roughen)" }}
    >
      {children}
    </span>
  );
}

function ColorChip({ name, variant }: { name: string; variant: "try" | "avoid" }) {
  return (
    <span
      className={`inline-block px-3 py-1 border-[2px] border-ink rounded-full font-note text-sm capitalize ${
        variant === "try"
          ? "bg-sketch-green/30"
          : "bg-sketch-red/20 line-through opacity-70"
      }`}
      style={{ filter: "url(#sketch-roughen)" }}
    >
      {name}
    </span>
  );
}
