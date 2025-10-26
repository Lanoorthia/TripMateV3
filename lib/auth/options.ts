import { PrismaAdapter } from "@auth/prisma-adapter";
import { randomBytes } from "crypto";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const adapter = prisma ? PrismaAdapter(prisma) : undefined;

const providers: NextAuthOptions["providers"] = [];

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
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
        maxAge: 24 * 60 * 60,
      }),
    );
  } else {
    console.warn("Email provider is disabled. Configure EMAIL_SERVER to enable magic links.");
  }
} else {
  console.warn("Email magic links are disabled because the Prisma adapter is unavailable.");
}

const generateHandleCandidate = (name?: string | null, email?: string | null) => {
  const base = name?.trim().length ? name : email?.split("@")[0] ?? "explorer";
  const slug = slugify(base);
  return slug.length > 0 ? slug : `explorer-${randomBytes(2).toString("hex")}`;
};

const reserveHandle = async (userId: string, name?: string | null, email?: string | null) => {
  if (!prisma) {
    return;
  }

  const candidate = generateHandleCandidate(name, email);
  const existing = await prisma.user.findUnique({ where: { handle: candidate } });

  if (!existing) {
    await prisma.user.update({ where: { id: userId }, data: { handle: candidate } });
    return;
  }

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const handle = `${candidate}-${randomBytes(1).toString("hex")}`;
    const duplicate = await prisma.user.findUnique({ where: { handle } });
    if (!duplicate) {
      await prisma.user.update({ where: { id: userId }, data: { handle } });
      return;
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { handle: `explorer-${randomBytes(3).toString("hex")}` },
  });
};

export const authOptions: NextAuthOptions = {
  ...(adapter
    ? { adapter, session: { strategy: "database" as const } }
    : { session: { strategy: "jwt" as const } }),
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        (session.user as typeof session.user & { id: string; handle?: string; role?: string }).id = user.id;
        (session.user as typeof session.user & { id: string; handle?: string; role?: string }).handle =
          (user as typeof user & { handle?: string }).handle;
        (session.user as typeof session.user & { id: string; handle?: string; role?: string }).role =
          (user as typeof user & { role?: string }).role;
      }

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!("id" in user)) {
        return;
      }

      if (!prisma) {
        console.warn("Skipping handle reservation because Prisma client is unavailable.");
        return;
      }

      const existing = await prisma.user.findUnique({ where: { id: user.id } });
      if (existing?.handle) {
        return;
      }

      await reserveHandle(user.id, user.name, user.email);
    },
  },
};

if (providers.length === 0) {
  console.warn("No authentication providers have been configured. Configure Google or Email auth to enable sign-in.");
}
