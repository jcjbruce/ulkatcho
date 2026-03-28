-- ============================================================
-- ULKATCHO FIRST NATION — Member Portal & Role-Based Access
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. USER ROLES TABLE
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Users can read their own role
CREATE POLICY "Users read own role" ON user_roles
  FOR SELECT USING (user_id = auth.uid());

-- Admins can manage all roles
CREATE POLICY "Admins manage roles" ON user_roles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 2. MEMBER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS member_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  band_number TEXT,
  date_of_birth DATE,
  address TEXT,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE member_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (anon insert)
CREATE POLICY "Anyone can submit application" ON member_applications
  FOR INSERT WITH CHECK (true);

-- Admins can read all applications
CREATE POLICY "Admins read applications" ON member_applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Admins can update applications
CREATE POLICY "Admins update applications" ON member_applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- 3. ADD is_member_only TO RESOURCES
ALTER TABLE resources ADD COLUMN IF NOT EXISTS is_member_only BOOLEAN NOT NULL DEFAULT FALSE;

-- Update the resources read policy to filter member-only content
-- First drop the existing public read policy
DROP POLICY IF EXISTS "Public read resources" ON resources;

-- Public can read non-member resources; authenticated users can read all
CREATE POLICY "Read resources" ON resources
  FOR SELECT USING (
    is_member_only = false OR auth.role() = 'authenticated'
  );

-- 4. UPDATED_AT TRIGGER FOR MEMBER APPLICATIONS
CREATE TRIGGER set_updated_at_member_applications
  BEFORE UPDATE ON member_applications
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- ============================================================
-- SEED: Add admin role for existing admin user(s)
-- Replace the email below with the actual admin email
-- ============================================================
-- INSERT INTO user_roles (user_id, role)
-- SELECT id, 'admin' FROM auth.users WHERE email = 'admin@ulkatcho.ca';
