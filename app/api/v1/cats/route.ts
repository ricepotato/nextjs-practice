import { CatsApi } from "@/lib/cats-api";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 5;
  const page = searchParams.get("page") || 1;
  const data = await getData(Number(limit), Number(page));
  return NextResponse.json({ ...data });
}

async function getData(limit: number, page: number) {
  const cats = await CatsApi.getCats({ limit, page });
  const date = new Date();

  return {
    date,
    cats,
  };
}
