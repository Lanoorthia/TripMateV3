import { prisma } from "@/lib/prisma";

async function getPlaces() {
  return prisma.place.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      creator: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
}

export default async function PlacesPage() {
  const places = await getPlaces();

  return (
    <main className="container space-y-8 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Curated Places</h1>
        <p className="text-muted-foreground">
          Discover trending destinations shared by the TripMate community.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        {places.length === 0 ? (
          <p className="text-muted-foreground">No places added yet. Start by creating one!</p>
        ) : (
          places.map((place) => (
            <article key={place.id} className="space-y-3 rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Shared by {place.creator?.name ?? "Anonymous"}</span>
                <time dateTime={place.createdAt.toISOString()}>{place.createdAt.toLocaleDateString()}</time>
              </div>
              <h2 className="text-2xl font-semibold text-foreground">{place.name}</h2>
              <p className="text-sm font-medium text-primary">{place.location}</p>
              {place.imageUrl ? (
                <div className="overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={place.imageUrl} alt={place.name} className="h-52 w-full object-cover" />
                </div>
              ) : null}
              {place.description ? (
                <p className="text-muted-foreground">{place.description}</p>
              ) : null}
            </article>
          ))
        )}
      </section>
    </main>
  );
}
