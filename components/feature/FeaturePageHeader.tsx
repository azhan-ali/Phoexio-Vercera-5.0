import Link from "next/link";
import { ArrowLeft, LucideIcon } from "lucide-react";
import SketchHeading from "@/components/sketch/SketchHeading";

interface Props {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  Icon?: LucideIcon;
}

export default function FeaturePageHeader({
  backHref,
  backLabel,
  eyebrow,
  title,
  highlight,
  subtitle,
  Icon,
}: Props) {
  return (
    <div className="pt-4 pb-8">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 font-hand text-ink-faded hover:text-phoenix-flame mb-3"
      >
        <ArrowLeft size={16} /> {backLabel}
      </Link>
      <div className="flex items-center gap-2 mb-2">
        {Icon && (
          <div
            className="p-2 bg-phoenix-flame/20 border-[2px] border-ink rounded-xl"
            style={{ filter: "url(#sketch-roughen)" }}
          >
            <Icon size={22} className="text-phoenix-flame" strokeWidth={2.2} />
          </div>
        )}
        <div className="font-hand text-phoenix-flame text-lg">{eyebrow}</div>
      </div>
      <SketchHeading as="h1" className="!text-4xl md:!text-6xl mb-2">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="sketch-highlight">{highlight}</span>
          </>
        )}
      </SketchHeading>
      <p className="font-hand text-lg text-ink-soft max-w-2xl">{subtitle}</p>
    </div>
  );
}
