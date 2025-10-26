import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TripMate",
  description: "Social travel lifestyle network"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>{children}</body>
    </html>
  );
}
