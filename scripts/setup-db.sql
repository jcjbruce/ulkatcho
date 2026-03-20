-- ============================================================
-- ULKATCHO FIRST NATION — Supabase Database Schema
-- ============================================================

-- 1. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL DEFAULT 'Various',
  type TEXT NOT NULL DEFAULT 'Full Time',
  location TEXT NOT NULL DEFAULT 'Anahim Lake, BC',
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  closing_date DATE,
  description TEXT NOT NULL DEFAULT '',
  requirements TEXT[] DEFAULT '{}',
  contact_email TEXT NOT NULL DEFAULT 'OperationsManager@ulkatcho.ca',
  contact_ext TEXT,
  is_partner BOOLEAN NOT NULL DEFAULT FALSE,
  partner_name TEXT,
  partner_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RESOURCES TABLE
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'PDF',
  category TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  heading TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS department_staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  name TEXT DEFAULT '',
  title TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- 4. COUNCIL MEMBERS TABLE
CREATE TABLE IF NOT EXISTS council_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  photo_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- 5. SITE CONTENT TABLE
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  field TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page, section, field)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE department_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE council_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Public read resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Public read departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Public read department_staff" ON department_staff FOR SELECT USING (true);
CREATE POLICY "Public read council_members" ON council_members FOR SELECT USING (true);
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admin insert jobs" ON jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update jobs" ON jobs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete jobs" ON jobs FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert resources" ON resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update resources" ON resources FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete resources" ON resources FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert departments" ON departments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update departments" ON departments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete departments" ON departments FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert department_staff" ON department_staff FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update department_staff" ON department_staff FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete department_staff" ON department_staff FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert council_members" ON council_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update council_members" ON council_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete council_members" ON council_members FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin insert site_content" ON site_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update site_content" ON site_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete site_content" ON site_content FOR DELETE USING (auth.role() = 'authenticated');

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_jobs BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER set_updated_at_resources BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER set_updated_at_site_content BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_modified_column();
