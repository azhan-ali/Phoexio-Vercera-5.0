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
import { TrendingUp, Globe, Sparkles, IndianRupee, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendRadarResult } from "@/lib/prompts/fashion";

const regions = ["India", "Global", "Both"] as const;
const seasons = ["Summer", "Monsoon", "Winter", "Festive"] as const;
const genders = ["All", "Women", "Men", "Unisex"] as const;
const bodyTypes = ["any", "hourglass", "rectangle", "pear", "apple", "inverted-triangle"] as const;

export default function TrendRadarPage() {
  const [region, setRegion] = useState<(typeof regions)[number]>("India");
  const [season, setSeason] = useState<(typeof seasons)[number]>("Winter");
  const [gender, setGender] = useState<(typeof genders)[number]>("All");
  const [bodyType, setBodyType] = useState<(typeof bodyTypes)[number]>("any");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrendRadarResult | null>(null);
  const [citations, setCitations] = useState<string[]>([]);

  async function fetchTrends() {
    setLoading(true);
    setError(null);
    setResult(null);
    setCitations([]);
    try {
      const res = await fetch("/api/fashion/trend-radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region, season, gender, bodyType: bodyType === "any" ? undefined : bodyType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fetch failed");
      setResult(data.result);
      setCitations(data.citations || []);
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
        backHref="/fashion"
        backLabel="back to fashion"
        eyebrow="Fashion · Feature 2"
        title="Live Trend"
        highlight="Radar"
        subtitle="AI live web search — India + global fashion trends, refreshed in real-time from blogs, Bollywood, street style, aur social posts."
        Icon={TrendingUp}
      />

      <SketchCard variant="cream" className="!p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Select label="region" options={regions} value={region} onChange={setRegion} />
          <Select label="season" options={seasons} value={season} onChange={setSeason} />
          <Select label="gender" options={genders} value={gender} onChange={setGender} />
          <Select label="body type" options={bodyTypes} value={bodyType} onChange={setBodyType} />
        </div>
        <SketchButton variant="flame" size="lg" onClick={fetchTrends} disabled={loading}>
          <Sparkles size={18} />
          {loading ? "Scanning web…" : "Scan trends now"}
        </SketchButton>
      </SketchCard>

      {loading && <Loading label="Scanning live web for trends…" />}
      {error && <ErrorBox message={error} />}

      {result && (
        <div className="space-y-5 pb-10">
          <SketchCard variant="paper" className="!p-5 bg-phoenix-flame/10">
            <div className="flex items-center gap-2 mb-2">
              <Globe size={22} className="text-phoenix-flame" />
              <SketchHeading as="h2" font="scribble" className="!text-2xl">
                {result.region} · {result.season}
              </SketchHeading>
            </div>
            <p className="font-note text-ink-soft">{result.summary}</p>
          </SketchCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {result.trends.map((t, i) => (
              <TrendCard key={i} trend={t} rank={i + 1} />
            ))}
          </div>

          {citations.length > 0 && (
            <SketchCard variant="cream" className="!p-4">
              <div className="font-hand text-sm text-ink-faded mb-2">sources (live search):</div>
              <ul className="space-y-1">
                {citations.map((c, i) => (
                  <li key={i}>
                    <a
                      href={c}
                      target="_blank"
                      rel="noreferrer"
                      className="text-phoenix-flame text-sm underline break-all"
                    >
                      [{i + 1}] {c}
                    </a>
                  </li>
                ))}
              </ul>
            </SketchCard>
          )}
        </div>
      )}

      <Footer />
    </main>
  );
}

function Select<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <label className="block">
      <span className="block mb-1 font-hand text-sm text-ink-faded">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full px-3 py-2 bg-paper-cream text-ink font-note text-base border-[2.5px] border-ink rounded-[12px_18px_14px_20px/16px_12px_18px_12px] outline-none capitalize"
        style={{ filter: "url(#sketch-roughen)" }}
      >
        {options.map((o) => (
          <option key={o} value={o} className="capitalize">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TrendCard({
  trend,
  rank,
}: {
  trend: TrendRadarResult["trends"][number];
  rank: number;
}) {
  const price =
    trend.priceRange === "luxury"
      ? "₹₹₹"
      : trend.priceRange === "mid"
      ? "₹₹"
      : "₹";
  return (
    <SketchCard variant="paper" tilt={rank % 2 === 0 ? "right" : "left"} tape={rank === 1}>
      <div className="flex items-start justify-between mb-2 gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full bg-phoenix-flame text-white font-scribble text-xl font-bold flex items-center justify-center border-[2px] border-ink"
            style={{ filter: "url(#sketch-roughen)" }}
          >
            {rank}
          </div>
          <div>
            <SketchHeading as="h3" font="scribble" className="!text-2xl leading-none">
              {trend.name}
            </SketchHeading>
          </div>
        </div>
        <PopularityBadge score={trend.popularity} />
      </div>

      <p className="font-note text-sm text-ink-soft mb-3">{trend.description}</p>

      <div className="space-y-2">
        <Row label="how to wear" value={trend.howToWear} />
        <Row label="flatters" value={trend.bodyTypeFit} />
        <Row label="try this" value={trend.example} />
      </div>

      <div className="mt-3 pt-3 border-t-2 border-dashed border-ink/30 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 font-hand text-sm text-ink-faded">
          <IndianRupee size={14} /> {price} {trend.priceRange}
        </span>
        <span className="inline-flex items-center gap-1 font-hand text-sm">
          <Flame size={14} className="text-phoenix-flame" /> trending
        </span>
      </div>
    </SketchCard>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-hand text-xs text-ink-faded">{label}</div>
      <div className="font-note text-sm text-ink">{value}</div>
    </div>
  );
}

function PopularityBadge({ score }: { score: number }) {
  const bars = Math.round(score / 20); // 0-5
  return (
    <div className="flex flex-col items-end">
      <div className="font-hand text-xs text-ink-faded">hype</div>
      <div className="flex items-end gap-0.5 h-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 border-[1.5px] border-ink",
              i < bars ? "bg-phoenix-flame" : "bg-paper-dark",
            )}
            style={{ height: `${(i + 1) * 4}px` }}
          />
        ))}
      </div>
      <div className="font-scribble text-xs font-bold">{score}%</div>
    </div>
  );
}
