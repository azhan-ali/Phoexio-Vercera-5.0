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
import { SketchInput } from "@/components/sketch/SketchInput";
import { DoodleStar, DoodleCheck } from "@/components/sketch/Doodles";
import { Wand2, Download, RefreshCw, Shirt, User, Sparkles } from "lucide-react";

interface TryOnResult {
  generatedImageUrl: string;
  generatedImageUrls: string[];
  revisedPrompt: string | null;
  prompt: string;
  analysis: {
    person: Record<string, unknown>;
    outfit: Record<string, unknown>;
  };
}

const SCENE_PRESETS = [
  { label: "Studio", value: "soft neutral studio backdrop with warm beige tones, gentle side lighting" },
  { label: "Outdoor", value: "golden hour outdoor setting with soft natural light and a blurred garden background" },
  { label: "Urban", value: "modern urban street setting with soft bokeh lights and city backdrop at dusk" },
  { label: "Wedding", value: "elegant indoor wedding venue with warm fairy lights and floral decor bokeh" },
  { label: "Beach", value: "seaside beach at sunset, soft golden light, waves in the background" },
];

export default function TryOnPage() {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [outfitImage, setOutfitImage] = useState<string | null>(null);
  const [scene, setScene] = useState(SCENE_PRESETS[0].value);
  const [customScene, setCustomScene] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TryOnResult | null>(null);

  async function generate() {
    if (!personImage || !outfitImage) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/fashion/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personImage,
          outfitImage,
          scene: customScene.trim() || scene,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Try-on failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/fashion"
        backLabel="back to fashion"
        eyebrow="Fashion · Feature 5"
        title="Virtual"
        highlight="Try-On"
        subtitle="Apni photo + outfit photo daalo. Grok AI tumhare traits aur outfit details analyze karke ek naya magazine-quality image generate karega — tum us outfit mein kaise dikhoge."
        Icon={Wand2}
      />

      {!result && (
        <>
          {/* Upload row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <SketchCard variant="cream" tape className="!p-5">
              <div className="flex items-center gap-2 mb-3">
                <User size={20} className="text-phoenix-flame" />
                <SketchHeading as="h3" font="scribble" className="!text-2xl">
                  Step 1 · your photo
                </SketchHeading>
              </div>
              <ImageUploader
                id="person-uploader"
                onImage={setPersonImage}
                label="click or drop your photo"
                height="h-72"
              />
              <p className="font-note text-xs text-ink-faded mt-2 italic">
                💡 clear full-body or half-body photo. Plain background works best.
              </p>
            </SketchCard>

            <SketchCard variant="cream" tape className="!p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shirt size={20} className="text-phoenix-flame" />
                <SketchHeading as="h3" font="scribble" className="!text-2xl">
                  Step 2 · outfit photo
                </SketchHeading>
              </div>
              <ImageUploader
                id="outfit-uploader"
                onImage={setOutfitImage}
                label="click or drop the outfit image"
                height="h-72"
              />
              <p className="font-note text-xs text-ink-faded mt-2 italic">
                💡 flat-lay, mannequin, or someone else wearing it — all work fine.
              </p>
            </SketchCard>
          </div>

          {/* Scene picker */}
          <SketchCard variant="paper" className="!p-5 mb-5 bg-phoenix-gold/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-phoenix-gold" />
              <SketchHeading as="h3" font="scribble" className="!text-xl">
                Step 3 · pick the vibe
              </SketchHeading>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {SCENE_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setScene(p.value);
                    setCustomScene("");
                  }}
                  className={`px-4 py-2 border-[2px] border-ink rounded-full font-hand transition ${
                    scene === p.value && !customScene
                      ? "bg-phoenix-flame text-white shadow-[3px_3px_0_#1a1a1a]"
                      : "bg-paper-cream hover:bg-paper-dark"
                  }`}
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <SketchInput
              label="or describe your own scene"
              placeholder="e.g. rooftop party at night with city lights behind"
              value={customScene}
              onChange={(e) => setCustomScene(e.target.value)}
            />
          </SketchCard>

          {/* Generate button */}
          <div className="flex justify-center pb-8">
            <SketchButton
              variant="flame"
              size="lg"
              onClick={generate}
              disabled={!personImage || !outfitImage || loading}
            >
              <Wand2 size={18} />
              {loading ? "Phoenix painting your look…" : "Generate my try-on ✨"}
            </SketchButton>
          </div>

          {/* What you'll get strip */}
          {!loading && !error && (
            <SketchCard variant="paper" className="!p-5 mb-10 bg-sketch-pink/10">
              <SketchHeading as="h3" font="scribble" className="!text-xl mb-3">
                how the magic works
              </SketchHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-note text-sm">
                {[
                  ["1. Grok Vision reads you", "Your body type, skin tone, hair, build — described as anonymous traits."],
                  ["2. Grok Vision reads the outfit", "Garment type, colors, cut, fabric, details — captured precisely."],
                  ["3. Grok Image paints", "A brand-new photo of you wearing that exact outfit in your chosen scene."],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-2 items-start">
                    <DoodleCheck size={18} color="#ff6b35" />
                    <div>
                      <div className="font-scribble text-lg">{t}</div>
                      <div className="text-ink-soft">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SketchCard>
          )}
        </>
      )}

      {loading && <Loading label="Phoenix painting your look… (this takes ~20 seconds)" />}
      {error && (
        <div className="pb-10">
          <ErrorBox message={error} />
        </div>
      )}

      {result && (
        <ResultView
          result={result}
          personImage={personImage}
          outfitImage={outfitImage}
          onReset={reset}
        />
      )}

      <Footer />
    </main>
  );
}

/* ============ RESULT VIEW ============ */
function ResultView({
  result,
  personImage,
  outfitImage,
  onReset,
}: {
  result: TryOnResult;
  personImage: string | null;
  outfitImage: string | null;
  onReset: () => void;
}) {
  const { person, outfit } = result.analysis;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <SketchHeading as="h2" className="!text-3xl md:!text-4xl" underline>
          Your new look ✨
        </SketchHeading>
        <div className="flex gap-2">
          <a
            href={result.generatedImageUrl}
            download="phoenix-tryon.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SketchButton variant="ghost" size="sm">
              <Download size={16} /> Download
            </SketchButton>
          </a>
          <SketchButton variant="ghost" size="sm" onClick={onReset}>
            <RefreshCw size={16} /> Try another
          </SketchButton>
        </div>
      </div>

      {/* Before → After hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        <SketchCard variant="paper" className="!p-3">
          <div className="font-hand text-sm text-ink-faded mb-2 text-center">you</div>
          {personImage && (
            <img
              src={personImage}
              alt="you"
              className="w-full rounded-lg border-[2px] border-ink aspect-[3/4] object-cover"
            />
          )}
        </SketchCard>

        <SketchCard variant="paper" className="!p-3">
          <div className="font-hand text-sm text-ink-faded mb-2 text-center">the outfit</div>
          {outfitImage && (
            <img
              src={outfitImage}
              alt="outfit"
              className="w-full rounded-lg border-[2px] border-ink aspect-[3/4] object-cover"
            />
          )}
        </SketchCard>

        <SketchCard variant="cream" tape className="!p-3 ring-4 ring-phoenix-flame/30">
          <div className="font-scribble text-lg text-phoenix-flame mb-2 text-center flex items-center justify-center gap-1">
            <DoodleStar size={18} color="#ff6b35" /> you in it
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.generatedImageUrl}
            alt="you in the outfit"
            className="w-full rounded-lg border-[2px] border-ink aspect-[3/4] object-cover"
          />
        </SketchCard>
      </div>

      {/* Analysis cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SketchCard variant="cream" className="!p-5 bg-sketch-pink/10">
          <div className="flex items-center gap-2 mb-3">
            <User size={18} className="text-sketch-pink" />
            <SketchHeading as="h3" font="scribble" className="!text-xl">
              what Phoenix saw in you
            </SketchHeading>
          </div>
          <ul className="space-y-1.5 font-note text-sm">
            {Object.entries(person).map(([k, v]) => (
              <li key={k} className="flex gap-2">
                <span className="text-ink-faded capitalize min-w-[130px]">{k.replace(/_/g, " ")}:</span>
                <span className="font-medium">
                  {Array.isArray(v) ? v.join(", ") : String(v)}
                </span>
              </li>
            ))}
          </ul>
        </SketchCard>

        <SketchCard variant="cream" className="!p-5 bg-sketch-blue/10">
          <div className="flex items-center gap-2 mb-3">
            <Shirt size={18} className="text-sketch-blue" />
            <SketchHeading as="h3" font="scribble" className="!text-xl">
              what Phoenix saw in the outfit
            </SketchHeading>
          </div>
          <ul className="space-y-1.5 font-note text-sm">
            {Object.entries(outfit).map(([k, v]) => (
              <li key={k} className="flex gap-2">
                <span className="text-ink-faded capitalize min-w-[130px]">{k.replace(/_/g, " ")}:</span>
                <span className="font-medium">
                  {Array.isArray(v) ? v.join(", ") : String(v)}
                </span>
              </li>
            ))}
          </ul>
        </SketchCard>
      </div>

      {/* Prompt reveal (fun transparency touch) */}
      <SketchCard variant="paper" className="!p-5">
        <SketchHeading as="h3" font="scribble" className="!text-xl mb-2">
          🪄 the exact prompt Phoenix used
        </SketchHeading>
        <p className="font-note text-sm text-ink-soft italic whitespace-pre-wrap">
          {result.revisedPrompt || result.prompt}
        </p>
      </SketchCard>

      <p className="text-center font-note text-xs text-ink-faded italic">
        ⚠️ Generated image is an AI approximation — fabric drape, face, and fit may differ from
        reality. For illustrative styling only.
      </p>
    </div>
  );
}
