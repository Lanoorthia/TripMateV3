import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const feedback = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });

  const serialized = feedback.map((entry) => ({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString()
  }));

  return NextResponse.json(serialized);
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body.message !== "string" || body.message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const rating =
    typeof body.rating === "number"
      ? Math.min(5, Math.max(1, Math.round(body.rating)))
      : undefined;

  const feedback = await prisma.feedback.create({
    data: {
      message: body.message.trim(),
      rating,
      email: typeof body.email === "string" ? body.email : undefined,
      userId: typeof body.userId === "string" ? body.userId : undefined
    }
  });

  return NextResponse.json(
    {
      ...feedback,
      createdAt: feedback.createdAt.toISOString(),
      updatedAt: feedback.updatedAt.toISOString()
    },
    { status: 201 }
  );
}
