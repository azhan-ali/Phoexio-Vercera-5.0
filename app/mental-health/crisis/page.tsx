import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SketchCard from "@/components/sketch/SketchCard";
import SketchHeading from "@/components/sketch/SketchHeading";
import SketchButton from "@/components/sketch/SketchButton";
import { DoodleHeart } from "@/components/sketch/Doodles";
import Link from "next/link";
import { ArrowLeft, Phone, Globe } from "lucide-react";

const helplines = [
  {
    name: "iCall (TISS)",
    phone: "9152987821",
    hours: "Mon-Sat, 8am-10pm",
    note: "Free, confidential, psychological counselling.",
  },
  {
    name: "Vandrevala Foundation",
    phone: "1860-2662-345",
    hours: "24/7",
    note: "Free mental health helpline across India.",
  },
  {
    name: "AASRA",
    phone: "9820466726",
    hours: "24/7",
    note: "Suicide prevention & emotional support.",
  },
  {
    name: "NIMHANS Helpline",
    phone: "080-46110007",
    hours: "24/7",
    note: "National Institute of Mental Health.",
  },
  {
    name: "iCall (Chat / Email)",
    phone: "icall@tiss.edu",
    hours: "Email anytime",
    note: "Non-voice option for text-based support.",
    isEmail: true,
  },
];

export default function CrisisPage() {
  return (
    <main className="px-4 md:px-8 max-w-4xl mx-auto">
      <Navbar />

      <section className="py-8">
        <Link href="/mental-health" className="inline-flex items-center gap-1 font-hand text-ink-faded hover:text-phoenix-flame mb-4">
          <ArrowLeft size={16} /> back
        </Link>

        <div className="text-center mb-8 relative">
          <div className="absolute -top-2 right-[10%] animate-wobble-slow">
            <DoodleHeart size={34} color="#e63946" />
          </div>
          <SketchHeading as="h1" className="!text-4xl md:!text-6xl mb-2">
            You are <span className="sketch-highlight">not alone</span>
          </SketchHeading>
          <p className="font-hand text-lg text-ink-soft max-w-xl mx-auto">
            Trained professionals are one call away. Free. Confidential. Judgement-free. Bas ek
            number dial karo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helplines.map((h, i) => (
            <SketchCard
              key={h.name}
              variant="paper"
              tilt={i % 2 === 0 ? "left" : "right"}
              className="bg-sketch-red/10"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-sketch-red/20 border-[2px] border-ink rounded-xl">
                  {h.isEmail ? (
                    <Globe size={22} className="text-sketch-red" />
                  ) : (
                    <Phone size={22} className="text-sketch-red" />
                  )}
                </div>
                <div>
                  <SketchHeading as="h3" font="scribble" className="!text-2xl leading-none">
                    {h.name}
                  </SketchHeading>
                  <div className="font-hand text-sm text-ink-faded">{h.hours}</div>
                </div>
              </div>
              <div className="font-scribble text-3xl font-bold text-ink mb-2">{h.phone}</div>
              <p className="font-note text-sm text-ink-soft mb-3">{h.note}</p>
              {!h.isEmail && (
                <a href={`tel:${h.phone.replace(/-/g, "")}`}>
                  <SketchButton variant="flame" size="sm">
                    <Phone size={14} /> Call now
                  </SketchButton>
                </a>
              )}
            </SketchCard>
          ))}
        </div>

        <SketchCard variant="paper" className="!p-6 mt-8 bg-phoenix-gold/20 text-center">
          <p className="font-hand text-lg">
            💛 If you are in immediate danger, please call <strong>112</strong> (India emergency) or
            go to your nearest hospital.
          </p>
        </SketchCard>
      </section>

      <Footer />
    </main>
  );
}
