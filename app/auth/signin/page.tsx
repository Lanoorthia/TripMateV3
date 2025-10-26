import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/options";
import { SignInButtons } from "@/components/auth/sign-in-buttons";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/feed");
  }

  const providerIds = (authOptions.providers ?? []).map((provider) => provider.id);
  const googleEnabled = providerIds.includes("google");
  const emailEnabled = providerIds.includes("email");

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-6 py-16">
      <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-center">Sign in to TripMate</h1>
        <p className="text-center text-sm text-muted-foreground">
          Choose your preferred method to join the TripMate community.
        </p>
        <SignInButtons emailEnabled={emailEnabled} googleEnabled={googleEnabled} />
      </div>
      <Link className="text-sm font-medium text-primary" href="/">
        ← Back to home
      </Link>
    </main>
  );
}
