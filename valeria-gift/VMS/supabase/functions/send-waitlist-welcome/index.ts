// Keep in sync with VMS/templates/emails/waitlist-welcome.html (inline avoids deploy readFile / OPTIONS 500).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";
const WAITLIST_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VMS — You're on the list</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;color:#18181b;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f4f5;">
    You're officially on the VMS founding cohort. Welcome.
  </div>

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <span style="font-family:system-ui,-apple-system,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.04em;color:#09090b;">vms</span><span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#6366f1;margin-left:2px;margin-bottom:2px;vertical-align:baseline;"></span>
            </td>
          </tr>

          <!-- MAIN CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

              <!-- Top accent -->
              <div style="height:4px;background:linear-gradient(90deg,#6366f1,#a5b4fc);"></div>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 40px 36px;">

                <!-- Badge -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <span style="display:inline-block;background:#eef2ff;color:#6366f1;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">
                      ✦ &nbsp;Beta Access Confirmed
                    </span>
                  </td>
                </tr>

                <!-- Headline -->
                <tr>
                  <td style="padding-bottom:12px;">
                    <h1 style="margin:0;font-family:system-ui,-apple-system,sans-serif;font-size:28px;font-weight:700;color:#09090b;line-height:1.15;letter-spacing:-0.025em;">
                      You're on the list,<br/>{{first_name}}.
                    </h1>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding-bottom:32px;">
                    <p style="margin:0 0 16px 0;font-size:15px;color:#71717a;line-height:1.75;font-weight:300;">
                      Welcome to VMS. You've been randomly selected from our founding cohort to receive an exclusive set of member rewards — consider it your lucky day.
                    </p>
                    <p style="margin:0;font-size:15px;color:#71717a;line-height:1.75;font-weight:300;">
                      We'll be in touch when the app is ready. In the meantime, your rewards are waiting.
                    </p>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding-bottom:36px;">
                    <a href="https://regresavaleria.com/benefits" style="display:inline-block;background:#09090b;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:100px;letter-spacing:-0.01em;">
                      Claim Your Benefits →
                    </a>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:28px;">
                    <div style="height:1px;background:#f0f0f2;"></div>
                  </td>
                </tr>

                <!-- Fine print -->
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#a1a1aa;line-height:1.7;">
                      This link is yours. Don't share it — founding member benefits are one per account.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:28px 8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <span style="font-family:system-ui,-apple-system,sans-serif;font-size:14px;font-weight:700;letter-spacing:-0.04em;color:#a1a1aa;">vms</span><span style="display:inline-block;width:4px;height:4px;border-radius:50%;background:#a5b4fc;margin-left:1px;margin-bottom:1px;vertical-align:baseline;"></span>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin:0;font-size:11px;color:#a1a1aa;line-height:1.6;">
                      © 2026 VMS — Valeria Management System. Currently in beta.<br/>
                      You're receiving this because you joined the VMS waitlist.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
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
  return WAITLIST_EMAIL_TEMPLATE.replace(
    /\{\{first_name\}\}/g,
    escapeHtml(firstName),
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
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
