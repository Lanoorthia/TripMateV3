import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const travelers = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          posts: true,
          places: true,
          feedback: true
        }
      }
    }
  });

  const payload = travelers
    .map((traveler) => {
      const score = traveler._count.posts + traveler._count.places + traveler._count.feedback;

      return {
        id: traveler.id,
        name: traveler.name,
        image: traveler.image,
        createdAt: traveler.createdAt.toISOString(),
        stats: {
          posts: traveler._count.posts,
          places: traveler._count.places,
          feedback: traveler._count.feedback,
          score
        }
      };
    })
    .sort((a, b) => b.stats.score - a.stats.score);

  return NextResponse.json(payload);
}
