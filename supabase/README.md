# Supabase

This directory holds artifacts owned by the Supabase project — Edge Functions
and SQL migrations. Nothing runs yet in Phase 7.

## Structure

```
supabase/
  functions/   Edge Function source (one folder per function)
  migrations/  Timestamped SQL migrations
```

## Environment

Server-side code reads:

- `APP_SUPABASE_URL`
- `APP_SUPABASE_PUBLISHABLE_KEY`
- `APP_SUPABASE_SERVICE_ROLE_KEY` (added in a later phase)

Browser code uses the publishable URL/key hardcoded in
`src/lib/supabase/config.ts` (public by design).

## Storage buckets (planned)

See `src/lib/constants.ts` → `STORAGE_BUCKETS`:

- `prompt-covers`
- `prompt-assets`
- `user-assets`

Buckets are not provisioned yet — this is architectural preparation only.
