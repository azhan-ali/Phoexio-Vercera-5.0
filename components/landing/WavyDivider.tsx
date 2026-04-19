"use client";
import { motion } from "framer-motion";

interface Props {
  color?: string;
  className?: string;
}

/** Hand-drawn wavy section divider. Animates draw-in when in view. */
export default function WavyDivider({ color = "#1a1a1a", className }: Props) {
  return (
    <div className={`py-6 overflow-hidden ${className || ""}`}>
      <motion.svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-8"
        style={{ filter: "url(#pencil-texture)" }}
      >
        <motion.path
          d="M 10 20 Q 150 4, 300 22 T 600 20 T 900 22 T 1190 18"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}
