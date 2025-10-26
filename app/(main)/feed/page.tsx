import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDate, formatNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getFeed() {
  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty feed.");
    return [];
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
    include: {
      author: { select: { id: true, name: true, image: true, handle: true } },
      place: { select: { id: true, name: true, slug: true, coverUrl: true } },
      _count: { select: { likes: true, comments: true, saves: true } },
    },
  });

  return posts;
}

export default async function FeedPage() {
  const posts = await getFeed();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Community feed</h1>
        <p className="text-muted-foreground">
          Fresh highlights from explorers around the world. Vertical cards are perfect for mobile inspiration.
        </p>
      </header>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Share your first travel story to inspire others.</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="group flex flex-col gap-4 rounded-3xl border bg-card/80 p-4 shadow-sm">
              <div className="overflow-hidden rounded-2xl border bg-muted/20">
                {post.imageUrls.length > 0 ? (
                  <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrls[0] ?? ""}
                      alt={post.title ?? "TripMate post"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center text-sm text-muted-foreground">
                    No image uploaded
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {post.author?.handle ? (
                      <Link href={`/profile/${post.author.handle}`} className="font-medium text-foreground hover:text-primary">
                        @{post.author.handle}
                      </Link>
                    ) : (
                      post.author?.name ?? "Anonymous explorer"
                    )}
                  </span>
                  <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                </div>
                {post.title ? <h2 className="text-lg font-semibold">{post.title}</h2> : null}
                {post.content ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">{post.content}</p>
                ) : null}
                {post.place ? (
                  <Link
                    href={`/places/${post.place.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {post.place.name}
                  </Link>
                ) : null}
                <dl className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{formatNumber(post._count.likes)}</span>
                    <span>likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{formatNumber(post._count.comments)}</span>
                    <span>comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{formatNumber(post._count.saves)}</span>
                    <span>saves</span>
                  </div>
                </dl>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
