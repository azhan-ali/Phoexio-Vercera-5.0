import PhoenixLogo from "@/components/brand/PhoenixLogo";

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <PhoenixLogo size={80} animated />
      <div className="font-scribble text-3xl font-bold text-phoenix-flame animate-pulse-soft">
        Phoenix is rising…
      </div>
    </main>
  );
}
