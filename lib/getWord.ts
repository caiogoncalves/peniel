import Anthropic from "@anthropic-ai/sdk";

export interface DailyWord {
  palavra: string;
  versiculo: string;
  referencia: string;
  reflexao: string;
}

const FALLBACK: DailyWord = {
  palavra: "Você não está sozinho nessa jornada.",
  versiculo: "O Senhor é o meu pastor; nada me faltará.",
  referencia: "Salmos 23:1",
  reflexao:
    "Há uma presença que caminha ao seu lado mesmo nas horas mais escuras. Permita-se ser amparado. O cuidado divino alcança exatamente onde você está hoje.",
};

export async function getDailyWord(): Promise<DailyWord> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `Hoje é ${today}. Gere uma palavra de afeto e fé para o dia de hoje. Retorne SOMENTE um JSON válido, sem markdown, sem código, sem explicação. Formato: { "palavra": string (frase curta de afeto, máximo 2 linhas), "versiculo": string (versículo bíblico relacionado, texto completo), "referencia": string (ex: Salmos 91:1), "reflexao": string (2-3 frases de conforto espiritual) }. Tom: acolhedor, confortante, para quem está sofrendo.`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    if (!json) return FALLBACK;

    const parsed = JSON.parse(json) as DailyWord;
    return parsed;
  } catch {
    return FALLBACK;
  }
}
