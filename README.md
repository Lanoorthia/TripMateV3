# TripMate

TripMate is a full-stack social travel lifestyle web application inspired by platforms like Lemon8 and TripAdvisor. It combines vertical storytelling, rich place reviews, traveler profiles, and collectible rewards into a cohesive experience for wanderers.

## Tech Stack
- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL (Supabase/Neon)
- **Authentication:** NextAuth with Google OAuth and Email magic links
- **Storage:** Supabase Storage or Cloudflare R2 for rich media assets
- **Deployment:** Vercel

## Project Structure
```
app/
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── feedback/route.ts
│   ├── places/route.ts
│   ├── posts/route.ts
│   └── profile/route.ts
├── auth/signin/page.tsx
├── feed/page.tsx
├── feedback/page.tsx
├── layout.tsx
├── page.tsx
├── places/page.tsx
└── profile/page.tsx
components/
├── auth/
│   └── sign-in-buttons.tsx
├── feedback/
│   └── feedback-form.tsx
└── ui/
    ├── button.tsx
    ├── input.tsx
    └── textarea.tsx
lib/
├── prisma.ts
└── utils.ts
prisma/
└── schema.prisma
```

## Getting Started
1. Install dependencies and generate the Prisma client.
   ```bash
   npm install
   ```
2. Duplicate `.env.example` into `.env.local` and provide the required environment variables.
3. Push the Prisma schema to your PostgreSQL database (Supabase or Neon).
   ```bash
   npx prisma db push
   ```
4. Start the development server.
   ```bash
   npm run dev
   ```

## Available Routes
- `/` – Landing page with quick navigation to product areas
- `/feed` – Vertical feed of the latest community posts
- `/places` – Explorer for curated destinations and travel notes
- `/profile` – Traveler spotlight with activity stats and badge inspiration
- `/feedback` – Collect feedback with ratings to guide roadmap decisions
- `/auth/signin` – Custom sign-in surface for Google OAuth and email magic links
- `/api/posts` – REST endpoints for listing and creating posts
- `/api/places` – REST endpoints for listing and creating places
- `/api/profile` – Profile insights and traveler stats
- `/api/feedback` – Feedback submission and retrieval

## Environment Variables
TripMate relies on the following environment variables (see `.env.example` for placeholders):
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `EMAIL_SERVER`
- `EMAIL_FROM`
- `SUPABASE_PROJECT_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `WEATHER_API_KEY`

## Deployment
Deploy to Vercel with the environment variables above, connect the Supabase (or Neon) database, and configure Supabase Storage or R2 for image hosting. The automated Prisma client generation (`postinstall`) ensures the schema is always aligned with your database during deployments.
