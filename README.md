# AcroBills v1.2 — MongoDB Atlas + Vercel

Mobile-first Next.js bills manager. Upgrade from v1.1 by replacing source files in your existing GitHub repository; **keep the same `MONGODB_URI` and `MONGODB_DB`**. No destructive database migration or table reset is required. Back up your MongoDB database before deployment.

## Existing environment variables
`MONGODB_URI`, `MONGODB_DB`, `SESSION_SECRET`, `SETUP_KEY`, `CRON_SECRET`.

## Optional Android push configuration
Generate VAPID keys locally with `npx web-push generate-vapid-keys`, then add the following to Vercel project environment variables:

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` — public VAPID key
- `VAPID_PRIVATE_KEY` — private VAPID key, never expose to clients
- `VAPID_SUBJECT` — e.g. `mailto:you@example.com`

Redeploy after setting these variables. Install the HTTPS PWA on Android, open Settings and select **Enable push**. Push requires permission, a supported browser and an active subscription. The Vercel daily cron `/api/cron` (secured with `CRON_SECRET`) sends due reminders. On the Hobby plan, cron may run once daily and delivery time is not guaranteed. Notification delivery is best-effort, not a replacement for a critical payment reminder.

## Features
- Calendar month grid and bill status
- Search, category filters, due-date/amount/name sorting
- Variable-bill trend history and estimated amount rollover (still requires actual confirmation)
- Configurable multi-day reminders, overdue and missing-amount alerts
- Monthly budget in settings and report comparison
- Optional Android Web Push with deduplicated daily sends

## Validation
Run `npm install`, `npm run typecheck`, `npm run build`, then `npm run dev` with valid MongoDB credentials. Verify login, creating a bill, recording a payment, editing variable amounts, saving preferences, and enabling push on an HTTPS origin. Do not upload `.env.local` to GitHub.

**Important:** Existing future occurrences are retained to protect user-entered amounts. New occurrences are generated through the end of the next calendar month. The application does not alter or erase historical payments.
