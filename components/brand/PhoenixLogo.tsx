"use client";
import { cn } from "@/lib/utils";

interface PhoenixLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  showText?: boolean;
}

/**
 * PHOENIX LOGO — custom brand artwork of a phoenix rising from flames.
 * Served from /public/phoenix-logo.jpg.
 *
 * The source image has a white background. We use `mix-blend-mode: darken`
 * which keeps the dark-colored phoenix pixels and lets the page background
 * show through all the light/white pixels — effectively removing the white box
 * without needing a transparent PNG.
 */
export default function PhoenixLogo({
  size = 120,
  className,
  animated = true,
  showText = false,
}: PhoenixLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/phoenix-logo.jpg"
        alt="Phoenix"
        width={size}
        height={size}
        className={cn(
          "shrink-0 object-contain select-none pointer-events-none",
          animated && "animate-sketch-float"
        )}
        style={{
          width: size,
          height: size,
          mixBlendMode: "darken",
          filter: "contrast(1.05) saturate(1.05)",
        }}
        draggable={false}
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-scribble text-4xl md:text-5xl font-bold ink-text">
            Phoenix
          </span>
          <span className="font-hand text-sm md:text-base text-phoenix-flame -mt-0.5">
            rebirth yourself
          </span>
        </div>
      )}
    </div>
  );
}
