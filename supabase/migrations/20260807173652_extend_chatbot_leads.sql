/*
# Extend chatbot leads with trial booking and recommendation fields

1. Modified Tables
- `chatbot_leads` — add optional columns to capture richer enquiry data from the upgraded chatbot.
  - `lead_type` — kind of enquiry: 'general', 'free_trial', 'plan_recommendation', 'contact_request'.
  - `preferred_date` — requested free trial date (text, flexible format from the chatbot).
  - `preferred_time` — requested free trial time slot (text).
  - `interested_membership` — membership/program the user is interested in (text).
  - `age`, `gender`, `height`, `weight`, `workout_experience` — optional profile data used for AI fitness plan recommendations.
  - `bmi` — calculated BMI value, stored when the user runs the BMI tool (numeric, 1 decimal).
  - `whatsapp_opt_in` — boolean, true if the user chose to continue on WhatsApp.

2. Security
- Row Level Security remains enabled.
- The public (anon) can INSERT new leads with any of the new optional fields.
- The public still cannot read, update, or delete leads.

3. Important Notes
- All new columns are nullable so existing inserts keep working.
- No data is lost; this only adds columns.
*/

ALTER TABLE public.chatbot_leads
  ADD COLUMN IF NOT EXISTS lead_type text DEFAULT 'general',
  ADD COLUMN IF NOT EXISTS preferred_date text,
  ADD COLUMN IF NOT EXISTS preferred_time text,
  ADD COLUMN IF NOT EXISTS interested_membership text,
  ADD COLUMN IF NOT EXISTS age integer,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS height text,
  ADD COLUMN IF NOT EXISTS weight text,
  ADD COLUMN IF NOT EXISTS workout_experience text,
  ADD COLUMN IF NOT EXISTS bmi numeric(5,1),
  ADD COLUMN IF NOT EXISTS whatsapp_opt_in boolean DEFAULT false;

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
