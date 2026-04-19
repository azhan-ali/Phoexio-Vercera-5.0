/**
 * Client-side fetch helpers for Phoenix API routes.
 * Safe to import in "use client" components.
 */
import type { ChatMessage } from "@/lib/grok";

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data as T;
}

/* =================== CHAT =================== */
export async function apiChat(opts: {
  prompt?: string;
  systemPrompt?: string;
  messages?: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  jsonMode?: boolean;
  model?: string;
}): Promise<{ content: string }> {
  return postJSON("/api/grok/chat", opts);
}

/* =================== VISION =================== */
export async function apiVision(opts: {
  imageUrl: string;
  prompt: string;
  systemPrompt?: string;
}): Promise<{ content: string }> {
  return postJSON("/api/grok/vision", opts);
}

/* =================== SEARCH =================== */
export async function apiSearch(opts: {
  query: string;
  systemPrompt?: string;
}): Promise<{ content: string; citations: string[] }> {
  return postJSON("/api/grok/search", opts);
}

/* =================== UTIL: file -> dataURL =================== */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
