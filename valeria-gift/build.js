// Copies fitness-tracker/ into dist/ and writes dist/config.js.
// Real secrets come from Vercel env vars (SUPABASE_URL, SUPABASE_ANON_KEY,
// APP_PASSWORD) so they never live in git. For local preview without those
// env vars set, falls back to fitness-tracker/config.js if present (gitignored,
// keep your own local copy there), otherwise to the placeholder example file.

const fs = require("fs");
const path = require("path");

const root = __dirname;
const src = path.join(root, "fitness-tracker");
const dist = path.join(root, "dist");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(src, dist, { recursive: true });

const { SUPABASE_URL, SUPABASE_ANON_KEY, APP_PASSWORD } = process.env;

if (SUPABASE_URL && SUPABASE_ANON_KEY && APP_PASSWORD) {
  const configContent = `const SUPABASE_URL = ${JSON.stringify(SUPABASE_URL)};
const SUPABASE_ANON_KEY = ${JSON.stringify(SUPABASE_ANON_KEY)};
const APP_PASSWORD = ${JSON.stringify(APP_PASSWORD)};
`;
  fs.writeFileSync(path.join(dist, "config.js"), configContent);
  console.log("Wrote dist/config.js from environment variables.");
} else if (fs.existsSync(path.join(src, "config.js"))) {
  console.log("Using local fitness-tracker/config.js (already copied).");
} else {
  fs.copyFileSync(path.join(src, "config.example.js"), path.join(dist, "config.js"));
  console.log("No env vars or local config.js found — using placeholder config.example.js. Set SUPABASE_URL, SUPABASE_ANON_KEY, APP_PASSWORD before deploying for real.");
}
