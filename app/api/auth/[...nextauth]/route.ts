import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const adapter = prisma ? PrismaAdapter(prisma) : undefined;

const providers: NextAuthOptions["providers"] = [];

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret
    })
  );
} else {
  console.warn("Google OAuth provider is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.");
}

if (adapter) {
  const emailFrom = process.env.EMAIL_FROM ?? "TripMate <no-reply@tripmate.app>";
  const emailServer = process.env.EMAIL_SERVER;

  if (emailServer) {
    providers.push(
      EmailProvider({
        server: emailServer,
        from: emailFrom,
        maxAge: 24 * 60 * 60 // 24 hours
      })
    );
  } else {
    console.warn("Email provider is disabled. Configure EMAIL_SERVER to enable magic links.");
  }
} else {
  console.warn("Email magic links are disabled because the Prisma adapter is unavailable.");
}

const authOptions: NextAuthOptions = {
  ...(adapter
    ? { adapter, session: { strategy: "database" as const } }
    : { session: { strategy: "jwt" as const } }),
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin"
  }
};

if (providers.length === 0) {
  console.warn("No authentication providers have been configured. Configure Google or Email auth to enable sign-in.");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
