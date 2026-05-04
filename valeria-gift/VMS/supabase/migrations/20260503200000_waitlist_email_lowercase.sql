-- Align stored emails with client + Edge Function (lowercase) for reliable lookups.
update public.waitlist set email = lower(trim(email))
where email is distinct from lower(trim(email));
