import PhoenixLogo from "@/components/brand/PhoenixLogo";
import { Mail, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-10 border-t-[2.5px] border-dashed border-ink/30">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="md:col-span-2">
          <PhoenixLogo size={48} animated={false} showText />
          <p className="font-hand text-ink-faded mt-3 max-w-sm">
            Your AI companion for fashion, food & mental wellness. Sketched with love, powered by
            Grok.
          </p>
          <div className="flex gap-3 mt-4">
            {[Mail, Sparkles, Heart].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 border-[2px] border-ink rounded-full bg-paper-cream hover:bg-phoenix-flame hover:text-paper-cream transition"
                style={{ filter: "url(#sketch-roughen)" }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="font-scribble font-bold text-xl mb-4">Meet the Creators</div>
          <div className="grid grid-cols-2 gap-2">
             <div className="bg-paper-dark border-[1.5px] border-ink p-2 rounded-lg font-hand text-sm shadow-[2px_2px_0px_#1a1a1a] translate-y-1">
                <span className="text-phoenix-flame mr-1">✦</span> Azhan Ali
             </div>
             <div className="bg-paper-dark border-[1.5px] border-ink p-2 rounded-lg font-hand text-sm shadow-[2px_2px_0px_#1a1a1a] -rotate-1">
                <span className="text-sketch-blue mr-1">✦</span> Aarif Khan
             </div>
             <div className="bg-paper-dark border-[1.5px] border-ink p-2 rounded-lg font-hand text-sm shadow-[2px_2px_0px_#1a1a1a] rotate-1">
                <span className="text-sketch-pink mr-1">✦</span> Nabiha Irfan
             </div>
             <div className="bg-paper-dark border-[1.5px] border-ink p-2 rounded-lg font-hand text-sm shadow-[2px_2px_0px_#1a1a1a] -translate-y-1">
                <span className="text-sketch-green mr-1">✦</span> Ameer Hamza
             </div>
          </div>
        </div>
      </div>
      <div className="text-center font-note text-sm text-ink-faded">
        © {new Date().getFullYear()} Phoenix · made with <span className="text-phoenix-flame">♥</span> for the hackathon
      </div>
    </footer>
  );
}
