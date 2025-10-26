import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-8 py-16 text-center">
      <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
        Social travel lifestyle platform
      </span>
      <h1 className="max-w-3xl text-5xl font-bold leading-tight">
        Discover, document, and celebrate every chapter of your adventures with TripMate.
      </h1>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Explore vertical stories from fellow travelers, curate dream destinations, collect stylish badges, and share feedback
        that shapes the community roadmap.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/feed">Explore Feed</Link>
        </Button>
        <Button variant="secondary" asChild size="lg">
          <Link href="/places">Discover Places</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/profile">Meet Travelers</Link>
        </Button>
        <Button variant="ghost" asChild size="lg">
          <Link href="/feedback">Give Feedback</Link>
        </Button>
      </div>
    </main>
  );
}
