"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FeedbackFormState {
  email: string;
  message: string;
  rating: number;
}

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function FeedbackForm() {
  const [formState, setFormState] = useState<FeedbackFormState>({
    email: "",
    message: "",
    rating: 5
  });
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email || undefined,
          message: formState.message,
          rating: formState.rating
        })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error ?? "Unable to submit feedback");
      }

      setStatus("success");
      setFormState({ email: "", message: "", rating: 5 });
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Unexpected error");
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="email">
          Email (optional)
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="traveler@email.com"
          value={formState.email}
          onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="rating">
          Rating
        </label>
        <Input
          id="rating"
          type="number"
          min={1}
          max={5}
          value={formState.rating}
          onChange={(event) =>
            setFormState((state) => ({ ...state, rating: Number(event.target.value) || 1 }))
          }
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="message">
          Feedback
        </label>
        <Textarea
          id="message"
          placeholder="Share your ideas for making TripMate unforgettable..."
          value={formState.message}
          onChange={(event) => setFormState((state) => ({ ...state, message: event.target.value }))}
          required
        />
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Send feedback"}
      </Button>
      {status === "success" ? (
        <p className="text-sm text-green-600">Thanks for helping shape the TripMate experience!</p>
      ) : null}
      {status === "error" && errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </form>
  );
}
