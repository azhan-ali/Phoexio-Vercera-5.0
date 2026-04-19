import Link from "next/link";
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
        <div>
          <div className="font-scribble font-bold text-xl mb-2">Suites</div>
          <ul className="space-y-1 font-hand text-ink-soft">
            <li><Link href="/fashion" className="hover:text-phoenix-flame">Fashion & Style</Link></li>
            <li><Link href="/food" className="hover:text-phoenix-flame">Food & Nutrition</Link></li>
            <li><Link href="/mental-health" className="hover:text-phoenix-flame">Mental Health</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-scribble font-bold text-xl mb-2">Info</div>
          <ul className="space-y-1 font-hand text-ink-soft">
            <li><Link href="/#how" className="hover:text-phoenix-flame">How it works</Link></li>
            <li><Link href="/#love" className="hover:text-phoenix-flame">Testimonials</Link></li>
            <li><a href="https://x.ai" target="_blank" rel="noreferrer" className="hover:text-phoenix-flame">Powered by Grok</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center font-note text-sm text-ink-faded">
        © {new Date().getFullYear()} Phoenix · made with <span className="text-phoenix-flame">♥</span> for the hackathon
      </div>
    </footer>
  );
}
