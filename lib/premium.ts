"use client";
/**
 * Premium state (hackathon demo) — just a localStorage toggle.
 * In a real app this would be a server-verified subscription.
 */
const KEY = "phoenix_premium";

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "true";
}

export function setPremium(v: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, v ? "true" : "false");
  window.dispatchEvent(new Event("phoenix-premium-change"));
}

export function subscribePremium(cb: (v: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb(isPremium());
  window.addEventListener("phoenix-premium-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("phoenix-premium-change", handler);
    window.removeEventListener("storage", handler);
  };
}
