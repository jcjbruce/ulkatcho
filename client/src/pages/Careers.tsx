/*
 * ULKATCHO FIRST NATION — Careers Page
 * Design: Green "River Stone & Birch" layout recolored to Steel Blue / Navy / Gold
 * Hero+breadcrumb, priority policy panel, job search, listings, partner opportunities
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { Briefcase, ChevronRight, Users, Star, Search } from "lucide-react";
import ProtectedEmail from "@/components/ProtectedEmail";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho-sunset-enhanced_6d1d73f6.jpg";

const allJobs = [
  "Care Aid",
  "Casual Field Laborers / Supervisors",
  "Chunta Board of Directors",
  "Chunta Resource Manager",
  "Community Nurse",
  "Daycare Sub",
  "Director of Child, Family & Social Development",
  "Drug and Alcohol Worker",
  "Education Assistant Sub",
  "Homemaker",
  "Medical Van Driver Clinic",
  "Mental Health Worker",
  "Primary Cleaner Clinic",
  "Renovation Team Members",
  "Social Development Intake Worker",
  "Social Development Outreach Worker",
  "Social Worker (Bachelors)",
  "Sub – Nutritionist/Custodian",
  "Sub Cleaner for Band Office",
  "Sub Cleaner for Clinic",
  "Temporary On-Call Positions",
  "UFN Repair and Maintenance Worker",
  "Ulkatcho Fire Chief",
  "Ulkatcho First Nation Youth Council",
  "Water and Wastewater System Operator",
  "Whitebark Pine Technician",
];

const filterTypes = ["Freelance", "Full Time", "Internship", "Part Time", "Temporary"];

export default function Careers() {
  const [keywords, setKeywords] = useState("");
  const [filters, setFilters] = useState<Record<string, boolean>>(
    Object.fromEntries(filterTypes.map((f) => [f, true]))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredJobs = allJobs.filter((job) =>
    keywords ? job.toLowerCase().includes(keywords.toLowerCase()) : true
  );

  const toggleFilter = (name: string) => setFilters((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <PageHero
        image={HERO_IMAGE}
        label="Employment Opportunities"
        heading="Careers"
        bgPosition="center 40%"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
      />

      <div className="container py-14" style={{ maxWidth: "1200px" }}>
        {/* Priority Policy */}
        <div className="mb-12 p-6 scroll-reveal" style={{ backgroundColor: "#1a2e5a", borderLeft: "4px solid #c9a227" }}>
          <div className="flex items-start gap-4">
            <Star size={22} className="shrink-0 mt-0.5" style={{ color: "#c9a227" }} />
            <div>
              <h2 className="mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.3rem", color: "#ffffff" }}>
                Internal Priority Hiring Policy
              </h2>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}>
                Ulkatcho First Nation gives priority consideration to qualified Ulkatcho First Nation members for all employment opportunities within the Nation's administration and programs. Members are encouraged to apply for all posted positions.
              </p>
              <p className="mt-3" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                Contact:{" "}
                <ProtectedEmail user="OperationsManager" domain="ulkatcho.ca" />{" "}· ext. 218
              </p>
            </div>
          </div>
        </div>

        {/* Job Search */}
        <section className="mb-14 scroll-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ backgroundColor: "#1a2e5a" }}>
              <Briefcase size={22} style={{ color: "#c9a227" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Employment</div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.85rem", color: "#1a2e5a" }}>
                Current Job Postings
              </h2>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b6420" }} />
              <input
                type="text"
                placeholder="Search by keyword..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif", color: "#333", backgroundColor: "#ffffff" }}
              />
            </div>
          </div>

          {/* Filter checkboxes */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            {filterTypes.map((f) => (
              <label key={f} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ fontFamily: "Lora, serif", color: "#333" }}>
                <input type="checkbox" checked={filters[f]} onChange={() => toggleFilter(f)} className="accent-[#c9a227]" />
                {f}
              </label>
            ))}
          </div>

          {/* Job listings */}
          <div className="ufn-card" style={{ borderRadius: "0" }}>
            {filteredJobs.map((job) => {
              const slug = job.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <Link key={job} href={`/careers/${slug}`}>
                  <div
                    className="flex items-center gap-3 py-4 px-5 transition-colors duration-150 group cursor-pointer"
                    style={{ borderBottom: "1px solid #eef2f6" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#e8edf2"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                  >
                    <Briefcase size={16} style={{ color: "#c9a227", flexShrink: 0 }} />
                    <span className="flex-1 font-medium" style={{ fontFamily: "Lora, serif", fontSize: "0.95rem", color: "#1a2e5a" }}>
                      {job}
                    </span>
                    <span className="text-sm hidden md:block" style={{ fontFamily: "Lora, serif", color: "#8b6420", minWidth: "80px" }}>
                      Anahim Lake
                    </span>
                    <ChevronRight size={16} style={{ color: "#c9a227", flexShrink: 0 }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Partner Opportunities */}
        <section className="scroll-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ backgroundColor: "#8b6420" }}>
              <Users size={22} style={{ color: "#ffffff" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Partner Organizations</div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.85rem", color: "#1a2e5a" }}>
                Artemis Gold Opportunities
              </h2>
            </div>
          </div>

          <p className="mb-8 max-w-2xl" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
            Artemis Gold is a key industry partner of Ulkatcho First Nation. Members are encouraged to explore employment and business opportunities through Artemis Gold's Blackwater Gold Project, which is located within the Nation's traditional territory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://artemisgoldinc.com/careers/current-opportunities/" target="_blank" rel="noopener noreferrer">
              <div className="ufn-card p-6 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(26,46,90,0.08)" }}>
                    <Briefcase size={18} style={{ color: "#1a2e5a" }} />
                  </div>
                  <div>
                    <h3 className="mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.1rem", color: "#1a2e5a" }}>
                      Artemis Gold — Current Careers
                    </h3>
                    <p className="text-sm mb-3" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                      Browse current employment opportunities at Artemis Gold's Blackwater Gold Project and other operations.
                    </p>
                    <div className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase" style={{ color: "#c9a227" }}>
                      <ChevronRight size={11} /> View Opportunities
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <a href="http://artemisgoldinc.com/blackwater-community/business-directory/" target="_blank" rel="noopener noreferrer">
              <div className="ufn-card p-6 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(139,100,32,0.1)" }}>
                    <Users size={18} style={{ color: "#8b6420" }} />
                  </div>
                  <div>
                    <h3 className="mb-2" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.1rem", color: "#1a2e5a" }}>
                      Artemis Gold — Business Directory
                    </h3>
                    <p className="text-sm mb-3" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                      Explore business opportunities and the community business directory for the Blackwater Gold Project area.
                    </p>
                    <div className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase" style={{ color: "#c9a227" }}>
                      <ChevronRight size={11} /> View Directory
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
