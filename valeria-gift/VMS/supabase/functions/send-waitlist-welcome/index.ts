import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const TEMPLATE = Deno.readTextFileSync(
  new URL("./waitlist-welcome.html", import.meta.url),
);

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RECENT_MS = 15 * 60 * 1000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstNameFromFull(name: string): string {
  const w = name.trim().split(/\s+/)[0];
  return w || "there";
}

function buildHtml(firstName: string): string {
  return TEMPLATE.replace(/\{\{first_name\}\}/g, escapeHtml(firstName));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("RESEND_FROM") ?? "VMS <onboarding@resend.dev>";

    if (!supabaseUrl || !serviceKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!resendKey) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body: { email?: string };
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRaw = body.email;
    if (!emailRaw || typeof emailRaw !== "string") {
      return new Response(JSON.stringify({ error: "email required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const email = emailRaw.trim().toLowerCase();
    if (!email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: row, error: qErr } = await admin
      .from("waitlist")
      .select("name, email, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (qErr) {
      console.error("waitlist select", qErr);
      return new Response(JSON.stringify({ error: "Lookup failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!row) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ageMs = Date.now() - new Date(row.created_at as string).getTime();
    // Only reject stale rows; allow moderate DB clock skew (do not require ageMs >= 0).
    if (ageMs > RECENT_MS) {
      return new Response(JSON.stringify({ error: "Stale signup" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const first = firstNameFromFull(String(row.name ?? ""));
    const html = buildHtml(first);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [row.email as string],
        subject: "You're on the list — VMS",
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend", res.status, detail);
      return new Response(
        JSON.stringify({ error: "Send failed", detail }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
