"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import SketchCard from "@/components/sketch/SketchCard";
import SketchHeading from "@/components/sketch/SketchHeading";
import { DoodleCheck, DoodleStar } from "@/components/sketch/Doodles";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SuiteCardProps {
  title: string;
  tag: string;
  icon: React.ReactNode;
  bg: string;
  href: string;
  tilt: "left" | "right" | "none";
  features: string[];
  preview: React.ReactNode;
  ctaLabel?: string;
}

export default function SuiteCard({
  title,
  tag,
  icon,
  bg,
  href,
  tilt,
  features,
  preview,
  ctaLabel = "explore suite",
}: SuiteCardProps) {
  return (
    <Link href={href} className="block group">
      <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260 }}>
        <SketchCard tilt={tilt} tape className={cn("relative overflow-hidden h-full", bg)}>
          {/* floating star top-right */}
          <div className="absolute top-3 right-3 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition">
            <DoodleStar size={24} color="#ff4500" />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-paper-cream border-[2px] border-ink rounded-xl">
              {icon}
            </div>
            <div>
              <SketchHeading as="h3" font="scribble" className="!text-2xl leading-none">
                {title}
              </SketchHeading>
              <span className="font-hand text-sm text-ink-faded italic">{tag}</span>
            </div>
          </div>

          {/* MOCK PREVIEW — appears above list on hover, or pinned mobile */}
          <div className="mb-3 p-3 bg-paper-cream border-[2px] border-ink rounded-xl" style={{ filter: "url(#sketch-roughen)" }}>
            {preview}
          </div>

          <ul className="space-y-1.5 mb-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 font-note text-sm">
                <DoodleCheck size={16} color="#52b788" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="inline-flex items-center gap-1 font-hand text-phoenix-flame text-lg pt-2 border-t-2 border-dashed border-ink/30 w-full justify-between group-hover:gap-3 transition-all">
            {ctaLabel}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </div>
        </SketchCard>
      </motion.div>
    </Link>
  );
}
