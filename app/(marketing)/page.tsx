import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center gap-12 px-6 py-16 text-balance">
      <section className="space-y-6 text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Social travel lifestyle for explorers
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Discover, plan, and celebrate every journey with TripMate
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          TripMate blends community stories, curated places, weather insights, and collectible rewards into a single travel hub.
          Plan the next adventure, share vertical highlights, and earn ornaments that show off your explorer style.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/feed">Browse the community feed</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/places">Explore destinations</Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-8 text-left md:grid-cols-3">
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Vertical storytelling</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Share tall photo sets with captions, likes, saves, and comments that feel right at home on mobile.
          </p>
        </article>
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Smart place data</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tag destinations with categories, map coordinates, ratings, and weather warnings before you depart.
          </p>
        </article>
        <article className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Collectible ornaments</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Unlock badges and ornaments for milestones, then decorate your profile to show off your travel personality.
          </p>
        </article>
      </section>
    </main>
  );
}
