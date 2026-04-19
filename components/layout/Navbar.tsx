"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PhoenixLogo from "@/components/brand/PhoenixLogo";
import SketchButton from "@/components/sketch/SketchButton";
import PremiumBadge from "@/components/premium/PremiumBadge";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/fashion", label: "Fashion" },
  { href: "/food", label: "Food" },
  { href: "/mental-health", label: "Mind" },
  { href: "/playground", label: "Playground" },
  { href: "/premium", label: "Premium" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // prevent body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="flex items-center justify-between py-4 sticky top-0 z-40 bg-paper/70 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <PhoenixLogo size={52} animated showText />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.slice(0, 4).map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "font-hand text-lg transition hover:text-phoenix-flame",
                  active && "text-phoenix-flame sketch-underline"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <PremiumBadge />
          <Link href="/fashion" className="hidden md:block">
            <SketchButton variant="flame" size="sm">
              Try free
            </SketchButton>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 bg-paper-cream border-[2px] border-ink rounded-xl hover:bg-paper-dark transition"
            style={{ filter: "url(#sketch-roughen)" }}
            aria-label="open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-paper-cream paper-bg shadow-[-6px_0_0_#1a1a1a] border-l-[3px] border-ink p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <PhoenixLogo size={40} animated showText />
              <button
                onClick={() => setOpen(false)}
                className="p-2 bg-paper border-[2px] border-ink rounded-xl hover:bg-sketch-red hover:text-white transition"
                style={{ filter: "url(#sketch-roughen)" }}
                aria-label="close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => {
                const active = pathname?.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "px-4 py-3 border-[2.5px] border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] font-scribble text-2xl transition",
                      active
                        ? "bg-phoenix-flame text-white shadow-[3px_3px_0_#1a1a1a]"
                        : "bg-paper hover:bg-paper-dark"
                    )}
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    {l.label}
                    {l.href === "/premium" && (
                      <Sparkles size={16} className="inline ml-2 text-phoenix-gold" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-4 border-t-2 border-dashed border-ink/30">
              <Link href="/fashion" onClick={() => setOpen(false)}>
                <SketchButton variant="flame" size="lg" className="w-full justify-center">
                  Try free →
                </SketchButton>
              </Link>
              <p className="text-center font-note text-xs text-ink-faded mt-3">
                made with ♥ for the hackathon
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
