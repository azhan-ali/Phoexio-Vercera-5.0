"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isPremium, setPremium, subscribePremium } from "@/lib/premium";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { DoodleStar, DoodleLightning } from "@/components/sketch/Doodles";
import { Lock, Sparkles, Check } from "lucide-react";

interface Props {
  featureName: string;
  children: React.ReactNode;
}

export default function PremiumGate({ featureName, children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUnlocked(isPremium());
    return subscribePremium(setUnlocked);
  }, []);

  if (!mounted) return null;
  if (unlocked) return <>{children}</>;

  return (
    <SketchCard
      variant="paper"
      className="!p-8 md:!p-12 text-center bg-phoenix-gold/20 relative overflow-hidden"
    >
      <div className="absolute top-4 left-4 animate-wobble-slow">
        <DoodleStar size={36} color="#ff4500" />
      </div>
      <div className="absolute bottom-4 right-4 animate-wobble-slow">
        <DoodleLightning size={32} color="#fcbf49" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-sm">
        <Lock size={14} /> Premium feature
      </div>

      <SketchHeading as="h2" className="!text-3xl md:!text-4xl mb-3">
        Unlock <span className="sketch-highlight">{featureName}</span>
      </SketchHeading>
      <p className="font-hand text-lg text-ink-soft max-w-lg mx-auto mb-5">
        Free tier quota khatam ho gaya? No stress. Pick the option that fits you:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto mb-6 text-left">
        <div className="p-4 bg-paper-cream border-[2.5px] border-ink rounded-xl">
          <div className="font-scribble text-lg font-bold mb-1">📦 Solo Pack</div>
          <div className="font-scribble text-2xl text-phoenix-flame mb-1">₹49+</div>
          <p className="font-note text-xs text-ink-soft">
            credits for just this feature · never expire
          </p>
        </div>
        <div className="p-4 bg-phoenix-flame/10 border-[2.5px] border-ink rounded-xl relative">
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-[10px] rotate-6">
            best value
          </span>
          <div className="font-scribble text-lg font-bold mb-1">🔥 Combo Pack</div>
          <div className="font-scribble text-2xl text-phoenix-flame mb-1">₹99+</div>
          <p className="font-note text-xs text-ink-soft">
            30 days unlimited on a whole suite
          </p>
        </div>
        <div className="p-4 bg-phoenix-gold/20 border-[2.5px] border-ink rounded-xl">
          <div className="font-scribble text-lg font-bold mb-1">👑 Premium</div>
          <div className="font-scribble text-2xl text-phoenix-flame mb-1">₹299/mo</div>
          <p className="font-note text-xs text-ink-soft">
            everything unlimited · priority AI
          </p>
        </div>
      </div>

      <ul className="inline-block text-left space-y-1.5 mb-6 font-note text-ink-soft">
        {[
          "All prices in ₹ (INR)",
          "Solo pack credits never expire",
          "Cancel Premium anytime",
          "Secure UPI / card / netbanking",
        ].map((b) => (
          <li key={b} className="flex gap-2 items-center">
            <Check size={16} className="text-sketch-green" /> {b}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/premium">
          <SketchButton variant="gold" size="lg">
            <Sparkles size={18} /> See all plans
          </SketchButton>
        </Link>
        <SketchButton variant="ghost" size="lg" onClick={() => setPremium(true)}>
          instant demo unlock
        </SketchButton>
      </div>
      <p className="font-note text-xs text-ink-faded mt-4 italic">
        hackathon demo: full pricing page OR one-click unlock
      </p>
    </SketchCard>
  );
}
