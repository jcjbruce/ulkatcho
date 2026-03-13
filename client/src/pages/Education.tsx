/*
 * ULKATCHO FIRST NATION — Education Page
 * Theme: River Stone & Birch
 * All document links are verified real file URLs — no placeholders
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { FileText, Download, ExternalLink, BookOpen, GraduationCap } from "lucide-react";

const k12Docs = [
  {
    title: "Access to Students Records Waiver Form — Grade K–9",
    url: "https://ulkatcho.ca/docs/ulkatcho_education_wavier.docx",
    type: "DOCX",
  },
  {
    title: "Room and Board Application Package — Grade 11–12",
    url: "https://ulkatcho.ca/docs/room_board_application.docx",
    type: "DOCX",
  },
  {
    title: "School Supplies Form K–12",
    url: "https://ulkatcho.ca/docs/school_supplies_form_ufn.docx",
    type: "DOCX",
  },
  {
    title: "School District No. 27 Boarding Allowance",
    url: "https://www.sd27.bc.ca/page/2078/boarding-allowance",
    type: "WEB",
  },
  {
    title: "Student Allowance Form — Grade 8–12",
    url: "https://ulkatcho.ca/docs/student_allowance_form_ufn.docx",
    type: "DOCX",
  },
];

const postSecDocs = [
  {
    title: "Application Package",
    url: "https://ulkatcho.ca/docs/pse_appli_guideline.pdf",
    type: "PDF",
    altUrl: "https://ulkatcho.ca/docs/psec_applic_guideline.docx",
    altType: "DOCX",
  },
  {
    title: "Sponsorship Application Form",
    url: "https://ulkatcho.ca/docs/pse_sponsorship.pdf",
    type: "PDF",
    altUrl: "https://ulkatcho.ca/docs/pse_sponsorship.docx",
    altType: "DOCX",
  },
  {
    title: "Student Funding Agreement Contract",
    url: "https://ulkatcho.ca/docs/pse_student_funding_agreement.pdf",
    type: "PDF",
    altUrl: "https://ulkatcho.ca/docs/postsec_student_funding_agreement_contract.docx",
    altType: "DOCX",
  },
  {
    title: "Student Contract for UFN Sponsored Students",
    url: "https://ulkatcho.ca/docs/pse_contract.pdf",
    type: "PDF",
    altUrl: "https://ulkatcho.ca/docs/pse_contract.docx",
    altType: "DOCX",
  },
  {
    title: "Waiver Form to Access Student Records",
    url: "https://ulkatcho.ca/docs/pse_access_of_record_waiver.pdf",
    type: "PDF",
    altUrl: "https://ulkatcho.ca/docs/pse_access_records.docx",
    altType: "DOCX",
  },
];

function DocCard({ title, url, type, altUrl, altType }: {
  title: string;
  url: string;
  type: string;
  altUrl?: string;
  altType?: string;
}) {
  const isExternal = url.startsWith("http") && !url.includes("ulkatcho.ca");
  const Icon = type === "WEB" ? ExternalLink : Download;

  return (
    <div className="doc-card group">
      <div
        className="w-9 h-9 flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(28,58,26,0.08)" }}
      >
        <FileText size={16} style={{ color: "#1C3A1A" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-medium leading-snug mb-1"
          style={{ fontFamily: "Lora, serif", color: "#1C3A1A", fontSize: "0.95rem" }}
        >
          {title}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
            style={{ color: "#B8341B" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#9A2B15")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#B8341B")}
          >
            <Icon size={11} />
            {type === "WEB" ? "Open" : `Download ${type}`}
          </a>
          {altUrl && altType && (
            <a
              href={altUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
              style={{ color: "#7A4F2E" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#5A3A1E")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#7A4F2E")}
            >
              <Download size={11} />
              {altType}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
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
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/about-land-Tdq7AzgzPvukSW3GGR5ovS.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          minHeight: "320px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,26,24,0.55), rgba(26,26,24,0.75))" }}
        />
        <div className="container relative z-10 py-16 md:py-24">
          <div className="ufn-section-label mb-3" style={{ color: "rgba(184,52,27,0.9)" }}>
            Education & Training
          </div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#F7F2E8",
            }}
          >
            Education Programs
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#EDE6D3", borderBottom: "1px solid #D8CEB8" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
            <Link href="/"><span className="hover:text-[#1C3A1A] transition-colors">Home</span></Link>
            <span>/</span>
            <span style={{ color: "#1C3A1A" }}>Education</span>
          </nav>
        </div>
      </div>

      <div className="container py-16">
        {/* Intro */}
        <div className="max-w-3xl mb-14 scroll-reveal">
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: "Lora, serif", color: "#3A3530" }}
          >
            Ulkatcho First Nation is committed to supporting the educational journey of all
            members — from kindergarten through post-secondary. Below you will find all
            required forms and application packages. Contact the Education Department with
            any questions.
          </p>
          <div
            className="mt-6 p-5"
            style={{ backgroundColor: "#EDE6D3", borderLeft: "4px solid #B8341B" }}
          >
            <p className="font-semibold mb-1" style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A" }}>
              Important: All K–12 forms are due August 25
            </p>
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
              Contact the K-12 Education Advocate with any questions about forms or deadlines.
            </p>
          </div>
        </div>

        {/* ============================================================
            K-12 SECTION
            ============================================================ */}
        <section className="mb-16 scroll-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#1C3A1A" }}
            >
              <BookOpen size={22} style={{ color: "#F7F2E8" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Forms & Applications</div>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "1.85rem",
                  color: "#1C3A1A",
                }}
              >
                K–12 Education
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {k12Docs.map((doc) => (
              <div className="scroll-reveal" key={doc.title}>
                <DocCard {...doc} />
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4"
            style={{ backgroundColor: "#EDE6D3", border: "1px solid #D8CEB8" }}
          >
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
              <strong style={{ color: "#1C3A1A" }}>Questions?</strong> Contact the K-12 Education Advocate at{" "}
              <a href="mailto:k-12liaison@ulkatcho.ca" className="underline" style={{ color: "#B8341B" }}>
                k-12liaison@ulkatcho.ca
              </a>{" "}
              or call ext. 212.
            </p>
          </div>
        </section>

        {/* ============================================================
            POST-SECONDARY SECTION
            ============================================================ */}
        <section className="scroll-reveal">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#7A4F2E" }}
            >
              <GraduationCap size={22} style={{ color: "#F7F2E8" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Forms & Applications</div>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "1.85rem",
                  color: "#1C3A1A",
                }}
              >
                Post-Secondary Education
              </h2>
            </div>
          </div>

          {/* Deadlines */}
          <div
            className="mb-8 p-5"
            style={{ backgroundColor: "#EDE6D3", borderLeft: "4px solid #7A4F2E" }}
          >
            <p className="font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A" }}>
              Application Deadlines
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { term: "Fall", deadline: "May 31" },
                { term: "Winter", deadline: "Sept 30 (prior year)" },
                { term: "Spring/Summer", deadline: "April 1" },
                { term: "Note", deadline: "All waivers must be signed before submission" },
              ].map((item) => (
                <div key={item.term}>
                  <p className="font-ui text-xs tracking-wider uppercase mb-1" style={{ color: "#8A8478" }}>
                    {item.term}
                  </p>
                  <p className="text-sm font-semibold" style={{ fontFamily: "Lora, serif", color: "#1C3A1A" }}>
                    {item.deadline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {postSecDocs.map((doc) => (
              <div className="scroll-reveal" key={doc.title}>
                <DocCard {...doc} />
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4"
            style={{ backgroundColor: "#EDE6D3", border: "1px solid #D8CEB8" }}
          >
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
              <strong style={{ color: "#1C3A1A" }}>Post-Secondary Contact:</strong> Corrine Cahoose —{" "}
              <a href="mailto:postsecondary@ulkatcho.ca" className="underline" style={{ color: "#B8341B" }}>
                postsecondary@ulkatcho.ca
              </a>{" "}
              · ext. 209
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
