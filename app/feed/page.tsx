import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });
}

export default async function FeedPage() {
  const posts = await getPosts();

  return (
    <main className="container space-y-8 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Community Feed</h1>
        <p className="text-muted-foreground">
          See what fellow travelers are sharing about their latest adventures.
        </p>
      </header>
      <section className="grid gap-6">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Be the first to share your journey!</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="space-y-3 rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>By {post.author?.name ?? "Anonymous"}</span>
                <time dateTime={post.createdAt.toISOString()}>
                  {post.createdAt.toLocaleDateString()}
                </time>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
              {post.imageUrl ? (
                <div className="overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrl} alt={post.title} className="h-60 w-full object-cover" />
                </div>
              ) : null}
              {post.content ? <p className="text-base text-muted-foreground">{post.content}</p> : null}
              <Link className="text-sm font-medium text-primary" href={`mailto:${post.author?.email ?? ""}`}>
                Connect with {post.author?.name ?? "this traveler"}
              </Link>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
