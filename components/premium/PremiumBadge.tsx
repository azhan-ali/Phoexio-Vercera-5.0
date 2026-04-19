"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isPremium, setPremium, subscribePremium } from "@/lib/premium";
import { Sparkles, X } from "lucide-react";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { DoodleStar } from "@/components/sketch/Doodles";

export default function PremiumBadge() {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUnlocked(isPremium());
    return subscribePremium(setUnlocked);
  }, []);

  if (!mounted) return null;

  if (!unlocked) {
    // Show upgrade CTA
    return (
      <Link
        href="/premium"
        className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-phoenix-gold/60 border-[2px] border-ink rounded-full font-hand text-sm hover:bg-phoenix-gold transition"
        style={{ filter: "url(#sketch-roughen)" }}
      >
        <Sparkles size={14} /> Premium
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1 px-3 py-1 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-sm hover:bg-phoenix-ember transition animate-pulse-soft"
        style={{ filter: "url(#sketch-roughen)" }}
      >
        <Sparkles size={14} /> Premium ✨
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <SketchCard variant="cream" className="!p-6 relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 p-1.5 bg-paper-cream border-[2px] border-ink rounded-full hover:bg-sketch-red hover:text-white transition"
                style={{ filter: "url(#sketch-roughen)" }}
              >
                <X size={14} />
              </button>
              <div className="text-center pt-2">
                <div className="absolute top-4 left-4 animate-wobble-slow">
                  <DoodleStar size={28} color="#ff4500" />
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs mb-3">
                  <Sparkles size={12} /> Phoenix Premium · active
                </div>
                <SketchHeading as="h3" className="!text-3xl mb-2">
                  You're <span className="sketch-highlight">all in</span>
                </SketchHeading>
                <p className="font-hand text-ink-soft mb-4">
                  Occasion Package + Mood-Based Styling are unlocked. Premium billing renews
                  monthly. Cancel anytime from this modal.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Link href="/premium" onClick={() => setShowModal(false)}>
                    <SketchButton variant="flame" size="sm">
                      Manage plan
                    </SketchButton>
                  </Link>
                  <SketchButton
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm("Cancel Phoenix Premium? (demo — no money involved)")) {
                        setPremium(false);
                        setShowModal(false);
                      }
                    }}
                  >
                    Cancel subscription
                  </SketchButton>
                </div>
                <p className="font-note text-xs text-ink-faded italic mt-3">
                  🧪 hackathon demo — state is in your browser only
                </p>
              </div>
            </SketchCard>
          </div>
        </div>
      )}
    </>
  );
}
