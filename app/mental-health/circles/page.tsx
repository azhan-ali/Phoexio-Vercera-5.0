"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturePageHeader from "@/components/feature/FeaturePageHeader";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { Users, Send, Shield, Heart, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const circles = [
  {
    id: "anxiety",
    name: "Anxiety Circle",
    emoji: "🌊",
    desc: "for the racing-heart, can't-stop-thinking crew",
    count: 1248,
    color: "bg-sketch-blue/25",
  },
  {
    id: "exam-stress",
    name: "Exam Stress",
    emoji: "📚",
    desc: "boards · JEE · NEET · semesters — all welcome",
    count: 892,
    color: "bg-phoenix-gold/30",
  },
  {
    id: "heartbreak",
    name: "Heartbreak Healing",
    emoji: "💔",
    desc: "breakups, unreturned feelings, lost friendships",
    count: 563,
    color: "bg-sketch-pink/25",
  },
  {
    id: "career",
    name: "Career Confusion",
    emoji: "🧭",
    desc: "quarter-life crisis · job search · pivot",
    count: 734,
    color: "bg-sketch-purple/25",
  },
  {
    id: "loneliness",
    name: "Loneliness",
    emoji: "🫂",
    desc: "feeling unseen · new city · friend drift",
    count: 421,
    color: "bg-sketch-green/20",
  },
  {
    id: "family",
    name: "Family Stuff",
    emoji: "🏠",
    desc: "indian family dynamics, pressure, expectations",
    count: 987,
    color: "bg-sketch-red/15",
  },
];

// Seed messages per circle (mock)
const seedMessages: Record<string, { handle: string; text: string }[]> = {
  anxiety: [
    { handle: "moonwalker_22", text: "heart is racing before a presentation, any quick grounding tips?" },
    { handle: "silent_sunflower", text: "5-4-3-2-1 works for me. 5 things you see, 4 hear, 3 touch, 2 smell, 1 taste" },
    { handle: "chai_lover", text: "box breathing saves me every time" },
  ],
  "exam-stress": [
    { handle: "physics_panda", text: "jee mains in 10 days and i blank out on mock tests" },
    { handle: "midnight_oil", text: "you got this. revision > new topics at this stage" },
    { handle: "tea_papers", text: "take breaks. burnout is real." },
  ],
  heartbreak: [
    { handle: "letting_go", text: "6 months and still catch myself checking their story" },
    { handle: "rainy_mornings", text: "block → mute → unfollow. you deserve the mental peace" },
  ],
  career: [
    { handle: "path_less_known", text: "left my tech job to do design. scared but free" },
    { handle: "comfort_food", text: "same. took me 2 years to admit i wasn't happy" },
  ],
  loneliness: [
    { handle: "quiet_corner", text: "moved to bangalore for work. know nobody. any meetup tips?" },
    { handle: "soft_glow", text: "try book clubs or bouldering gyms — low pressure community" },
  ],
  family: [
    { handle: "mango_pickle", text: "mom compared me to cousin again. can't talk about it with her" },
    { handle: "old_notebook", text: "setting boundaries with indian parents is a marathon not a sprint" },
  ],
};

const randomHandles = [
  "paper_boat",
  "ink_drop",
  "midnight_masala",
  "ginger_chai",
  "soft_cloud",
  "star_gazer",
  "slow_sunday",
  "kite_string",
];

function makeHandle() {
  return randomHandles[Math.floor(Math.random() * randomHandles.length)] + "_" + Math.floor(Math.random() * 99);
}

export default function CirclesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = circles.find((c) => c.id === activeId);
  const [messages, setMessages] = useState<{ handle: string; text: string; me?: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [handle] = useState(makeHandle);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeId) setMessages(seedMessages[activeId] || []);
    else setMessages([]);
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  function post() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { handle: `you (${handle})`, text: input.trim(), me: true }]);
    setInput("");
  }

  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />
      <FeaturePageHeader
        backHref="/mental-health"
        backLabel="back to mental health"
        eyebrow="Mental Health · Feature 3"
        title="Peer Support"
        highlight="Circles"
        subtitle="Anonymous topic-based circles. Real humans, random handles, moderated for safety. You're not alone in what you're feeling."
        Icon={Users}
      />

      {/* Safety banner */}
      <SketchCard variant="paper" className="!p-3 mb-5 bg-sketch-blue/10 flex items-center gap-3">
        <Shield size={22} className="text-sketch-blue shrink-0" />
        <p className="font-note text-sm">
          <strong>community rules:</strong> kindness first · no advice unless asked · no crisis chats
          here (use <a href="/mental-health/crisis" className="text-phoenix-flame underline">crisis support</a>) · auto-moderation via AI · you are{" "}
          <span className="font-scribble font-bold">{handle}</span> today
        </p>
      </SketchCard>

      {!active && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
          {circles.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className="text-left"
            >
              <SketchCard
                variant="paper"
                hoverable
                tilt={c.id.length % 2 === 0 ? "left" : "right"}
                className={cn("h-full", c.color)}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="text-4xl">{c.emoji}</div>
                  <div>
                    <SketchHeading as="h3" font="scribble" className="!text-2xl leading-tight">
                      {c.name}
                    </SketchHeading>
                    <div className="flex items-center gap-1 font-hand text-xs text-ink-faded mt-0.5">
                      <Users size={12} /> {c.count.toLocaleString()} active
                    </div>
                  </div>
                </div>
                <p className="font-note text-sm text-ink-soft">{c.desc}</p>
                <div className="mt-3 pt-2 border-t-2 border-dashed border-ink/30 font-hand text-phoenix-flame text-sm inline-flex items-center gap-1">
                  enter circle <Flame size={14} />
                </div>
              </SketchCard>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div className="pb-10">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{active.emoji}</div>
              <div>
                <SketchHeading as="h2" font="scribble" className="!text-3xl leading-tight">
                  {active.name}
                </SketchHeading>
                <div className="font-hand text-xs text-ink-faded flex items-center gap-1">
                  <Users size={12} /> {active.count.toLocaleString()} members
                </div>
              </div>
            </div>
            <SketchButton variant="ghost" size="sm" onClick={() => setActiveId(null)}>
              all circles
            </SketchButton>
          </div>

          <SketchCard variant="paper" className="!p-0 overflow-hidden">
            <div
              ref={scrollRef}
              className={cn("h-[420px] overflow-y-auto p-4 space-y-3 paper-lined", active.color)}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 border-[2px] border-ink rounded-[14px_18px_14px_20px/16px_12px_18px_12px] max-w-[85%]",
                    m.me
                      ? "ml-auto bg-phoenix-flame text-white"
                      : "bg-paper-cream"
                  )}
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  <div className={cn("font-hand text-xs mb-0.5", m.me ? "text-white/80" : "text-ink-faded")}>
                    {m.handle}
                  </div>
                  <div className="font-note text-sm">{m.text}</div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t-2 border-dashed border-ink/30 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && post()}
                placeholder="share anonymously…"
                className="flex-1 px-3 py-2 bg-paper-cream text-ink font-note text-base border-[2.5px] border-ink rounded-[12px_18px_14px_20px/16px_12px_18px_12px] outline-none placeholder:italic placeholder:text-ink-faded"
                style={{ filter: "url(#sketch-roughen)" }}
              />
              <SketchButton variant="flame" onClick={post} disabled={!input.trim()}>
                <Send size={16} />
              </SketchButton>
            </div>
          </SketchCard>

          <div className="mt-3 flex items-center gap-2 font-note text-xs text-ink-faded italic justify-center">
            <Heart size={12} /> hackathon demo — seeded messages are mocked · your post stays local
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
