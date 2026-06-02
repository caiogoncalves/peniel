"use client";

import { useState } from "react";

interface Props {
  pixKey: string;
}

export default function PixSection({ pixKey }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="animate-float-up w-full max-w-xl mx-auto mt-6" style={{ animationDelay: "0.3s", opacity: 0 }}>
      <div
        className="rounded-2xl p-6 text-center gold-border"
        style={{ background: "rgba(15, 14, 23, 0.7)", backdropFilter: "blur(8px)" }}
      >
        <p className="font-display text-xl mb-1" style={{ color: "#d4af37" }}>
          Oferta Voluntária
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#7a7060" }}>
          Se essa palavra tocou seu coração, considere uma semente.
        </p>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: copied
              ? "rgba(37, 211, 102, 0.15)"
              : "rgba(212, 175, 55, 0.1)",
            border: `1px solid ${copied ? "rgba(37,211,102,0.4)" : "rgba(212,175,55,0.35)"}`,
            color: copied ? "#25d366" : "#d4af37",
          }}
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Chave copiada!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copiar chave PIX
            </>
          )}
        </button>

        <p className="font-body text-xs mt-3" style={{ color: "#4a4538" }}>
          {pixKey}
        </p>
      </div>
    </div>
  );
}
