import { FeedbackForm } from "@/components/feedback/feedback-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getRecentFeedback() {
  if (!prisma) {
    console.warn("DATABASE_URL is not configured. Returning empty feedback list.");
    return [];
  }

  const feedback = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    select: {
      id: true,
      message: true,
      rating: true,
      createdAt: true,
      email: true,
      user: {
        select: {
          name: true
        }
      }
    }
  });

  return feedback;
}

export default async function FeedbackPage() {
  const recentFeedback = await getRecentFeedback();

  return (
    <main className="container grid gap-10 py-10 lg:grid-cols-[2fr_3fr]">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">Share your thoughts</h1>
        <p className="text-muted-foreground">
          Tell us how TripMate can become your favorite social travel companion. Ratings and insights help us prioritize new
          features, destinations, and rewards.
        </p>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <FeedbackForm />
        </div>
      </section>
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Community feedback</h2>
          <p className="text-sm text-muted-foreground">
            Highlights from recent travelers who are shaping the TripMate roadmap.
          </p>
        </div>
        <div className="grid gap-4">
          {recentFeedback.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Feedback will appear here once submissions come in. We&apos;d love to hear from you!
            </p>
          ) : (
            recentFeedback.map((entry) => {
              const rating = entry.rating ?? 0;
              const stars = rating > 0 ? `${"★".repeat(rating)}${"☆".repeat(5 - rating)}` : "No rating";

              return (
                <article key={entry.id} className="space-y-3 rounded-lg border border-border bg-background p-5 shadow-sm">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                    <span>{entry.user?.name ?? entry.email ?? "Anonymous explorer"}</span>
                    <span>{stars}</span>
                  </div>
                  <p className="text-sm text-foreground">{entry.message}</p>
                  <time className="block text-xs text-muted-foreground" dateTime={entry.createdAt.toISOString()}>
                    {entry.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
