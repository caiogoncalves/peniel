import { NextRequest, NextResponse } from "next/server";
import { setTodayCard, type DailyCard } from "@/lib/kv";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.INTERNAL_API_SECRET}`;

  if (!auth || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const card = body as Partial<DailyCard>;
  const required: (keyof DailyCard)[] = [
    "palavra",
    "versiculo",
    "referencia",
    "reflexao",
    "imageUrl",
  ];

  for (const field of required) {
    if (!card[field]) {
      return NextResponse.json(
        { error: `Missing field: ${field}` },
        { status: 400 }
      );
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  await setTodayCard({ ...(card as DailyCard), date: today });

  return NextResponse.json({ ok: true, date: today });
}
