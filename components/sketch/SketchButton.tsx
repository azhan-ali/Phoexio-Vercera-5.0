"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "flame" | "ghost" | "ink" | "gold";
type Size = "sm" | "md" | "lg";

interface SketchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  tilt?: "left" | "right" | "none";
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-paper-cream text-ink border-ink hover:bg-paper-dark active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  flame:
    "bg-phoenix-flame text-white border-ink hover:bg-phoenix-ember active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  gold: "bg-phoenix-gold text-ink border-ink hover:bg-sketch-yellow active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  ink: "bg-ink text-paper-cream border-ink hover:bg-ink-soft active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
  ghost:
    "bg-transparent text-ink border-ink hover:bg-paper-dark active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-1.5 text-base",
  md: "px-6 py-2.5 text-lg",
  lg: "px-8 py-3.5 text-xl",
};

const SketchButton = forwardRef<HTMLButtonElement, SketchButtonProps>(
  ({ className, variant = "primary", size = "md", tilt = "none", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "font-hand font-bold tracking-wide",
          "border-[2.5px] rounded-[14px_22px_16px_24px/20px_16px_22px_14px]",
          "shadow-[4px_4px_0_#1a1a1a]",
          "transition-all duration-100",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          tilt === "left" && "tilt-left",
          tilt === "right" && "tilt-right",
          "hover:-rotate-0",
          className
        )}
        style={{ filter: "url(#sketch-roughen)" }}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SketchButton.displayName = "SketchButton";
export default SketchButton;
