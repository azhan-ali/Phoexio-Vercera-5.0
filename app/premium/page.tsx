"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHero from "@/components/layout/SectionHero";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import CheckoutModal from "@/components/premium/CheckoutModal";
import { DoodleStar, DoodleLightning } from "@/components/sketch/Doodles";
import { isPremium, setPremium, subscribePremium } from "@/lib/premium";
import {
  Sparkles,
  Check,
  X,
  Crown,
  Lock,
  ArrowRight,
  Zap,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features: { name: string; free: boolean | string; premium: boolean | string; category: string }[] = [
  { category: "Fashion", name: "Outfit Analyzer (vision)", free: true, premium: true },
  { category: "Fashion", name: "Live Fashion Trend Radar", free: true, premium: true },
  { category: "Fashion", name: "Occasion Complete Package", free: false, premium: true },
  { category: "Fashion", name: "Mood-Based Styling", free: false, premium: true },
  { category: "Food", name: "Fridge-to-Recipe AI", free: true, premium: true },
  { category: "Food", name: "Body-Type Meal Planner", free: true, premium: true },
  { category: "Food", name: "Dadi-Nani Ke Nuskhe", free: true, premium: true },
  { category: "Mental Health", name: "Anonymous AI Chat", free: true, premium: true },
  { category: "Mental Health", name: "Mood Journal + AI Insights", free: true, premium: true },
  { category: "Mental Health", name: "Crisis Support", free: true, premium: true },
  { category: "Mental Health", name: "Peer Support Circles", free: true, premium: true },
  { category: "Mental Health", name: "8 Language Support", free: true, premium: true },
  { category: "AI Power", name: "Daily queries", free: "30/day", premium: "Unlimited" },
  { category: "AI Power", name: "Grok model", free: "grok-2", premium: "grok-4 (latest)" },
  { category: "AI Power", name: "Priority speed", free: false, premium: true },
  { category: "Extras", name: "Early access to new features", free: false, premium: true },
  { category: "Extras", name: "Personalized memory across sessions", free: false, premium: true },
];

export default function PremiumPage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUnlocked(isPremium());
    return subscribePremium(setUnlocked);
  }, []);

  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />

      <SectionHero
        eyebrow="Phoenix Premium"
        title="Go"
        highlight="holistic"
        subtitle="Unlock the holistic-reasoning features — the full outfit+venue+food+music evening planner, mood-aware styling, unlimited queries, and priority Grok-4 speed."
        Icon={Crown}
        accentColor="bg-phoenix-gold/40"
        doodleColors={["#ffba08", "#ff4500", "#9d4edd", "#e63946"]}
      />

      {/* Premium active banner */}
      {mounted && unlocked && (
        <SketchCard
          variant="paper"
          className="!p-4 mb-6 bg-sketch-green/20 flex items-center gap-3"
        >
          <div
            className="w-10 h-10 bg-sketch-green text-white border-[2px] border-ink rounded-full flex items-center justify-center"
            style={{ filter: "url(#sketch-roughen)" }}
          >
            <Check size={22} strokeWidth={3} />
          </div>
          <div className="flex-1">
            <div className="font-scribble text-xl font-bold">You're already Premium ✨</div>
            <p className="font-note text-sm text-ink-soft">
              All features unlocked. Enjoy the full Phoenix experience.
            </p>
          </div>
          <SketchButton
            variant="ghost"
            size="sm"
            onClick={() => {
              if (confirm("Cancel Premium for demo?")) setPremium(false);
            }}
          >
            Cancel
          </SketchButton>
        </SketchCard>
      )}

      {/* PLAN TOGGLE */}
      <div className="flex justify-center mb-6">
        <div
          className="inline-flex gap-1 p-1 bg-paper-cream border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px]"
          style={{ filter: "url(#sketch-roughen)" }}
        >
          {(["monthly", "yearly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={cn(
                "px-5 py-1.5 font-hand text-lg capitalize rounded-full transition",
                plan === p ? "bg-phoenix-flame text-white" : "hover:bg-paper-dark"
              )}
            >
              {p}
              {p === "yearly" && (
                <span className="ml-1 px-1.5 py-0.5 bg-sketch-green text-white rounded-full text-xs font-bold">
                  save 33%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* FREE */}
        <SketchCard variant="cream" tilt="left" className="!p-6 relative">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={24} className="text-ink" />
            <SketchHeading as="h3" font="scribble" className="!text-3xl">
              Free
            </SketchHeading>
          </div>
          <p className="font-hand text-ink-faded mb-3">to get started · no card needed</p>
          <div className="font-scribble text-5xl font-bold mb-1">₹0</div>
          <div className="font-hand text-sm text-ink-faded mb-4">forever</div>

          <ul className="space-y-2 font-note text-sm mb-5">
            <BulletYes>All core AI features</BulletYes>
            <BulletYes>Outfit analyzer + trends + fridge scanner</BulletYes>
            <BulletYes>Mental health chat + journal + crisis</BulletYes>
            <BulletYes>8 language support</BulletYes>
            <BulletNo>Occasion Complete Package</BulletNo>
            <BulletNo>Mood-Based Styling</BulletNo>
            <BulletNo>Unlimited queries · priority speed</BulletNo>
          </ul>

          <SketchButton variant="ghost" size="lg" className="w-full justify-center" disabled>
            Current plan
          </SketchButton>
        </SketchCard>

        {/* PREMIUM */}
        <SketchCard
          variant="paper"
          tilt="right"
          tape
          className="!p-6 bg-phoenix-gold/20 relative"
        >
          <div className="absolute top-3 right-3 animate-wobble-slow">
            <DoodleStar size={28} color="#ff4500" />
          </div>
          <div className="absolute bottom-3 left-3 animate-wobble-slow">
            <DoodleLightning size={24} color="#fcbf49" />
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs mb-2">
            <Sparkles size={12} /> most popular
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Crown size={24} className="text-phoenix-flame" />
            <SketchHeading as="h3" font="scribble" className="!text-3xl">
              Premium
            </SketchHeading>
          </div>
          <p className="font-hand text-ink-faded mb-3">for the full Phoenix experience</p>
          <div className="flex items-baseline gap-2 mb-1">
            <div className="font-scribble text-5xl font-bold text-phoenix-flame">
              {plan === "yearly" ? "₹199" : "₹299"}
            </div>
            <div className="font-hand text-ink-faded">/month</div>
          </div>
          <div className="font-hand text-sm text-ink-faded mb-4">
            {plan === "yearly" ? (
              <>billed ₹2,399 yearly · <span className="line-through">₹3,588</span></>
            ) : (
              "billed monthly · cancel anytime"
            )}
          </div>

          <ul className="space-y-2 font-note text-sm mb-5">
            <BulletYes>
              <strong>Everything in Free</strong>
            </BulletYes>
            <BulletYes>
              <strong>Occasion Complete Package</strong> (outfit + venue + food + music)
            </BulletYes>
            <BulletYes>
              <strong>Mood-Based Styling</strong> with color psychology
            </BulletYes>
            <BulletYes>Unlimited AI queries</BulletYes>
            <BulletYes>Grok-4 (priority + faster responses)</BulletYes>
            <BulletYes>Personalized memory across sessions</BulletYes>
            <BulletYes>Early access to new features</BulletYes>
          </ul>

          <SketchButton
            variant="flame"
            size="lg"
            className="w-full justify-center"
            onClick={() => setModalOpen(true)}
            disabled={unlocked}
          >
            {unlocked ? (
              <>
                <Check size={18} /> You're premium
              </>
            ) : (
              <>
                <Sparkles size={18} /> Unlock Premium <ArrowRight size={16} />
              </>
            )}
          </SketchButton>
        </SketchCard>
      </div>

      {/* FEATURE COMPARISON */}
      <div className="mb-10">
        <SketchHeading as="h2" className="!text-3xl md:!text-4xl text-center mb-6" underline>
          Full comparison
        </SketchHeading>
        <SketchCard variant="paper" className="!p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ink text-paper-cream">
                <th className="text-left p-3 font-scribble text-lg">Feature</th>
                <th className="text-center p-3 font-scribble text-lg w-24">Free</th>
                <th className="text-center p-3 font-scribble text-lg w-28 bg-phoenix-flame">
                  Premium ✨
                </th>
              </tr>
            </thead>
            <tbody className="font-note">
              {Object.entries(
                features.reduce<Record<string, typeof features>>((acc, f) => {
                  (acc[f.category] ||= []).push(f);
                  return acc;
                }, {})
              ).map(([cat, rows]) => (
                <Fragment key={cat}>
                  <tr className="bg-paper-dark/40">
                    <td colSpan={3} className="p-2 font-scribble text-lg font-bold">
                      {cat}
                    </td>
                  </tr>
                  {rows.map((f, i) => (
                    <tr
                      key={i}
                      className="border-t border-dashed border-ink/20"
                    >
                      <td className="p-3">{f.name}</td>
                      <td className="p-3 text-center">
                        <Cell v={f.free} />
                      </td>
                      <td className="p-3 text-center bg-phoenix-flame/5">
                        <Cell v={f.premium} />
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </SketchCard>
      </div>

      {/* FAQ */}
      <div className="mb-10">
        <SketchHeading as="h2" className="!text-3xl md:!text-4xl text-center mb-6" underline>
          Common questions
        </SketchHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: "Is this a real subscription?",
              a: "For the hackathon demo, no — your unlock is stored locally in your browser. No payment is processed. In production, this would integrate with Razorpay/Stripe.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. Click the Premium badge in the navbar → Cancel subscription. In the demo it's instant.",
            },
            {
              q: "Are my conversations saved?",
              a: "Mental health chats are never saved server-side. Journal entries are in your browser only. Premium does not change this — privacy is non-negotiable.",
            },
            {
              q: "Why premium for only 2 fashion features?",
              a: "Those 2 features are the holistic-reasoning ones — they require bigger context windows and longer Grok responses. Everything else stays free forever because mental health + desi recipes should be universal.",
            },
          ].map((f, i) => (
            <SketchCard key={i} variant="cream" className="!p-4">
              <div className="flex items-start gap-2 mb-1">
                <Heart size={18} className="text-phoenix-flame shrink-0 mt-1" />
                <div className="font-scribble text-lg font-bold">{f.q}</div>
              </div>
              <p className="font-note text-sm text-ink-soft pl-6">{f.a}</p>
            </SketchCard>
          ))}
        </div>
      </div>

      <Footer />

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={plan}
      />
    </main>
  );
}

function BulletYes({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <Check size={16} className="text-sketch-green shrink-0 mt-0.5" strokeWidth={3} />
      <span>{children}</span>
    </li>
  );
}
function BulletNo({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start opacity-50">
      <X size={16} className="text-sketch-red shrink-0 mt-0.5" strokeWidth={3} />
      <span className="line-through">{children}</span>
    </li>
  );
}
function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check size={18} className="text-sketch-green mx-auto" strokeWidth={3} />;
  if (v === false) return <X size={16} className="text-sketch-red/50 mx-auto" strokeWidth={2} />;
  return <span className="font-scribble font-bold">{v}</span>;
}

// Fragment helper (avoid importing React explicitly)
function Fragment(props: { children: React.ReactNode; key?: string }) {
  return <>{props.children}</>;
}
