import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { title, content, imageUrl, authorId } = body;

  if (!title || !authorId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      imageUrl,
      authorId
    }
  });

  return NextResponse.json(post, { status: 201 });
}
