/**
 * Tiny hand-drawn SVG doodles — used as decoration & inside AnimatedBackground.
 * All have a common prop signature: { size, color, className }.
 */
import { SVGProps } from "react";

interface DoodleProps {
  size?: number;
  color?: string;
  className?: string;
  style?: SVGProps<SVGSVGElement>["style"];
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 40 40",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function DoodleStar({ size = 32, color = "#ff4500", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M20 4 L24 16 L36 18 L27 26 L30 37 L20 31 L10 37 L13 26 L4 18 L16 16 Z"
        stroke={color}
        strokeWidth="2.2"
        fill={color}
        fillOpacity="0.25"
      />
    </svg>
  );
}

export function DoodleHeart({ size = 32, color = "#e63946", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M20 34 C 6 24, 4 14, 12 10 C 17 8, 20 12, 20 15 C 20 12, 23 8, 28 10 C 36 14, 34 24, 20 34 Z"
        stroke={color}
        strokeWidth="2.2"
        fill={color}
        fillOpacity="0.2"
      />
    </svg>
  );
}

export function DoodleSquiggle({ size = 48, color = "#4361ee", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M 4 20 Q 10 10, 16 20 T 28 20 T 36 20"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}

export function DoodleArrow({ size = 40, color = "#1a1a1a", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M 6 20 Q 18 8, 32 20" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 26 14 L 32 20 L 26 26" stroke={color} strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export function DoodleFlower({ size = 36, color = "#ff6b9d", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <circle cx="20" cy="12" r="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3" />
      <circle cx="28" cy="20" r="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3" />
      <circle cx="20" cy="28" r="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3" />
      <circle cx="12" cy="20" r="4" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3" />
      <circle cx="20" cy="20" r="3" fill="#fcbf49" stroke="#1a1a1a" strokeWidth="1.5" />
    </svg>
  );
}

export function DoodleLightning({ size = 32, color = "#fcbf49", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M 22 4 L 10 22 L 18 22 L 14 36 L 28 16 L 20 16 L 24 4 Z"
        stroke="#1a1a1a"
        strokeWidth="2"
        fill={color}
        fillOpacity="0.9"
      />
    </svg>
  );
}

export function DoodleCloud({ size = 44, color = "#9d4edd", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M 10 26 Q 4 26, 4 20 Q 4 14, 11 14 Q 12 8, 20 8 Q 28 8, 29 14 Q 36 14, 36 20 Q 36 26, 30 26 Z"
        stroke={color}
        strokeWidth="2.2"
        fill={color}
        fillOpacity="0.15"
      />
    </svg>
  );
}

export function DoodleSpiral({ size = 32, color = "#52b788", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M 20 20 m -2 0 a 2 2 0 1 1 4 0 a 5 5 0 1 1 -8 2 a 9 9 0 1 1 14 -4"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
      />
    </svg>
  );
}

export function DoodleCheck({ size = 28, color = "#52b788", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M 6 22 L 16 30 L 34 10" stroke={color} strokeWidth="3.5" fill="none" />
    </svg>
  );
}

export function DoodleCircle({ size = 40, color = "#ff4500", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path
        d="M 20 4 Q 34 6, 36 20 Q 34 34, 20 36 Q 6 34, 4 20 Q 6 6, 20 4 Z"
        stroke={color}
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}

export function DoodleExclaim({ size = 32, color = "#e63946", className, style }: DoodleProps) {
  return (
    <svg {...base(size)} className={className} style={style}>
      <path d="M 20 6 L 20 24" stroke={color} strokeWidth="3.5" fill="none" />
      <circle cx="20" cy="32" r="2.5" fill={color} />
    </svg>
  );
}
