"use client";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SketchHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  underline?: boolean;
  tilt?: "left" | "right" | "none";
  font?: "scribble" | "hand" | "note";
}

const sizes = {
  h1: "text-6xl md:text-7xl",
  h2: "text-4xl md:text-5xl",
  h3: "text-3xl md:text-4xl",
  h4: "text-2xl md:text-3xl",
};

export default function SketchHeading({
  as = "h2",
  underline,
  tilt = "none",
  font = "scribble",
  className,
  children,
  ...props
}: SketchHeadingProps) {
  const Tag = as;
  const fontClass =
    font === "scribble" ? "font-scribble" : font === "hand" ? "font-hand" : "font-note";
  return (
    <Tag
      className={cn(
        fontClass,
        "ink-text font-bold leading-[1.05]",
        sizes[as],
        tilt === "left" && "tilt-left",
        tilt === "right" && "tilt-right",
        className
      )}
      {...props}
    >
      {underline ? <span className="sketch-underline">{children}</span> : children}
    </Tag>
  );
}
