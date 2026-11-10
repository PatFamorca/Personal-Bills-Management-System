# Billflow — MongoDB Atlas + GitHub + Vercel

Mobile-first personal bills manager using Next.js 15, MongoDB Atlas and Vercel.

## Deploy
1. Create a free MongoDB Atlas cluster at https://cloud.mongodb.com. Create a **database user** and allow network access for Vercel (Atlas IP access list: `0.0.0.0/0` when using Vercel's dynamic outbound IPs). Use a strong database password and do not expose the connection string.
2. Copy the Atlas driver connection string. URL-encode special characters in the password.
3. Push the **contents** of this folder to a private GitHub repository (do not upload `.env.local`).
4. Import the GitHub repo at https://vercel.com/new with the Next.js preset.
5. Configure environment variables from `.env.example`: `MONGODB_URI`, `MONGODB_DB` (e.g. `billflow`), `SESSION_SECRET` (32+ random characters), `SETUP_KEY`, `CRON_SECRET`. Add them to Production, Preview as needed.
6. Deploy and open the Vercel URL. Enter the `SETUP_KEY` on the first-run owner setup screen.

MongoDB collections and indexes are created automatically on first setup. **No SQL editor or schema import required.**

## Local development
`npm install` then copy `.env.example` to `.env.local` and fill in secrets; run `npm run dev`.
`npm run build` validates the production build.

## Notes
- In-app due-date reminders appear on site open; this version does not implement background push.
- `/api/cron` is protected by `CRON_SECRET`. Vercel invokes it daily at 00:00 UTC (08:00 Philippine time). Cron availability depends on your Vercel plan.
- Unpaid occurrences are preserved when the next recurring payment is generated. Payments are never overwritten by a new recurrence.
- The first account is the owner. For personal use, do not expose your setup key.
- Existing PostgreSQL data is **not automatically migrated** to MongoDB.
