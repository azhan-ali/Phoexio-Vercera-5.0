"use client";
import { cn } from "@/lib/utils";

interface PhoenixLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  showText?: boolean;
  /** Show the glowing aura ring behind the logo (premium feel, great for hero). */
  glow?: boolean;
}

/**
 * PHOENIX LOGO — custom transparent-PNG artwork of a phoenix rising from flames.
 * Source: /public/phoenix-logo.png (background removed + tight cropped).
 *
 * Aspect ratio of the source is ~0.87 (portrait), so we render it inside a
 * square box with object-contain to keep centred alignment in navbars.
 */
export default function PhoenixLogo({
  size = 120,
  className,
  animated = true,
  showText = false,
  glow = false,
}: PhoenixLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size }}
      >
        {/* Aura / glow — appears behind the phoenix */}
        {glow && (
          <span
            className="absolute inset-0 rounded-full bg-phoenix-flame/20 blur-2xl animate-pulse"
            aria-hidden
          />
        )}

        {/* The phoenix itself */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/phoenix-logo.png"
          alt="Phoenix"
          width={size}
          height={size}
          draggable={false}
          className={cn(
            "relative z-10 w-full h-full object-contain select-none pointer-events-none",
            animated && "animate-sketch-float"
          )}
          style={{
            filter:
              "drop-shadow(0 2px 6px rgba(230, 57, 70, 0.25)) drop-shadow(0 0 12px rgba(255, 107, 53, 0.2))",
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-scribble text-3xl md:text-4xl font-bold ink-text tracking-tight">
            Phoenix
          </span>
          <span className="font-hand text-xs md:text-sm text-phoenix-flame -mt-0.5">
            rebirth yourself
          </span>
        </div>
      )}
    </div>
  );
}
