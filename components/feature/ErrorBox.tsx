import { AlertTriangle } from "lucide-react";

export default function ErrorBox({ message }: { message: string }) {
  return (
    <div
      className="p-4 bg-sketch-red/15 border-[2.5px] border-sketch-red rounded-[12px_18px_14px_20px/16px_12px_18px_12px] flex gap-3 items-start"
      style={{ filter: "url(#sketch-roughen)" }}
    >
      <AlertTriangle size={22} className="text-sketch-red shrink-0 mt-0.5" />
      <div className="font-note text-ink">
        <div className="font-bold font-hand text-lg mb-0.5">Something went wrong</div>
        <div className="text-sm text-ink-soft">{message}</div>
        <div className="text-xs text-ink-faded mt-1 italic">
          check your GROK_API_KEY in .env.local and restart dev server
        </div>
      </div>
    </div>
  );
}
