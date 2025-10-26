import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClient =
  globalThis.prisma ?? (process.env.DATABASE_URL ? new PrismaClient() : undefined);

if (process.env.NODE_ENV !== "production" && prismaClient) {
  globalThis.prisma = prismaClient;
}

export const prisma = prismaClient;
