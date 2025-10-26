import Link from "next/link";

export default function ProfileIndexPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Profiles</h1>
      <p className="text-muted-foreground">
        Visit traveler profiles using the <code>/profile/[handle]</code> route. Handles are generated automatically when users
        authenticate via Google or email.
      </p>
      <div className="space-y-3 rounded-3xl border bg-card/70 p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Seed demo data with Prisma to explore the experience. Example handles might be <code>@wanderlust</code> or
          <code>@city-cafe-lover</code>.
        </p>
        <Link href="/compose" className="text-sm font-medium text-primary">
          Create a post to unlock ornaments and badges →
        </Link>
      </div>
    </section>
  );
}
