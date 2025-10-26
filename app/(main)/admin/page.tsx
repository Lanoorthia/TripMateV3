import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AdminPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Admin control room</h1>
        <p className="text-muted-foreground">
          Manage featured posts, curated places, and ornament rewards. Restrict access with the <code>ADMIN</code> role via
          NextAuth session callbacks.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="space-y-3 rounded-3xl border bg-card/70 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Content highlights</h2>
          <p className="text-sm text-muted-foreground">
            Promote posts to the landing page hero, manage featured destinations, and schedule spotlight campaigns for upcoming
            holidays.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/api/posts">Review posts</Link>
          </Button>
        </article>
        <article className="space-y-3 rounded-3xl border bg-card/70 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Ornaments & rewards</h2>
          <p className="text-sm text-muted-foreground">
            Assign ornaments to travelers, toggle equipped status, and design new badge tiers. Prisma models keep rarity and
            ownership history auditable.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/profile/me">View sample profile</Link>
          </Button>
        </article>
      </div>
      <p className="text-sm text-muted-foreground">
        Implement role-based access by checking <code>session.user.role</code> inside route handlers or server components. Hook
        this dashboard into Sentry and PostHog to monitor publication flows.
      </p>
    </section>
  );
}
