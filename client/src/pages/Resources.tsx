/*
 * ULKATCHO FIRST NATION — Resources Page
 * Theme: River Stone & Birch
 * All document links are verified real file URLs — no placeholders
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { FileText, Download, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

type DocItem = {
  title: string;
  url: string;
  type: "PDF" | "DOCX" | "WEB";
};

type Section = {
  id: string;
  title: string;
  docs: DocItem[];
};

const sections: Section[] = [
  {
    id: "governance",
    title: "Governance & Council",
    docs: [
      { title: "State of Emergency Declaration", url: "https://ulkatcho.ca/docs/ufn_news_release_-_ufn_calls_state_of_emergency_(october_28_2021).pdf", type: "PDF" },
      { title: "Family Advisory Committee Registry", url: "https://ulkatcho.ca/news/ulkatcho_family_advisory.htm?CategoryID=107983&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "Referral Submission Form", url: "https://ulkatcho.ca/ulkatchoconnect_referral_submission.htm", type: "WEB" },
    ],
  },
  {
    id: "plans",
    title: "Plans, Policies & Reports",
    docs: [
      { title: "Total Resource Plan — Anahim Timber Supply Block Executive Summary", url: "https://ulkatcho.ca/docs/total_resource_plan_anahim_timber_supply_block_august_21_2017_executive_summary.pdf", type: "PDF" },
      { title: "Total Resource Plan — Quesnel & Stuart-Nechako Executive Summary", url: "https://ulkatcho.ca/docs/ufn_q_sn_trp_report_executive_summary_mar_22_2018.pdf", type: "PDF" },
      { title: "Resource Plan Map Instructions", url: "https://ulkatcho.ca/docs/total_resource_plans_layered_maps_download_and_viewing_instructions_jul_04_2018.pdf", type: "PDF" },
      { title: "2025 Wildfire After Action Review", url: "https://ulkatcho.ca/docs/2025_wildfire_aar_-_external.pdf", type: "PDF" },
    ],
  },
  {
    id: "news",
    title: "News Releases & Notices",
    docs: [
      { title: "Wildfire Updates 2023", url: "https://ulkatcho.ca/wildfire-updates-2023.htm", type: "WEB" },
      { title: "Wildfire Updates 2025", url: "https://ulkatcho.ca/wildfire-updates-2025.htm", type: "WEB" },
    ],
  },
  {
    id: "newsletters",
    title: "Newsletters",
    docs: [
      { title: "Newsletter — November 2021", url: "https://ulkatcho.ca/news/Ulkatcho-First-Nations-Newsletter.htm?CategoryID=107985&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "Newsletter — December 2022", url: "https://ulkatcho.ca/news/Ulkatcho_Newsletter_Dec2022.htm?CategoryID=107985&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "Clinic News — May/June 2023", url: "https://ulkatcho.ca/news/May-June-2023.htm?CategoryID=108349&Include=1&SortType=1&SortDirection=1", type: "WEB" },
      { title: "Companies Newsletter — Fall 2024", url: "https://ulkatcho.ca/docs/fall_2024_ulkatcho_group_of_companies_news_letter.pdf", type: "PDF" },
      { title: "Health & Wellness Updates — November 2024", url: "https://ulkatcho.ca/news/UFN_Health_and_Wellness_Department_updates_2024.htm?CategoryID=108349&Include=1&SortType=1&SortDirection=1", type: "WEB" },
      { title: "Newsletter — July 2025", url: "https://ulkatcho.ca/news/Ulkatcho_Newsletter_July_2025.htm?CategoryID=107985&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "UGoC Newsletter — August 2025", url: "https://ulkatcho.ca/news/UGoC_Newsletter.htm?CategoryID=107985&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "Newsletter — October 2025", url: "https://ulkatcho.ca/news/Ulkatcho_First_Nation_Newsletter_October_2025.htm?CategoryID=107985&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "UGoC Newsletter — November 2025", url: "https://ulkatcho.ca/news/UGoC_Newsletter_November_2025.htm?CategoryID=107985&Include=2&SortType=2&SortDirection=2", type: "WEB" },
    ],
  },
  {
    id: "elections",
    title: "Elections",
    docs: [
      { title: "UFN Election Code 2019", url: "https://ulkatcho.ca/docs/ufn_custom_electoral_code_2019.pdf", type: "PDF" },
      { title: "2023 Election Information Package", url: "https://ulkatcho.ca/docs/elections__2023.pdf", type: "PDF" },
      { title: "2023 Official Results — Chief", url: "https://ulkatcho.ca/docs/results_-_chief.pdf", type: "PDF" },
      { title: "2023 Official Results — Councillors", url: "https://ulkatcho.ca/docs/result-_councillor.pdf", type: "PDF" },
      { title: "2023 Notice of Polls", url: "https://ulkatcho.ca/docs/notice_of_polls.pdf", type: "PDF" },
      { title: "2023 Nomination Meeting Results", url: "https://ulkatcho.ca/docs/notice_of_nomination_meeting_results_v2.pdf", type: "PDF" },
      { title: "2023 Notice of Candidate Nominees", url: "https://ulkatcho.ca/docs/notice_of_nominees_march_20__2023.pdf", type: "PDF" },
      { title: "2023 Nominee Instructions", url: "https://ulkatcho.ca/docs/nominee_instructions_v2.pdf", type: "PDF" },
      { title: "2023 Notice of Candidates Public Forum", url: "https://ulkatcho.ca/docs/notice_of_cpf_v2.pdf", type: "PDF" },
      { title: "2025 Nomination Meeting Results — March 18", url: "https://ulkatcho.ca/docs/notice_of_nomination_meeting_results.pdf", type: "PDF" },
      { title: "2025 Nominee Package — March 19", url: "https://ulkatcho.ca/docs/nominee_package.pdf", type: "PDF" },
      { title: "2025 Candidate Notice — March 20", url: "https://ulkatcho.ca/docs/notice_of_candidates_on_ballot.pdf", type: "PDF" },
      { title: "2025 Candidate Notice — March 26", url: "https://ulkatcho.ca/docs/notice_of_candidates_on_ballot_march_26_2025.pdf", type: "PDF" },
      { title: "2025 Notice of Polls", url: "https://ulkatcho.ca/docs/notice_of_polls638781765790704001.pdf", type: "PDF" },
      { title: "2025 Voting Procedures — April 29", url: "https://ulkatcho.ca/docs/voting_information.pdf", type: "PDF" },
      { title: "2025 Election Results — April 29", url: "https://ulkatcho.ca/docs/election_results_2025.pdf", type: "PDF" },
    ],
  },
  {
    id: "programs",
    title: "Community Programs & Opportunities",
    docs: [
      { title: "Clean Energy Project Announcement", url: "https://ulkatcho.ca/news/Ulkatcho_Energy_Corporation%20.htm?CategoryID=107983&Include=2&SortType=2&SortDirection=2", type: "WEB" },
      { title: "Ulkatcho Group of Companies — Five Alliance Agreements", url: "https://ulkatcho.ca/news/The_Ulkatcho_Group_of_Companies_signs_five_Alliance_Agreements.htm?CategoryID=107983&Include=2&SortType=2&SortDirection=2", type: "WEB" },
    ],
  },
];

function DocCard({ title, url, type }: DocItem) {
  const Icon = type === "WEB" ? ExternalLink : Download;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="doc-card"
    >
      <div
        className="w-8 h-8 flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(28,58,26,0.08)" }}
      >
        <FileText size={14} style={{ color: "#1C3A1A" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="leading-snug"
          style={{ fontFamily: "Lora, serif", color: "#1C3A1A", fontSize: "0.92rem" }}
        >
          {title}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0 font-ui text-xs tracking-wider uppercase" style={{ color: "#B8341B" }}>
        <Icon size={11} />
        {type === "WEB" ? "Open" : type}
      </div>
    </a>
  );
}

function ResourceSection({ section }: { section: Section }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6 scroll-reveal">
      <button
        className="w-full flex items-center justify-between py-4 px-5 text-left transition-colors duration-200"
        style={{ backgroundColor: "#1C3A1A" }}
        onClick={() => setOpen(!open)}
      >
        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 600,
            fontSize: "1.2rem",
            color: "#F7F2E8",
          }}
        >
          {section.title}
        </h2>
        <div style={{ color: "rgba(247,242,232,0.7)" }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>
      {open && (
        <div className="space-y-2 pt-2">
          {section.docs.map((doc) => (
            <DocCard key={doc.title} {...doc} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Resources() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F2E8" }}>
      <Navbar />

      {/* Page Hero */}
      <div
        className="relative pt-16 md:pt-20 overflow-hidden"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/culture-banner-ZDravBPAKPgphgD9Bcqw5Q.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          minHeight: "300px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,26,24,0.55), rgba(26,26,24,0.75))" }}
        />
        <div className="container relative z-10 py-16 md:py-20">
          <div className="ufn-section-label mb-3" style={{ color: "rgba(184,52,27,0.9)" }}>
            Documents & Resources
          </div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#F7F2E8",
            }}
          >
            Community Resources
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#EDE6D3", borderBottom: "1px solid #D8CEB8" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
            <Link href="/"><span className="hover:text-[#1C3A1A] transition-colors">Home</span></Link>
            <span>/</span>
            <span style={{ color: "#1C3A1A" }}>Resources</span>
          </nav>
        </div>
      </div>

      <div className="container py-14">
        {/* Quick nav */}
        <div className="mb-10 scroll-reveal">
          <p className="font-ui text-xs tracking-widest uppercase mb-4" style={{ color: "#8A8478" }}>
            Jump to section
          </p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-ui text-xs tracking-wider uppercase px-3 py-2 transition-colors duration-200"
                style={{
                  backgroundColor: "#EDE6D3",
                  color: "#1C3A1A",
                  border: "1px solid #D8CEB8",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#1C3A1A";
                  (e.currentTarget as HTMLElement).style.color = "#F7F2E8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#EDE6D3";
                  (e.currentTarget as HTMLElement).style.color = "#1C3A1A";
                }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          {sections.map((section) => (
            <div key={section.id} id={section.id}>
              <ResourceSection section={section} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
