import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

export async function GET(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? undefined;
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") ?? `${DEFAULT_LIMIT}`, 10) || DEFAULT_LIMIT, 1),
    MAX_LIMIT,
  );

  const posts = await prisma.post.findMany({
    take: limit + 1,
    orderBy: { createdAt: "desc" },
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    include: {
      author: { select: { id: true, handle: true, name: true, image: true } },
      place: { select: { id: true, slug: true, name: true, coverUrl: true } },
      _count: { select: { likes: true, comments: true, saves: true } },
    },
  });

  let nextCursor: string | undefined;
  if (posts.length > limit) {
    const nextItem = posts.pop();
    nextCursor = nextItem?.id;
  }

  return NextResponse.json({ items: posts, nextCursor });
}
