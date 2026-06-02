import { getDailyWord } from "@/lib/getWord";
import StarField from "@/components/StarField";
import WordCard from "@/components/WordCard";
import PixSection from "@/components/PixSection";

export const revalidate = 86400;

export default async function Home() {
  const word = await getDailyWord();
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY ?? "";

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-start px-4 py-16"
      style={{ background: "#0a0a0f" }}
    >
      <StarField />

      {/* Header */}
      <header className="relative z-10 text-center mb-10">
        <h1
          className="font-display tracking-widest uppercase mb-1"
          style={{ color: "#d4af37", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 300, letterSpacing: "0.25em" }}
        >
          Peniel
        </h1>
        <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: "#4a4538" }}>
          {today}
        </p>
      </header>

      {/* Palavra do dia */}
      <div className="relative z-10 w-full max-w-xl">
        <WordCard word={word} />

        {pixKey && <PixSection pixKey={pixKey} />}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-center">
        <p className="font-body text-xs" style={{ color: "#2a2520" }}>
          Palavra renovada a cada amanhecer · peniel.faith
        </p>
      </footer>
    </main>
  );
}
