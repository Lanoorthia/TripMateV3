import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ComposePage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Compose a post</h1>
        <p className="text-muted-foreground">
          Upload vertical imagery, write captions, and attach locations. Media uploads and publishing integrate with Supabase
          Storage and Prisma mutations via the posts API.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-5 rounded-3xl border bg-card/70 p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              placeholder="Sunrise at the alpine ridge"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="content">
              Caption
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              placeholder="Share the story behind this adventure..."
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="place">
              Place slug
            </label>
            <input
              id="place"
              name="place"
              placeholder="chiang-mai-night-market"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="images">
              Upload vertical images (4:5)
            </label>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="w-full cursor-pointer rounded-2xl border border-dashed border-border bg-background px-4 py-10 text-center text-sm"
            />
          </div>
          <Button type="submit" className="w-full" disabled>
            Publishing is configured via /api/posts
          </Button>
        </form>
        <aside className="space-y-4 rounded-3xl border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold">How publishing works</h2>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>
              1. Upload media to Supabase Storage or R2 via a signed URL, keeping portrait ratio for the vertical feed.
            </li>
            <li>2. Call <code className="rounded bg-background px-1">POST /api/posts</code> with the image URLs, caption, and place.</li>
            <li>3. The feed automatically renders new posts in descending order.</li>
          </ol>
          <Button asChild variant="outline" size="sm">
            <Link href="/api/posts">View posts API</Link>
          </Button>
        </aside>
      </div>
    </section>
  );
}
