/*
 * ULKATCHO FIRST NATION — Resources Page
 * Design: Steel Blue / Navy / Gold branding
 * Layout: Hero → filter buttons → filtered card grid with preview-before-download
 * All documents linked to real CDN files per "Organized Resources" mapping
 */

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DocumentPreview, { useDocumentPreview } from "@/components/DocumentPreview";
import { FileText, Filter, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape_dc4795fe.jpg";

type DocItem = {
  id?: string;
  title: string;
  url: string;
  file_type: string;
  category: string;
};

const categories = [
  "All",
  "Governance & Council",
  "Plans, Policies & Reports",
  "News Releases & Notices",
  "Newsletters",
  "Elections",
  "Community Programs",
  "Business & Economic Development",
];

const _STATIC_REMOVED = [
  { title: "BCR: Health Evaluation Plan Approved", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/BCR%202024-74%20UFN%20HEALTH%20AND%20WELLNESS%20EVALUATION%20PLAN%20FINALIZED_19f42b4a.pdf", type: "PDF", category: "Governance & Council" },
  { title: "BCR: Health Governance Appointments", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/BCR%202024-75%20UFN%20HEALTH%20GOVERNANCE%20APPOINTMENTS%20TO%20IRNE%20AND%20IRNTT%20_c98daa45.pdf", type: "PDF", category: "Governance & Council" },
  { title: "Letter from Chief and Council", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UFN%20COMMUNITY%20LETTER%20FROM%20UFN%20CHIEF%20AND%20COUNCIL_8d7ea219.pdf", type: "PDF", category: "Governance & Council" },
  { title: "State of Emergency Declaration", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20First%20Nation%20Declare%20State%20Of%20Emergency_a726c1a9.pdf", type: "PDF", category: "Governance & Council" },
  { title: "Family Advisory Committee Registry", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20Family%20Advisory%20Committee%20Registry_a797ef6d.pdf", type: "PDF", category: "Governance & Council" },
  { title: "Referral Submission Form", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Referral%20Submission_1d78c819.pdf", type: "PDF", category: "Governance & Council" },

  // ── 2) Plans, Policies & Reports ──
  { title: "Strategic Plan Key Elements", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/KEY%20ELEMENTS%20OF%20THE%20ULKATCHO%20STRATEGIC%20PLAN_8e7bc726.pdf", type: "PDF", category: "Plans, Policies & Reports" },
  { title: "Total Resource Plan Summary", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Total%20Resource%20Plan%20Anahim%20Timber%20Supply%20Block%20Executive%20Summary_23772fe1.pdf", type: "PDF", category: "Plans, Policies & Reports" },
  { title: "Regional Resource Plan Summary", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Total%20Resource%20Plan%20-%20Quesnel%20and%20Stuart-Nechako%20Natural%20Resource%20Districts%20Executive%20Summary_9cfc2916.pdf", type: "PDF", category: "Plans, Policies & Reports" },
  { title: "Resource Plan Map Instructions", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Total%20Resource%20Plan%20Layered%20Map%20Instructions%20for%20Downloading%2C%20Saving%20on%20Your%20Computer%20and%20Viewing%20Map%20Layers_b2e8cffa.pdf", type: "PDF", category: "Plans, Policies & Reports" },
  { title: "2025 Wildfire After Action Review", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/2025%20Wildfire%20Season%20External%20After%20Action%20Review_411bd35e.pdf", type: "PDF", category: "Plans, Policies & Reports" },
  { title: "Blackwater Project Overview", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Artemis%20Gold%20-%20Blackwater%20Project_d2d68219.pdf", type: "PDF", category: "Plans, Policies & Reports" },
  { title: "Dog Control By-Law", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Click%20here%20to%20view%20Animal%20%28Dog%29%20By-Law_a674c5ba.pdf", type: "PDF", category: "Plans, Policies & Reports" },

  // ── 3) News Releases & Notices ──
  { title: "News Releases", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/NEWS%20RELEASES_0a6860aa.pdf", type: "PDF", category: "News Releases & Notices" },
  { title: "Re-Entry Notice — Sept 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20First%20Nation%20Re-Entry%20Notice%20%E2%80%93%20September%2016%2C%202025_ee5fe885.pdf", type: "PDF", category: "News Releases & Notices" },
  { title: "Holiday Member Distribution Notice", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/2023%20Ulkatcho%20First%20Nation%20Holiday%20Member%20Distribution_5d8408de.pdf", type: "PDF", category: "News Releases & Notices" },
  { title: "Wildfire Updates — 2023", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/WILDFIRE%20UPDATES%202023_2d5ea2de.pdf", type: "PDF", category: "News Releases & Notices" },
  { title: "Wildfire Q&A Guide", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/WILDFIRES%20AND%20FIRST%20NATIONS%20COMMUNITIES%20%20QUESTIONS%20%26%20ANSWERS_41a20d84.pdf", type: "PDF", category: "News Releases & Notices" },

  // ── 4) Newsletters ──
  { title: "Newsletter — Nov 2021", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/November%202021%20Newsletter_10b4dec9.pdf", type: "PDF", category: "Newsletters" },
  { title: "Newsletter — Dec 2021", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20First%20Nations%20Newsletter%20December%202021_0877bbfe.pdf", type: "PDF", category: "Newsletters" },
  { title: "Newsletter — 2022", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ULKATCHO%20FIRST%20NATION%20NEWSLETTER%202022_c84d56f0.pdf", type: "PDF", category: "Newsletters" },
  { title: "Clinic News — May/Jun 2023", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20Clinic%20News%20-%20May%3AJune%202023_d4dd5b4c.pdf", type: "PDF", category: "Newsletters" },
  { title: "Companies Newsletter — Fall 2024", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20Group%20Of%20Companies%20Newsletter%20-%20Fall%202024_436bb10d.pdf", type: "PDF", category: "Newsletters" },
  { title: "Newsletter — Jul 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20First%20Nation%20Newsletter%20July%202025_705a3ade.pdf", type: "PDF", category: "Newsletters" },
  { title: "Newsletter — Oct 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20First%20Nation%20Newsletter%20October%202025_494b2368.pdf", type: "PDF", category: "Newsletters" },
  { title: "UGoC Newsletter — Aug 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UGoC%20Newsletter%20August%202025_7188f724.pdf", type: "PDF", category: "Newsletters" },
  { title: "UGoC Newsletter — Nov 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UGoC%20Newsletter%20November%202025_d81aca55.pdf", type: "PDF", category: "Newsletters" },

  // ── 5) Elections ──
  { title: "2023 Election Overview", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/2023%20CHIEF%20AND%20COUNCIL%20ELECTION_bc6c7897.pdf", type: "PDF", category: "Elections" },
  { title: "2023 Election Notice", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20Election%202023_cb6334b6.pdf", type: "PDF", category: "Elections" },
  { title: "2025 Election Results", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Election%20Results%2C%20April%2029%2C%202025_d650069d.pdf", type: "PDF", category: "Elections" },
  { title: "Nomination Results — Mar 18, 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Nomination%20Meeting%20Results%20March%2018%2C%202025_1ce4120a.pdf", type: "PDF", category: "Elections" },
  { title: "Nominee Package — Mar 19, 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Nominee%20Package%20March%2019%2C%202025_5d2cf242.pdf", type: "PDF", category: "Elections" },
  { title: "Candidate Notice — Mar 20, 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Notice%20Of%20Candidates%20On%20Ballot%20March%2020%2C%202025_e22d8d84.pdf", type: "PDF", category: "Elections" },
  { title: "Candidate Notice — Mar 26, 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Notice%20Of%20Candidates%20On%20Ballot%20March%2026%2C%202025_0d20f589.pdf", type: "PDF", category: "Elections" },
  { title: "2025 Notice of Polls", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20Election%202025%20Notice%20Of%20Polls_804b2a0f.pdf", type: "PDF", category: "Elections" },
  { title: "Voting Procedures — Apr 29, 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Voting%20Procedures%20April%2029%2C%202025_f92d73d2.pdf", type: "PDF", category: "Elections" },

  // ── 6) Community Programs & Opportunities ──
  { title: "Join Our Team", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/JOIN%20OUR%20TEAM_9f97900e.pdf", type: "PDF", category: "Community Programs" },
  { title: "Youth Empowerment 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Youth%20Empowerment%202025_4d64f20f.png", type: "PNG", category: "Community Programs" },
  { title: "Clean Energy Project Announcement", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Ulkatcho%20Energy%20Corporation%20Embarks%20On%20Clean%20Energy%20Generation%20In%20Anahim%20Lake_7cd276c6.pdf", type: "PDF", category: "Community Programs" },
  { title: "Education Department Overview", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Education%20Department_823e8074.pdf", type: "PDF", category: "Community Programs" },

  // ── 7) Business & Economic Development ──
  { title: "Five Alliance Agreements Signed", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/THE%20ULKATCHO%20GROUP%20OF%20COMPANIES%20SIGNS%20FIVE%20ALLIANCE%20AGREEMENTS_8a21219a.pdf", type: "PDF", category: "Business & Economic Development" },
  { title: "New Gold Share Update — 2025", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/NEW%20GOLD%20SHARE%20UPDATED%20-%202025_55456af7.pdf", type: "PDF", category: "Business & Economic Development" },
];

const categoryColors: Record<string, string> = {
  "Governance & Council": "#1a2e5a",
  "Plans, Policies & Reports": "#2a4a7a",
  "News Releases & Notices": "#8b6420",
  "Newsletters": "#3a5a8a",
  "Elections": "#c9a227",
  "Community Programs": "#4a6a8a",
  "Business & Economic Development": "#2a5a4a",
};

function DocCard({ doc, onPreview }: { doc: DocItem; onPreview: (url: string, title: string) => void }) {
  const catColor = categoryColors[doc.category] || "#1a2e5a";

  return (
    <div
      className="h-full p-5 transition-all duration-200 group"
      style={{
        backgroundColor: "#e8eef4",
        border: "1px solid #b8c8d6",
        borderLeft: `4px solid ${catColor}`,
        boxShadow: "0 1px 4px rgba(26,46,90,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(26,46,90,0.12)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(26,46,90,0.06)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${catColor}15` }}
        >
          <FileText size={16} style={{ color: catColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-medium leading-snug mb-2"
            style={{ fontFamily: "Lora, serif", color: "#1a2e5a", fontSize: "0.95rem" }}
          >
            {doc.title}
          </p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="font-ui text-xs tracking-wider px-2 py-0.5"
              style={{
                backgroundColor: `${catColor}10`,
                color: catColor,
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {doc.category}
            </span>
            <button
              onClick={() => onPreview(doc.url, doc.title)}
              className="flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer border-0 rounded"
              style={{ backgroundColor: "#1a2e5a", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a"; }}
            >
              <Eye size={12} />
              View Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allDocs, setAllDocs] = useState<DocItem[]>([]);
  const { preview, openPreview, closePreview } = useDocumentPreview();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .eq("is_active", true)
        .order("category")
        .order("sort_order")
        .order("title");
      setAllDocs((data ?? []).map((r: any) => ({ title: r.title, url: r.url, file_type: r.file_type, category: r.category })));
    }
    load();
  }, []);

  const filteredDocs = allDocs
    .filter((doc) => {
      const matchesCategory = activeFilter === "All" || doc.category === activeFilter;
      const matchesSearch = searchQuery === "" || doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const counts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "All" ? allDocs.length : allDocs.filter((d) => d.category === cat).length;
    return acc;
  }, {});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const timer = setTimeout(() => {
      document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <PageHero
        image={HERO_IMAGE}
        label="Community Documents"
        heading="Resources"
        bgPosition="center 60%"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
        ]}
      />

      {/* Filter Bar */}
      <section className="py-6" style={{ backgroundColor: "#1a2e5a" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          {/* Row 1: Search + All + first 3 categories */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {/* Short search bar */}
            <div className="relative" style={{ width: "180px" }}>
              <Filter size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "#c9a227" }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-xs"
                style={{
                  border: "1px solid rgba(201,162,39,0.3)",
                  fontFamily: "Raleway, sans-serif",
                  color: "#ffffff",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  letterSpacing: "0.04em",
                }}
              />
            </div>
            {categories.slice(0, 4).map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="flex-1 px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 text-center whitespace-nowrap"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    backgroundColor: isActive ? "#c9a227" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#1a2e5a" : "rgba(255,255,255,0.75)",
                    border: isActive ? "1px solid #c9a227" : "1px solid rgba(255,255,255,0.15)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {cat}
                  <span
                    className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs"
                    style={{
                      backgroundColor: isActive ? "rgba(26,46,90,0.2)" : "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      fontSize: "0.6rem",
                    }}
                  >
                    {counts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Row 2: remaining 3 categories */}
          <div className="flex gap-2">
            {categories.slice(4).map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="flex-1 px-3 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 text-center whitespace-nowrap"
                  style={{
                    fontFamily: "Raleway, sans-serif",
                    backgroundColor: isActive ? "#c9a227" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#1a2e5a" : "rgba(255,255,255,0.75)",
                    border: isActive ? "1px solid #c9a227" : "1px solid rgba(255,255,255,0.15)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {cat}
                  <span
                    className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs"
                    style={{
                      backgroundColor: isActive ? "rgba(26,46,90,0.2)" : "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      fontSize: "0.6rem",
                    }}
                  >
                    {counts[cat]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-14" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          {/* Results count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="font-ui text-xs tracking-wider uppercase" style={{ color: "#8b6420" }}>
              Showing {filteredDocs.length} of {allDocs.length} resources
              {activeFilter !== "All" && (
                <span style={{ color: "#1a2e5a" }}> in {activeFilter}</span>
              )}
            </p>
            {activeFilter !== "All" && (
              <button
                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                className="font-ui text-xs tracking-wider uppercase underline"
                style={{ color: "#c9a227", background: "none", border: "none", cursor: "pointer" }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Document Grid */}
          {filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredDocs.map((doc, i) => (
                <div key={`${doc.title}-${i}`} className="scroll-reveal" style={{ transitionDelay: `${Math.min(i * 0.03, 0.3)}s` }}>
                  <DocCard doc={doc} onPreview={openPreview} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto mb-4" style={{ color: "#dce6ef" }} />
              <p style={{ fontFamily: "Playfair Display, serif", color: "#1a2e5a", fontSize: "1.25rem" }}>
                No resources found
              </p>
              <p className="mt-2" style={{ fontFamily: "Lora, serif", color: "#555", fontSize: "0.9rem" }}>
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Document Preview Modal */}
      {preview && (
        <DocumentPreview
          url={preview.url}
          title={preview.title}
          isOpen={true}
          onClose={closePreview}
        />
      )}
    </div>
  );
}
