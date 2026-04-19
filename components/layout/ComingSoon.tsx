import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SketchCard from "@/components/sketch/SketchCard";
import SketchHeading from "@/components/sketch/SketchHeading";
import SketchButton from "@/components/sketch/SketchButton";
import { DoodleLightning, DoodleStar } from "@/components/sketch/Doodles";
import Link from "next/link";
import { ArrowLeft, Wrench } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
}

export default function ComingSoon({
  title,
  description,
  backHref,
  backLabel,
}: ComingSoonProps) {
  return (
    <main className="px-4 md:px-8 max-w-4xl mx-auto">
      <Navbar />
      <section className="py-14">
        <SketchCard variant="paper" className="!p-10 md:!p-14 text-center relative overflow-hidden">
          <div className="absolute top-4 left-4 animate-wobble-slow">
            <DoodleLightning size={36} color="#fcbf49" />
          </div>
          <div className="absolute bottom-4 right-4 animate-wobble-slow">
            <DoodleStar size={32} color="#ff4500" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-sketch-purple/30 border-[2px] border-ink rounded-full font-hand text-sm">
            <Wrench size={14} /> under construction
          </div>
          <SketchHeading as="h1" className="!text-4xl md:!text-6xl mb-3">
            {title}
          </SketchHeading>
          <p className="font-hand text-lg text-ink-soft max-w-lg mx-auto mb-6">
            {description}
          </p>
          <Link href={backHref}>
            <SketchButton variant="ghost">
              <ArrowLeft size={18} /> {backLabel}
            </SketchButton>
          </Link>
        </SketchCard>
      </section>
      <Footer />
    </main>
  );
}
