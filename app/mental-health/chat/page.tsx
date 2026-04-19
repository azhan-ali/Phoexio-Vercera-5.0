"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import {
  SUPPORTED_LANGUAGES,
  PERSONAS,
  TONES,
  type LanguageCode,
  type PersonaId,
  type ToneId,
} from "@/lib/prompts/mental";
import {
  Bot,
  Send,
  Loader2,
  Phone,
  Trash2,
  Languages,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Msg {
  role: "user" | "assistant";
  content: string;
  id: string;
}

interface Helpline {
  name: string;
  phone: string;
  hours: string;
}

/**
 * Greeting built from the chosen persona + tone so the first line
 * already feels like the right companion.
 */
function buildGreeting(persona: PersonaId, tone: ToneId, language: LanguageCode) {
  const p = PERSONAS.find((x) => x.id === persona) ?? PERSONAS[0];
  const t = TONES.find((x) => x.id === tone) ?? TONES[1];

  if (language === "en") {
    return `Hey — I'm Phoenix, your ${p.label.toLowerCase()}. Tone set to ${t.label.toLowerCase()} ${t.emoji}. What's on your mind?`;
  }
  // Default Hinglish-friendly greeting
  return `Hey yaar — main Phoenix, tumhara ${p.label.toLowerCase()} ${p.emoji}. Mood set to ${t.label.toLowerCase()} ${t.emoji}. Kya chal raha hai?`;
}

export default function ChatPage() {
  const [language, setLanguage] = useState<LanguageCode>("hinglish");
  const [persona, setPersona] = useState<PersonaId>("friend");
  const [toneIdx, setToneIdx] = useState(1); // index into TONES array (0-4)
  const tone: ToneId = TONES[toneIdx].id;

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [helplines, setHelplines] = useState<Helpline[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset greeting whenever persona / tone / language changes and there's no user msg yet
  useEffect(() => {
    setMessages((prev) => {
      const hasUser = prev.some((m) => m.role === "user");
      if (hasUser) return prev;
      return [
        {
          role: "assistant",
          content: buildGreeting(persona, tone, language),
          id: "greet",
        },
      ];
    });
  }, [persona, tone, language]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const activePersona = useMemo(
    () => PERSONAS.find((p) => p.id === persona) ?? PERSONAS[0],
    [persona]
  );
  const activeTone = TONES[toneIdx];

  async function send(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    const userMsg: Msg = { role: "user", content: text, id: `u-${Date.now()}` };
    const history = [...messages.filter((m) => m.id !== "greet"), userMsg];
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mental/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          language,
          persona,
          tone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat failed");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.content, id: `a-${Date.now()}` },
      ]);
      if (data.crisis?.triggered) {
        setHelplines(data.crisis.helplines);
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Ek second — connection thoda atka. Phir se try karo? (" +
            (e instanceof Error ? e.message : "error") +
            ")",
          id: `a-${Date.now()}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    if (!confirm("Clear this conversation? It won't be saved anywhere.")) return;
    setMessages([
      {
        role: "assistant",
        content: buildGreeting(persona, tone, language),
        id: "greet",
      },
    ]);
    setHelplines(null);
  }

  return (
    <main className="px-4 md:px-8 max-w-5xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/mental-health"
        backLabel="back to mental health"
        eyebrow="Mental Health · Feature 1"
        title="Your AI"
        highlight="Companion"
        subtitle="Pick a persona, dial in the tone — chat with a bot that adapts to exactly the kind of conversation you need. Private. Never saved."
        Icon={Bot}
      />

      {/* ============ PERSONA PICKER ============ */}
      <div className="mb-4">
        <div className="font-hand text-sm text-ink-faded mb-2 flex items-center gap-2">
          <Sparkles size={14} /> choose your companion
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PERSONAS.map((p) => {
            const active = p.id === persona;
            return (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={cn(
                  "text-left p-3 border-[2.5px] border-ink rounded-xl transition-all",
                  "hover:-translate-y-1 hover:shadow-[3px_3px_0_#1a1a1a]",
                  active
                    ? "bg-phoenix-flame/20 shadow-[3px_3px_0_#1a1a1a] -translate-y-1"
                    : p.accent
                )}
                style={{ filter: "url(#sketch-roughen)" }}
              >
                <div className="text-2xl mb-1">{p.emoji}</div>
                <div className="font-scribble font-bold text-base leading-tight">
                  {p.label}
                </div>
                <div className="font-hand text-xs text-ink-soft italic">
                  {p.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============ TONE SLIDER ============ */}
      <SketchCard variant="cream" className="!p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-hand text-sm text-ink-faded">
            how should i sound?
          </div>
          <div className="font-scribble text-lg font-bold text-phoenix-flame">
            {activeTone.emoji} {activeTone.label}
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={TONES.length - 1}
          step={1}
          value={toneIdx}
          onChange={(e) => setToneIdx(Number(e.target.value))}
          className="w-full accent-phoenix-flame cursor-pointer"
        />

        <div className="flex justify-between mt-2 px-1">
          {TONES.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setToneIdx(i)}
              className={cn(
                "flex flex-col items-center gap-0.5 transition-opacity cursor-pointer",
                i === toneIdx ? "opacity-100 scale-110" : "opacity-50 hover:opacity-80"
              )}
              type="button"
            >
              <span className="text-lg">{t.emoji}</span>
              <span className="font-hand text-[11px] text-ink-soft">{t.label}</span>
            </button>
          ))}
        </div>
      </SketchCard>

      {/* ============ LANGUAGE + CLEAR ============ */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Languages size={18} className="text-ink-faded" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="px-3 py-1.5 bg-paper-cream text-ink font-note text-sm border-[2px] border-ink rounded-[12px_18px_14px_20px/16px_12px_18px_12px] outline-none"
            style={{ filter: "url(#sketch-roughen)" }}
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={clearChat}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-paper-cream border-[2px] border-ink rounded-full font-hand text-sm hover:bg-sketch-red/20 transition"
          style={{ filter: "url(#sketch-roughen)" }}
        >
          <Trash2 size={14} /> clear chat
        </button>
      </div>

      {/* ============ CRISIS BANNER ============ */}
      {helplines && (
        <SketchCard
          variant="paper"
          className="!p-4 mb-4 bg-sketch-red/15 border-sketch-red"
        >
          <div className="flex items-start gap-3">
            <Phone size={24} className="text-sketch-red shrink-0 mt-1" />
            <div className="flex-1">
              <div className="font-scribble text-xl font-bold mb-1">
                You matter. Real humans are ready to listen — please reach out.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                {helplines.map((h) => (
                  <a
                    key={h.phone}
                    href={`tel:${h.phone.replace(/-/g, "")}`}
                    className="p-2 bg-paper-cream border-[2px] border-ink rounded-xl hover:bg-sketch-red hover:text-white transition block"
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    <div className="font-hand text-xs">{h.name}</div>
                    <div className="font-scribble text-lg font-bold">{h.phone}</div>
                    <div className="font-note text-xs opacity-70">{h.hours}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SketchCard>
      )}

      {/* ============ CHAT WINDOW ============ */}
      <SketchCard variant="paper" className="!p-0 mb-4 overflow-hidden">
        <div className="px-4 py-2 border-b-2 border-dashed border-ink/30 flex items-center gap-2 bg-paper-cream/60">
          <span className="text-xl">{activePersona.emoji}</span>
          <div className="flex-1">
            <div className="font-scribble font-bold leading-none">
              {activePersona.label}
            </div>
            <div className="font-hand text-xs text-ink-faded">
              {activeTone.emoji} {activeTone.label} tone · {activePersona.tagline}
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="h-[460px] overflow-y-auto p-4 space-y-3 bg-paper-cream paper-lined"
        >
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} emoji={activePersona.emoji} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 font-hand text-ink-faded pl-2">
              <Loader2 size={16} className="animate-spin" />
              {activePersona.label} is typing…
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t-2 border-dashed border-ink/30 flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={`type to your ${activePersona.label.toLowerCase()}… (Enter to send)`}
            rows={2}
            className="flex-1 px-3 py-2 bg-paper-cream text-ink font-note text-base border-[2.5px] border-ink rounded-[12px_18px_14px_20px/16px_12px_18px_12px] outline-none resize-none placeholder:italic placeholder:text-ink-faded"
            style={{ filter: "url(#sketch-roughen)" }}
          />
          <SketchButton
            variant="flame"
            onClick={() => send()}
            disabled={loading || !input.trim()}
          >
            <Send size={18} />
          </SketchButton>
        </div>
      </SketchCard>

      <p className="text-center font-note text-xs text-ink-faded italic mb-8">
        🔒 your chat is never saved. not logged. not trained on. switch persona
        or tone anytime — new vibe, same private space.
      </p>

      <Footer />
    </main>
  );
}

function Bubble({ msg, emoji }: { msg: Msg; emoji: string }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 shrink-0 mr-2 rounded-full bg-paper border-[2px] border-ink flex items-center justify-center text-base">
          {emoji}
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2 border-[2.5px] border-ink",
          "font-note text-base leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-phoenix-flame text-white rounded-[16px_16px_4px_16px/18px_16px_4px_16px]"
            : "bg-paper border-ink rounded-[16px_16px_16px_4px/16px_18px_16px_4px]"
        )}
        style={{ filter: "url(#sketch-roughen)" }}
      >
        {msg.content}
      </div>
    </div>
  );
}
