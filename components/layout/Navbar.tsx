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
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-[95%] max-w-7xl">
        <div className="bg-paper/80 backdrop-blur-md sketch-border-thick sketch-shadow flex items-center justify-between px-6 py-3 relative overflow-hidden group">
          {/* Animated "Torn Paper" Edge at bottom */}
          <div className="nav-scribble-bottom opacity-40 group-hover:opacity-100 transition-opacity" />
          
          <Link href="/" className="flex items-center gap-3 shrink-0 relative hover-wobble">
            <div className="absolute inset-0 bg-phoenix-flame/10 blur-xl rounded-full scale-150 animate-pulse-soft pointer-events-none" />
            <PhoenixLogo size={56} animated showText glow />
          </Link>

          {/* Desktop Links - Taped on effect */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {navLinks.slice(0, 4).map((l) => {
              const active = pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "nav-tape font-hand text-xl px-2 transition-all duration-300 hover:rotate-1 hover:scale-110 ink-text",
                    active ? "text-phoenix-flame scale-105" : "hover:text-phoenix-flame"
                  )}
                >
                  <span className="relative z-10">{l.label}</span>
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-phoenix-flame/20 rotate-1 -z-10" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <PremiumBadge />
            </div>
            
            <Link href="/fashion" className="hidden lg:block">
              <SketchButton variant="flame" size="sm" className="hidden lg:flex">
                <Sparkles size={16} className="mr-2" />
                Launch App
              </SketchButton>
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-3 bg-paper-cream border-[2px] border-ink rounded-xl hover:bg-paper-dark transition active:scale-95"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-28" />

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
              <PhoenixLogo size={52} animated showText />
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
