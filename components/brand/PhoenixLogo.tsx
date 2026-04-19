"use client";
import { cn } from "@/lib/utils";

interface PhoenixLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  showText?: boolean;
}

/**
 * PHOENIX LOGO — hand-drawn phoenix bird rising from flames.
 * Entirely SVG, scalable, sketched ink strokes with pencil-texture filter.
 */
export default function PhoenixLogo({
  size = 120,
  className,
  animated = true,
  showText = false,
}: PhoenixLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(animated && "animate-sketch-float")}
        style={{ filter: "url(#pencil-texture)" }}
      >
        {/* ========== FLAMES AT BASE ========== */}
        {/* outer flame - orange */}
        <path
          d="M 40 175 Q 45 155 55 145 Q 50 130 62 118 Q 58 100 72 88 Q 68 75 82 68 Q 78 55 92 52 Q 100 45 108 52 Q 122 55 118 68 Q 132 75 128 88 Q 142 100 138 118 Q 150 130 145 145 Q 155 155 160 175 Z"
          fill="#ff4500"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
        />
        {/* inner flame - gold */}
        <path
          d="M 60 175 Q 65 158 72 148 Q 68 135 78 125 Q 74 112 85 102 Q 82 90 95 85 Q 100 80 105 85 Q 118 90 115 102 Q 126 112 122 125 Q 132 135 128 148 Q 135 158 140 175 Z"
          fill="#ffba08"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* innermost flame - yellow core */}
        <path
          d="M 78 175 Q 82 160 88 150 Q 85 140 92 132 Q 98 125 100 130 Q 102 125 108 132 Q 115 140 112 150 Q 118 160 122 175 Z"
          fill="#fcbf49"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* ========== PHOENIX BODY ========== */}
        {/* main body / chest */}
        <path
          d="M 100 95 Q 88 85 85 70 Q 82 55 90 45 Q 100 38 110 45 Q 118 55 115 70 Q 112 85 100 95 Z"
          fill="#e63946"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* ========== LEFT WING (spread) ========== */}
        <path
          d="M 88 70 Q 65 55 40 52 Q 25 55 18 68 Q 22 62 38 60 Q 55 62 70 72 Q 50 60 30 68 Q 42 65 58 72 Q 72 78 85 78 Z"
          fill="#ff8c42"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* wing feather details */}
        <path d="M 45 62 Q 52 66 58 72" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 35 68 Q 44 70 52 74" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 60 58 Q 66 64 72 70" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ========== RIGHT WING (spread) ========== */}
        <path
          d="M 112 70 Q 135 55 160 52 Q 175 55 182 68 Q 178 62 162 60 Q 145 62 130 72 Q 150 60 170 68 Q 158 65 142 72 Q 128 78 115 78 Z"
          fill="#ff8c42"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M 155 62 Q 148 66 142 72" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 165 68 Q 156 70 148 74" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 140 58 Q 134 64 128 70" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ========== HEAD ========== */}
        <path
          d="M 100 48 Q 92 42 92 32 Q 94 22 100 20 Q 108 18 112 26 Q 116 38 108 46 Q 108 50 116 48 Q 122 50 118 54 L 108 52 Q 100 54 100 48 Z"
          fill="#e63946"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* beak */}
        <path
          d="M 116 42 L 128 40 L 118 48 Z"
          fill="#ffba08"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* eye */}
        <circle cx="106" cy="32" r="2.5" fill="#1a1a1a" />
        <circle cx="106.5" cy="31" r="0.8" fill="#fff" />

        {/* ========== CREST FEATHERS (on head) ========== */}
        <path
          d="M 98 22 Q 95 12 92 8 Q 98 14 100 18"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="#ffba08"
          strokeLinejoin="round"
        />
        <path
          d="M 104 20 Q 105 10 110 6 Q 108 14 108 18"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="#ff4500"
          strokeLinejoin="round"
        />
        <path
          d="M 110 22 Q 116 14 122 12 Q 116 18 114 22"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="#ffba08"
          strokeLinejoin="round"
        />

        {/* ========== TAIL FEATHERS (rising) ========== */}
        <path
          d="M 100 95 Q 95 108 92 120 Q 90 128 94 125 Q 98 115 100 108 Q 102 115 106 125 Q 110 128 108 120 Q 105 108 100 95 Z"
          fill="#ff4500"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ========== SPARKS / EMBERS ========== */}
        <circle cx="25" cy="40" r="2" fill="#ffba08" stroke="#1a1a1a" strokeWidth="1" />
        <circle cx="175" cy="35" r="2.5" fill="#ff4500" stroke="#1a1a1a" strokeWidth="1" />
        <circle cx="170" cy="90" r="1.5" fill="#ffba08" />
        <circle cx="30" cy="95" r="1.8" fill="#ff8c42" />
        <path d="M 15 115 L 18 115 M 16.5 113.5 L 16.5 116.5" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 182 120 L 185 120 M 183.5 118.5 L 183.5 121.5" stroke="#ffba08" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

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
