/*
 * ULKATCHO FIRST NATION — Careers Page
 * Theme: River Stone & Birch
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Briefcase, ExternalLink, Users, Star } from "lucide-react";

export default function Careers() {
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
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape-XMfDNRn5AqAL8tFS8QhzzA.webp')`,
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
            Employment Opportunities
          </div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#F7F2E8",
            }}
          >
            Careers
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#EDE6D3", borderBottom: "1px solid #D8CEB8" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
            <Link href="/"><span className="hover:text-[#1C3A1A] transition-colors">Home</span></Link>
            <span>/</span>
            <span style={{ color: "#1C3A1A" }}>Careers</span>
          </nav>
        </div>
      </div>

      <div className="container py-14">
        {/* Priority Policy */}
        <div
          className="mb-12 p-6 scroll-reveal"
          style={{ backgroundColor: "#1C3A1A", borderLeft: "4px solid #B8341B" }}
        >
          <div className="flex items-start gap-4">
            <Star size={22} className="shrink-0 mt-0.5" style={{ color: "#B8341B" }} />
            <div>
              <h2
                className="mb-2"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.3rem", color: "#F7F2E8" }}
              >
                Internal Priority Hiring Policy
              </h2>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "rgba(247,242,232,0.85)", fontSize: "0.95rem" }}>
                Ulkatcho First Nation gives priority consideration to qualified Ulkatcho
                First Nation members for all employment opportunities within the Nation's
                administration and programs. Members are encouraged to apply for all posted
                positions. Please contact the Band Manager/Operations office for information
                on current internal postings.
              </p>
              <p className="mt-3" style={{ fontFamily: "Lora, serif", color: "rgba(247,242,232,0.7)", fontSize: "0.9rem" }}>
                Contact:{" "}
                <a href="mailto:OperationsManager@ulkatcho.ca" className="underline" style={{ color: "#E8C9A0" }}>
                  OperationsManager@ulkatcho.ca
                </a>
                {" "}· ext. 218
              </p>
            </div>
          </div>
        </div>

        {/* Current Postings */}
        <section className="mb-14 scroll-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#1C3A1A" }}
            >
              <Briefcase size={22} style={{ color: "#F7F2E8" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Employment</div>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "1.85rem",
                  color: "#1C3A1A",
                }}
              >
                Current Job Postings
              </h2>
            </div>
          </div>

          {/* Placeholder for job postings */}
          <div
            className="p-10 text-center"
            style={{
              backgroundColor: "#EDE6D3",
              border: "2px dashed #D8CEB8",
            }}
          >
            <Briefcase size={36} className="mx-auto mb-4" style={{ color: "#8A8478" }} />
            <h3
              className="mb-2"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: "#1C3A1A" }}
            >
              No Postings Currently Active
            </h3>
            <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#8A8478" }}>
              Check back regularly or contact the Band Manager for information about upcoming opportunities.
            </p>
            <div className="mt-4">
              <a
                href="mailto:OperationsManager@ulkatcho.ca"
                className="ufn-btn-forest inline-block"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", backgroundColor: "#1C3A1A", color: "#F7F2E8", padding: "0.75rem 2rem", display: "inline-block" }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Partner Opportunities */}
        <section className="scroll-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-12 h-12 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#7A4F2E" }}
            >
              <Users size={22} style={{ color: "#F7F2E8" }} />
            </div>
            <div>
              <div className="ufn-section-label mb-1">Partner Organizations</div>
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "1.85rem",
                  color: "#1C3A1A",
                }}
              >
                Artemis Gold Opportunities
              </h2>
            </div>
          </div>

          <p
            className="mb-8 max-w-2xl"
            style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}
          >
            Artemis Gold is a key industry partner of Ulkatcho First Nation. Members are
            encouraged to explore employment and business opportunities through Artemis Gold's
            Blackwater Gold Project, which is located within the Nation's traditional territory.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="http://artemisgoldinc.com/careers/current-opportunities/"
              target="_blank"
              rel="noopener noreferrer"
              className="ufn-card p-6 block"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(28,58,26,0.08)" }}
                >
                  <Briefcase size={18} style={{ color: "#1C3A1A" }} />
                </div>
                <div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.1rem", color: "#1C3A1A" }}
                  >
                    Artemis Gold — Current Careers
                  </h3>
                  <p className="text-sm mb-3" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
                    Browse current employment opportunities at Artemis Gold's Blackwater
                    Gold Project and other operations.
                  </p>
                  <div className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase" style={{ color: "#B8341B" }}>
                    <ExternalLink size={11} /> View Opportunities
                  </div>
                </div>
              </div>
            </a>

            <a
              href="http://artemisgoldinc.com/blackwater-community/business-directory/"
              target="_blank"
              rel="noopener noreferrer"
              className="ufn-card p-6 block"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(122,79,46,0.1)" }}
                >
                  <Users size={18} style={{ color: "#7A4F2E" }} />
                </div>
                <div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "1.1rem", color: "#1C3A1A" }}
                  >
                    Artemis Gold — Business Directory
                  </h3>
                  <p className="text-sm mb-3" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
                    Explore business opportunities and the community business directory
                    for the Blackwater Gold Project area.
                  </p>
                  <div className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase" style={{ color: "#B8341B" }}>
                    <ExternalLink size={11} /> View Directory
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
