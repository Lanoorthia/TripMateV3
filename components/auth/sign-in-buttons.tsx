"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignInButtonsProps {
  googleEnabled: boolean;
  emailEnabled: boolean;
}

type MessageType = "success" | "error" | null;

export function SignInButtons({ googleEnabled, emailEnabled }: SignInButtonsProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>(null);

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/feed" });
  };

  const handleEmailSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setMessageType(null);

    try {
      const result = await signIn("email", {
        email,
        callbackUrl: "/feed"
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      setMessage("Check your inbox for a magic link to finish signing in.");
      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send magic link.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {googleEnabled ? (
        <Button className="w-full" onClick={handleGoogleSignIn} type="button">
          Continue with Google
        </Button>
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google sign-in.
        </p>
      )}

      {emailEnabled ? (
        <form className="space-y-3" onSubmit={handleEmailSignIn}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending magic link..." : "Send magic link"}
          </Button>
          {message ? (
            <p className={messageType === "success" ? "text-sm text-green-600" : "text-sm text-red-600"}>{message}</p>
          ) : null}
        </form>
      ) : (
        <p className="rounded-lg border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          Email magic links require a configured database adapter and EMAIL_SERVER credentials.
        </p>
      )}
    </div>
  );
}
