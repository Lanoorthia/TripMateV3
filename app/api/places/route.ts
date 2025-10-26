import type { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 24;

const buildWhere = (params: URLSearchParams): Prisma.PlaceWhereInput => {
  const where: Prisma.PlaceWhereInput = {};

  const query = params.get("query")?.trim() ?? "";
  const category = params.get("category")?.trim() ?? "";
  const tagsParam = params.get("tags")?.trim() ?? "";
  const tags = tagsParam
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => tag.toLowerCase());

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { tags: { has: query.toLowerCase() } },
    ];
  }

  if (category) {
    where.category = { equals: category, mode: "insensitive" } as Prisma.StringFilter;
  }

  if (tags.length > 0) {
    where.tags = { hasSome: tags };
  }

  return where;
};

export async function GET(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const where = buildWhere(searchParams);
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") ?? `${DEFAULT_LIMIT}`, 10) || DEFAULT_LIMIT, 1),
    60,
  );

  const near = searchParams.get("near");
  const [latString, lngString] = near ? near.split(",") : [];
  const lat = latString ? Number.parseFloat(latString) : undefined;
  const lng = lngString ? Number.parseFloat(lngString) : undefined;

  const places = await prisma.place.findMany({
    where,
    take: limit,
    orderBy: [{ ratingAvg: "desc" }, { createdAt: "desc" }],
    include: {
      _count: { select: { posts: true } },
    },
  });

  let items = places;

  if (typeof lat === "number" && !Number.isNaN(lat) && typeof lng === "number" && !Number.isNaN(lng)) {
    items = [...places].sort((a, b) => {
      const distanceA = Math.hypot(a.lat - lat, a.lng - lng);
      const distanceB = Math.hypot(b.lat - lat, b.lng - lng);
      return distanceA - distanceB;
    });
  }

  return NextResponse.json({ items });
}
