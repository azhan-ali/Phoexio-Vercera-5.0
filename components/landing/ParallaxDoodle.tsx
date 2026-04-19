"use client";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  intensity?: number; // higher = more follow
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Element that gently translates with mouse position — parallax illusion.
 * Wrap a doodle / icon / image in it.
 */
export default function ParallaxDoodle({
  children,
  intensity = 20,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 15 });
  const sy = useSpring(my, { stiffness: 80, damping: 15 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      mx.set(dx * intensity);
      my.set(dy * intensity);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, intensity]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}
