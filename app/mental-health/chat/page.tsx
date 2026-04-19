"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/prompts/mental";
import {
  MessageCircleHeart,
  Send,
  Loader2,
  Phone,
  Trash2,
  Languages,
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

const GREETINGS: Record<LanguageCode, string> = {
  en: "Hey, I'm Phoenix. I'm here to just listen — no pressure, no fixing. How are you really feeling today?",
  hi: "नमस्ते, मैं फीनिक्स हूँ। मैं सिर्फ सुनने के लिए हूँ — कोई दबाव नहीं, कोई सुधार नहीं। आज सच में कैसा महसूस हो रहा है?",
  hinglish:
    "Hey, main Phoenix. Main bas sun-ne ke liye hun — koi judgement nahi, koi advice ka pressure nahi. Aaj sach mein kaisa feel ho raha hai?",
  mr: "नमस्कार, मी फीनिक्स आहे. मी फक्त ऐकण्यासाठी आहे. आज खरंच कसं वाटतंय?",
  ta: "வணக்கம், நான் பீனிக்ஸ். நான் கேட்க மட்டுமே இங்கே இருக்கிறேன். இன்று உங்களுக்கு உண்மையில் எப்படி இருக்கிறது?",
  te: "నమస్తే, నేను ఫీనిక్స్. నేను వినడానికి మాత్రమే ఇక్కడ ఉన్నాను. ఈరోజు నిజంగా ఎలా అనిపిస్తోంది?",
  bn: "হ্যালো, আমি ফিনিক্স। আমি শুধু শোনার জন্য এখানে আছি। আজ সত্যিই কেমন লাগছে?",
  gu: "હેલો, હું ફીનિક્સ છું. હું ફક્ત સાંભળવા માટે અહીં છું. આજે ખરેખર કેવું લાગે છે?",
};

const QUICK_PROMPTS = [
  "I'm feeling overwhelmed",
  "Can't sleep lately",
  "I had a really good day",
  "Work stress is killing me",
  "I feel lonely",
  "Anxious about tomorrow",
];

export default function ChatPage() {
  const [language, setLanguage] = useState<LanguageCode>("hinglish");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [helplines, setHelplines] = useState<Helpline[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // initial greeting
  useEffect(() => {
    setMessages([
      { role: "assistant", content: GREETINGS[language], id: "greet" },
    ]);
  }, [language]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

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
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat failed");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.content,
          id: `a-${Date.now()}`,
        },
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
            "Mujhe thoda rukna pada — connection issue ho raha hai. Phir se try karo? (" +
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
    setMessages([{ role: "assistant", content: GREETINGS[language], id: "greet" }]);
    setHelplines(null);
  }

  return (
    <main className="px-4 md:px-8 max-w-4xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/mental-health"
        backLabel="back to mental health"
        eyebrow="Mental Health · Feature 1"
        title="Anonymous"
        highlight="AI Chat"
        subtitle="24/7 judgement-free listener. Koi login nahi, naam nahi — bas baat karo. Conversation is never saved."
        Icon={MessageCircleHeart}
      />

      {/* Language + clear controls */}
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

      {/* Crisis helpline banner */}
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

      {/* Chat window */}
      <SketchCard variant="paper" className="!p-0 mb-4 overflow-hidden">
        <div
          ref={scrollRef}
          className="h-[480px] overflow-y-auto p-4 space-y-3 bg-paper-cream paper-lined"
        >
          {messages.map((m) => (
            <Bubble key={m.id} msg={m} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 font-hand text-ink-faded pl-2">
              <Loader2 size={16} className="animate-spin" />
              Phoenix is listening…
            </div>
          )}
        </div>

        {/* Quick prompts (only on empty chat) */}
        {messages.filter((m) => m.role === "user").length === 0 && (
          <div className="p-3 border-t-2 border-dashed border-ink/30 flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="px-3 py-1 bg-paper-cream border-[2px] border-ink rounded-full font-hand text-xs hover:bg-phoenix-flame hover:text-white transition"
                style={{ filter: "url(#sketch-roughen)" }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

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
            placeholder="share what's on your mind… (Enter to send, Shift+Enter newline)"
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
        🔒 your chat is never saved. not logged. not trained on. not a therapist — but a kind ear.
      </p>

      <Footer />
    </main>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
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
