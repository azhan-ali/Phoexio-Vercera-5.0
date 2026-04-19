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
import { SketchInput } from "@/components/sketch/SketchInput";
import { DoodleStar, DoodleCheck } from "@/components/sketch/Doodles";
import {
  Scale,
  Sparkles,
  Flame,
  Beef,
  Wheat,
  Droplet,
  ShoppingBasket,
  AlertTriangle,
} from "lucide-react";
import type { MealPlannerResult } from "@/lib/prompts/food";

export default function MealPlannerPage() {
  const [form, setForm] = useState({
    age: 25,
    gender: "male",
    heightCm: 170,
    weightKg: 70,
    bodyType: "mesomorph",
    activityLevel: "moderate",
    goal: "maintain",
    diet: "vegetarian",
    region: "North Indian",
    allergies: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MealPlannerResult | null>(null);
  const [activeDay, setActiveDay] = useState(0);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function generate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/food/meal-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data.result);
      setActiveDay(0);
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
        eyebrow="Food · Feature 2"
        title="Body-Type"
        highlight="Meal Planner"
        subtitle="Apni details do — Phoenix calculate karega BMR + TDEE, macros split karega, aur 3-day Indian meal plan banayega tumhare goal ke hisaab se."
        Icon={Scale}
      />

      {!result && (
        <SketchCard variant="cream" className="!p-5 mb-6">
          <SketchHeading as="h3" font="scribble" className="!text-2xl mb-4">
            tell me about you
          </SketchHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <NumInput label="age (years)" value={form.age} onChange={(v) => update("age", v)} />
            <SelectField
              label="gender"
              value={form.gender}
              options={["male", "female", "other"]}
              onChange={(v) => update("gender", v)}
            />
            <NumInput
              label="height (cm)"
              value={form.heightCm}
              onChange={(v) => update("heightCm", v)}
            />
            <NumInput
              label="weight (kg)"
              value={form.weightKg}
              onChange={(v) => update("weightKg", v)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <SelectField
              label="body type"
              value={form.bodyType}
              options={["ectomorph", "mesomorph", "endomorph", "unsure"]}
              onChange={(v) => update("bodyType", v)}
            />
            <SelectField
              label="activity"
              value={form.activityLevel}
              options={["sedentary", "light", "moderate", "active", "very-active"]}
              onChange={(v) => update("activityLevel", v)}
            />
            <SelectField
              label="goal"
              value={form.goal}
              options={["lose fat", "gain muscle", "maintain", "general health"]}
              onChange={(v) => update("goal", v)}
            />
            <SelectField
              label="diet"
              value={form.diet}
              options={["vegetarian", "vegan", "eggetarian", "non-vegetarian", "jain"]}
              onChange={(v) => update("diet", v)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <SketchInput
              label="regional cuisine preference"
              value={form.region}
              onChange={(e) => update("region", e.target.value)}
              placeholder="North / South / Bengali / Gujarati…"
            />
            <SketchInput
              label="allergies / avoid (optional)"
              value={form.allergies}
              onChange={(e) => update("allergies", e.target.value)}
              placeholder="e.g. dairy, nuts, gluten"
            />
          </div>

          <SketchButton variant="flame" size="lg" onClick={generate} disabled={loading}>
            <Sparkles size={18} />
            {loading ? "Crunching numbers…" : "Generate my plan"}
          </SketchButton>
        </SketchCard>
      )}

      {loading && <Loading label="Calculating calories + designing your plan…" />}
      {error && <ErrorBox message={error} />}

      {result && (
        <div className="space-y-5 pb-10">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <SketchHeading as="h2" className="!text-3xl md:!text-4xl" underline>
              Your plan
            </SketchHeading>
            <SketchButton variant="ghost" size="sm" onClick={() => setResult(null)}>
              Change details
            </SketchButton>
          </div>

          {/* ASSESSMENT */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard
              Icon={Scale}
              label="body type"
              value={result.assessment.bodyType}
              color="bg-sketch-purple/20"
            />
            <StatCard
              Icon={Flame}
              label="target kcal"
              value={`${Math.round(result.assessment.targetCalories)}`}
              color="bg-phoenix-flame/20"
            />
            <StatCard
              Icon={Droplet}
              label="BMR / TDEE"
              value={`${Math.round(result.assessment.bmr)} / ${Math.round(
                result.assessment.tdee
              )}`}
              color="bg-sketch-blue/20"
            />
            <StatCard
              Icon={Beef}
              label="protein"
              value={`${result.assessment.macros.proteinGrams}g`}
              color="bg-sketch-green/20"
            />
          </div>

          <SketchCard variant="paper" className="!p-5 bg-phoenix-gold/15">
            <div className="font-hand text-sm text-ink-faded">strategy</div>
            <p className="font-note text-lg text-ink">{result.assessment.strategy}</p>
            <div className="flex gap-4 mt-3 flex-wrap font-note text-sm">
              <MacroBar
                label="Protein"
                grams={result.assessment.macros.proteinGrams}
                color="bg-sketch-red"
              />
              <MacroBar
                label="Carbs"
                grams={result.assessment.macros.carbsGrams}
                color="bg-phoenix-gold"
              />
              <MacroBar
                label="Fats"
                grams={result.assessment.macros.fatsGrams}
                color="bg-sketch-purple"
              />
            </div>
          </SketchCard>

          {/* DAY TABS */}
          <div className="flex gap-2 flex-wrap">
            {result.plan.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`px-4 py-2 border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] font-scribble text-lg transition shadow-[3px_3px_0_#1a1a1a] ${
                  activeDay === i
                    ? "bg-phoenix-flame text-white"
                    : "bg-paper-cream hover:bg-paper-dark"
                }`}
                style={{ filter: "url(#sketch-roughen)" }}
              >
                {d.day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.plan[activeDay]?.meals.map((m, i) => (
              <SketchCard
                key={i}
                variant="cream"
                tilt={i % 2 === 0 ? "left" : "right"}
                tape={i === 0}
                className="bg-paper-cream"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="font-hand text-sm text-ink-faded">{m.meal}</div>
                    <SketchHeading as="h4" font="scribble" className="!text-2xl leading-tight">
                      {m.name}
                    </SketchHeading>
                  </div>
                  <span
                    className="px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs whitespace-nowrap"
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    ~{m.approxCalories} kcal
                  </span>
                </div>
                <p className="font-note text-sm text-ink-soft mb-2">{m.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.keyIngredients.map((k, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 bg-paper-cream border-[1.5px] border-ink/50 rounded-full font-note text-xs capitalize"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </SketchCard>
            ))}
          </div>

          {/* SHOPPING LIST */}
          <SketchCard variant="paper" className="!p-5 bg-sketch-green/15">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBasket size={22} className="text-sketch-green" />
              <SketchHeading as="h3" font="scribble" className="!text-2xl">
                shopping essentials
              </SketchHeading>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.shoppingEssentials.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-paper-cream border-[2px] border-ink rounded-full font-note text-sm capitalize"
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  <DoodleCheck size={14} color="#52b788" /> {s}
                </span>
              ))}
            </div>
          </SketchCard>

          {/* TIPS + HYDRATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <SketchCard variant="cream" className="!p-5">
              <SketchHeading as="h3" font="scribble" className="!text-xl mb-2">
                pro tips
              </SketchHeading>
              <ul className="space-y-1.5">
                {result.proTips.map((t, i) => (
                  <li key={i} className="flex gap-2 items-start font-note">
                    <DoodleStar size={16} color="#ff4500" /> {t}
                  </li>
                ))}
              </ul>
            </SketchCard>
            <SketchCard variant="cream" className="!p-5 bg-sketch-blue/15">
              <div className="flex items-center gap-2 mb-2">
                <Droplet size={20} className="text-sketch-blue" />
                <SketchHeading as="h3" font="scribble" className="!text-xl">
                  hydration
                </SketchHeading>
              </div>
              <p className="font-note text-ink-soft">{result.hydrationTip}</p>
            </SketchCard>
          </div>

          {result.warnings.length > 0 && (
            <SketchCard variant="paper" className="!p-4 bg-sketch-red/10">
              <div className="flex items-start gap-2">
                <AlertTriangle size={20} className="text-sketch-red shrink-0 mt-0.5" />
                <div>
                  <div className="font-hand text-lg font-bold">⚠️ note:</div>
                  <ul className="list-disc list-inside font-note text-sm text-ink-soft">
                    {result.warnings.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SketchCard>
          )}
        </div>
      )}

      <Footer />
    </main>
  );
}

/* ========== helpers ========== */
function NumInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="block mb-1 font-hand text-sm text-ink-faded">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 bg-paper-cream text-ink font-note text-base border-[2.5px] border-ink rounded-[12px_18px_14px_20px/16px_12px_18px_12px] outline-none"
        style={{ filter: "url(#sketch-roughen)" }}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block mb-1 font-hand text-sm text-ink-faded">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

function StatCard({
  Icon,
  label,
  value,
  color,
}: {
  Icon: typeof Scale;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className={`p-3 ${color} border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] text-center`}
      style={{ filter: "url(#sketch-roughen)" }}
    >
      <Icon size={20} className="mx-auto text-ink-faded mb-1" />
      <div className="font-hand text-xs text-ink-faded">{label}</div>
      <div className="font-scribble text-xl font-bold capitalize leading-none">{value}</div>
    </div>
  );
}

function MacroBar({
  label,
  grams,
  color,
}: {
  label: string;
  grams: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Wheat size={16} className="text-ink-faded" />
      <div>
        <div className="font-hand text-xs text-ink-faded">{label}</div>
        <div className="flex items-center gap-1">
          <div className={`w-14 h-2 ${color} border-[1.5px] border-ink rounded-full`} />
          <span className="font-scribble font-bold">{grams}g</span>
        </div>
      </div>
    </div>
  );
}
