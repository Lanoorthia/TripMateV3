# TripMate

TripMate is a full-stack social travel lifestyle web application inspired by Lemon8 and TripAdvisor. It blends vertical story cards, curated destinations, collectible ornaments, and weather warnings so travelers can plan and celebrate every journey in one place.

## Tech Stack
- **Frontend:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Route Handlers, Prisma ORM
- **Database:** PostgreSQL (Supabase or Neon)
- **Authentication:** NextAuth (Google OAuth & Email magic links)
- **Storage:** Supabase Storage or Cloudflare R2 for media uploads
- **Deploy:** Vercel (preview + production environments)
- **Observability:** PostHog (analytics), Sentry (error monitoring)

## Application Architecture
TripMate follows a simple but scalable architecture that maps directly to the MVP scope:

- **Feed:** Vertical 4:5 media cards with likes, comments, saves, and optional place tagging.
- **Places:** Curated database with categories, tags, coordinates, weather cache, and related posts.
- **Profiles:** Traveler handles, ornament collections, saved posts, and activity stats.
- **Feedback:** Feedback form persisted in Postgres and ready for Discord/email forwarding.
- **Admin:** Placeholder control room wired for future role-gated CMS actions.
- **Weather:** OpenWeatherMap integration with Prisma caching and Vercel cron refresh potential.

The repo is organised into marketing and main route groups to keep landing content separate from the authenticated app shell.

```
app/
├── (marketing)/
│   └── page.tsx                  # Landing & CTA surface
├── (main)/
│   ├── layout.tsx                # Shared navigation & chrome
│   ├── admin/page.tsx            # CMS control room scaffold
│   ├── compose/page.tsx          # Vertical post composer stub
│   ├── feed/page.tsx             # Community feed (vertical cards)
│   ├── feedback/page.tsx         # Feedback form
│   ├── places/
│   │   ├── [slug]/page.tsx       # Place detail + weather & posts
│   │   └── page.tsx              # Explorer with filters/search
│   └── profile/
│       ├── [handle]/page.tsx     # Traveler profile & ornaments
│       └── page.tsx              # Profile index helper
├── api/
│   ├── auth/[...nextauth]        # NextAuth handler
│   ├── feed                      # Cursor-based feed API
│   ├── feedback                  # Feedback submissions
│   ├── places/[slug]             # Place detail API
│   ├── places                    # Searchable place listing
│   ├── posts/[id]                # Post update/delete
│   ├── posts                     # Post list/create
│   ├── profile                   # Traveler leaderboard
│   └── weather                   # Weather cache refresh
└── auth/signin/page.tsx          # Custom sign-in surface
```

Shared UI primitives live in `components/`, Prisma helpers in `lib/`, and the schema in `prisma/`.

## Prisma Schema Highlights
The schema models the complete MVP feature set:

- `User` with unique handles, ornaments, posts, saves, likes, and NextAuth account/session tables.
- `Place` with slug, tags, coordinates, ratings, and related posts.
- `Post` featuring `imageUrls`, `Visibility`, and relations to likes/comments/saves.
- Social interactions (`Comment`, `Like`, `Save`) and collectible `Ornament` relations.
- `WeatherCache` for cached API payloads with TTL enforcement.
- `Feedback` entries tied optionally to authenticated users.

Run `npx prisma format` after edits and commit generated client changes when migrations are applied.

## API Endpoints
| Method | Route | Description |
| ------ | ----- | ----------- |
| GET | `/api/feed?cursor=...&limit=` | Cursor-based feed with author + place metadata |
| GET | `/api/posts?authorId=&handle=&placeId=` | Filtered posts list |
| POST | `/api/posts` | Create a post (JSON payload with `imageUrls[]`) |
| PATCH | `/api/posts/:id` | Update title/content/visibility/media/place |
| DELETE | `/api/posts/:id` | Remove a post |
| GET | `/api/places?query=&tags=&category=&near=lat,lng` | Search and filter places |
| GET | `/api/places/[slug]` | Detailed place payload with related posts |
| GET | `/api/weather?placeId=` | Fetch or refresh cached weather snapshot |
| GET | `/api/profile` | Traveler leaderboard with activity scores |
| POST | `/api/feedback` | Submit structured product feedback |

All endpoints gracefully degrade with 503 responses when `DATABASE_URL` is missing to support builds without credentials.

## Environment Variables
Duplicate `.env.example` to `.env.local` and supply these values:

```
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tripmate"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
EMAIL_SERVER="smtp://user:password@smtp.yourprovider.com:587"
EMAIL_FROM="TripMate <no-reply@yourdomain.com>"

# Storage
SUPABASE_PROJECT_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_STORAGE_BUCKET="tripmate-media"
R2_ACCOUNT_ID="your-r2-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key-id"
R2_SECRET_ACCESS_KEY="your-r2-secret-access-key"
R2_BUCKET="tripmate-media"

# Integrations
WEATHER_API_KEY="your-weather-api-key"
DISCORD_FEEDBACK_WEBHOOK="https://discord.com/api/webhooks/..."
POSTHOG_KEY="your-posthog-key"
POSTHOG_HOST="https://app.posthog.com"
SENTRY_DSN="https://example.ingest.sentry.io/123"
```

Never commit real secrets—use placeholders for repository distribution.

## Getting Started
1. Install dependencies and generate the Prisma client:
   ```bash
   npm install
   ```
2. Create `.env.local` and fill in the environment variables above.
3. Apply the schema to your database (or use migrations once they exist):
   ```bash
   npx prisma db push
   ```
4. Optionally seed demo data to explore the feed/profile experiences.
5. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment Checklist (Vercel)
- Ensure the project is detected as **Next.js** in Vercel Project → Settings → General. Keep the default `next build` command, leave **Output Directory** blank, and verify the Root Directory targets this repository if you are in a monorepo.
- Remove any legacy build configuration by keeping `vercel.json` minimal (the repo already ships with a schema-only file) so Vercel does not fall back to the Static Other preset.
- Configure all environment variables in Vercel (including WEATHER_API_KEY, OAuth secrets, storage credentials, analytics keys).
- Run `npx prisma migrate deploy` during build or via Vercel post-deploy webhook.
- Enable Vercel Analytics, Speed Insights, and connect Sentry/PostHog clients.
- Set up Vercel Cron (e.g., every 3 hours) to `GET /api/weather?placeId=...` for key destinations.
- Protect `/app/(main)/admin` via role checks (e.g., `session.user.role === "ADMIN"`).
- Add additional CI checks such as `npm run lint`, `npx prisma format`, `npx prisma validate`, and smoke tests before deploying.

## Roadmap Reference
The repository aligns with a four-sprint roadmap:
1. **Sprint 1 – Structure & Places:** Scaffold Next.js + Prisma, build `/places` and `/places/[slug]`, seed places.
2. **Sprint 2 – Feed & Posts:** Vertical feed, S3 uploads, reactions (likes/comments/saves).
3. **Sprint 3 – Profiles & Feedback:** Ornaments, profile customization, feedback ingestion.
4. **Sprint 4 – Weather, Admin & Launch:** Weather tag caching, admin CMS, SEO assets, deployment polish.

Use this roadmap to guide issue planning and milestone tracking as TripMate grows.
