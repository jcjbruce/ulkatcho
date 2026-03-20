import { supabase } from "./supabase";

export type JobType = "Full Time" | "Part Time" | "Temporary" | "Freelance" | "Internship";

export type Job = {
  id: string;
  title: string;
  slug: string;
  department: string;
  type: JobType;
  location: string;
  posted_date: string;
  closing_date: string | null;
  description: string;
  requirements: string[];
  contact_email: string;
  contact_ext?: string | null;
  is_partner: boolean;
  partner_name?: string | null;
  partner_url?: string | null;
  is_active: boolean;
};

export function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getJobs(): Promise<Job[]> {
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order")
    .order("title");
  return data ?? [];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data ?? null;
}

export async function getCommunityJobs(): Promise<Job[]> {
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .eq("is_partner", false)
    .order("sort_order")
    .order("title");
  return data ?? [];
}

export async function getPartnerJobs(): Promise<Job[]> {
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .eq("is_partner", true)
    .order("sort_order");
  return data ?? [];
}

export function getJobTypes(): JobType[] {
  return ["Freelance", "Full Time", "Internship", "Part Time", "Temporary"];
}
