import { get } from "@vercel/edge-config";

export interface DailyCard {
  palavra: string;
  versiculo: string;
  referencia: string;
  reflexao: string;
  imageUrl: string;
  imagePrompt: string;
  date: string;
}

const KEY = "daily_card";

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
    const card = await get<DailyCard>(KEY);
    return card ?? FALLBACK;
  } catch {
    return FALLBACK;
  }
}

// Escrita via REST API da Vercel (Edge Config é read-only pelo SDK)
export async function setTodayCard(card: DailyCard): Promise<void> {
  const edgeConfigId = process.env.EDGE_CONFIG_ID!;
  const vercelToken = process.env.VERCEL_API_TOKEN!;

  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${edgeConfigId}/items`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "upsert", key: KEY, value: card }],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Edge Config write failed: ${err}`);
  }
}
