import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 20;

export async function GET(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get("authorId") ?? undefined;
  const authorHandle = searchParams.get("handle") ?? undefined;
  const placeId = searchParams.get("placeId") ?? undefined;
  const limit = Math.min(
    Math.max(parseInt(searchParams.get("limit") ?? `${DEFAULT_LIMIT}`, 10) || DEFAULT_LIMIT, 1),
    60,
  );

  const posts = await prisma.post.findMany({
    where: {
      ...(authorId ? { authorId } : {}),
      ...(placeId ? { placeId } : {}),
      ...(authorHandle ? { author: { handle: authorHandle } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      author: { select: { id: true, handle: true, name: true, image: true } },
      place: { select: { id: true, slug: true, name: true, coverUrl: true } },
      _count: { select: { likes: true, comments: true, saves: true } },
    },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body.authorId !== "string") {
    return NextResponse.json({ error: "authorId is required" }, { status: 400 });
  }

  const imageUrls = Array.isArray(body.imageUrls)
    ? body.imageUrls.filter((url: unknown): url is string => typeof url === "string" && url.length > 0)
    : [];

  if (imageUrls.length === 0) {
    return NextResponse.json({ error: "At least one imageUrl is required" }, { status: 400 });
  }

  const placeRelation =
    typeof body.placeId === "string"
      ? { connect: { id: body.placeId } }
      : typeof body.placeSlug === "string"
        ? { connect: { slug: body.placeSlug } }
        : undefined;

  const post = await prisma.post.create({
    data: {
      author: { connect: { id: body.authorId } },
      title: typeof body.title === "string" ? body.title : null,
      content: typeof body.content === "string" ? body.content : null,
      imageUrls,
      visibility: body.visibility && ["PUBLIC", "PRIVATE", "UNLISTED"].includes(body.visibility)
        ? body.visibility
        : undefined,
      place: placeRelation,
    },
    include: {
      author: { select: { id: true, handle: true, name: true, image: true } },
      place: { select: { id: true, slug: true, name: true, coverUrl: true } },
      _count: { select: { likes: true, comments: true, saves: true } },
    },
  });

  return NextResponse.json(post, { status: 201 });
}
