import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { formatDate, formatNumber } from "@/lib/utils";

interface PlacePageProps {
  params: { slug: string };
}

const WEATHER_TTL_HOURS = 3;

type WeatherPayload = {
  weather?: Array<{ description?: string }>;
  main?: { temp?: number; feels_like?: number };
};

async function getPlace(slug: string) {
  if (!prisma) {
    return { offline: true as const, place: null };
  }

  const place = await prisma.place.findUnique({
    where: { slug },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        take: 12,
        include: {
          author: { select: { handle: true, name: true } },
          _count: { select: { likes: true, comments: true, saves: true } },
        },
      },
      weather: {
        orderBy: { fetchedAt: "desc" },
        take: 1,
      },
    },
  });

  return { offline: false as const, place };
}

export default async function PlaceDetailPage({ params }: PlacePageProps) {
  const result = await getPlace(params.slug);

  if (result.offline) {
    return (
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold">Places are offline</h1>
        <p className="text-muted-foreground">
          Configure <code>DATABASE_URL</code> to enable place details. Once Prisma can connect, TripMate can fetch curated
          destinations and weather insights.
        </p>
      </section>
    );
  }

  const place = result.place;

  if (!place) {
    return notFound();
  }

  const weatherEntry = place.weather[0];
  const isWeatherStale = weatherEntry
    ? Date.now() - weatherEntry.fetchedAt.getTime() > WEATHER_TTL_HOURS * 60 * 60 * 1000
    : true;
  const weatherData = (weatherEntry?.payload as WeatherPayload | undefined) ?? null;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="overflow-hidden rounded-3xl border bg-muted/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={place.coverUrl ?? "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80"}
            alt={place.name}
            className="aspect-[16/7] w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">{place.category}</p>
            <h1 className="text-3xl font-semibold">{place.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{formatNumber(place.ratingCount)} reviews</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              {place.ratingCount > 0 ? place.ratingAvg.toFixed(1) : "New"}
            </span>
            <span>
              {place.lat.toFixed(3)}, {place.lng.toFixed(3)}
            </span>
          </div>
        </div>
        {place.description ? (
          <p className="max-w-3xl text-muted-foreground">{place.description}</p>
        ) : null}
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {place.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-wide">
              #{tag}
            </span>
          ))}
        </div>
      </header>
      <section className="space-y-4 rounded-3xl border bg-card/70 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Weather & travel warnings</h2>
          <Link href={`/api/weather?placeId=${place.id}`} className="text-sm font-medium text-primary">
            Refresh snapshot
          </Link>
        </div>
        {weatherData ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 rounded-2xl border bg-background/70 p-4 text-sm">
              <p className="text-muted-foreground">Condition</p>
              <p className="text-lg font-semibold text-foreground">
                {weatherData?.weather?.[0]?.description ?? "Unknown"}
              </p>
              <p className="text-sm text-muted-foreground">
                Updated {weatherEntry ? formatDate(weatherEntry.fetchedAt) : "recently"}
                {isWeatherStale ? " · refresh recommended" : ""}
              </p>
            </div>
            <div className="space-y-1 rounded-2xl border bg-background/70 p-4 text-sm">
              <p className="text-muted-foreground">Temperature</p>
              <p className="text-lg font-semibold text-foreground">
                {weatherData?.main?.temp ? `${Math.round(Number(weatherData.main.temp))}°` : "--"}
              </p>
              <p className="text-sm text-muted-foreground">
                Feels like {weatherData?.main?.feels_like ? `${Math.round(Number(weatherData.main.feels_like))}°` : "--"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Weather data has not been fetched yet. Configure WEATHER_API_KEY and trigger the refresh endpoint above.
          </p>
        )}
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Community posts</h2>
          <span className="text-sm text-muted-foreground">{formatNumber(place.posts.length)} highlights</span>
        </div>
        {place.posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Create a highlight from the compose page.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {place.posts.map((post) => (
              <article key={post.id} className="space-y-3 rounded-2xl border bg-card/60 p-4 shadow-sm">
                <header className="flex items-center justify-between text-xs text-muted-foreground">
                  <Link href={`/profile/${post.author?.handle ?? "unknown"}`} className="font-medium text-foreground">
                    @{post.author?.handle ?? post.author?.name ?? "traveler"}
                  </Link>
                  <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                </header>
                {post.title ? <h3 className="text-lg font-semibold">{post.title}</h3> : null}
                {post.content ? <p className="text-sm text-muted-foreground">{post.content}</p> : null}
                <dl className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{formatNumber(post._count.likes)}</span>
                    <span>likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-foreground">{formatNumber(post._count.comments)}</span>
                    <span>comments</span>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
