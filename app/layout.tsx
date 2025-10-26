// app/layout.tsx
import "./globals.css";

export const metadata = { title: "TripMate", description: "Social travel with hashtags" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body data-theme="light">
        <header className="container">
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/places">Places</a>
            <a href="/compose">Compose</a>
            <a href="/profile">Profile</a>
            <a href="/tags">#Tags</a>
            <span className="spacer" />
            {/* toggles are client components */}
            <ThemeToggle />
            <LangToggle />
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

// client-only toggles inline to keep single file import-free
"use client";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const next = saved ?? "light";
    document.body.setAttribute("data-theme", next);
    setTheme(next);
  }, []);
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {
        const next = theme === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        setTheme(next);
      }}
      className="toggle"
    >
      {theme === "light" ? "🌞" : "🌙"}
    </button>
  );
}

function LangToggle() {
  const [lang, setLang] = useState<"th" | "en">("th");
  useEffect(() => {
    const saved = (localStorage.getItem("lang") as "th" | "en") ?? "th";
    setLang(saved);
  }, []);
  return (
    <button
      aria-label="Toggle language"
      onClick={() => {
        const next = lang === "th" ? "en" : "th";
        localStorage.setItem("lang", next);
        setLang(next);
        location.reload(); // simplest reload to re-read JSON
      }}
      className="toggle"
    >
      {lang.toUpperCase()}
    </button>
  );
}
