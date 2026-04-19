"use client";
import { motion } from "framer-motion";
import SketchCard from "@/components/sketch/SketchCard";
import { DoodleStar } from "@/components/sketch/Doodles";

const testimonials = [
  {
    quote: "Fridge ki photo se 3 dishes mil gayi — weekend saved!",
    name: "Priya",
    city: "Mumbai",
    emoji: "🧑🏽‍🍳",
    bg: "bg-sketch-yellow/30",
    tilt: "-rotate-2",
  },
  {
    quote: "Mood journal ne mujhe patterns samjhae. Therapist se pehle yaha aata hun.",
    name: "Rohan",
    city: "Delhi",
    emoji: "🧘🏽",
    bg: "bg-sketch-pink/30",
    tilt: "rotate-1",
  },
  {
    quote: "Date-night look + restaurant + playlist — poori shaam set ho gayi.",
    name: "Ananya",
    city: "Bangalore",
    emoji: "💃🏽",
    bg: "bg-sketch-blue/20",
    tilt: "-rotate-1",
  },
  {
    quote: "Dadi-nani ke nuskhe section OP hai. Haldi doodh recipe exact mummy jaisa.",
    name: "Arjun",
    city: "Jaipur",
    emoji: "🍵",
    bg: "bg-sketch-green/25",
    tilt: "rotate-2",
  },
  {
    quote: "Hindi chat support life-saver. Mann ki baat apni bhasha mein hoti hai.",
    name: "Meera",
    city: "Pune",
    emoji: "💙",
    bg: "bg-sketch-purple/25",
    tilt: "-rotate-1",
  },
  {
    quote: "Outfit analyzer ne body type batake confidence la diya. Shopping list ready.",
    name: "Kabir",
    city: "Hyderabad",
    emoji: "👕",
    bg: "bg-phoenix-gold/30",
    tilt: "rotate-1",
  },
];

export default function Testimonials() {
  // duplicate list for seamless loop
  const items = [...testimonials, ...testimonials];
  return (
    <div className="relative overflow-hidden">
      {/* edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-paper to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-paper to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-6 py-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {items.map((t, i) => (
          <div key={i} className={`shrink-0 w-80 ${t.tilt}`}>
            <SketchCard variant="paper" tape className={`${t.bg} h-full`}>
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <DoodleStar key={j} size={14} color="#ff4500" />
                ))}
              </div>
              <p className="font-hand text-lg text-ink leading-snug mb-3">"{t.quote}"</p>
              <div className="flex items-center gap-2 pt-2 border-t-2 border-dashed border-ink/30">
                <div
                  className="w-9 h-9 bg-paper-cream border-[2px] border-ink rounded-full flex items-center justify-center text-lg"
                  style={{ filter: "url(#sketch-roughen)" }}
                >
                  {t.emoji}
                </div>
                <div className="font-note text-sm">
                  <div className="font-bold">{t.name}</div>
                  <div className="text-ink-faded text-xs">{t.city}</div>
                </div>
              </div>
            </SketchCard>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
