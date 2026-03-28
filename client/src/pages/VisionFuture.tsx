/*
 * ULKATCHO FIRST NATION — Our Vision & Future Page
 * Design: Steel Blue / Navy / Gold
 * Hero with breadcrumb, scroll reveals, section labels, doc-card components
 * All documents linked to CDN with preview-before-download
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import DocumentPreview, { useDocumentPreview } from "@/components/DocumentPreview";
import { Link } from "wouter";
import { FileText, ChevronRight, Eye } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const STRATEGIC_PLAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/download_837c0f2c.png";

const downloads = [
  { title: "Strategic Plan 2022\u20132027", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/THE%20UFN%20STRATEGIC%20PLAN%202022%20-%202027_f6cd9bb5.pdf", type: "PDF" },
  { title: "Health & Wellness Plan 2022\u20132027", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UFN%20HEALTH%20AND%20WELLNESS%20PLAN%20%2822-27%29_97ca3189.pdf", type: "PDF" },
  { title: "Health Evaluation Plan 2024\u20132027", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UFN%20HEALTH%20AND%20WELLNESS%20EVALUATION%20PLAN%20%2824-27%29_873be218.pdf", type: "PDF" },
  { title: "Total Resource Plan", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/TOTAL%20RESOURCE%20PLAN_0d84c896.pdf", type: "PDF" },
  { title: "Traditional Territory Map", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Map%20of%20Our%20Traditional%20Territory_c5160fca.pdf", type: "PDF" },
];

export default function VisionFuture() {
  const { get } = useSiteContent("vision", {
    "images.strategic_plan": STRATEGIC_PLAN_IMG,
    "hero.heading": "Our Vision & Future",
    "intro.paragraph": "Ulkatcho First Nation's strategic direction is guided by our values, our connection to the land, and the priorities identified by community members. The plans below outline how we are building a healthy, vibrant, and sustainable future for all generations.",
    "strategic_plan.label": "Our Strategic Plan",
    "strategic_plan.heading": "Key Elements of the Strategic Plan",
    "downloads.label": "Documents",
    "downloads.heading": "Download Resources",
    "cta.paragraph": "Learn more about our history, culture, and community direction.",
  });

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

      <SimplePageHeader
        heading={get("hero.heading")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Vision & Future" },
        ]}
      />

      {/* Intro */}
      <section className="py-14" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <p className="text-lg leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333" }}>
              {get("intro.paragraph")}
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Plan Infographic */}
      <section className="py-14" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="text-center mb-10 scroll-reveal">
            <div className="ufn-section-label mb-3">{get("strategic_plan.label")}</div>
            <div className="ufn-divider mx-auto" />
            <h2 className="mt-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#1a2e5a" }}>
              {get("strategic_plan.heading")}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto scroll-reveal">
            <div
              className="p-4"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 20px rgba(26,46,90,0.08)",
                borderLeft: "4px solid #c9a227",
              }}
            >
              <img
                src={get("images.strategic_plan")}
                alt="Key Elements of the Ulkatcho Strategic Plan — Vision, Mission, Core Values, and 6 Strategic Priorities"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-14" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8 scroll-reveal">
              <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ backgroundColor: "#1a2e5a" }}>
                <FileText size={22} style={{ color: "#c9a227" }} />
              </div>
              <div>
                <div className="ufn-section-label mb-1">{get("downloads.label")}</div>
                <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.85rem", color: "#1a2e5a" }}>
                  {get("downloads.heading")}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {downloads.map((doc, i) => (
                <div key={doc.title} className="scroll-reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="doc-card group">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(26,46,90,0.08)" }}>
                      <FileText size={16} style={{ color: "#1a2e5a" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium leading-snug mb-1" style={{ fontFamily: "Lora, serif", color: "#1a2e5a", fontSize: "0.95rem" }}>
                        {doc.title}
                      </p>
                      <button
                        onClick={() => openPreview(doc.url, doc.title)}
                        className="flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer border-0 rounded"
                        style={{ backgroundColor: "#1a2e5a", color: "#ffffff" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a"; }}
                      >
                        <Eye size={11} />
                        View Document
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container text-center scroll-reveal">
          <p className="mb-6" style={{ fontFamily: "Lora, serif", color: "#555", fontSize: "1.05rem" }}>
            {get("cta.paragraph")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about">
              <button className="ufn-btn-primary">
                About Ulkatcho <ChevronRight size={14} className="inline ml-1" />
              </button>
            </Link>
            <Link href="/history-of-ulkatcho-first-nation">
              <button className="ufn-btn-outline">
                Our History
              </button>
            </Link>
          </div>
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
