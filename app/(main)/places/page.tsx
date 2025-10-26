import Link from "next/link";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";

interface PlacesPageProps {
  searchParams?: Record<string, string | string[]>;
}

const buildWhere = (params: PlacesPageProps["searchParams"]): Prisma.PlaceWhereInput => {
  if (!params) {
    return {};
  }

  const where: Prisma.PlaceWhereInput = {};

  const query = typeof params.query === "string" ? params.query.trim() : "";
  const category = typeof params.category === "string" ? params.category.trim() : "";
  const tagsParam = typeof params.tags === "string" ? params.tags : "";
  const tags = tagsParam
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (query.length > 0) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { tags: { has: query.toLowerCase() } },
    ];
  }

  if (category.length > 0) {
    where.category = { equals: category, mode: "insensitive" } as Prisma.StringFilter;
  }

  if (tags.length > 0) {
    where.tags = { hasSome: tags.map((tag) => tag.toLowerCase()) };
  }

  return where;
};

async function getPlaces(searchParams: PlacesPageProps["searchParams"]) {
  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty place results.");
    return [];
  }

  const where = buildWhere(searchParams);

  const places = await prisma.place.findMany({
    where,
    orderBy: [{ ratingAvg: "desc" }, { createdAt: "desc" }],
    take: 36,
    include: {
      _count: { select: { posts: true } },
    },
  });

  return places;
}

export default async function PlacesPage({ searchParams }: PlacesPageProps) {
  const places = await getPlaces(searchParams);

  const query = typeof searchParams?.query === "string" ? searchParams?.query : "";
  const category = typeof searchParams?.category === "string" ? searchParams?.category : "";
  const tags = typeof searchParams?.tags === "string" ? searchParams?.tags : "";

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Places explorer</h1>
        <p className="text-muted-foreground">
          Filter destinations by category, tags, or search keywords. Each card links to a detail page with weather intel and
          community posts.
        </p>
      </header>
      <form className="grid gap-4 rounded-2xl border bg-card/70 p-4 shadow-sm sm:grid-cols-3">
        <label className="text-sm font-medium text-muted-foreground" htmlFor="query">
          Search
          <input
            id="query"
            name="query"
            defaultValue={query}
            placeholder="mountain retreat, foodie"
            className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="text-sm font-medium text-muted-foreground" htmlFor="category">
          Category
          <input
            id="category"
            name="category"
            defaultValue={category}
            placeholder="Beach, Cafe, City"
            className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="text-sm font-medium text-muted-foreground" htmlFor="tags">
          Tags
          <input
            id="tags"
            name="tags"
            defaultValue={tags}
            placeholder="mountain,coffee,art"
            className="mt-2 w-full rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <div className="sm:col-span-3 flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Update search
          </button>
        </div>
      </form>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {places.length === 0 ? (
          <p className="text-muted-foreground">
            No places match your filters yet. Try adjusting the search or add new highlights from the admin panel.
          </p>
        ) : (
          places.map((place) => (
            <article key={place.id} className="flex flex-col gap-3 rounded-3xl border bg-card/70 p-5 shadow-sm">
              <div className="overflow-hidden rounded-2xl border bg-muted/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={place.coverUrl ?? "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"}
                  alt={place.name}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="uppercase tracking-wide">{place.category}</span>
                  <span>
                    {place.ratingCount > 0
                      ? `${place.ratingAvg.toFixed(1)} · ${formatNumber(place.ratingCount)} reviews`
                      : "New"}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-foreground">{place.name}</h2>
                {place.description ? (
                  <p className="line-clamp-3 text-sm text-muted-foreground">{place.description}</p>
                ) : null}
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {place.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <footer className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatNumber(place._count.posts)} posts</span>
                <Link
                  href={`/places/${place.slug}`}
                  className="rounded-full bg-primary/10 px-4 py-1 font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  View details
                </Link>
              </footer>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
