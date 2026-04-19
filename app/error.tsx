"use client";
import { useEffect } from "react";
import Link from "next/link";
import SketchCard from "@/components/sketch/SketchCard";
import SketchButton from "@/components/sketch/SketchButton";
import SketchHeading from "@/components/sketch/SketchHeading";
import PhoenixLogo from "@/components/brand/PhoenixLogo";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <PhoenixLogo size={64} animated showText />
        </div>
        <SketchCard variant="paper" className="!p-6 text-center bg-sketch-red/10">
          <SketchHeading as="h1" className="!text-3xl mb-2">
            Uh oh, <span className="sketch-highlight">paper ripped</span>
          </SketchHeading>
          <p className="font-hand text-ink-soft mb-1">
            Phoenix ne abhi ek glitch detect kiya. Try again?
          </p>
          {error?.message && (
            <pre className="font-note text-xs text-ink-faded bg-paper-cream border-[2px] border-ink rounded-lg p-2 my-3 text-left overflow-auto">
              {error.message}
            </pre>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <SketchButton variant="flame" onClick={() => reset()}>
              <RefreshCw size={16} /> Try again
            </SketchButton>
            <Link href="/">
              <SketchButton variant="ghost">
                <Home size={16} /> Home
              </SketchButton>
            </Link>
          </div>
        </SketchCard>
      </div>
    </main>
  );
}
