"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface SketchCardProps extends HTMLAttributes<HTMLDivElement> {
  tilt?: "left" | "right" | "none";
  tape?: boolean;
  variant?: "paper" | "cream" | "flame";
  hoverable?: boolean;
}

const variantBg = {
  paper: "bg-paper",
  cream: "bg-paper-cream",
  flame: "bg-phoenix-flame/10",
};

const SketchCard = forwardRef<HTMLDivElement, SketchCardProps>(
  ({ className, tilt = "none", tape, variant = "cream", hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative p-6",
          "border-[2.5px] border-ink",
          "rounded-[18px_28px_20px_26px/22px_18px_28px_20px]",
          "shadow-[5px_5px_0_#1a1a1a]",
          variantBg[variant],
          tilt === "left" && "tilt-left",
          tilt === "right" && "tilt-right",
          hoverable &&
            "transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 cursor-pointer",
          className
        )}
        style={{ filter: "url(#sketch-roughen)" }}
        {...props}
      >
        {tape && <span className="tape" aria-hidden />}
        {children}
      </div>
    );
  }
);
SketchCard.displayName = "SketchCard";
export default SketchCard;
