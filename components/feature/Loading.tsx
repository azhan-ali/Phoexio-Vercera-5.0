"use client";
import { Loader2 } from "lucide-react";

const messages = [
  "AI is sketching your results…",
  "Mixing colors on paper…",
  "Consulting fashion week archives…",
  "Drafting ideas with a pencil…",
  "Scribbling suggestions…",
];

export default function Loading({ label }: { label?: string }) {
  const msg = label || messages[Math.floor(Math.random() * messages.length)];
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <Loader2 className="animate-spin text-phoenix-flame" size={40} />
      <div className="font-hand text-lg text-ink-soft">{msg}</div>
    </div>
  );
}
