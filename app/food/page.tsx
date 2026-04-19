import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHero from "@/components/layout/SectionHero";
import FeatureTile from "@/components/layout/FeatureTile";
import SketchHeading from "@/components/sketch/SketchHeading";
import { Utensils, Camera, Scale, Sparkles } from "lucide-react";

const features = [
  {
    href: "/food/fridge-scanner",
    title: "Fridge-to-Recipe AI",
    tagline: "ek photo, 3 recipes",
    description:
      "Fridge ki ek photo kheecho — AI Vision andar sabko identify karega (tamatar, pyaaz, paneer, etc.) aur 3 Indian recipes suggest karega.",
    Icon: Camera,
    bullets: ["Auto-detect ingredients", "Indian recipes priority", "Step-by-step cook guide"],
    bg: "bg-sketch-green/25",
    tilt: "left" as const,
    tape: true,
  },
  {
    href: "/food/meal-planner",
    title: "Indian Body-Type Meal Planner",
    tagline: "tailored for you",
    description:
      "Apna body type aur goal batao — weekly meal plan with Indian ingredients, macros balanced, festival-friendly swaps.",
    Icon: Scale,
    bullets: ["Ectomorph / Mesomorph / Endomorph", "7-day plans", "Regional variations"],
    bg: "bg-phoenix-gold/25",
    tilt: "right" as const,
  },
  {
    href: "/food/nuskha",
    title: "Dadi-Nani Ke Nuskhe",
    tagline: "ghar ka desi gyaan",
    description:
      "Koi bhi problem batao — cold, acidity, hair fall, immunity — AI traditional Indian home remedies suggest karega, verified ingredients ke saath.",
    Icon: Sparkles,
    bullets: ["Time-tested remedies", "Safe ingredient checks", "Ayurvedic context"],
    bg: "bg-sketch-yellow/25",
    tilt: "left" as const,
  },
];

export default function FoodPage() {
  return (
    <main className="px-4 md:px-8 max-w-7xl mx-auto">
      <Navbar />

      <SectionHero
        eyebrow="Food & Nutrition Suite"
        title="Eat like a"
        highlight="desi genius"
        subtitle="Fridge se recipe, body-type meals, aur dadi ke traditional nuskhe — AI ke saath. 'Aaj kya banau?' ka jawab yaha hai."
        Icon={Utensils}
        accentColor="bg-sketch-green/40"
        doodleColors={["#52b788", "#f77f00", "#fcbf49", "#e63946"]}
      />

      <section className="pb-10">
        <div className="text-center mb-6">
          <div className="font-hand text-phoenix-flame text-lg">// 3 features</div>
          <SketchHeading as="h2" underline className="!text-3xl md:!text-4xl">
            What's cooking
          </SketchHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureTile key={f.href} {...f} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
