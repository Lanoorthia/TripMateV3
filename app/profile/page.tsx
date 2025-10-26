import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getTopTravelers() {
  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty traveler list.");
    return [];
  }

  const travelers = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          posts: true,
          places: true,
          feedback: true
        }
      }
    }
  });

  return travelers.sort((a, b) => {
    const scoreA = a._count.posts + a._count.places + a._count.feedback;
    const scoreB = b._count.posts + b._count.places + b._count.feedback;
    return scoreB - scoreA;
  });
}

const highlightBadges = [
  {
    title: "Globetrotter",
    description: "Visited 10+ countries and shared in-depth guides with the community."
  },
  {
    title: "Foodie Explorer",
    description: "Known for scouting the best local eats and tasty discoveries."
  },
  {
    title: "Sunset Chaser",
    description: "Captured the most breathtaking golden-hour photos around the world."
  }
];

export default async function ProfilePage() {
  const travelers = await getTopTravelers();

  return (
    <main className="container space-y-10 py-10">
      <section className="rounded-3xl border border-border bg-gradient-to-r from-sky-100 via-purple-100 to-pink-100 p-10 shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">Meet the TripMate trailblazers</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700">
          Celebrate the community members inspiring others to explore further. Track contributions, unlock themed badges, and
          curate a profile that reflects your travel personality.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Traveler leaderboard</h2>
            <p className="text-sm text-muted-foreground">
              Activity scores combine shared posts, curated places, and helpful feedback.
            </p>
          </div>
          <div className="grid gap-4">
            {travelers.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Profiles will appear once your database is connected and users sign in.
              </p>
            ) : (
              travelers.map((traveler) => {
                const score = traveler._count.posts + traveler._count.places + traveler._count.feedback;

                return (
                  <article key={traveler.id} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{traveler.name ?? "Wanderer"}</h3>
                        <p className="text-sm text-muted-foreground">
                          Joined {traveler.createdAt.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">{score} pts</span>
                    </div>
                    <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                      <div className="rounded-lg bg-muted p-3">
                        <dt className="text-xs uppercase text-muted-foreground">Posts</dt>
                        <dd className="text-lg font-semibold">{traveler._count.posts}</dd>
                      </div>
                      <div className="rounded-lg bg-muted p-3">
                        <dt className="text-xs uppercase text-muted-foreground">Places</dt>
                        <dd className="text-lg font-semibold">{traveler._count.places}</dd>
                      </div>
                      <div className="rounded-lg bg-muted p-3">
                        <dt className="text-xs uppercase text-muted-foreground">Feedback</dt>
                        <dd className="text-lg font-semibold">{traveler._count.feedback}</dd>
                      </div>
                    </dl>
                  </article>
                );
              })
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Badge inspiration</h2>
            <p className="text-sm text-muted-foreground">
              Reward explorers for their unique travel styles with collectible badges.
            </p>
          </div>
          <div className="grid gap-4">
            {highlightBadges.map((badge) => (
              <article key={badge.title} className="rounded-xl border border-border bg-background p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
