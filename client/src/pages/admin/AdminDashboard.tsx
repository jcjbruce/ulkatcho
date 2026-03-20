import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Link } from "wouter";
import { Briefcase, FileText, Building2, UserCircle } from "lucide-react";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ jobs: 0, resources: 0, departments: 0, council: 0 });

  useEffect(() => {
    async function load() {
      const [jobs, resources, departments, council] = await Promise.all([
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("departments").select("id", { count: "exact", head: true }),
        supabase.from("council_members").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        jobs: jobs.count ?? 0,
        resources: resources.count ?? 0,
        departments: departments.count ?? 0,
        council: council.count ?? 0,
      });
    }
    load();
  }, []);

  const cards = [
    { label: "Job Postings", count: counts.jobs, icon: Briefcase, href: "/admin/jobs", color: "#1a2e5a" },
    { label: "Resources", count: counts.resources, icon: FileText, href: "/admin/resources", color: "#2a4a7a" },
    { label: "Departments", count: counts.departments, icon: Building2, href: "/admin/departments", color: "#8b6420" },
    { label: "Council Members", count: counts.council, icon: UserCircle, href: "/admin/council", color: "#c9a227" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: "#1a2e5a" }}>
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
          Welcome to the Ulkatcho First Nation admin panel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href}>
              <div
                className="p-5 cursor-pointer transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2", borderTop: `3px solid ${card.color}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon size={20} style={{ color: card.color }} />
                  <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.75rem", color: card.color }}>
                    {card.count}
                  </span>
                </div>
                <p className="text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#555" }}>
                  {card.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
