import { NextResponse } from "next/server";
import { listProducts, searchProducts } from "@/app/prisma-db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  const data = q ? searchProducts(q) : listProducts();
  return NextResponse.json({ data });
}
