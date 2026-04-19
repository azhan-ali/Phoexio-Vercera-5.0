/**
 * Global SVG <defs> mounted once in root layout.
 * Provides the `sketch-roughen` filter used by .sketch-border* utilities
 * to give straight borders a hand-drawn, wobbly look.
 */
export default function SketchSVGDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        {/* Main roughen filter - applied to borders */}
        <filter id="sketch-roughen" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>

        {/* Heavier roughen, used for big decorative frames */}
        <filter id="sketch-roughen-heavy" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>

        {/* Pencil / ink texture filter — gives strokes a grainy marker feel */}
        <filter id="pencil-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </defs>
    </svg>
  );
}
