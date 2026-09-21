// Fill these in before deploying.
// SUPABASE_URL / SUPABASE_ANON_KEY come from your Supabase project settings
// (Project Settings -> API). The anon key is meant to be public/client-side.
//
// APP_PASSWORD is a client-side-only gate (not real security) to keep casual
// visitors out. Anyone who inspects the page source can read it, and anyone
// with SUPABASE_URL + SUPABASE_ANON_KEY can write to the database directly
// via the Supabase REST API, bypassing this password entirely. Good enough
// to stop a stranger from poking around your logged weights; not a security
// boundary.
const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_PUBLIC_KEY";
const APP_PASSWORD = "changeme";
