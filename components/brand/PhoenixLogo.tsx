"use client";
import Image from "next/image";
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
 */
export default function PhoenixLogo({
  size = 120,
  className,
  animated = true,
  showText = false,
}: PhoenixLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden",
          animated && "animate-sketch-float"
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/phoenix-logo.jpg"
          alt="Phoenix logo"
          fill
          priority
          sizes={`${size}px`}
          className="object-contain mix-blend-multiply"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-scribble text-5xl font-bold ink-text">Phoenix</span>
          <span className="font-hand text-base text-phoenix-flame -mt-1">
            rebirth yourself
          </span>
        </div>
      )}
    </div>
  );
}
