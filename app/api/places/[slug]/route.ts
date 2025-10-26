import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface PlaceContext {
  params: { slug: string };
}

export async function GET(_: NextRequest, context: PlaceContext) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const place = await prisma.place.findUnique({
    where: { slug: context.params.slug },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: {
          author: { select: { handle: true, name: true, image: true } },
          _count: { select: { likes: true, comments: true, saves: true } },
        },
      },
      weather: {
        orderBy: { fetchedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!place) {
    return NextResponse.json({ error: "Place not found" }, { status: 404 });
  }

  return NextResponse.json(place);
}
