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
import { DoodleStar, DoodleHeart } from "@/components/sketch/Doodles";
import {
  CalendarHeart,
  Sparkles,
  Shirt,
  MapPin,
  Music,
  Utensils,
  Brain,
} from "lucide-react";
import type { OccasionPackage } from "@/lib/prompts/fashion";

const presets = [
  "Date night",
  "Office party",
  "Cousin's wedding",
  "First date",
  "Brunch with friends",
  "Diwali dinner",
  "Concert night",
  "Beach vacation day",
];

export default function OccasionPlannerPage() {
  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/fashion"
        backLabel="back to fashion"
        eyebrow="Fashion · Occasion Planner"
        title="Occasion"
        highlight="Complete Package"
        subtitle="Tell Phoenix the occasion — get a full evening plan: outfit + venue vibe + 3 dishes + playlist mood, all reasoned together holistically."
        Icon={CalendarHeart}
      />

      <OccasionPlannerInner />

      <div className="pb-10" />
      <Footer />
    </main>
  );
}

function OccasionPlannerInner() {
  const [occasion, setOccasion] = useState("Date night");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [budget, setBudget] = useState("mid-range");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OccasionPackage | null>(null);

  async function plan() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/fashion/occasion-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, gender, city, budget, notes }),
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
            tell me about the evening
          </SketchHeading>

          <div className="mb-3">
            <div className="font-hand text-sm text-ink-faded mb-1">quick pick</div>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setOccasion(p)}
                  className={`px-3 py-1 border-[2px] border-ink rounded-full font-hand text-sm transition ${
                    occasion === p
                      ? "bg-phoenix-flame text-white"
                      : "bg-paper-cream hover:bg-paper-dark"
                  }`}
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <SketchInput
              label="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g. Date night"
            />
            <SketchInput
              label="gender (optional)"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="man / woman / non-binary"
            />
            <SketchInput
              label="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mumbai, Delhi, Bangalore…"
            />
            <SketchInput
              label="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="budget / mid-range / luxury"
            />
          </div>
          <SketchTextarea
            label="any specific vibe? (optional)"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. rooftop, rainy, classy, surprise element…"
          />
          <div className="mt-4">
            <SketchButton
              variant="flame"
              size="lg"
              onClick={plan}
              disabled={loading || !occasion}
            >
              <Sparkles size={18} />
              {loading ? "Planning…" : "Plan my evening"}
            </SketchButton>
          </div>
        </SketchCard>
      )}

      {loading && <Loading label="Phoenix is planning your perfect evening…" />}
      {error && <ErrorBox message={error} />}

      {result && (
        <>
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <SketchHeading as="h2" className="!text-3xl md:!text-4xl" underline>
              Your {result.occasion}
            </SketchHeading>
            <SketchButton variant="ghost" size="sm" onClick={() => setResult(null)}>
              Plan another
            </SketchButton>
          </div>

          {/* VIBE */}
          <SketchCard variant="paper" className="!p-5 mb-5 bg-phoenix-flame/10 text-center">
            <div className="font-hand text-sm text-ink-faded">the vibe</div>
            <div className="font-scribble text-3xl md:text-4xl font-bold ink-text">
              {result.vibe}
            </div>
          </SketchCard>

          {/* OUTFIT */}
          <SketchCard variant="cream" className="!p-5 mb-5 bg-sketch-pink/15">
            <SectionTitle Icon={Shirt} title="the outfit" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <KV label="top" value={result.outfit.top} />
              <KV label="bottom" value={result.outfit.bottom} />
              <KV label="footwear" value={result.outfit.footwear} />
              <KV
                label="accessories"
                value={result.outfit.accessories.join(", ")}
              />
            </div>
            <div className="mb-3">
              <div className="font-hand text-sm text-ink-faded mb-1">color palette</div>
              <div className="flex flex-wrap gap-2">
                {result.outfit.colorPalette.map((c, i) => (
                  <ColorSwatch key={i} color={c} />
                ))}
              </div>
            </div>
            <ul className="space-y-1">
              {result.outfit.stylingTips.map((t, i) => (
                <li key={i} className="flex gap-2 items-start font-note text-sm">
                  <DoodleStar size={16} color="#ff4500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </SketchCard>

          {/* VENUE + FOOD + MUSIC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <SketchCard variant="paper" tilt="left" className="bg-sketch-blue/15">
              <SectionTitle Icon={MapPin} title="venue" small />
              <div className="font-scribble text-xl font-bold mb-1">{result.venue.type}</div>
              <p className="font-note text-sm text-ink-soft mb-2">{result.venue.vibe}</p>
              <div className="font-hand text-xs text-ink-faded mb-1">try in your city:</div>
              <ul className="space-y-0.5">
                {result.venue.examples.map((v, i) => (
                  <li key={i} className="font-note text-sm">
                    · {v}
                  </li>
                ))}
              </ul>
            </SketchCard>

            <SketchCard variant="paper" className="bg-sketch-green/15">
              <SectionTitle Icon={Utensils} title="food" small />
              <ul className="space-y-2">
                {result.food.map((f, i) => (
                  <li key={i}>
                    <div className="font-scribble text-lg font-bold leading-tight">
                      {f.dish}
                    </div>
                    <div className="font-note text-sm text-ink-soft">{f.why}</div>
                  </li>
                ))}
              </ul>
            </SketchCard>

            <SketchCard variant="paper" tilt="right" className="bg-sketch-purple/15">
              <SectionTitle Icon={Music} title="music" small />
              <div className="font-scribble text-xl font-bold mb-1">{result.music.mood}</div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {result.music.genres.map((g) => (
                  <span
                    key={g}
                    className="px-2 py-0.5 bg-paper-cream border-[2px] border-ink rounded-full font-note text-xs"
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="font-hand text-xs text-ink-faded mb-1">play these:</div>
              <ul className="space-y-0.5">
                {result.music.artistsOrTracks.map((t, i) => (
                  <li key={i} className="font-note text-sm">
                    ♪ {t}
                  </li>
                ))}
              </ul>
            </SketchCard>
          </div>

          {/* HOLISTIC REASONING */}
          <SketchCard
            variant="paper"
            className="!p-5 bg-phoenix-gold/20 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 animate-wobble-slow">
              <DoodleHeart size={28} color="#e63946" />
            </div>
            <SectionTitle Icon={Brain} title="why this all works together" />
            <p className="font-note text-ink-soft leading-relaxed">
              {result.holisticReasoning}
            </p>
          </SketchCard>
        </>
      )}
    </>
  );
}

function SectionTitle({
  Icon,
  title,
  small,
}: {
  Icon: typeof Shirt;
  title: string;
  small?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon size={small ? 20 : 24} className="text-phoenix-flame" />
      <SketchHeading as={small ? "h4" : "h3"} font="scribble" className={small ? "!text-xl" : "!text-2xl"}>
        {title}
      </SketchHeading>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-3 bg-paper-cream border-[2px] border-ink rounded-xl"
      style={{ filter: "url(#sketch-roughen)" }}
    >
      <div className="font-hand text-xs text-ink-faded capitalize">{label}</div>
      <div className="font-note text-base text-ink">{value}</div>
    </div>
  );
}

function ColorSwatch({ color }: { color: string }) {
  const isHex = /^#[0-9a-f]{6}$/i.test(color);
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-paper-cream border-[2px] border-ink rounded-full" style={{ filter: "url(#sketch-roughen)" }}>
      <span
        className="inline-block w-4 h-4 rounded-full border-[1.5px] border-ink"
        style={{ backgroundColor: isHex ? color : "transparent" }}
      />
      <span className="font-note text-xs capitalize">{color}</span>
    </div>
  );
}
