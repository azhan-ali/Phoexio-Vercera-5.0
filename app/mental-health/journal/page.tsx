"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { SketchInput, SketchTextarea } from "@/components/sketch/SketchInput";
import Loading from "@/components/feature/Loading";
import ErrorBox from "@/components/feature/ErrorBox";
import {
  BookHeart,
  Sparkles,
  Save,
  TrendingUp,
  TrendingDown,
  Minus,
  Shuffle,
  Trash2,
  Lock,
} from "lucide-react";
import { DoodleHeart, DoodleStar } from "@/components/sketch/Doodles";
import { cn } from "@/lib/utils";
import type { JournalInsightsResult } from "@/lib/prompts/mental";

interface Entry {
  id: string;
  date: string; // YYYY-MM-DD
  mood: string;
  score: number; // 1-10
  note: string;
  gratitude?: string;
  trigger?: string;
}

const MOODS = [
  { label: "amazing", emoji: "🤩", score: 10 },
  { label: "happy", emoji: "😊", score: 8 },
  { label: "calm", emoji: "😌", score: 7 },
  { label: "okay", emoji: "🙂", score: 6 },
  { label: "meh", emoji: "😐", score: 5 },
  { label: "tired", emoji: "😴", score: 4 },
  { label: "anxious", emoji: "😰", score: 3 },
  { label: "sad", emoji: "😔", score: 2 },
  { label: "terrible", emoji: "😢", score: 1 },
];

const STORAGE_KEY = "phoenix_journal_entries_v1";

function loadEntries(): Entry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveEntries(entries: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [mood, setMood] = useState(MOODS[3]);
  const [note, setNote] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [trigger, setTrigger] = useState("");
  const [insights, setInsights] = useState<JournalInsightsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function addEntry() {
    if (!note.trim()) return;
    const e: Entry = {
      id: `e-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      mood: mood.label,
      score: mood.score,
      note: note.trim(),
      gratitude: gratitude.trim() || undefined,
      trigger: trigger.trim() || undefined,
    };
    const next = [e, ...entries];
    setEntries(next);
    saveEntries(next);
    setNote("");
    setGratitude("");
    setTrigger("");
    setInsights(null);
  }

  function deleteEntry(id: string) {
    const next = entries.filter((e) => e.id !== id);
    setEntries(next);
    saveEntries(next);
    setInsights(null);
  }

  function seedDemo() {
    const days = 7;
    const sample: Entry[] = Array.from({ length: days }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const m = MOODS[Math.floor(Math.random() * MOODS.length)];
      return {
        id: `seed-${i}-${Date.now()}`,
        date: d.toISOString().slice(0, 10),
        mood: m.label,
        score: m.score,
        note: ["Work was hectic but okay.", "Slept badly, irritable.", "Had a good chai with a friend.", "Missed workout, guilt.", "Meditated 10 min, felt calmer.", "Parents called, felt loved.", "Rainy day, comfort food."][i % 7],
        trigger: ["deadline", "insomnia", "social", "guilt", "self-care", "family", "weather"][i % 7],
        gratitude: ["coffee", "sleep", "friend", "-", "peace", "family", "warmth"][i % 7],
      };
    });
    const next = [...sample, ...entries];
    setEntries(next);
    saveEntries(next);
  }

  async function analyze() {
    if (entries.length === 0) return;
    setLoading(true);
    setError(null);
    setInsights(null);
    try {
      const res = await fetch("/api/mental/journal-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: entries.slice(0, 30) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setInsights(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const avgScore =
    entries.length > 0
      ? entries.reduce((s, e) => s + e.score, 0) / entries.length
      : 0;

  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/mental-health"
        backLabel="back to mental health"
        eyebrow="Mental Health · Feature 2"
        title="Mood"
        highlight="Journal"
        subtitle="Roz ek chhoti entry. AI-powered pattern analysis. Sab kuch tumhare device pe — server pe nothing."
        Icon={BookHeart}
      />

      <div className="flex items-center gap-2 mb-4 font-hand text-sm text-ink-faded">
        <Lock size={14} /> stored locally only · {entries.length} {entries.length === 1 ? "entry" : "entries"}
        {avgScore > 0 && <span>· avg mood: <strong className="text-ink">{avgScore.toFixed(1)}/10</strong></span>}
      </div>

      {/* NEW ENTRY */}
      <SketchCard variant="cream" className="!p-5 mb-6">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
          today's entry
        </SketchHeading>

        <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-3">
          {MOODS.map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(m)}
              className={cn(
                "p-2 border-[2.5px] border-ink rounded-[10px_16px_12px_18px/14px_10px_16px_10px] text-center transition",
                mood.label === m.label
                  ? "bg-phoenix-flame text-white -translate-y-0.5"
                  : "bg-paper-cream hover:-translate-y-0.5"
              )}
              style={{ filter: "url(#sketch-roughen)" }}
              title={`${m.label} (${m.score}/10)`}
            >
              <div className="text-2xl leading-none">{m.emoji}</div>
              <div className="font-hand text-xs capitalize mt-0.5">{m.label}</div>
            </button>
          ))}
        </div>

        <SketchTextarea
          label="how was your day? (required)"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="what happened, how did it feel…"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <SketchInput
            label="trigger (optional)"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="e.g. work stress, argument"
          />
          <SketchInput
            label="one thing you're grateful for"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            placeholder="e.g. morning chai"
          />
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <SketchButton variant="flame" onClick={addEntry} disabled={!note.trim()}>
            <Save size={16} /> Save entry
          </SketchButton>
          {entries.length === 0 && (
            <SketchButton variant="ghost" size="sm" onClick={seedDemo}>
              <Shuffle size={14} /> try with demo data
            </SketchButton>
          )}
        </div>
      </SketchCard>

      {/* MOOD CHART */}
      {entries.length > 0 && (
        <SketchCard variant="paper" className="!p-5 mb-6 bg-sketch-blue/10">
          <div className="flex items-center justify-between mb-2">
            <SketchHeading as="h3" font="scribble" className="!text-2xl">
              mood timeline
            </SketchHeading>
            <SketchButton variant="flame" size="sm" onClick={analyze} disabled={loading}>
              <Sparkles size={14} />
              {loading ? "analyzing…" : "AI insights"}
            </SketchButton>
          </div>
          <MoodChart entries={entries.slice(0, 14).reverse()} />
        </SketchCard>
      )}

      {/* INSIGHTS */}
      {loading && <Loading label="Finding gentle patterns in your days…" />}
      {error && <div className="mb-6"><ErrorBox message={error} /></div>}
      {insights && <InsightsView insights={insights} onClose={() => setInsights(null)} />}

      {/* PAST ENTRIES */}
      {entries.length > 0 && (
        <div className="mb-10">
          <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3" underline>
            past entries
          </SketchHeading>
          <div className="space-y-3">
            {entries.slice(0, 14).map((e) => {
              const m = MOODS.find((x) => x.label === e.mood);
              return (
                <SketchCard key={e.id} variant="cream" className="!p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl leading-none">{m?.emoji ?? "🙂"}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-scribble text-lg font-bold capitalize">{e.mood}</span>
                          <span className="font-hand text-xs text-ink-faded">· {e.date}</span>
                        </div>
                        <p className="font-note text-ink-soft mt-1">{e.note}</p>
                        <div className="flex flex-wrap gap-2 mt-2 font-note text-xs">
                          {e.trigger && (
                            <span className="px-2 py-0.5 bg-sketch-red/15 border-[1.5px] border-ink rounded-full">
                              🔥 {e.trigger}
                            </span>
                          )}
                          {e.gratitude && (
                            <span className="px-2 py-0.5 bg-sketch-green/15 border-[1.5px] border-ink rounded-full">
                              💛 {e.gratitude}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteEntry(e.id)}
                      className="p-1 text-ink-faded hover:text-sketch-red transition"
                      title="delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </SketchCard>
              );
            })}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}

/* ========== MOOD CHART ========== */
function MoodChart({ entries }: { entries: Entry[] }) {
  const width = 600;
  const height = 140;
  const pad = 20;
  const step = entries.length > 1 ? (width - pad * 2) / (entries.length - 1) : 0;
  const points = entries.map((e, i) => {
    const x = pad + i * step;
    const y = height - pad - ((e.score - 1) / 9) * (height - pad * 2);
    return { x, y, entry: e };
  });
  const path =
    points.length > 0
      ? "M " + points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")
      : "";
  return (
    <div className="overflow-x-auto">
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: "url(#pencil-texture)" }}
      >
        {/* gridlines */}
        {[2, 5, 8].map((g) => {
          const y = height - pad - ((g - 1) / 9) * (height - pad * 2);
          return (
            <line
              key={g}
              x1={pad}
              x2={width - pad}
              y1={y}
              y2={y}
              stroke="#999"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
          );
        })}
        <path d={path} stroke="#ff4500" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {points.map((p, i) => {
          const m = MOODS.find((x) => x.label === p.entry.mood);
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5" fill="#fcbf49" stroke="#1a1a1a" strokeWidth="2" />
              <text
                x={p.x}
                y={p.y - 10}
                fontSize="14"
                textAnchor="middle"
                className="select-none"
              >
                {m?.emoji ?? ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ========== INSIGHTS VIEW ========== */
function InsightsView({
  insights,
  onClose,
}: {
  insights: JournalInsightsResult;
  onClose: () => void;
}) {
  const TrendIcon =
    insights.trend === "improving"
      ? TrendingUp
      : insights.trend === "declining"
      ? TrendingDown
      : Minus;
  const trendColor =
    insights.trend === "improving"
      ? "text-sketch-green"
      : insights.trend === "declining"
      ? "text-sketch-red"
      : "text-ink-faded";

  return (
    <div className="space-y-5 mb-8">
      <div className="flex items-center justify-between">
        <SketchHeading as="h3" font="scribble" className="!text-2xl" underline>
          your insights
        </SketchHeading>
        <button
          onClick={onClose}
          className="font-hand text-sm text-ink-faded hover:text-sketch-red"
        >
          close
        </button>
      </div>

      <SketchCard variant="paper" className="!p-5 bg-phoenix-gold/15 relative overflow-hidden">
        <div className="absolute top-3 right-3 animate-wobble-slow">
          <DoodleHeart size={28} color="#e63946" />
        </div>
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <span className="px-3 py-1 bg-paper-cream border-[2px] border-ink rounded-full font-scribble text-lg capitalize flex items-center gap-1" style={{ filter: "url(#sketch-roughen)" }}>
            <TrendIcon size={18} className={trendColor} /> {insights.trend}
          </span>
          <span className="font-hand text-ink-faded">
            avg {insights.averageScore.toFixed(1)}/10
          </span>
        </div>
        <p className="font-note text-ink leading-relaxed">{insights.summary}</p>
      </SketchCard>

      {insights.patterns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.patterns.map((p, i) => (
            <SketchCard key={i} variant="cream" tilt={i % 2 === 0 ? "left" : "right"}>
              <SketchHeading as="h4" font="scribble" className="!text-xl mb-1">
                {p.pattern}
              </SketchHeading>
              <p className="font-note text-sm text-ink-soft mb-2">{p.evidence}</p>
              <div className="p-2 bg-sketch-green/15 border-[2px] border-ink rounded-lg font-note text-sm">
                💡 {p.suggestion}
              </div>
            </SketchCard>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SketchCard variant="paper" className="!p-4 bg-sketch-red/10">
          <div className="font-scribble text-lg font-bold mb-1">common triggers</div>
          {insights.triggers.length === 0 ? (
            <p className="font-note text-sm text-ink-faded italic">none noted</p>
          ) : (
            <ul className="font-note text-sm space-y-0.5">
              {insights.triggers.map((t, i) => (
                <li key={i}>· {t}</li>
              ))}
            </ul>
          )}
        </SketchCard>
        <SketchCard variant="paper" className="!p-4 bg-sketch-green/15">
          <div className="font-scribble text-lg font-bold mb-1">what's going well</div>
          <ul className="font-note text-sm space-y-0.5">
            {insights.positives.map((t, i) => (
              <li key={i}>✨ {t}</li>
            ))}
          </ul>
        </SketchCard>
      </div>

      <SketchCard variant="paper" className="!p-5 bg-sketch-blue/10">
        <div className="font-scribble text-xl font-bold mb-2">a gentle note</div>
        <p className="font-note text-ink leading-relaxed">{insights.gentleSuggestion}</p>
      </SketchCard>

      <SketchCard
        variant="paper"
        className="!p-5 text-center bg-phoenix-flame/15 relative overflow-hidden"
      >
        <div className="absolute top-3 left-3 animate-wobble-slow">
          <DoodleStar size={24} color="#ffba08" />
        </div>
        <div className="font-hand text-sm text-ink-faded mb-1">keep close:</div>
        <p className="font-scribble text-2xl font-bold ink-text leading-snug">
          "{insights.affirmation}"
        </p>
      </SketchCard>
    </div>
  );
}
