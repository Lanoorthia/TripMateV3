import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold">Welcome to TripMate</h1>
      <p className="max-w-2xl text-muted-foreground">
        Discover, share, and plan your next adventure with friends and fellow explorers.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/feed">Explore Feed</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/places">Find Places</Link>
        </Button>
      </div>
    </main>
  );
}
