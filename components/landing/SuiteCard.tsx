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
      <motion.div 
        whileHover={{ scale: 1.02, rotate: title.includes("Fashion") ? -1 : 1 }} 
        transition={{ type: "spring", stiffness: 300 }}
      >
        <SketchCard 
          tilt={tilt} 
          tape 
          className={cn(
            "relative overflow-hidden h-full border-[3px] transition-all duration-300 group-hover:sketch-shadow-flame", 
            bg
          )}
        >
          {/* Decorative Stickers */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 scale-0 group-hover:scale-100 z-20">
             <div className="bg-sketch-yellow border-2 border-ink px-2 py-0.5 rounded-md font-hand text-[10px] text-ink uppercase rotate-12 shadow-[2px_2px_0_#1a1a1a]">
                New Era ✨
             </div>
          </div>

          <div className="absolute bottom-10 -left-6 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm pointer-events-none">
             <div className="w-24 h-24 bg-white/40 rounded-full animate-spin-slow" />
          </div>

          {/* floating star top-right */}
          <div className="absolute top-4 right-6 opacity-40 group-hover:opacity-100 group-hover:animate-spin-slow transition-all">
            <DoodleStar size={28} color="#ff4500" />
          </div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.2 }}
              className="p-3 bg-paper-cream border-[2px] border-ink rounded-2xl shadow-[3px_3px_0_#1a1a1a]"
            >
              {icon}
            </motion.div>
            <div>
              <SketchHeading as="h3" font="scribble" className="!text-3xl leading-none mb-1">
                {title}
              </SketchHeading>
              <span className="bg-white/40 px-2 py-0.5 rounded-full font-hand text-xs text-ink italic border border-ink/10">{tag}</span>
            </div>
          </div>

          {/* MOCK PREVIEW — high premium feel */}
          <div className="mb-4 p-4 bg-paper-cream/90 backdrop-blur-sm border-[2.5px] border-ink rounded-2xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]" style={{ filter: "url(#sketch-roughen)" }}>
            {preview}
          </div>

          <ul className="space-y-2 mb-6">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 font-note text-base text-ink-soft">
                <div className="group-hover:animate-bounce">
                   <DoodleCheck size={18} color="#52b788" />
                </div>
                <span className="group-hover:text-ink transition-colors">{f}</span>
              </li>
            ))}
          </ul>

          <div className="inline-flex items-center gap-2 font-hand font-bold text-phoenix-flame text-xl pt-4 border-t-2 border-dashed border-ink/20 w-full justify-between items-center group-hover:translate-x-1 transition-all">
            <span className="relative">
               {ctaLabel}
               <span className="absolute -bottom-1 left-0 w-0 h-1 bg-phoenix-flame group-hover:w-full transition-all duration-300" />
            </span>
            <div className="bg-phoenix-flame text-white p-1 rounded-full border-2 border-ink group-hover:rotate-90 transition-transform">
               <ArrowRight size={20} />
            </div>
          </div>
        </SketchCard>
      </motion.div>
    </Link>
  );
}
