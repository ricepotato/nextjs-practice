import { getCats } from "@/lib/cats-api";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 5;
  const data = await getData(Number(limit));
  return NextResponse.json({ ...data });
}

async function getData(limit: number) {
  const cats = await getCats({ limit });
  const date = new Date();

  return {
    date,
    cats,
  };
}
