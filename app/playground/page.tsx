"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHero from "@/components/layout/SectionHero";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { SketchInput, SketchTextarea } from "@/components/sketch/SketchInput";
import { cn } from "@/lib/utils";
import { apiChat, apiVision, apiSearch, fileToDataUrl } from "@/lib/api";
import {
  FlaskConical,
  MessageSquare,
  Camera,
  Globe,
  Loader2,
  AlertTriangle,
  Image as ImageIcon,
} from "lucide-react";

type Tab = "chat" | "vision" | "search";

const tabs: { id: Tab; label: string; Icon: typeof MessageSquare }[] = [
  { id: "chat", label: "Chat", Icon: MessageSquare },
  { id: "vision", label: "Vision", Icon: Camera },
  { id: "search", label: "Live Search", Icon: Globe },
];

export default function PlaygroundPage() {
  const [tab, setTab] = useState<Tab>("chat");

  return (
    <main className="px-4 md:px-8 max-w-5xl mx-auto">
      <Navbar />

      <SectionHero
        eyebrow="Developer Playground"
        title="Grok API"
        highlight="playground"
        subtitle="Test the three Grok endpoints powering Phoenix — chat, vision, and live web search. Add your API key in .env.local first."
        Icon={FlaskConical}
        accentColor="bg-phoenix-gold/40"
      />

      {/* ======== TABS ======== */}
      <div className="flex gap-2 md:gap-3 mb-6 justify-center flex-wrap">
        {tabs.map(({ id, label, Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2 font-hand text-lg",
                "border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px]",
                "transition shadow-[3px_3px_0_#1a1a1a]",
                active
                  ? "bg-phoenix-flame text-white"
                  : "bg-paper-cream text-ink hover:bg-paper-dark"
              )}
              style={{ filter: "url(#sketch-roughen)" }}
            >
              <Icon size={18} /> {label}
            </button>
          );
        })}
      </div>

      {/* ======== PANELS ======== */}
      <section className="pb-10">
        {tab === "chat" && <ChatPanel />}
        {tab === "vision" && <VisionPanel />}
        {tab === "search" && <SearchPanel />}
      </section>

      <Footer />
    </main>
  );
}

/* =========================================================
   CHAT PANEL
   ========================================================= */
function ChatPanel() {
  const [prompt, setPrompt] = useState(
    "Mujhe 5 creative Hinglish outfit captions suggest kar jo Instagram ke liye cool ho."
  );
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Phoenix — a witty, warm, Hinglish-speaking lifestyle AI."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  async function run() {
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const { content } = await apiChat({ prompt, systemPrompt });
      setOutput(content);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SketchCard variant="cream" className="!p-5">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
          Request
        </SketchHeading>
        <div className="space-y-3">
          <SketchTextarea
            label="System prompt (optional)"
            rows={3}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
          <SketchTextarea
            label="Prompt"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <SketchButton variant="flame" onClick={run} disabled={loading || !prompt}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Asking Grok…
              </>
            ) : (
              <>Send to Grok</>
            )}
          </SketchButton>
        </div>
      </SketchCard>

      <OutputCard title="Response" loading={loading} error={error} output={output} />
    </div>
  );
}

/* =========================================================
   VISION PANEL
   ========================================================= */
function VisionPanel() {
  const [prompt, setPrompt] = useState(
    "Describe this image in detail. What Indian recipes could I make if this was my fridge?"
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      setError("Image too large (max 8MB).");
      return;
    }
    const url = await fileToDataUrl(f);
    setImageUrl(url);
  }

  async function run() {
    if (!imageUrl) {
      setError("Please upload an image first.");
      return;
    }
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const { content } = await apiVision({ imageUrl, prompt });
      setOutput(content);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SketchCard variant="cream" className="!p-5">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
          Upload & ask
        </SketchHeading>
        <div className="space-y-3">
          <label className="block">
            <span className="block mb-1.5 font-hand text-ink text-lg">Image</span>
            <label
              htmlFor="vision-file"
              className="cursor-pointer flex flex-col items-center justify-center gap-2 py-8 bg-paper-cream border-[2.5px] border-dashed border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] hover:bg-paper-dark transition"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="preview"
                  className="max-h-48 rounded-lg border-[2px] border-ink"
                />
              ) : (
                <>
                  <ImageIcon size={40} className="text-ink-faded" />
                  <span className="font-hand text-ink-faded">click to upload (max 8MB)</span>
                </>
              )}
            </label>
            <input
              id="vision-file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
          </label>
          <SketchTextarea
            label="Prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <SketchButton
            variant="flame"
            onClick={run}
            disabled={loading || !imageUrl || !prompt}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Analyzing…
              </>
            ) : (
              <>Send to Grok Vision</>
            )}
          </SketchButton>
        </div>
      </SketchCard>

      <OutputCard title="Analysis" loading={loading} error={error} output={output} />
    </div>
  );
}

/* =========================================================
   SEARCH PANEL
   ========================================================= */
function SearchPanel() {
  const [query, setQuery] = useState(
    "What are the top 5 fashion trends in India this week? Be specific and cite sources."
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState("");
  const [citations, setCitations] = useState<string[]>([]);

  async function run() {
    setLoading(true);
    setError(null);
    setOutput("");
    setCitations([]);
    try {
      const { content, citations } = await apiSearch({ query });
      setOutput(content);
      setCitations(citations || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SketchCard variant="cream" className="!p-5">
        <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
          Live web query
        </SketchHeading>
        <div className="space-y-3">
          <SketchTextarea
            label="Query (Grok will search web/news/X)"
            rows={6}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SketchButton variant="flame" onClick={run} disabled={loading || !query}>
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Searching…
              </>
            ) : (
              <>Search & Answer</>
            )}
          </SketchButton>
        </div>
      </SketchCard>

      <OutputCard
        title="Answer"
        loading={loading}
        error={error}
        output={output}
        citations={citations}
      />
    </div>
  );
}

/* =========================================================
   SHARED OUTPUT CARD
   ========================================================= */
function OutputCard({
  title,
  loading,
  error,
  output,
  citations,
}: {
  title: string;
  loading: boolean;
  error: string | null;
  output: string;
  citations?: string[];
}) {
  return (
    <SketchCard variant="paper" className="!p-5 min-h-[300px]">
      <SketchHeading as="h3" font="scribble" className="!text-2xl mb-3">
        {title}
      </SketchHeading>

      {error && (
        <div
          className="p-3 bg-sketch-red/15 border-[2px] border-sketch-red rounded-xl flex gap-2 items-start mb-3"
          style={{ filter: "url(#sketch-roughen)" }}
        >
          <AlertTriangle size={18} className="text-sketch-red shrink-0 mt-0.5" />
          <div className="font-note text-sm text-ink">{error}</div>
        </div>
      )}

      {loading && !output && (
        <div className="flex items-center gap-2 font-hand text-ink-faded py-8 justify-center">
          <Loader2 className="animate-spin" size={20} /> Grok is thinking…
        </div>
      )}

      {output && (
        <div className="font-note text-ink whitespace-pre-wrap leading-relaxed">{output}</div>
      )}

      {!output && !error && !loading && (
        <div className="font-hand text-ink-faded italic">Run a request to see the response…</div>
      )}

      {citations && citations.length > 0 && (
        <div className="mt-4 pt-3 border-t-2 border-dashed border-ink/30">
          <div className="font-hand text-sm text-ink-faded mb-1">sources:</div>
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
        </div>
      )}
    </SketchCard>
  );
}
