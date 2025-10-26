import { FeedbackForm } from "@/components/feedback/feedback-form";

export default function FeedbackPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Share feedback</h1>
        <p className="text-muted-foreground">
          TripMate evolves with traveler input. Submit ideas, report bugs, or request partnerships—every note reaches the core
          team.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border bg-card/70 p-6 shadow-sm">
          <FeedbackForm />
        </div>
        <aside className="space-y-4 rounded-3xl border bg-muted/30 p-6 text-sm text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">What happens next?</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Feedback is stored in PostgreSQL and can trigger Discord or email notifications.</li>
            <li>
              The product roadmap references these submissions each sprint. Expect a response when follow-up details are needed.
            </li>
            <li>Insights power TripMate&apos;s analytics dashboards and inform ornament reward planning.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
