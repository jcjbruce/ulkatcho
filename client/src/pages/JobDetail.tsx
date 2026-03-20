/*
 * ULKATCHO FIRST NATION — Job Detail Page (Placeholder)
 * Will be connected to backend via Claude later.
 * For now shows the job title and a placeholder description.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useParams } from "wouter";
import { Briefcase, ArrowLeft, MapPin, Clock, Mail } from "lucide-react";
import ProtectedEmail from "@/components/ProtectedEmail";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape_dc4795fe.jpg";

export default function JobDetail() {
  const params = useParams<{ slug: string }>();
  const jobTitle = decodeURIComponent(params.slug || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      {/* Hero */}
      <div
        className="relative pt-16 md:pt-20 overflow-hidden"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          minHeight: "280px",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,46,90,0.5), rgba(26,46,90,0.75))" }} />
        <div className="container relative z-10 py-14 md:py-20">
          <div className="ufn-section-label mb-3" style={{ color: "#c9a227" }}>Employment Opportunity</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#ffffff" }}>
            {jobTitle}
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#c8d5e0", borderBottom: "1px solid #b8c8d6" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8b6420" }}>
            <Link href="/"><span className="hover:text-[#1a2e5a] transition-colors cursor-pointer">Home</span></Link>
            <span>/</span>
            <Link href="/careers"><span className="hover:text-[#1a2e5a] transition-colors cursor-pointer">Careers</span></Link>
            <span>/</span>
            <span style={{ color: "#1a2e5a" }}>{jobTitle}</span>
          </nav>
        </div>
      </div>

      <div className="container py-14" style={{ maxWidth: "900px" }}>
        {/* Back link */}
        <Link href="/careers">
          <div className="flex items-center gap-2 mb-8 cursor-pointer group" style={{ color: "#c9a227" }}>
            <ArrowLeft size={16} />
            <span className="font-ui text-xs tracking-wider uppercase group-hover:underline">Back to All Careers</span>
          </div>
        </Link>

        {/* Job info card */}
        <div className="ufn-card p-8 mb-8" style={{ borderRadius: 0 }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ backgroundColor: "#1a2e5a" }}>
              <Briefcase size={22} style={{ color: "#c9a227" }} />
            </div>
            <div>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
                {jobTitle}
              </h2>
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                  <MapPin size={14} style={{ color: "#8b6420" }} /> Anahim Lake, BC
                </span>
                <span className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                  <Clock size={14} style={{ color: "#8b6420" }} /> Open Until Filled
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-px mb-6" style={{ backgroundColor: "#dce6ef" }} />

          <div className="space-y-5" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1rem", lineHeight: 1.75 }}>
            <p>
              Full job description and requirements will be available soon. Ulkatcho First Nation gives priority consideration to qualified Ulkatcho First Nation members for all employment opportunities.
            </p>
            <p>
              For more information about this position, please contact the Operations Manager.
            </p>
          </div>

          <div className="w-full h-px my-6" style={{ backgroundColor: "#dce6ef" }} />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Mail size={16} style={{ color: "#c9a227" }} />
              <span className="text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>Apply or inquire:</span>
              <ProtectedEmail user="OperationsManager" domain="ulkatcho.ca" />
            </div>
          </div>
        </div>

        <p className="text-center text-sm" style={{ fontFamily: "Lora, serif", color: "#8b6420" }}>
          Ulkatcho First Nation is an equal opportunity employer. Priority will be given to qualified UFN members.
        </p>
      </div>

      <Footer />
    </div>
  );
}
