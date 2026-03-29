-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/oslhhlifshwcjrogbtbh/sql
-- Adds admin/review columns + cleans up schema

-- Review workflow columns
ALTER TABLE applications ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS reviewer_notes text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS score integer;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ai_score integer;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ai_notes text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;

-- Make project_description nullable (it was NOT NULL, causing the fallback hack)
ALTER TABLE applications ALTER COLUMN project_description DROP NOT NULL;

-- Index for fast filtering
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_track ON applications(track);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);
