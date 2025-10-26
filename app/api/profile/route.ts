import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const travelers = await prisma.user.findMany({
    select: {
      id: true,
      handle: true,
      name: true,
      image: true,
      bio: true,
      createdAt: true,
      _count: { select: { posts: true, savedPosts: true, likes: true, ornaments: true } },
    },
  });

  const leaderboard = travelers
    .map((traveler) => {
      const influence = traveler._count.posts * 2 + traveler._count.likes + traveler._count.savedPosts;
      const rarity = traveler._count.ornaments;

      return {
        id: traveler.id,
        handle: traveler.handle,
        name: traveler.name,
        image: traveler.image,
        bio: traveler.bio,
        createdAt: traveler.createdAt.toISOString(),
        stats: {
          posts: traveler._count.posts,
          likes: traveler._count.likes,
          saves: traveler._count.savedPosts,
          ornaments: traveler._count.ornaments,
          score: influence + rarity * 5,
        },
      };
    })
    .sort((a, b) => b.stats.score - a.stats.score);

  return NextResponse.json(leaderboard);
}
