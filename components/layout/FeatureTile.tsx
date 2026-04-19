import SketchCard from "@/components/sketch/SketchCard";
import SketchHeading from "@/components/sketch/SketchHeading";
import { DoodleCheck } from "@/components/sketch/Doodles";
import { ArrowRight, Lock, LucideIcon } from "lucide-react";
import Link from "next/link";

export interface FeatureTileProps {
  href: string;
  title: string;
  tagline: string;
  description: string;
  Icon: LucideIcon;
  bullets?: string[];
  bg?: string;
  tilt?: "left" | "right" | "none";
  tape?: boolean;
  premium?: boolean;
  comingSoon?: boolean;
}

export default function FeatureTile({
  href,
  title,
  tagline,
  description,
  Icon,
  bullets,
  bg = "bg-paper-cream",
  tilt = "none",
  tape,
  premium,
  comingSoon,
}: FeatureTileProps) {
  const content = (
    <SketchCard
      variant="paper"
      tilt={tilt}
      tape={tape}
      hoverable={!comingSoon}
      className={`${bg} h-full relative`}
    >
      {premium && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-phoenix-gold border-[2px] border-ink rounded-full font-hand text-xs">
          <Lock size={10} /> Premium
        </div>
      )}
      {comingSoon && (
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-sketch-purple/40 border-[2px] border-ink rounded-full font-hand text-xs">
          soon
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-paper-cream border-[2px] border-ink rounded-xl">
          <Icon size={28} strokeWidth={2.2} className="text-phoenix-flame" />
        </div>
        <div>
          <SketchHeading as="h3" font="scribble" className="!text-2xl leading-none">
            {title}
          </SketchHeading>
          <span className="font-hand text-sm text-ink-faded italic">{tagline}</span>
        </div>
      </div>

      <p className="font-note text-base text-ink-soft mb-3 leading-snug">{description}</p>

      {bullets && bullets.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 font-note text-sm">
              <DoodleCheck size={16} color="#52b788" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="inline-flex items-center gap-1 font-hand text-phoenix-flame text-lg pt-2 border-t-2 border-dashed border-ink/30 w-full justify-between">
        {comingSoon ? "coming soon" : "open"} <ArrowRight size={18} />
      </div>
    </SketchCard>
  );

  if (comingSoon) {
    return <div className="cursor-not-allowed opacity-80">{content}</div>;
  }
  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}
