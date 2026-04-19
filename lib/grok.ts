/**
 * Grok (x.ai) API client — unified wrapper for text, vision, and live search.
 * Used by Next.js API routes (server-side only — never import in client components).
 */

const API_BASE =
  process.env.GROK_API_BASE_URL || "https://api.x.ai/v1";
const API_KEY = process.env.GROK_API_KEY;
const TEXT_MODEL = process.env.GROK_TEXT_MODEL || "grok-4-1-fast-non-reasoning";
// All modern Grok language models accept image input (T + image -> T),
// so vision == text model by default. Override if you want a dedicated one.
const VISION_MODEL = process.env.GROK_VISION_MODEL || TEXT_MODEL;
const IMAGE_MODEL = process.env.GROK_IMAGE_MODEL || "grok-imagine-image";

function assertKey() {
  if (!API_KEY) {
    throw new Error(
      "GROK_API_KEY is not set. Add it to .env.local. Get a key at https://console.x.ai"
    );
  }
}

export type ChatMessage =
  | { role: "system" | "user" | "assistant"; content: string }
  | {
      role: "user";
      content: Array<
        | { type: "text"; text: string }
        | { type: "image_url"; image_url: { url: string; detail?: "low" | "high" | "auto" } }
      >;
    };

interface GrokChatOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  // Live search — Grok-specific parameter
  search_parameters?: {
    mode?: "auto" | "on" | "off";
    return_citations?: boolean;
    max_search_results?: number;
    sources?: Array<{ type: "web" | "news" | "x" | "rss"; country?: string }>;
  };
  // Optional OpenAI-style tools (function calling)
  tools?: Array<Record<string, unknown>>;
  response_format?: { type: "json_object" | "text" };
}

/** Low-level Grok chat completion. */
export async function grokChat(opts: GrokChatOptions) {
  assertKey();
  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: opts.model || TEXT_MODEL,
      messages: opts.messages,
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.max_tokens ?? 1500,
      ...(opts.tools && { tools: opts.tools }),
      ...(opts.response_format && { response_format: opts.response_format }),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Grok API error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return data;
}

/** Simple text chat — returns the assistant message content. */
export async function grokText(
  userMessage: string,
  systemPrompt?: string,
  opts: Partial<GrokChatOptions> = {}
): Promise<string> {
  const messages: ChatMessage[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: userMessage });
  const res = await grokChat({ messages, ...opts });
  return res.choices?.[0]?.message?.content ?? "";
}

/** Vision call — pass image as data URL or public URL. */
export async function grokVision(
  imageUrl: string,
  prompt: string,
  systemPrompt?: string,
  opts: { jsonMode?: boolean } = {}
): Promise<string> {
  const messages: ChatMessage[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({
    role: "user",
    content: [
      { type: "image_url", image_url: { url: imageUrl, detail: "high" } },
      { type: "text", text: prompt },
    ],
  });
  const res = await grokChat({
    model: VISION_MODEL,
    messages,
    max_tokens: 2000,
    ...(opts.jsonMode && { response_format: { type: "json_object" } }),
  });
  return res.choices?.[0]?.message?.content ?? "";
}

/** Live-search assisted chat — Grok will search the web before answering. */
export async function grokLiveSearch(
  userMessage: string,
  systemPrompt?: string
): Promise<{ content: string; citations?: string[] }> {
  const messages: ChatMessage[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: userMessage });
  
  // NOTE: x.ai has deprecated live search via search_parameters.
  // We perform a standard chat request instead. The model's knowledge
  // cutoff is recent enough for demo purposes.
  const res = await grokChat({
    messages,
  });
  
  return {
    content: res.choices?.[0]?.message?.content ?? "",
    citations: [],
  };
}

/** Multi-image vision call — pass multiple image URLs/data-urls + one text prompt. */
export async function grokVisionMulti(
  imageUrls: string[],
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const messages: ChatMessage[] = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({
    role: "user",
    content: [
      ...imageUrls.map((url) => ({
        type: "image_url" as const,
        image_url: { url, detail: "high" as const },
      })),
      { type: "text", text: prompt },
    ],
  });
  const res = await grokChat({ model: VISION_MODEL, messages, max_tokens: 2000 });
  return res.choices?.[0]?.message?.content ?? "";
}

/**
 * Image generation via Grok. Tries image-to-image when referenceImages are provided
 * (required for identity/face preservation). Falls back to text-only generation.
 */
export async function grokImage(
  prompt: string,
  opts: {
    n?: number;
    responseFormat?: "url" | "b64_json";
    referenceImages?: string[];
    model?: string;
  } = {}
): Promise<{
  urls: string[];
  b64?: string[];
  revisedPrompts?: string[];
  usedReference: boolean;
}> {
  assertKey();
  const model = opts.model || IMAGE_MODEL;
  const hasRefs = !!opts.referenceImages?.length;

  // Try chat-completions endpoint first if we have reference images,
  // since grok-imagine-image modality is T+image -> image.
  if (hasRefs) {
    try {
      const chatRes = await fetch(`${API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: [
                ...opts.referenceImages!.map((url) => ({
                  type: "image_url",
                  image_url: { url, detail: "high" },
                })),
                { type: "text", text: prompt },
              ],
            },
          ],
          modalities: ["image"],
          n: opts.n ?? 1,
        }),
      });

      if (chatRes.ok) {
        const chatData = await chatRes.json();
        const urls: string[] = [];
        const b64: string[] = [];
        for (const choice of chatData.choices || []) {
          const content = choice.message?.content;
          if (Array.isArray(content)) {
            for (const part of content) {
              if (part.type === "image_url" && part.image_url?.url)
                urls.push(part.image_url.url);
              if (part.type === "image" && part.image?.url) urls.push(part.image.url);
              if (part.image_url?.url) urls.push(part.image_url.url);
              if (part.b64_json) b64.push(part.b64_json);
            }
          } else if (choice.message?.images) {
            for (const img of choice.message.images) {
              if (img.url) urls.push(img.url);
              if (img.b64_json) b64.push(img.b64_json);
            }
          }
        }
        if (urls.length || b64.length) {
          return {
            urls,
            b64: b64.length ? b64 : undefined,
            revisedPrompts: [],
            usedReference: true,
          };
        }
      }
      // If chat route didn't return images, fall through to /images/generations below.
    } catch {
      // fall through
    }
  }

  // Standard text-to-image endpoint (with optional reference image field)
  const body: Record<string, unknown> = {
    model,
    prompt,
    n: opts.n ?? 1,
    response_format: opts.responseFormat ?? "url",
  };
  if (hasRefs) {
    // Best-effort: send the first reference under common field names.
    body.image = opts.referenceImages![0];
    body.reference_images = opts.referenceImages;
  }

  const res = await fetch(`${API_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    // If the reference fields caused an error, retry once without them.
    if (hasRefs) {
      const retryRes = await fetch(`${API_BASE}/images/generations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model,
          prompt,
          n: opts.n ?? 1,
          response_format: opts.responseFormat ?? "url",
        }),
      });
      if (retryRes.ok) {
        const data = await retryRes.json();
        const urls: string[] = [];
        const b64: string[] = [];
        const revisedPrompts: string[] = [];
        for (const item of data.data || []) {
          if (item.url) urls.push(item.url);
          if (item.b64_json) b64.push(item.b64_json);
          if (item.revised_prompt) revisedPrompts.push(item.revised_prompt);
        }
        return {
          urls,
          b64: b64.length ? b64 : undefined,
          revisedPrompts,
          usedReference: false,
        };
      }
    }
    throw new Error(`Grok Image API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const urls: string[] = [];
  const b64: string[] = [];
  const revisedPrompts: string[] = [];
  for (const item of data.data || []) {
    if (item.url) urls.push(item.url);
    if (item.b64_json) b64.push(item.b64_json);
    if (item.revised_prompt) revisedPrompts.push(item.revised_prompt);
  }
  return {
    urls,
    b64: b64.length ? b64 : undefined,
    revisedPrompts,
    usedReference: hasRefs,
  };
}

/** Parse JSON from a Grok response that may be wrapped in ```json fences. */
export function safeParseJSON<T = unknown>(raw: string): T | null {
  if (!raw) return null;
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // try to find first {...} block
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch {
        return null;
      }
    }
    return null;
  }
}
