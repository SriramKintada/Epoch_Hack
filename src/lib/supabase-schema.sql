-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/oslhhlifshwcjrogbtbh/sql)
-- Adds new columns to the applications table for the redesigned form

ALTER TABLE applications ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS best_link text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS apply_type text DEFAULT 'solo';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS building text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS impressive text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS why_epoch text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS can_commit text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS team_size text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS team_members text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS team_role text;
