import { getTodayCard } from "@/lib/kv";
import StarField from "@/components/StarField";
import WordCard from "@/components/WordCard";
import PixSection from "@/components/PixSection";

export const revalidate = 3600;

export default async function Home() {
  const card = await getTodayCard();
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY ?? "";

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <main
      className="relative min-h-screen flex flex-col items-center px-4 py-8"
      style={{ background: "#0a0a0f" }}
    >
      <StarField />

      {/* Header compacto */}
      <header className="relative z-10 text-center mb-5 w-full max-w-lg">
        <h1
          className="font-display tracking-widest uppercase"
          style={{
            color: "#d4af37",
            fontSize: "clamp(2rem, 8vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.25em",
            lineHeight: 1.1,
          }}
        >
          Peniel
        </h1>
        <p className="font-body text-xs tracking-[0.3em] uppercase mt-1" style={{ color: "#4a4538" }}>
          {today}
        </p>
      </header>

      {/* Card principal — ocupa toda a largura disponível até max-w-lg */}
      <div className="relative z-10 w-full max-w-lg flex flex-col gap-3">
        <WordCard card={card} />
        {pixKey && <PixSection pixKey={pixKey} />}
      </div>

      <footer className="relative z-10 mt-6 text-center">
        <p className="font-body text-xs" style={{ color: "#1e1a15" }}>
          Palavra renovada a cada amanhecer · peniel.faith
        </p>
      </footer>
    </main>
  );
}
