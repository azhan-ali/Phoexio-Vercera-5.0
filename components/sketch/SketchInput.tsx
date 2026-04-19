"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface SketchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const SketchInput = forwardRef<HTMLInputElement, SketchInputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 font-hand text-ink text-lg"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 bg-paper-cream text-ink text-lg font-note",
            "border-[2.5px] border-ink",
            "rounded-[12px_18px_14px_20px/16px_12px_18px_12px]",
            "outline-none focus:shadow-[3px_3px_0_#ff4500] transition-shadow",
            "placeholder:text-ink-faded placeholder:italic",
            className
          )}
          style={{ filter: "url(#sketch-roughen)" }}
          {...props}
        />
      </div>
    );
  }
);
SketchInput.displayName = "SketchInput";

interface SketchTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const SketchTextarea = forwardRef<HTMLTextAreaElement, SketchTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 font-hand text-ink text-lg"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 bg-paper-cream text-ink text-lg font-note",
            "border-[2.5px] border-ink resize-none",
            "rounded-[12px_18px_14px_20px/16px_12px_18px_12px]",
            "outline-none focus:shadow-[3px_3px_0_#ff4500] transition-shadow",
            "placeholder:text-ink-faded placeholder:italic",
            className
          )}
          style={{ filter: "url(#sketch-roughen)" }}
          {...props}
        />
      </div>
    );
  }
);
SketchTextarea.displayName = "SketchTextarea";
