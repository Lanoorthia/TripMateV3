import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { formatDate, formatNumber } from "@/lib/utils";

interface ProfilePageProps {
  params: { handle: string };
}

async function getProfile(handle: string) {
  if (!prisma) {
    return { offline: true as const, profile: null };
  }

  const profile = await prisma.user.findUnique({
    where: { handle },
    include: {
      ornaments: {
        include: { ornament: true },
        orderBy: { obtainedAt: "desc" },
      },
      posts: {
        orderBy: { createdAt: "desc" },
        take: 9,
        include: {
          place: { select: { slug: true, name: true } },
        },
      },
      savedPosts: {
        take: 6,
        include: {
          post: {
            select: {
              id: true,
              title: true,
              imageUrls: true,
              place: { select: { slug: true, name: true } },
            },
          },
        },
      },
      _count: { select: { posts: true, savedPosts: true, likes: true, ornaments: true } },
    },
  });

  return { offline: false as const, profile };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const result = await getProfile(params.handle);

  if (result.offline) {
    return (
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold">Profiles are offline</h1>
        <p className="text-muted-foreground">
          Configure <code>DATABASE_URL</code> to enable profile pages. Once Prisma can connect, handles resolve automatically
          after authentication.
        </p>
      </section>
    );
  }

  const profile = result.profile;

  if (!profile) {
    return notFound();
  }

  const equippedOrnaments = profile.ornaments.filter((ornament) => ornament.equipped);

  return (
    <section className="space-y-10">
      <header className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border bg-card/70 p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Traveler profile</p>
          <h1 className="text-3xl font-semibold">@{profile.handle}</h1>
          <p className="text-muted-foreground">{profile.bio ?? "Add a short bio to share your travel style."}</p>
          <dl className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div>
              <dt className="font-medium text-foreground">Posts</dt>
              <dd>{formatNumber(profile._count.posts)}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Saves</dt>
              <dd>{formatNumber(profile._count.savedPosts)}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Likes</dt>
              <dd>{formatNumber(profile._count.likes)}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Ornaments</dt>
              <dd>{formatNumber(profile._count.ornaments)}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-col items-end gap-3">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Member since {formatDate(profile.createdAt)}
          </span>
          <div className="flex flex-wrap justify-end gap-2 text-sm text-muted-foreground">
            {equippedOrnaments.length > 0 ? (
              equippedOrnaments.map((ornament) => (
                <span key={ornament.id} className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1">
                  <span className="text-lg">{ornament.ornament.icon}</span>
                  <span>{ornament.ornament.name}</span>
                </span>
              ))
            ) : (
              <span>No ornaments equipped yet.</span>
            )}
          </div>
        </div>
      </header>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent posts</h2>
          <span className="text-sm text-muted-foreground">{formatNumber(profile.posts.length)} shared</span>
        </div>
        {profile.posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Create one from the compose page.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.posts.map((post) => (
              <article key={post.id} className="space-y-3 rounded-3xl border bg-card/60 p-4 shadow-sm">
                <div className="overflow-hidden rounded-2xl border bg-muted/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.imageUrls[0] ?? ""} alt={post.title ?? "TripMate post"} className="aspect-[4/5] w-full object-cover" />
                </div>
                {post.title ? <h3 className="text-lg font-semibold">{post.title}</h3> : null}
                {post.place ? (
                  <Link href={`/places/${post.place.slug}`} className="text-sm font-medium text-primary">
                    {post.place.name}
                  </Link>
                ) : null}
                <time dateTime={post.createdAt.toISOString()} className="text-xs text-muted-foreground">
                  {formatDate(post.createdAt)}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Saved posts</h2>
          <span className="text-sm text-muted-foreground">{formatNumber(profile.savedPosts.length)} favorites</span>
        </div>
        {profile.savedPosts.length === 0 ? (
          <p className="text-muted-foreground">No saves yet. Tap the bookmark icon on any post to curate favorites.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {profile.savedPosts.map((save) => (
              <Link
                href={`/feed#${save.post.id}`}
                key={save.id}
                className="group overflow-hidden rounded-2xl border bg-card/60"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={save.post.imageUrls[0] ?? ""}
                  alt={save.post.title ?? "Saved post"}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-3 text-xs text-muted-foreground">
                  <p className="line-clamp-2 text-sm font-medium text-foreground">{save.post.title ?? "Untitled"}</p>
                  {save.post.place ? <span>{save.post.place.name}</span> : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
