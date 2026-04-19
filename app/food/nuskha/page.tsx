"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import Loading from "@/components/feature/Loading";
import ErrorBox from "@/components/feature/ErrorBox";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { SketchInput, SketchTextarea } from "@/components/sketch/SketchInput";
import { DoodleStar, DoodleCheck, DoodleHeart } from "@/components/sketch/Doodles";
import {
  Sparkles,
  AlertTriangle,
  Leaf,
  Beaker,
  Stethoscope,
  Sunrise,
  XCircle,
  FlaskConical,
} from "lucide-react";
import type { NuskhaResult } from "@/lib/prompts/food";

const commonProblems = [
  "cold & cough",
  "acidity",
  "hair fall",
  "poor sleep",
  "weak immunity",
  "dandruff",
  "acne",
  "joint pain",
  "indigestion",
  "stress / anxiety",
];

export default function NuskhaPage() {
  const [problem, setProblem] = useState("cold & cough");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NuskhaResult | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/food/nuskha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, details }),
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
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/food"
        backLabel="back to food"
        eyebrow="Food · Feature 3"
        title="Dadi-Nani Ke"
        highlight="Nuskhe"
        subtitle="Koi bhi chhoti problem batao — Phoenix traditional Indian gharelu ilaaj suggest karega, modern science context ke saath."
        Icon={Leaf}
      />

      {!result && (
        <SketchCard variant="cream" className="!p-5 mb-6">
          <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
            kya problem hai?
          </SketchHeading>

          <div className="flex flex-wrap gap-2 mb-3">
            {commonProblems.map((p) => (
              <button
                key={p}
                onClick={() => setProblem(p)}
                className={`px-3 py-1 border-[2px] border-ink rounded-full font-hand text-sm capitalize transition ${
                  problem === p
                    ? "bg-phoenix-flame text-white"
                    : "bg-paper-cream hover:bg-paper-dark"
                }`}
                style={{ filter: "url(#sketch-roughen)" }}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <SketchInput
              label="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. migraine, low energy"
            />
            <SketchTextarea
              label="any more details? (optional)"
              rows={2}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g. happens after meals, gets worse at night…"
            />
          </div>

          <SketchButton variant="flame" size="lg" onClick={ask} disabled={loading || !problem}>
            <Sparkles size={18} />
            {loading ? "Dadi soch rahi hain…" : "Get nuskhe"}
          </SketchButton>
        </SketchCard>
      )}

      {loading && <Loading label="Dadi-nani ki yaadein kharaag rahe hain…" />}
      {error && <ErrorBox message={error} />}

      {result && (
        <div className="space-y-5 pb-10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <SketchHeading as="h2" className="!text-3xl md:!text-4xl capitalize" underline>
              For your {result.problem}
            </SketchHeading>
            <SketchButton variant="ghost" size="sm" onClick={() => setResult(null)}>
              Ask another
            </SketchButton>
          </div>

          {/* Ayurvedic view */}
          <SketchCard variant="paper" className="!p-5 bg-phoenix-gold/15 relative overflow-hidden">
            <div className="absolute top-3 right-3 animate-wobble-slow">
              <DoodleHeart size={28} color="#e63946" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Beaker size={20} className="text-phoenix-flame" />
              <div className="font-hand text-sm text-ink-faded">ayurvedic view</div>
            </div>
            <p className="font-note text-ink leading-relaxed">{result.ayurvedicView}</p>
          </SketchCard>

          {/* Remedies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {result.remedies.map((r, i) => (
              <SketchCard
                key={i}
                variant="cream"
                tilt={i === 0 ? "left" : i === 2 ? "right" : "none"}
                tape={i === 0}
                className="bg-sketch-green/10 h-full"
              >
                <div
                  className="w-10 h-10 rounded-full bg-phoenix-flame text-white font-scribble text-xl font-bold flex items-center justify-center border-[2px] border-ink mb-2"
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  {i + 1}
                </div>
                <SketchHeading as="h3" font="scribble" className="!text-2xl leading-tight mb-2">
                  {r.name}
                </SketchHeading>

                <div className="mb-3">
                  <div className="font-hand text-xs text-ink-faded mb-1">ingredients</div>
                  <ul className="space-y-0.5">
                    {r.ingredients.map((ing, j) => (
                      <li key={j} className="font-note text-sm">
                        · <strong>{ing.quantity}</strong> {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <div className="font-hand text-xs text-ink-faded mb-1">how to make</div>
                  <ol className="space-y-1">
                    {r.howToPrepare.map((step, j) => (
                      <li key={j} className="font-note text-sm flex gap-1.5">
                        <span className="text-phoenix-flame font-bold">{j + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div
                  className="p-2 bg-paper-cream border-[2px] border-ink rounded-xl mb-2"
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  <div className="font-hand text-xs text-ink-faded">dosage</div>
                  <div className="font-note text-sm">{r.dosage}</div>
                </div>

                {r.scienceNote && (
                  <div className="mb-2">
                    <div className="flex items-center gap-1 font-hand text-xs text-ink-faded">
                      <FlaskConical size={12} /> science note
                    </div>
                    <p className="font-note text-xs italic text-ink-soft">{r.scienceNote}</p>
                  </div>
                )}

                {r.cautions && r.cautions.length > 0 && (
                  <div className="mt-2 p-2 bg-sketch-red/10 border-[2px] border-sketch-red/50 rounded-lg">
                    <div className="flex items-center gap-1 font-hand text-xs text-sketch-red font-bold">
                      <AlertTriangle size={12} /> caution
                    </div>
                    <ul className="font-note text-xs text-ink-soft">
                      {r.cautions.map((c, k) => (
                        <li key={k}>· {c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </SketchCard>
            ))}
          </div>

          {/* Lifestyle + Diet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SketchCard variant="paper" className="!p-5 bg-sketch-blue/10">
              <div className="flex items-center gap-2 mb-2">
                <Sunrise size={20} className="text-sketch-blue" />
                <SketchHeading as="h3" font="scribble" className="!text-xl">
                  lifestyle habits
                </SketchHeading>
              </div>
              <ul className="space-y-1.5">
                {result.lifestyleAddOns.map((l, i) => (
                  <li key={i} className="flex gap-2 items-start font-note text-sm">
                    <DoodleStar size={14} color="#4361ee" /> {l}
                  </li>
                ))}
              </ul>
            </SketchCard>

            <SketchCard variant="paper" className="!p-5 bg-sketch-green/15">
              <div className="flex items-center gap-2 mb-2">
                <DoodleCheck size={20} color="#52b788" />
                <SketchHeading as="h3" font="scribble" className="!text-xl">
                  eat more
                </SketchHeading>
              </div>
              <ul className="space-y-1 font-note text-sm">
                {result.dietTips.eatMore.map((e, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-sketch-green">+</span> {e}
                  </li>
                ))}
              </ul>
            </SketchCard>

            <SketchCard variant="paper" className="!p-5 bg-sketch-red/10">
              <div className="flex items-center gap-2 mb-2">
                <XCircle size={20} className="text-sketch-red" />
                <SketchHeading as="h3" font="scribble" className="!text-xl">
                  avoid
                </SketchHeading>
              </div>
              <ul className="space-y-1 font-note text-sm">
                {result.dietTips.avoid.map((e, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-sketch-red">−</span> {e}
                  </li>
                ))}
              </ul>
            </SketchCard>
          </div>

          {/* Doctor disclaimer */}
          <SketchCard
            variant="paper"
            className="!p-4 bg-phoenix-gold/20 flex items-start gap-3"
          >
            <Stethoscope
              size={26}
              className="text-phoenix-flame shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <div>
              <div className="font-scribble text-lg font-bold mb-0.5">
                when to see a doctor
              </div>
              <p className="font-note text-sm text-ink-soft mb-2">{result.whenToSeeDoctor}</p>
              <p className="font-note text-xs text-ink-faded italic">{result.disclaimer}</p>
            </div>
          </SketchCard>
        </div>
      )}

      <Footer />
    </main>
  );
}
