/*
# Create chatbot leads table

1. New Tables
- `chatbot_leads` stores contact details submitted through the floating fitness assistant.
- `id` is the generated lead identifier.
- `full_name`, `phone`, `email`, and `fitness_goal` store the four requested lead fields.
- `created_at` records when the request was submitted.

2. Security
- Row Level Security is enabled.
- This no-login marketing site uses the anon key, so anonymous visitors may create leads.
- Visitors cannot read, edit, or delete submitted leads from the browser.

3. Important Notes
- The table is intentionally write-only from the public website.
- No personal account or sign-in is required to submit a callback request.
*/

CREATE TABLE IF NOT EXISTS public.chatbot_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  fitness_goal text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit chatbot leads" ON public.chatbot_leads;
CREATE POLICY "Public can submit chatbot leads"
ON public.chatbot_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(full_name)) BETWEEN 2 AND 120
  AND length(trim(phone)) BETWEEN 7 AND 30
  AND length(trim(email)) BETWEEN 5 AND 254
  AND length(trim(fitness_goal)) BETWEEN 2 AND 120
);

DROP POLICY IF EXISTS "Public cannot read chatbot leads" ON public.chatbot_leads;
CREATE POLICY "Public cannot read chatbot leads"
ON public.chatbot_leads
FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Public cannot update chatbot leads" ON public.chatbot_leads;
CREATE POLICY "Public cannot update chatbot leads"
ON public.chatbot_leads
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Public cannot delete chatbot leads" ON public.chatbot_leads;
CREATE POLICY "Public cannot delete chatbot leads"
ON public.chatbot_leads
FOR DELETE
TO anon, authenticated
USING (false);
