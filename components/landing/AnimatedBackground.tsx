import {
  DoodleStar,
  DoodleHeart,
  DoodleSquiggle,
  DoodleFlower,
  DoodleLightning,
  DoodleCloud,
  DoodleSpiral,
  DoodleCircle,
  DoodleArrow,
} from "@/components/sketch/Doodles";

/**
 * Fixed, full-viewport layer of drifting/pulsing sketch doodles.
 * Pointer-events disabled so it never blocks clicks.
 * Positions are hard-coded (deterministic) to avoid SSR hydration mismatch.
 */
const items = [
  // keep only a few, low-opacity, positioned on page edges so hero content breathes
  { C: DoodleSquiggle,  top: "22%", left: "3%",   size: 48, anim: "animate-drift-3", opacity: 0.22 },
  { C: DoodleCloud,     top: "6%",  left: "94%",  size: 50, anim: "animate-drift-1", opacity: 0.2 },
  { C: DoodleFlower,    top: "70%", left: "2%",   size: 34, anim: "animate-drift-2", opacity: 0.25 },
  { C: DoodleSpiral,    top: "58%", left: "96%",  size: 30, anim: "animate-spin-slow", opacity: 0.22 },
  { C: DoodleCircle,    top: "88%", left: "92%",  size: 40, anim: "animate-drift-1", opacity: 0.2 },
  { C: DoodleStar,      top: "92%", left: "8%",   size: 22, anim: "animate-pulse-soft", opacity: 0.3 },
];

const colors = ["#ff4500", "#ffba08", "#e63946", "#4361ee", "#9d4edd", "#52b788", "#ff6b9d", "#fcbf49"];

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {items.map((it, i) => {
        const C = it.C;
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            className={it.anim}
            style={{
              position: "absolute",
              top: it.top,
              left: it.left,
              opacity: it.opacity,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          >
            <C size={it.size} color={color} />
          </div>
        );
      })}
    </div>
  );
}
