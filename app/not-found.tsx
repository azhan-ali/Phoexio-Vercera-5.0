import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import { DoodleStar, DoodleSpiral, DoodleExclaim } from "@/components/sketch/Doodles";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="px-4 md:px-8 max-w-4xl mx-auto">
      <Navbar />
      <section className="py-14">
        <SketchCard
          variant="paper"
          className="!p-8 md:!p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 animate-wobble-slow">
            <DoodleSpiral size={40} color="#9d4edd" />
          </div>
          <div className="absolute top-4 right-4 animate-pulse-soft">
            <DoodleStar size={34} color="#ff4500" />
          </div>
          <div className="absolute bottom-4 left-8 animate-wobble-slow">
            <DoodleExclaim size={28} color="#e63946" />
          </div>

          <div
            className="font-scribble text-[140px] md:text-[200px] font-bold leading-none text-phoenix-flame"
            style={{ filter: "url(#sketch-roughen-heavy)" }}
          >
            404
          </div>
          <div className="font-hand text-ink-faded mb-2 -mt-2">
            — page got lost in the sketchbook —
          </div>
          <SketchHeading as="h1" className="!text-3xl md:!text-5xl mb-3">
            Ye page kaha gaya?
          </SketchHeading>
          <p className="font-hand text-lg text-ink-soft max-w-md mx-auto mb-6">
            Lagta hai tumne ek blank page kheech liya. Koi baat nahi — Phoenix waapis home le
            chalega.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <SketchButton variant="flame" size="lg">
                <Home size={18} /> Go home
              </SketchButton>
            </Link>
            <Link href="/fashion">
              <SketchButton variant="ghost" size="lg">
                <ArrowLeft size={18} /> Try Fashion suite
              </SketchButton>
            </Link>
          </div>
        </SketchCard>
      </section>
      <Footer />
    </main>
  );
}
