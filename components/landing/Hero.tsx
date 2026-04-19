"use client";
import PhoenixLogo from "@/components/brand/PhoenixLogo";
import SketchButton from "@/components/sketch/SketchButton";
import ParallaxDoodle from "@/components/landing/ParallaxDoodle";
import Reveal from "@/components/landing/Reveal";
import {
  DoodleStar,
  DoodleHeart,
  DoodleLightning,
  DoodleSpiral,
  DoodleFlower,
  DoodleCloud,
  DoodleCircle,
} from "@/components/sketch/Doodles";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-4 pb-10 md:pb-14 overflow-hidden">
      {/* Giant sun ring behind hero */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
      >
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          className="animate-spin-slow"
          style={{ filter: "url(#sketch-roughen-heavy)" }}
        >
          <circle
            cx="400"
            cy="400"
            r="260"
            stroke="#ff4500"
            strokeWidth="3"
            fill="none"
            strokeDasharray="12 18"
            opacity="0.35"
          />
          <circle
            cx="400"
            cy="400"
            r="320"
            stroke="#fcbf49"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6 10"
            opacity="0.25"
          />
          <circle
            cx="400"
            cy="400"
            r="380"
            stroke="#9d4edd"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 14"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Parallax floating doodles */}
      <ParallaxDoodle
        intensity={30}
        className="absolute left-[6%] top-4 pointer-events-none"
      >
        <div className="animate-wobble-slow">
          <DoodleStar size={44} color="#ff4500" />
        </div>
      </ParallaxDoodle>
      <ParallaxDoodle
        intensity={45}
        className="absolute right-[8%] top-12 pointer-events-none"
      >
        <div className="animate-pulse-soft">
          <DoodleSpiral size={52} color="#9d4edd" />
        </div>
      </ParallaxDoodle>
      <ParallaxDoodle
        intensity={25}
        className="absolute left-[12%] bottom-10 pointer-events-none"
      >
        <div className="animate-wobble-slow">
          <DoodleHeart size={36} color="#e63946" />
        </div>
      </ParallaxDoodle>
      <ParallaxDoodle
        intensity={40}
        className="absolute right-[14%] bottom-20 pointer-events-none"
      >
        <div className="animate-pulse-soft">
          <DoodleLightning size={42} color="#fcbf49" />
        </div>
      </ParallaxDoodle>
      <ParallaxDoodle
        intensity={20}
        className="absolute left-[45%] top-2 pointer-events-none hidden md:block"
      >
        <DoodleCloud size={56} color="#4361ee" />
      </ParallaxDoodle>
      <ParallaxDoodle
        intensity={35}
        className="absolute right-[38%] bottom-4 pointer-events-none hidden md:block"
      >
        <DoodleFlower size={40} color="#ff6b9d" />
      </ParallaxDoodle>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[520px]">
        {/* LEFT — Copy */}
        <div className="text-center md:text-left relative">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 bg-phoenix-gold/50 border-[2px] border-ink rounded-full font-hand text-sm"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              <Sparkles size={14} /> powered by Grok · made for India
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-scribble font-bold leading-[0.95] text-[4rem] md:text-[6.5rem] ink-text mb-1">
              Rebirth
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-scribble font-bold leading-[0.95] text-[4rem] md:text-[6.5rem] ink-text mb-4">
              Your<span className="relative inline-block">
                self
                {/* animated draw-in underline */}
                <motion.svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  height="14"
                >
                  <motion.path
                    d="M2 8 Q 50 2, 100 7 T 198 8"
                    stroke="#ff4500"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
              <motion.span
                className="inline-block ml-2"
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1, type: "spring" }}
              >
                🔥
              </motion.span>
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="font-hand text-xl md:text-2xl text-ink-soft max-w-xl mx-auto md:mx-0 mb-6 leading-snug">
              One AI companion for{" "}
              <span className="text-sketch-pink font-bold sketch-highlight">fashion</span>,{" "}
              <span className="text-sketch-green font-bold sketch-highlight">food</span>, aur{" "}
              <span className="text-sketch-purple font-bold sketch-highlight">mental wellness</span>.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-4">
              <Link href="/fashion">
                <SketchButton variant="flame" size="lg">
                  Start free <ArrowRight size={20} />
                </SketchButton>
              </Link>
              <Link href="#how">
                <SketchButton variant="ghost" size="lg">
                  <PlayCircle size={18} /> See how it works
                </SketchButton>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex items-center gap-3 justify-center md:justify-start font-hand text-sm text-ink-faded">
              <div className="flex -space-x-2">
                {["🧑🏽", "👩🏾", "🧔🏽‍♂️", "👩🏻"].map((e, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-paper-cream border-[2px] border-ink rounded-full flex items-center justify-center text-base"
                    style={{ filter: "url(#sketch-roughen)" }}
                  >
                    {e}
                  </div>
                ))}
              </div>
              <span>loved by 12k+ desis</span>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — GIANT phoenix with flame aura */}
        <div className="relative flex items-center justify-center">
          {/* Aura rings */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-phoenix-flame/15 border-[3px] border-phoenix-flame/40"
              style={{ filter: "url(#sketch-roughen)" }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ scale: [1, 1.12, 1], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full bg-phoenix-gold/20 border-[2.5px] border-dashed border-phoenix-gold"
              style={{ filter: "url(#sketch-roughen)" }}
            />
          </motion.div>

          {/* Rotating orbit doodles */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-[380px] h-[380px] md:w-[460px] md:h-[460px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <DoodleStar size={28} color="#fcbf49" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <DoodleHeart size={26} color="#e63946" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <DoodleCircle size={30} color="#9d4edd" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <DoodleLightning size={28} color="#4361ee" />
              </div>
            </div>
          </motion.div>

          {/* The Phoenix */}
          <ParallaxDoodle intensity={15}>
            <div className="relative z-10">
              <PhoenixLogo size={280} animated />
            </div>
          </ParallaxDoodle>

          {/* Floating tags around phoenix */}
          <motion.div
            className="absolute -top-4 -left-2 md:left-4 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div
              className="px-3 py-1 bg-sketch-pink text-white border-[2px] border-ink rounded-full font-hand text-xs shadow-[2px_2px_0_#1a1a1a] rotate-[-8deg]"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              ✨ fashion
            </div>
          </motion.div>
          <motion.div
            className="absolute top-12 -right-2 md:right-4 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div
              className="px-3 py-1 bg-sketch-green text-white border-[2px] border-ink rounded-full font-hand text-xs shadow-[2px_2px_0_#1a1a1a] rotate-[6deg]"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              🍲 food
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-2 left-10 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <div
              className="px-3 py-1 bg-sketch-purple text-white border-[2px] border-ink rounded-full font-hand text-xs shadow-[2px_2px_0_#1a1a1a] rotate-[-5deg]"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              💙 mind
            </div>
          </motion.div>
          <motion.div
            className="absolute -bottom-4 right-6 pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <div
              className="px-3 py-1 bg-phoenix-gold text-ink border-[2px] border-ink rounded-full font-hand text-xs shadow-[2px_2px_0_#1a1a1a] rotate-[8deg]"
              style={{ filter: "url(#sketch-roughen)" }}
            >
              🔥 premium
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
