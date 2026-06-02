import { getTodayCard } from "@/lib/kv";
import StarField from "@/components/StarField";
import WordCard from "@/components/WordCard";
import PixSection from "@/components/PixSection";

export const revalidate = 3600; // revalida de hora em hora; n8n atualiza o KV

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
      className="relative min-h-screen flex flex-col items-center justify-start px-4 py-16"
      style={{ background: "#0a0a0f" }}
    >
      <StarField />

      <header className="relative z-10 text-center mb-10">
        <h1
          className="font-display tracking-widest uppercase mb-1"
          style={{
            color: "#d4af37",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
            fontWeight: 300,
            letterSpacing: "0.25em",
          }}
        >
          Peniel
        </h1>
        <p
          className="font-body text-xs tracking-[0.3em] uppercase"
          style={{ color: "#4a4538" }}
        >
          {today}
        </p>
      </header>

      <div className="relative z-10 w-full max-w-xl">
        <WordCard card={card} />
        {pixKey && <PixSection pixKey={pixKey} />}
      </div>

      <footer className="relative z-10 mt-12 text-center">
        <p className="font-body text-xs" style={{ color: "#2a2520" }}>
          Palavra renovada a cada amanhecer · peniel.faith
        </p>
      </footer>
    </main>
  );
}
