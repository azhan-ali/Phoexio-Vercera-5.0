"use client";
import { useState } from "react";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { SketchInput } from "@/components/sketch/SketchInput";
import { DoodleStar, DoodleLightning, DoodleHeart } from "@/components/sketch/Doodles";
import { setPremium } from "@/lib/premium";
import { X, Lock, Loader2, Check, CreditCard, Sparkles } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  plan: "monthly" | "yearly";
}

type Step = "form" | "processing" | "success";

export default function CheckoutModal({ open, onClose, plan }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");

  if (!open) return null;

  const price = plan === "yearly" ? "₹2,399" : "₹299";
  const period = plan === "yearly" ? "/year" : "/month";

  async function submit() {
    if (!name || !email) return;
    setStep("processing");
    // simulate payment processing
    await new Promise((r) => setTimeout(r, 1800));
    setPremium(true);
    setStep("success");
  }

  function close() {
    setStep("form");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <SketchCard variant="cream" className="!p-6 md:!p-8 relative overflow-hidden">
          <button
            onClick={close}
            className="absolute top-3 right-3 p-1.5 bg-paper-cream border-[2px] border-ink rounded-full hover:bg-sketch-red hover:text-white transition z-10"
            style={{ filter: "url(#sketch-roughen)" }}
          >
            <X size={16} />
          </button>

          <div className="absolute top-4 left-4 animate-wobble-slow opacity-60 pointer-events-none">
            <DoodleStar size={28} color="#ff4500" />
          </div>

          {step === "form" && (
            <>
              <div className="mb-4 pt-6">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs mb-2">
                  <Lock size={12} /> secure checkout · hackathon demo
                </div>
                <SketchHeading as="h3" className="!text-3xl">
                  Unlock <span className="sketch-highlight">Phoenix Premium</span>
                </SketchHeading>
                <div className="font-scribble text-4xl font-bold text-phoenix-flame mt-2">
                  {price}
                  <span className="text-xl text-ink-faded">{period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <SketchInput
                  label="full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                />
                <SketchInput
                  label="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />

                {/* Sketch credit-card mock */}
                <div
                  className="p-4 bg-phoenix-flame/15 border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] relative"
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <CreditCard size={24} className="text-ink" />
                    <span className="font-scribble text-sm font-bold">Phoenix</span>
                  </div>
                  <input
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className="w-full mb-3 px-2 py-1 bg-paper-cream border-[2px] border-ink rounded-md font-scribble text-xl tracking-wider outline-none"
                  />
                  <div className="flex gap-2">
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="flex-1 px-2 py-1 bg-paper-cream border-[2px] border-ink rounded-md font-scribble outline-none"
                    />
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="CVV"
                      className="w-20 px-2 py-1 bg-paper-cream border-[2px] border-ink rounded-md font-scribble outline-none"
                    />
                  </div>
                </div>
              </div>

              <SketchButton
                variant="flame"
                size="lg"
                onClick={submit}
                disabled={!name || !email}
                className="w-full justify-center"
              >
                <Sparkles size={18} /> Pay {price} & unlock
              </SketchButton>

              <p className="font-note text-xs text-ink-faded text-center mt-3 italic">
                🧪 hackathon demo — no real payment processed. card details are ignored. click to
                simulate unlock.
              </p>
            </>
          )}

          {step === "processing" && (
            <div className="py-12 text-center">
              <Loader2 size={48} className="animate-spin text-phoenix-flame mx-auto mb-3" />
              <div className="font-scribble text-2xl font-bold">processing payment…</div>
              <p className="font-note text-sm text-ink-faded mt-1">
                encrypting · charging · unlocking magic
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center relative">
              <div className="absolute top-0 left-0 animate-wobble-slow">
                <DoodleLightning size={34} color="#fcbf49" />
              </div>
              <div className="absolute top-0 right-0 animate-wobble-slow">
                <DoodleHeart size={30} color="#e63946" />
              </div>
              <div
                className="inline-flex items-center justify-center w-20 h-20 bg-sketch-green text-white border-[3px] border-ink rounded-full mb-3 mx-auto"
                style={{ filter: "url(#sketch-roughen)" }}
              >
                <Check size={44} strokeWidth={3} />
              </div>
              <SketchHeading as="h3" className="!text-3xl mb-2">
                You're <span className="sketch-highlight">Premium!</span>
              </SketchHeading>
              <p className="font-hand text-lg text-ink-soft max-w-sm mx-auto mb-5">
                Occasion Package + Mood-Based Styling are now unlocked. Welcome to Phoenix
                Premium 🔥
              </p>
              <SketchButton variant="flame" size="lg" onClick={close}>
                Start exploring
              </SketchButton>
            </div>
          )}
        </SketchCard>
      </div>
    </div>
  );
}
