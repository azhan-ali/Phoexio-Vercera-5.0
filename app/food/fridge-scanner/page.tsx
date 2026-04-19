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
import { DoodleCheck } from "@/components/sketch/Doodles";
import {
  Camera,
  Sparkles,
  Clock,
  Users,
  ChefHat,
  Leaf,
  Drumstick,
  Egg,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { FridgeRecipeResult } from "@/lib/prompts/food";

export default function FridgeScannerPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FridgeRecipeResult | null>(null);
  const [activeRecipe, setActiveRecipe] = useState(0);

  async function scan() {
    if (!imageUrl) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/food/fridge-scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, preferences: { vegOnly } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Scan failed");
      setResult(data.result);
      setActiveRecipe(0);
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
        eyebrow="Food · Feature 1"
        title="Fridge-to-"
        highlight="Recipe AI"
        subtitle="Ek photo kheecho — AI Vision andar ka sab identify karega aur 3 Indian recipes suggest karega jo tum abhi bana sakte ho."
        Icon={Camera}
      />

      {!result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
          <SketchCard variant="cream" className="!p-5">
            <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
              📸 snap your fridge
            </SketchHeading>
            <ImageUploader
              onImage={setImageUrl}
              label="click or drop fridge photo"
              height="h-72"
            />
            <label className="mt-3 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={vegOnly}
                onChange={(e) => setVegOnly(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-hand text-ink-soft">veg-only recipes</span>
            </label>
            <div className="mt-4">
              <SketchButton
                variant="flame"
                size="lg"
                onClick={scan}
                disabled={!imageUrl || loading}
              >
                <Sparkles size={18} />
                {loading ? "Scanning…" : "Scan & cook"}
              </SketchButton>
            </div>
          </SketchCard>

          <SketchCard variant="paper" className="!p-5 bg-sketch-green/15">
            <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
              how it works
            </SketchHeading>
            <ol className="space-y-2 font-note text-ink-soft">
              <li className="flex gap-2">
                <span className="font-scribble text-xl font-bold text-phoenix-flame">1.</span>
                <span>Take a photo of your open fridge or pantry shelf</span>
              </li>
              <li className="flex gap-2">
                <span className="font-scribble text-xl font-bold text-phoenix-flame">2.</span>
                <span>Upload karo — AI Vision detects every edible item</span>
              </li>
              <li className="flex gap-2">
                <span className="font-scribble text-xl font-bold text-phoenix-flame">3.</span>
                <span>Get 3 recipes (2 Indian + 1 fusion) with full steps & tips</span>
              </li>
            </ol>
            <div className="mt-4 p-3 bg-phoenix-gold/20 border-[2px] border-ink rounded-xl" style={{ filter: "url(#sketch-roughen)" }}>
              <div className="font-hand text-sm">💡 <strong>pro tip:</strong> open fridge fully, good lighting, remove clutter on front shelf.</div>
            </div>
          </SketchCard>
        </div>
      )}

      {loading && <Loading label="Peeking inside your fridge…" />}
      {error && <ErrorBox message={error} />}

      {result && (
        <div className="pb-10 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <SketchHeading as="h2" className="!text-3xl md:!text-4xl" underline>
              Here's what I found
            </SketchHeading>
            <SketchButton
              variant="ghost"
              size="sm"
              onClick={() => {
                setResult(null);
                setImageUrl(null);
              }}
            >
              <Camera size={14} /> Scan again
            </SketchButton>
          </div>

          {/* Detected ingredients */}
          <SketchCard variant="cream" className="!p-5">
            <SketchHeading as="h3" font="scribble" className="!text-2xl mb-2">
              detected ingredients ({result.detectedIngredients.length})
            </SketchHeading>
            {result.detectedIngredients.length === 0 ? (
              <p className="font-note text-ink-faded italic">
                Couldn't identify any clear food items. Try a better-lit photo.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {result.detectedIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 border-[2px] border-ink rounded-full font-note text-sm capitalize",
                      ing.confidence === "high"
                        ? "bg-sketch-green/25"
                        : ing.confidence === "medium"
                        ? "bg-phoenix-gold/25"
                        : "bg-paper-cream"
                    )}
                    style={{ filter: "url(#sketch-roughen)" }}
                    title={`${ing.category} · ${ing.confidence} confidence`}
                  >
                    <DoodleCheck size={14} color="#52b788" /> {ing.name}
                  </span>
                ))}
              </div>
            )}
            {result.pantryAssumed && result.pantryAssumed.length > 0 && (
              <div className="mt-3">
                <div className="font-hand text-xs text-ink-faded mb-1">
                  + pantry staples assumed:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.pantryAssumed.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 bg-paper-cream border-[2px] border-ink rounded-full font-note text-xs capitalize opacity-70"
                      style={{ filter: "url(#sketch-roughen)" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </SketchCard>

          {/* Recipe tabs */}
          {result.recipes.length > 0 && (
            <>
              <div className="flex gap-2 flex-wrap">
                {result.recipes.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveRecipe(i)}
                    className={cn(
                      "px-4 py-2 border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] font-scribble text-lg transition shadow-[3px_3px_0_#1a1a1a]",
                      activeRecipe === i
                        ? "bg-phoenix-flame text-white"
                        : "bg-paper-cream hover:bg-paper-dark"
                    )}
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    Recipe {i + 1}
                  </button>
                ))}
              </div>

              <RecipeCard recipe={result.recipes[activeRecipe]} />
            </>
          )}
        </div>
      )}

      <Footer />
    </main>
  );
}

function RecipeCard({ recipe }: { recipe: FridgeRecipeResult["recipes"][number] }) {
  const VegIcon =
    recipe.vegNonVeg === "veg" ? Leaf : recipe.vegNonVeg === "egg" ? Egg : Drumstick;
  const vegColor =
    recipe.vegNonVeg === "veg"
      ? "text-sketch-green"
      : recipe.vegNonVeg === "egg"
      ? "text-phoenix-gold"
      : "text-sketch-red";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* LEFT: header + ingredients */}
      <SketchCard variant="paper" tape className="bg-sketch-green/10">
        <div className="flex items-start justify-between gap-2 mb-2">
          <SketchHeading as="h3" font="scribble" className="!text-2xl md:!text-3xl leading-tight">
            {recipe.name}
          </SketchHeading>
          <VegIcon size={24} className={vegColor} />
        </div>
        <p className="font-note text-sm text-ink-soft mb-3">{recipe.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <Stat Icon={Clock} label="time" value={`${recipe.cookTimeMinutes}m`} />
          <Stat Icon={Users} label="serves" value={String(recipe.servings)} />
          <Stat Icon={Flame} label="level" value={recipe.difficulty} />
        </div>

        <span
          className="inline-block px-2 py-0.5 bg-phoenix-gold/40 border-[2px] border-ink rounded-full font-hand text-xs capitalize mb-3"
          style={{ filter: "url(#sketch-roughen)" }}
        >
          {recipe.cuisine.replace("-", " ")} · {recipe.mealType}
        </span>

        <div>
          <div className="font-scribble text-xl font-bold mb-1">ingredients</div>
          <ul className="space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li
                key={i}
                className={cn(
                  "flex items-start gap-2 font-note text-sm",
                  !ing.available && "opacity-60"
                )}
              >
                <span
                  className={cn(
                    "inline-block w-4 h-4 border-[2px] border-ink rounded-sm shrink-0 mt-0.5",
                    ing.available ? "bg-sketch-green/60" : "bg-paper-dark"
                  )}
                />
                <span>
                  <strong>{ing.quantity}</strong> {ing.name}
                  {!ing.available && (
                    <span className="ml-1 text-xs text-sketch-red italic">(need to buy)</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SketchCard>

      {/* CENTER: steps */}
      <SketchCard variant="cream" className="md:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <ChefHat size={24} className="text-phoenix-flame" />
          <SketchHeading as="h3" font="scribble" className="!text-2xl">
            how to cook
          </SketchHeading>
        </div>
        <ol className="space-y-3">
          {recipe.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full bg-phoenix-flame text-white font-scribble text-lg font-bold flex items-center justify-center border-[2px] border-ink shrink-0"
                style={{ filter: "url(#sketch-roughen)" }}
              >
                {i + 1}
              </div>
              <p className="font-note text-ink-soft leading-relaxed pt-1">{s}</p>
            </li>
          ))}
        </ol>

        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mt-4 p-3 bg-phoenix-gold/20 border-[2px] border-ink rounded-xl" style={{ filter: "url(#sketch-roughen)" }}>
            <div className="font-scribble text-lg font-bold mb-1">💡 pro tips</div>
            <ul className="space-y-1">
              {recipe.tips.map((t, i) => (
                <li key={i} className="font-note text-sm">
                  · {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SketchCard>
    </div>
  );
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div
      className="p-2 bg-paper-cream border-[2px] border-ink rounded-xl text-center"
      style={{ filter: "url(#sketch-roughen)" }}
    >
      <Icon size={16} className="mx-auto text-ink-faded mb-0.5" />
      <div className="font-hand text-xs text-ink-faded">{label}</div>
      <div className="font-scribble text-sm font-bold capitalize">{value}</div>
    </div>
  );
}
