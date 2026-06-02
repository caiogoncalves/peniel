import { kv } from "@vercel/kv";

export interface DailyCard {
  palavra: string;
  versiculo: string;
  referencia: string;
  reflexao: string;
  imageUrl: string;
  imagePrompt: string;
  date: string; // YYYY-MM-DD
}

const KV_KEY = "peniel:card:today";

const FALLBACK: DailyCard = {
  palavra: "Você não está sozinho nessa jornada.",
  versiculo: "O Senhor é o meu pastor; nada me faltará.",
  referencia: "Salmos 23:1",
  reflexao:
    "Há uma presença que caminha ao seu lado mesmo nas horas mais escuras. Permita-se ser amparado. O cuidado divino alcança exatamente onde você está hoje.",
  imageUrl: "",
  imagePrompt: "",
  date: new Date().toISOString().slice(0, 10),
};

export async function getTodayCard(): Promise<DailyCard> {
  try {
    const card = await kv.get<DailyCard>(KV_KEY);
    return card ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export async function setTodayCard(card: DailyCard): Promise<void> {
  // Expira em 36h para cobrir delay do cron
  await kv.set(KV_KEY, card, { ex: 60 * 60 * 36 });
}
