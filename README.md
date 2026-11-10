# Billflow — GitHub + Vercel

Mobile-first personal bills manager with Next.js, PostgreSQL, secure single-owner login, recurring payments, reports, and in-app reminders.

## Deploy

1. Create a Neon PostgreSQL database. Run `db/schema.sql` in its SQL editor.
2. Create a private GitHub repository and upload/push this project.
3. Import the repository into Vercel (Next.js preset).
4. Add `DATABASE_URL`, `SESSION_SECRET`, `SETUP_KEY`, and `CRON_SECRET` in Vercel project environment variables. Generate strong random values for each secret. `SESSION_SECRET` must be at least 32 characters. `SETUP_KEY` is required for the first account creation.
5. Deploy and open your Vercel URL. Create the owner account on the setup page. Thereafter setup is locked.
6. Set Vercel timezone expectations: the daily cron is `00:00 UTC` (08:00 Philippine time). On the Hobby plan, cron scheduling is approximate. The site also generates due occurrences when accessed.

## Local development

Copy `.env.example` to `.env.local`, set values, run the SQL schema in Neon, then `npm install && npm run dev`.

## Notes

- Recurring occurrences are generated up to 60 days ahead on API access and via daily Vercel Cron. Paid occurrences retain their history; unpaid past occurrences remain overdue. Generation is idempotent.
- No external push notifications yet: reminders display when the app is opened. The PWA manifest enables installation where supported; production HTTPS is required.
- Deletion is blocked for bills with paid history. Pause such bills instead.
- Report totals are based on due month. A late payment still counts as paid against the original due month.
- Editing bill schedules after payments may leave historical occurrences intact. For major schedule changes, pause the old bill and create a new one.
- For very old daily schedules, generation is capped at 5,000 occurrences per bill per sync to limit load. The list endpoint returns the latest 5,000 occurrences.
- The first account setup is protected with a private setup key. Only deploy to a private repository if you do not want your code public; never commit `.env.local`.
