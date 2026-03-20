/*
 * ULKATCHO FIRST NATION — Education Page
 * Design: Steel Blue / Navy / Gold
 * Hero with breadcrumb, doc-card components, scroll reveals, section labels + dividers
 * All documents linked to real CDN files with preview-before-download
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DocumentPreview, { useDocumentPreview } from "@/components/DocumentPreview";
import { FileText, ExternalLink, BookOpen, GraduationCap, Eye } from "lucide-react";
import ProtectedEmail from "@/components/ProtectedEmail";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/about-land_2333c284.jpg";
const CULTURAL_ILLUSTRATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Screenshot2026-03-19at9.27.10PM_8aa0bcf0.webp";

const k12Docs = [
  {
    title: "Access to Students Records Waiver Form — Grade K–9",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho_education_wavier_b54d5825.docx",
    type: "DOCX",
  },
  {
    title: "Room and Board Application Package — Grade 11–12",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/room_board_application_b4824f45.docx",
    type: "DOCX",
  },
  {
    title: "School Supplies Form K–12",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/school_supplies_form_ufn_07f8a1a1.docx",
    type: "DOCX",
  },
  {
    title: "School District No. 27 Boarding Allowance",
    url: "https://www.sd27.bc.ca/boarding-allowance-1738864268991",
    type: "WEB",
  },
  {
    title: "Student Allowance Form — Grade 8–12",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/student_allowance_form_ufn_8a6b1fa5.docx",
    type: "DOCX",
  },
];

const postSecDocs = [
  {
    title: "Application Package",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Application%20Package_fafab5cf.pdf",
    type: "PDF",
    altUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Application%20Package_9b8a2311.docx",
    altType: "DOCX",
  },
];

function DocCard({
  title, url, type, altUrl, altType, onPreview,
}: {
  title: string; url: string; type: string; altUrl?: string; altType?: string;
  onPreview: (url: string, title: string) => void;
}) {
  const isWeb = type === "WEB";

  return (
    <div className="doc-card group">
      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(26,46,90,0.08)" }}>
        <FileText size={16} style={{ color: "#1a2e5a" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium leading-snug mb-1" style={{ fontFamily: "Lora, serif", color: "#1a2e5a", fontSize: "0.95rem" }}>
          {title}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          {isWeb ? (
            <a
              href={url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200 rounded"
              style={{ backgroundColor: "#1a2e5a", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a"; }}
            >
              <ExternalLink size={11} />
              Open Link
            </a>
          ) : (
            <button
              onClick={() => onPreview(url, title)}
              className="flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer border-0 rounded"
              style={{ backgroundColor: "#1a2e5a", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a"; }}
            >
              <Eye size={11} />
              View {type}
            </button>
          )}
          {altUrl && altType && !isWeb && (
            <button
              onClick={() => onPreview(altUrl, title)}
              className="flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer border-0 rounded"
              style={{ backgroundColor: "#c9a227", color: "#ffffff" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#8b6420"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
            >
              <Eye size={11} />
              View {altType}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const { preview, openPreview, closePreview } = useDocumentPreview();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <PageHero
        image={HERO_IMAGE}
        label="Education & Training"
        heading="Education Programs"
        bgPosition="center 60%"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Education" },
        ]}
      />

      <div className="container py-16">
        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-14 scroll-reveal text-center">
          <p className="text-lg leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333" }}>
            Ulkatcho First Nation is committed to supporting the educational journey of all members — from kindergarten through post-secondary. Below you will find all required forms and application packages. Contact the Education Department with any questions.
          </p>
          <div className="mt-6 p-5 text-center" style={{ backgroundColor: "#e8eef4", borderLeft: "4px solid #c9a227", border: "1px solid #b8c8d6", borderLeftWidth: "4px", borderLeftColor: "#c9a227" }}>
            <p className="font-semibold mb-1" style={{ fontFamily: "Playfair Display, serif", color: "#1a2e5a" }}>
              Important: All K–12 forms are due August 25
            </p>
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
              Contact the K-12 Education Advocate with any questions about forms or deadlines.
            </p>
          </div>
        </div>

        {/* K-12 Section */}
        <section className="mb-16 scroll-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ backgroundColor: "#1a2e5a" }}>
              <BookOpen size={22} style={{ color: "#c9a227" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Forms & Applications</div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.85rem", color: "#1a2e5a" }}>
                K–12 Education
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {k12Docs.map((doc) => (
              <div className="scroll-reveal" key={doc.title}>
                <DocCard {...doc} onPreview={openPreview} />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4" style={{ backgroundColor: "#e8eef4", border: "1px solid #b8c8d6" }}>
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
              <strong style={{ color: "#1a2e5a" }}>Questions?</strong> Contact the K-12 Education Advocate at{" "}
              <ProtectedEmail user="k-12liaison" domain="ulkatcho.ca" />{" "}
              or call ext. 212.
            </p>
          </div>
        </section>

        {/* Cultural Illustration */}
        <div className="mb-16" style={{ backgroundColor: "transparent" }}>
          <img
            src={CULTURAL_ILLUSTRATION}
            alt="Ulkatcho cultural elements — pine mushrooms, moose, caribou, Indian paintbrush, soapberries, trout, obsidian"
            className="w-full object-contain"
            style={{ maxHeight: "200px", mixBlendMode: "multiply" }}
          />
        </div>

        {/* Post-Secondary Section */}
        <section className="scroll-reveal">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ backgroundColor: "#8b6420" }}>
              <GraduationCap size={22} style={{ color: "#ffffff" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Forms & Applications</div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.85rem", color: "#1a2e5a" }}>
                Post-Secondary Education
              </h2>
            </div>
          </div>

          {/* Deadlines */}
          <div className="mb-8 p-5" style={{ backgroundColor: "#e8eef4", borderLeft: "4px solid #8b6420", border: "1px solid #b8c8d6", borderLeftWidth: "4px", borderLeftColor: "#8b6420" }}>
            <p className="font-semibold mb-3" style={{ fontFamily: "Playfair Display, serif", color: "#1a2e5a" }}>
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
                  <p className="font-ui text-xs tracking-wider uppercase mb-1" style={{ color: "#8b6420" }}>
                    {item.term}
                  </p>
                  <p className="text-sm font-semibold" style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>
                    {item.deadline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {postSecDocs.map((doc) => (
              <div className="scroll-reveal" key={doc.title}>
                <DocCard {...doc} onPreview={openPreview} />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4" style={{ backgroundColor: "#e8eef4", border: "1px solid #b8c8d6" }}>
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
              <strong style={{ color: "#1a2e5a" }}>Post-Secondary Contact:</strong> Corrine Cahoose —{" "}
              <ProtectedEmail user="postsecondary" domain="ulkatcho.ca" />{" "}
              · ext. 209
            </p>
          </div>
        </section>
      </div>

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
