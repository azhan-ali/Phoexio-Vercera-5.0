import type { Metadata } from "next";
import { Kalam, Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import SketchSVGDefs from "@/components/sketch/SketchSVGDefs";
import AnimatedBackground from "@/components/landing/AnimatedBackground";
import CustomCursor from "@/components/sketch/CustomCursor";

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-patrick",
});

export const metadata: Metadata = {
  title: {
    default: "Phoenix — Rebirth Yourself",
    template: "%s · Phoenix",
  },
  description:
    "Your AI companion for fashion, food & mental wellness — sketched with love, powered by Phoenix AI. Fridge-to-recipe, outfit analyzer, mood journal, and more.",
  keywords: [
    "AI fashion",
    "fridge to recipe",
    "mental health AI",
    "Indian nutrition",
    "Phoenix AI",
    "hand-drawn UI",
    "lifestyle AI",
  ],
  authors: [{ name: "Phoenix Team" }],
  openGraph: {
    title: "Phoenix | AI Companion",
    description:
      "AI companion for fashion, food & mental wellness. Sketched with love, powered by Phoenix AI.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phoenix — Rebirth Yourself",
    description:
      "AI companion for fashion, food & mental wellness. Sketched with love, powered by Phoenix AI.",
  },
  icons: {
    icon: "/phoenix-logo.jpg",
    shortcut: "/phoenix-logo.jpg",
    apple: "/phoenix-logo.jpg",
  },
};

export const viewport = {
  themeColor: "#f7f1e3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kalam.variable} ${caveat.variable} ${patrick.variable} paper-bg antialiased min-h-screen`}
      >
        <CustomCursor />
        <SketchSVGDefs />
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
