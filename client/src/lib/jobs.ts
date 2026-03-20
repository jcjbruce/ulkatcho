/*
 * ULKATCHO FIRST NATION — Jobs Data Layer
 * =========================================
 * This file defines the Job data model and provides placeholder data.
 *
 * BACKEND INTEGRATION NOTES:
 * --------------------------
 * When a backend is added, replace the static `allJobs` array and
 * the `getJobs()` / `getJobBySlug()` functions with API calls:
 *
 *   GET /api/jobs              → returns Job[]
 *   GET /api/jobs/:slug        → returns Job | null
 *   POST /api/jobs             → creates a new Job (admin)
 *   PUT /api/jobs/:id          → updates a Job (admin)
 *   DELETE /api/jobs/:id       → deletes a Job (admin)
 *
 * The frontend components (Careers.tsx, JobDetail.tsx) already consume
 * these functions, so swapping to fetch() calls is seamless.
 */

export type JobType = "Full Time" | "Part Time" | "Temporary" | "Freelance" | "Internship";

export type Job = {
  id: string;
  title: string;
  slug: string;
  department: string;
  type: JobType;
  location: string;
  postedDate: string;        // ISO date string
  closingDate: string | null; // null = "Open Until Filled"
  description: string;
  requirements: string[];
  contactEmail: string;
  contactExt?: string;
  isPartner: boolean;        // true = Artemis Gold or external partner
  partnerName?: string;
};

// Helper: generate slug from title
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ============================================================
// PLACEHOLDER DATA — Replace with API calls when backend is ready
// ============================================================

const placeholderJobs: Job[] = [
  "Director of Child, Family & Social Development",
  "Sub Cleaner for Clinic",
  "Social Worker (Bachelors)",
  "Sub Cleaner for Band Office",
  "Ulkatcho First Nation Youth Council",
  "Sub – Nutritionist/Custodian",
  "Casual Field Laborers /Supervisors",
  "Daycare Sub",
  "Education Assistant Sub",
  "Whitebark Pine Technician",
  "Ulkatcho Fire Chief",
  "Medical Van Driver Clinic",
  "Renovation Team Members",
  "UFN Repair and Maintenance Worker",
  "Temporary On-Call Positions",
  "Drug and Alcohol Worker",
  "Chunta Board of Directors",
  "Community Nurse",
  "Homemaker",
  "Primary Cleaner Clinic",
  "Mental Health Worker",
  "Care Aid",
  "Water and Wastewater System Operator",
  "Chunta Resource Manager",
  "Social Development Outreach Worker",
  "Social Development Intake Worker",
].map((title, i) => ({
  id: `job-${i + 1}`,
  title,
  slug: slugify(title),
  department: "Various",
  type: "Full Time" as JobType,
  location: "Anahim Lake, BC",
  postedDate: "2025-12-01",
  closingDate: null,
  description:
    "Full job description and requirements will be available soon. Ulkatcho First Nation gives priority consideration to qualified Ulkatcho First Nation members for all employment opportunities.",
  requirements: [],
  contactEmail: "OperationsManager@ulkatcho.ca",
  contactExt: "218",
  isPartner: false,
}));

// Partner opportunities
const partnerJobs: Job[] = [
  {
    id: "partner-1",
    title: "Artemis Gold — Current Careers",
    slug: "artemis-gold-careers",
    department: "Partner",
    type: "Full Time",
    location: "Blackwater Gold Project",
    postedDate: "2025-01-01",
    closingDate: null,
    description:
      "Browse current employment opportunities at Artemis Gold's Blackwater Gold Project and other operations. Artemis Gold is a key industry partner of Ulkatcho First Nation.",
    requirements: [],
    contactEmail: "OperationsManager@ulkatcho.ca",
    isPartner: true,
    partnerName: "Artemis Gold",
  },
  {
    id: "partner-2",
    title: "Artemis Gold — Business Directory",
    slug: "artemis-gold-business-directory",
    department: "Partner",
    type: "Full Time",
    location: "Blackwater Gold Project",
    postedDate: "2025-01-01",
    closingDate: null,
    description:
      "Explore business opportunities and the community business directory for the Blackwater Gold Project area.",
    requirements: [],
    contactEmail: "OperationsManager@ulkatcho.ca",
    isPartner: true,
    partnerName: "Artemis Gold",
  },
];

const allJobs: Job[] = [...placeholderJobs, ...partnerJobs];

// ============================================================
// DATA ACCESS FUNCTIONS — Swap these for API calls later
// ============================================================

/**
 * Fetch all jobs. When backend is ready, replace with:
 *   const res = await fetch('/api/jobs');
 *   return res.json();
 */
export function getJobs(): Job[] {
  return allJobs;
}

/**
 * Fetch a single job by slug. When backend is ready, replace with:
 *   const res = await fetch(`/api/jobs/${slug}`);
 *   if (!res.ok) return null;
 *   return res.json();
 */
export function getJobBySlug(slug: string): Job | null {
  return allJobs.find((j) => j.slug === slug) || null;
}

/**
 * Get only community (non-partner) jobs.
 */
export function getCommunityJobs(): Job[] {
  return allJobs.filter((j) => !j.isPartner);
}

/**
 * Get only partner jobs.
 */
export function getPartnerJobs(): Job[] {
  return allJobs.filter((j) => j.isPartner);
}

/**
 * Get unique job types for filter UI.
 */
export function getJobTypes(): JobType[] {
  return ["Freelance", "Full Time", "Internship", "Part Time", "Temporary"];
}
