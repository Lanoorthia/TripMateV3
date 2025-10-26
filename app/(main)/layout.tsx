import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/feed", label: "Feed" },
  { href: "/places", label: "Places" },
  { href: "/compose", label: "Compose" },
  { href: "/profile", label: "Profile" },
  { href: "/admin", label: "Admin" },
];

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            TripMate
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn("rounded-full px-3 py-1 transition-colors hover:bg-primary/10 hover:text-primary")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button asChild size="sm">
            <Link href="/feedback">Send feedback</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
