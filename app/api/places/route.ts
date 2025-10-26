import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const places = await prisma.place.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });

  return NextResponse.json(places);
}

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { name, description, location, imageUrl, creatorId } = body;

  if (!name || !location || !creatorId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const place = await prisma.place.create({
    data: {
      name,
      description,
      location,
      imageUrl,
      creatorId
    }
  });

  return NextResponse.json(place, { status: 201 });
}
