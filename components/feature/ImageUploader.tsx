"use client";
import { Image as ImageIcon, X, Upload } from "lucide-react";
import { useId, useState } from "react";
import { fileToDataUrl } from "@/lib/api";

interface Props {
  onImage: (dataUrl: string | null) => void;
  label?: string;
  maxMB?: number;
  height?: string;
  id?: string;
}

export default function ImageUploader({
  onImage,
  label = "click or drop image here",
  maxMB = 8,
  height = "h-56",
  id,
}: Props) {
  const reactId = useId();
  const inputId = id || `image-uploader-${reactId}`;
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  async function handle(file: File) {
    setError(null);
    if (file.size > maxMB * 1024 * 1024) {
      setError(`Image too large. Max ${maxMB} MB.`);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Only image files allowed.");
      return;
    }
    const url = await fileToDataUrl(file);
    setPreview(url);
    onImage(url);
  }

  function clear(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    onImage(null);
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handle(f);
        }}
        className={`relative cursor-pointer flex flex-col items-center justify-center ${height} bg-paper-cream border-[2.5px] border-dashed border-ink rounded-[14px_22px_16px_24px/20px_16px_22px_14px] hover:bg-paper-dark transition ${
          dragging ? "bg-phoenix-flame/10 border-phoenix-flame" : ""
        }`}
        style={{ filter: "url(#sketch-roughen)" }}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
            <button
              onClick={clear}
              className="absolute top-2 right-2 p-1.5 bg-sketch-red text-white border-[2px] border-ink rounded-full hover:scale-105 transition"
              aria-label="remove image"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <Upload size={36} className="text-ink-faded mb-2" />
            <span className="font-hand text-ink-faded">{label}</span>
            <span className="font-note text-xs text-ink-faded mt-1">
              JPG / PNG / WEBP · max {maxMB} MB
            </span>
          </>
        )}
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
        }}
      />
      {error && (
        <div className="mt-2 font-note text-sm text-sketch-red">{error}</div>
      )}
    </div>
  );
}
