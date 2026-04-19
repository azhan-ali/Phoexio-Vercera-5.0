import SketchHeading from "@/components/sketch/SketchHeading";
import {
  DoodleStar,
  DoodleSpiral,
  DoodleHeart,
  DoodleLightning,
} from "@/components/sketch/Doodles";
import { LucideIcon } from "lucide-react";

interface SectionHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  Icon?: LucideIcon;
  accentColor: string; // tailwind bg-* for pill
  doodleColors?: [string, string, string, string];
}

export default function SectionHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  Icon,
  accentColor,
  doodleColors = ["#ff4500", "#9d4edd", "#e63946", "#fcbf49"],
}: SectionHeroProps) {
  return (
    <section className="relative text-center pt-6 pb-10">
      <div className="absolute -top-2 left-[6%] animate-wobble-slow">
        <DoodleStar size={36} color={doodleColors[0]} />
      </div>
      <div className="absolute top-8 right-[8%] animate-pulse-soft">
        <DoodleSpiral size={40} color={doodleColors[1]} />
      </div>
      <div className="absolute bottom-4 left-[14%] animate-wobble-slow">
        <DoodleHeart size={26} color={doodleColors[2]} />
      </div>
      <div className="absolute bottom-8 right-[18%] animate-pulse-soft">
        <DoodleLightning size={30} color={doodleColors[3]} />
      </div>

      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 mb-4 ${accentColor} border-[2px] border-ink rounded-full font-hand text-sm`}
        style={{ filter: "url(#sketch-roughen)" }}
      >
        {Icon && <Icon size={14} />} {eyebrow}
      </div>

      <SketchHeading as="h1" font="scribble" className="mb-3 !text-5xl md:!text-7xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="sketch-highlight">{highlight}</span>
          </>
        )}
      </SketchHeading>

      <p className="font-hand text-lg md:text-xl text-ink-soft max-w-2xl mx-auto leading-snug">
        {subtitle}
      </p>
    </section>
  );
}
