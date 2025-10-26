import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface PostRouteContext {
  params: { id: string };
}

export async function PATCH(request: NextRequest, context: PostRouteContext) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = context.params;
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const imageUrls = Array.isArray(body.imageUrls)
    ? body.imageUrls.filter((url: unknown): url is string => typeof url === "string" && url.length > 0)
    : undefined;

  const placeRelation =
    body.placeId === null
      ? { disconnect: true }
      : typeof body.placeId === "string"
        ? { connect: { id: body.placeId } }
        : typeof body.placeSlug === "string"
          ? { connect: { slug: body.placeSlug } }
          : undefined;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: typeof body.title === "string" ? body.title : undefined,
        content: typeof body.content === "string" ? body.content : undefined,
        visibility: body.visibility && ["PUBLIC", "PRIVATE", "UNLISTED"].includes(body.visibility)
          ? body.visibility
          : undefined,
        imageUrls,
        place: placeRelation,
      },
      include: {
        author: { select: { id: true, handle: true, name: true, image: true } },
        place: { select: { id: true, slug: true, name: true, coverUrl: true } },
        _count: { select: { likes: true, comments: true, saves: true } },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    throw error;
  }
}

export async function DELETE(_: NextRequest, context: PostRouteContext) {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { id } = context.params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    throw error;
  }
}
