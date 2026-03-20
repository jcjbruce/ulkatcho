/*
 * ULKATCHO FIRST NATION — Chief & Council Page
 * Design: Green "River Stone & Birch" layout recolored to Steel Blue / Navy / Gold
 * Hero with breadcrumb, scroll reveals, ceremony photos, contact table
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import { Link } from "wouter";
import ProtectedEmail from "@/components/ProtectedEmail";

const CNC_PHOTO_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/cnc-photo1-oath_55a9dac7.jpg";
const CNC_PHOTO_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/cnc-photo2-signing_3148f0c2.jpg";

const council = [
  { name: "Chief Derech Sill", email: "chief@ulkatcho.ca" },
  { name: "Councillor Breanna Charleyboy", email: "breannacharleyboy@ulkatcho.ca" },
  { name: "Councillor Brad Jimmie", email: "bradleyjimmie@ulkatcho.ca" },
  { name: "Councillor Stella West", email: "stellawest@ulkatcho.ca" },
  { name: "Councillor Lorne Cahoose", email: "lornecahoose@ulkatcho.ca" },
  { name: "Councillor Corinne Cahoose", email: "ccahoose@ulkatcho.ca" },
];

export default function ChiefCouncil() {
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
        heading="Chief & Council"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Chief & Council" },
        ]}
      />

      <div className="container py-14">
        {/* Ceremony Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          {[
            {
              src: CNC_PHOTO_1,
              alt: "Chief and Council Oath of Office ceremony April 2025",
              caption: "From left to right: Councillor Stella West, Councillor Lorne Cahoose, Councillor Corinne Cahoose, Councillor Breanna Charleyboy, Former Chief Charlie Williams, Councillor Brad Jimmie.",
            },
            {
              src: CNC_PHOTO_2,
              alt: "Chief Derech Sill oath of office signing ceremony December 2025",
              caption: "From left to right: Councillor Stella West, Councillor Corrine Cahoose, Chief Derech Sill.",
            },
          ].map((photo, i) => (
            <div
              key={i}
              className="scroll-reveal overflow-hidden"
              style={{
                transitionDelay: `${i * 0.1}s`,
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 24px rgba(26,46,90,0.10)",
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div style={{ borderTop: "3px solid #c9a227", padding: "1.25rem 1.5rem" }}>
                <p style={{ fontFamily: "Lora, serif", fontSize: "0.9rem", color: "#555", lineHeight: 1.6, margin: 0 }}>
                  <span style={{ color: "#8b6420", fontWeight: 600 }}>From left to right:</span>{" "}
                  {photo.caption.replace("From left to right: ", "")}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Table */}
        <div className="scroll-reveal">
          <div className="flex items-center gap-4 mb-6 mx-auto" style={{ maxWidth: "720px" }}>
            <div className="ufn-section-label">Contact Information</div>
            <div className="flex-1 ufn-divider" />
          </div>

          <div className="overflow-x-auto mx-auto" style={{ boxShadow: "0 2px 12px rgba(26,46,90,0.06)", maxWidth: "720px" }}>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#1a2e5a" }}>
                  <th className="px-5 py-3 text-left font-ui text-xs tracking-wider uppercase" style={{ color: "#c9a227" }}>Name</th>
                  <th className="px-5 py-3 text-left font-ui text-xs tracking-wider uppercase" style={{ color: "#c9a227" }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {council.map((member, i) => (
                  <tr
                    key={member.name}
                    className="transition-colors duration-150"
                    style={{
                      backgroundColor: "#ffffff",
                      borderBottom: "1px solid #dce6ef",
                    }}
                  >
                    <td
                      className="px-5 py-3.5 font-semibold text-sm"
                      style={{ fontFamily: "Lora, serif", color: "#1a2e5a", width: "50%" }}
                    >
                      {member.name}
                    </td>
                    <td className="px-5 py-3.5 text-sm" style={{ width: "50%" }}>
                      <ProtectedEmail
                        user={member.email.split("@")[0]}
                        domain={member.email.split("@")[1]}
                        showIcon={false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
