import { NextResponse } from "next/server";
import { getDailyWord } from "@/lib/getWord";

export const revalidate = 86400;

export async function GET() {
  const word = await getDailyWord();
  return NextResponse.json(word);
}
