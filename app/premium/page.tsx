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
  FEATURE_QUOTAS,
  COMBO_PACKS,
  PREMIUM_PLANS,
  PREMIUM_PERKS,
  formatINR,
  type FeatureQuota,
  type ComboPack,
} from "@/lib/pricing";
import {
  Sparkles,
  Check,
  Crown,
  ArrowRight,
  Zap,
  IndianRupee,
  Package,
  Gift,
  Flame,
  Heart,
  Infinity as InfinityIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "yearly";

export default function PremiumPage() {
  const [plan, setPlan] = useState<BillingCycle>("yearly");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("Phoenix Premium");
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUnlocked(isPremium());
    return subscribePremium(setUnlocked);
  }, []);

  function buy(itemName: string) {
    setSelectedItem(itemName);
    setModalOpen(true);
  }

  const categorized = FEATURE_QUOTAS.reduce<Record<string, FeatureQuota[]>>(
    (acc, f) => {
      (acc[f.category] ||= []).push(f);
      return acc;
    },
    {}
  );

  return (
    <main className="px-4 md:px-8 max-w-6xl mx-auto">
      <Navbar />

      <SectionHero
        eyebrow="Phoenix Pricing · all in ₹"
        title="Pay for"
        highlight="what you use"
        subtitle="Free forever for light use. Need more? Buy a credit pack for one feature. Want it all? Grab a combo or go unlimited with Phoenix Premium. Zero hidden fees."
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
            <div className="font-scribble text-xl font-bold">
              You&apos;re Premium ✨
            </div>
            <p className="font-note text-sm text-ink-soft">
              All features unlocked. Unlimited everything. Enjoy the ride.
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

      {/* ============ HOW IT WORKS — 4 tiers ============ */}
      <section className="mb-12">
        <SketchHeading
          as="h2"
          className="!text-3xl md:!text-4xl text-center mb-2"
          underline
        >
          How Phoenix pricing works
        </SketchHeading>
        <p className="font-hand text-center text-ink-faded mb-6">
          four simple ways to use Phoenix · pick whatever fits you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TierCard
            icon={<Gift size={24} />}
            title="Free"
            price="₹0"
            desc="Monthly quota on every feature. No card, no login needed."
            tilt="left"
            bg="bg-sketch-green/15"
          />
          <TierCard
            icon={<Package size={24} />}
            title="Solo Packs"
            price="₹49+"
            desc="Buy credits for one feature. Never expire. Great for occasional heavy use."
            tilt="right"
            bg="bg-sketch-blue/15"
          />
          <TierCard
            icon={<Flame size={24} />}
            title="Combo Packs"
            price="₹99+"
            desc="30 days unlimited on a whole suite. Best value for a project phase."
            tilt="left"
            bg="bg-sketch-pink/15"
          />
          <TierCard
            icon={<Crown size={24} />}
            title="Premium"
            price="₹299/mo"
            desc="Unlimited everything forever. Priority AI + early access."
            tilt="right"
            bg="bg-phoenix-gold/25"
            highlight
          />
        </div>
      </section>

      {/* ============ PHOENIX PREMIUM CARD ============ */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <Crown size={26} className="text-phoenix-flame" />
          <SketchHeading as="h2" className="!text-3xl md:!text-4xl">
            Phoenix Premium
          </SketchHeading>
        </div>
        <p className="font-hand text-ink-faded mb-5">
          everything unlimited · no quota watching · just vibes
        </p>

        {/* Billing toggle */}
        <div className="flex justify-center mb-5">
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
                  plan === p
                    ? "bg-phoenix-flame text-white"
                    : "hover:bg-paper-dark"
                )}
              >
                {p}
                {p === "yearly" && (
                  <span className="ml-1 px-1.5 py-0.5 bg-sketch-green text-white rounded-full text-xs font-bold">
                    save 40%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <SketchCard
          variant="paper"
          tape
          className="!p-6 md:!p-10 bg-phoenix-gold/15 relative overflow-hidden"
        >
          <div className="absolute top-3 right-3 animate-wobble-slow">
            <DoodleStar size={32} color="#ff4500" />
          </div>
          <div className="absolute bottom-3 left-3 animate-wobble-slow">
            <DoodleLightning size={28} color="#fcbf49" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs mb-3">
                <Sparkles size={12} /> most popular
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="font-scribble text-6xl font-bold text-phoenix-flame">
                  {formatINR(PREMIUM_PLANS[plan].price)}
                </div>
                <div className="font-hand text-ink-faded">
                  /{PREMIUM_PLANS[plan].label}
                </div>
              </div>
              <div className="font-hand text-sm text-ink-faded mb-4">
                {plan === "yearly" ? (
                  <>
                    billed {formatINR(PREMIUM_PLANS.yearly.yearlyTotal)} yearly ·{" "}
                    <span className="line-through">
                      {formatINR(PREMIUM_PLANS.yearly.strikethrough)}
                    </span>
                  </>
                ) : (
                  PREMIUM_PLANS.monthly.note
                )}
              </div>

              <SketchButton
                variant="flame"
                size="lg"
                className="w-full md:w-auto justify-center"
                onClick={() => buy("Phoenix Premium")}
                disabled={unlocked}
              >
                {unlocked ? (
                  <>
                    <Check size={18} /> You&apos;re premium
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Go Premium{" "}
                    <ArrowRight size={16} />
                  </>
                )}
              </SketchButton>
            </div>

            <ul className="space-y-2 font-note">
              {PREMIUM_PERKS.map((p) => (
                <li key={p} className="flex gap-2 items-start">
                  <Check
                    size={18}
                    className="text-sketch-green shrink-0 mt-0.5"
                    strokeWidth={3}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </SketchCard>
      </section>

      {/* ============ COMBO PACKS ============ */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <Flame size={26} className="text-phoenix-flame" />
          <SketchHeading as="h2" className="!text-3xl md:!text-4xl">
            Combo Packs · 30 days unlimited
          </SketchHeading>
        </div>
        <p className="font-hand text-ink-faded mb-5">
          best value if you&apos;re going hard on one suite
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {COMBO_PACKS.map((c, i) => (
            <ComboCard
              key={c.slug}
              combo={c}
              onBuy={() => buy(c.name)}
              tilt={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </section>

      {/* ============ SOLO PACKS ============ */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <Package size={26} className="text-phoenix-flame" />
          <SketchHeading as="h2" className="!text-3xl md:!text-4xl">
            Solo Packs · credits per feature
          </SketchHeading>
        </div>
        <p className="font-hand text-ink-faded mb-5">
          one feature, pay-as-you-go · credits never expire
        </p>

        {(["Fashion", "Food", "Mind"] as const).map((cat) => (
          <div key={cat} className="mb-6">
            <div className="font-scribble text-2xl font-bold mb-3">{cat}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categorized[cat]?.map((f) => (
                <SoloCard key={f.slug} feature={f} onBuy={() => buy(`${f.name} Pack`)} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ============ FREE TIER DETAILS ============ */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <Gift size={26} className="text-sketch-green" />
          <SketchHeading as="h2" className="!text-3xl md:!text-4xl">
            Free tier · monthly quota
          </SketchHeading>
        </div>
        <p className="font-hand text-ink-faded mb-5">
          every feature has a generous free quota · resets 1st of every month
        </p>

        <SketchCard variant="paper" className="!p-0 overflow-hidden">
          <table className="w-full font-note">
            <thead>
              <tr className="bg-ink text-paper-cream">
                <th className="text-left p-3 font-scribble text-lg">Feature</th>
                <th className="text-center p-3 font-scribble text-lg">
                  Free / month
                </th>
                <th className="text-center p-3 font-scribble text-lg bg-phoenix-flame">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_QUOTAS.map((f, i) => (
                <tr
                  key={f.slug}
                  className={cn(
                    "border-t border-dashed border-ink/20",
                    i % 2 === 1 && "bg-paper-cream/40"
                  )}
                >
                  <td className="p-3">
                    <span className="mr-2">{f.emoji}</span>
                    <span className="font-bold">{f.name}</span>{" "}
                    <span className="text-xs text-ink-faded italic">
                      · {f.category}
                    </span>
                  </td>
                  <td className="p-3 text-center font-scribble text-lg">
                    {f.freeMonthly === null
                      ? "Unlimited"
                      : `${f.freeMonthly} ${f.unit}${f.freeMonthly > 1 ? "s" : ""}`}
                  </td>
                  <td className="p-3 text-center bg-phoenix-flame/5">
                    <InfinityIcon
                      size={20}
                      className="inline text-phoenix-flame"
                      strokeWidth={2.5}
                    />
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-ink bg-sketch-green/10">
                <td className="p-3 font-scribble font-bold">
                  🧘 Mood Journal (local storage)
                </td>
                <td className="p-3 text-center font-scribble text-lg">
                  Unlimited
                </td>
                <td className="p-3 text-center bg-phoenix-flame/5">
                  <InfinityIcon
                    size={20}
                    className="inline text-phoenix-flame"
                    strokeWidth={2.5}
                  />
                </td>
              </tr>
              <tr className="border-t border-dashed border-ink/20 bg-sketch-green/10">
                <td className="p-3 font-scribble font-bold">
                  👥 Peer Support Circles
                </td>
                <td className="p-3 text-center font-scribble text-lg">
                  Unlimited
                </td>
                <td className="p-3 text-center bg-phoenix-flame/5">
                  <InfinityIcon
                    size={20}
                    className="inline text-phoenix-flame"
                    strokeWidth={2.5}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </SketchCard>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mb-12">
        <SketchHeading
          as="h2"
          className="!text-3xl md:!text-4xl text-center mb-6"
          underline
        >
          FAQ
        </SketchHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: "Kya free tier sach mein free hai?",
              a: "Haan, bilkul. Har feature ka generous monthly quota hai. Light users ke liye Phoenix hamesha free rahega.",
            },
            {
              q: "Solo pack credits kab expire hote hain?",
              a: "Kabhi nahi. Solo pack ke credits lifetime valid hain. Use when you need.",
            },
            {
              q: "Combo pack ke 30 din kab se count hote hain?",
              a: "Purchase ke time se. Example: 1 May ko liya → 31 May tak unlimited on all features in that combo.",
            },
            {
              q: "Premium aur combo mein difference kya hai?",
              a: "Combo 30 din ke liye ek suite unlocks karta hai. Premium har mahine automatically renew hota hai, sab features unlimited, priority AI bhi milte hain.",
            },
            {
              q: "Kya main cancel kar sakta hu?",
              a: "Bilkul. Premium cancel anytime from your dashboard. Solo packs ek baar kharidne ke baad kabhi expire nahi hote, toh cancel ka sawaal hi nahi.",
            },
            {
              q: "Payment kaise hota hai?",
              a: "UPI, cards, netbanking — sab accept karte hain via Razorpay. International users? Stripe bhi support karta hai.",
            },
          ].map((f, i) => (
            <SketchCard key={i} variant="cream" className="!p-4">
              <div className="flex items-start gap-2 mb-1">
                <Heart
                  size={18}
                  className="text-phoenix-flame shrink-0 mt-1"
                />
                <div className="font-scribble text-lg font-bold">{f.q}</div>
              </div>
              <p className="font-note text-sm text-ink-soft pl-6">{f.a}</p>
            </SketchCard>
          ))}
        </div>
      </section>

      <Footer />

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={plan}
        itemName={selectedItem}
      />
    </main>
  );
}

/* =========================================================
 * CARDS
 * ======================================================= */

function TierCard({
  icon,
  title,
  price,
  desc,
  tilt,
  bg,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  price: string;
  desc: string;
  tilt: "left" | "right";
  bg: string;
  highlight?: boolean;
}) {
  return (
    <SketchCard
      variant="paper"
      tilt={tilt}
      tape={highlight}
      className={cn("!p-4 h-full relative", bg)}
    >
      {highlight && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs rotate-6">
          ✨ best
        </div>
      )}
      <div className="flex items-center gap-2 mb-1 text-phoenix-flame">
        {icon}
        <div className="font-scribble text-xl font-bold">{title}</div>
      </div>
      <div className="font-scribble text-3xl font-bold mb-2">{price}</div>
      <p className="font-note text-sm text-ink-soft leading-snug">{desc}</p>
    </SketchCard>
  );
}

function ComboCard({
  combo,
  onBuy,
  tilt,
}: {
  combo: ComboPack;
  onBuy: () => void;
  tilt: "left" | "right";
}) {
  const savings = combo.soloEquivalent - combo.price;
  return (
    <SketchCard
      variant="paper"
      tilt={tilt}
      tape={combo.highlight}
      className={cn("!p-5 relative overflow-hidden h-full", combo.bg)}
    >
      {combo.highlight && (
        <div className="absolute -top-1 -right-1 px-2 py-0.5 bg-phoenix-flame text-white border-[2px] border-ink rounded-full font-hand text-xs rotate-6 z-10">
          🔥 top pick
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-3xl mb-1">{combo.emoji}</div>
          <SketchHeading as="h3" font="scribble" className="!text-2xl leading-none">
            {combo.name}
          </SketchHeading>
          <span className="font-hand text-sm text-ink-faded italic">
            {combo.tagline}
          </span>
        </div>
        <div className="text-right">
          <div className="font-scribble text-3xl font-bold text-phoenix-flame">
            {formatINR(combo.price)}
          </div>
          <div className="font-hand text-xs text-ink-faded line-through">
            {formatINR(combo.soloEquivalent)} solo
          </div>
          <div className="font-hand text-xs text-sketch-green font-bold">
            save {formatINR(savings)}
          </div>
        </div>
      </div>

      <ul className="space-y-1 mb-4 font-note text-sm">
        {combo.includes.map((slug) => {
          const f = FEATURE_QUOTAS.find((x) => x.slug === slug);
          if (!f) return null;
          return (
            <li key={slug} className="flex items-center gap-2">
              <Check
                size={14}
                className="text-sketch-green shrink-0"
                strokeWidth={3}
              />
              <span>
                {f.emoji} {f.name}
              </span>
            </li>
          );
        })}
      </ul>

      <SketchButton
        variant={combo.highlight ? "flame" : "gold"}
        className="w-full justify-center"
        onClick={onBuy}
      >
        <IndianRupee size={16} /> Buy {combo.name}
      </SketchButton>
    </SketchCard>
  );
}

function SoloCard({
  feature,
  onBuy,
}: {
  feature: FeatureQuota;
  onBuy: () => void;
}) {
  return (
    <SketchCard variant="cream" className="!p-4 h-full flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-2xl mb-0.5">{feature.emoji}</div>
          <div className="font-scribble text-lg font-bold leading-tight">
            {feature.name}
          </div>
        </div>
        <div className="font-scribble text-2xl font-bold text-phoenix-flame">
          {formatINR(feature.soloPack.price)}
        </div>
      </div>

      <div className="font-hand text-sm text-ink-soft mb-3">
        {feature.soloPack.uses} {feature.unit}
        {feature.soloPack.uses > 1 ? "s" : ""} ·{" "}
        <span className="text-ink-faded">never expire</span>
      </div>

      <div className="font-note text-xs text-ink-faded mb-3">
        free tier:{" "}
        {feature.freeMonthly === null
          ? "unlimited"
          : `${feature.freeMonthly}/month`}
      </div>

      <SketchButton
        variant="ghost"
        size="sm"
        className="w-full justify-center mt-auto"
        onClick={onBuy}
      >
        <Zap size={14} /> Buy pack
      </SketchButton>
    </SketchCard>
  );
}
