"use client";

import type { DailyWord } from "@/lib/getWord";

interface Props {
  word: DailyWord;
}

export default function WordCard({ word }: Props) {
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ *Palavra do Dia — Peniel*\n\n"${word.palavra}"\n\n_"${word.versiculo}"_\n— ${word.referencia}\n\n${word.reflexao}\n\n🙏 peniel.faith`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="animate-float-up w-full max-w-xl mx-auto">
      {/* Card principal */}
      <div
        className="relative rounded-2xl p-8 md:p-10 gold-border gold-glow"
        style={{ background: "rgba(15, 14, 23, 0.85)", backdropFilter: "blur(12px)" }}
      >
        {/* Ornamento topo */}
        <div className="flex items-center justify-center mb-6 gap-3">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, #d4af37)" }} />
          <span style={{ color: "#d4af37", fontSize: "1.2rem" }}>✦</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, #d4af37)" }} />
        </div>

        {/* Palavra principal */}
        <p
          className="font-display text-center leading-snug mb-6"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#f5ead8", fontWeight: 500, fontStyle: "italic" }}
        >
          &ldquo;{word.palavra}&rdquo;
        </p>

        {/* Versículo */}
        <div
          className="rounded-xl px-6 py-4 mb-6 text-center"
          style={{ background: "rgba(212, 175, 55, 0.06)", borderLeft: "2px solid rgba(212, 175, 55, 0.4)" }}
        >
          <p className="font-display text-lg mb-1" style={{ color: "#e8d5a0", fontStyle: "italic" }}>
            &ldquo;{word.versiculo}&rdquo;
          </p>
          <p className="text-sm font-body" style={{ color: "#d4af37" }}>
            — {word.referencia}
          </p>
        </div>

        {/* Reflexão */}
        <p className="font-body text-base leading-relaxed text-center mb-8" style={{ color: "#b0a898" }}>
          {word.reflexao}
        </p>

        {/* Ornamento base */}
        <div className="flex items-center justify-center mb-8 gap-3">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3))" }} />
          <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.7rem" }}>✦ ✦ ✦</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.3))" }} />
        </div>

        {/* Botão WhatsApp */}
        <button
          onClick={shareOnWhatsApp}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-body font-bold text-sm tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #25d366, #128c7e)",
            color: "white",
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.25)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.847L.057 23.943l6.265-1.643A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.658-.52-5.168-1.424l-.371-.22-3.83 1.004 1.022-3.73-.242-.381A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Compartilhar no WhatsApp
        </button>
      </div>
    </div>
  );
}
