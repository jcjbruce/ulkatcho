/*
 * ULKATCHO FIRST NATION — Chief & Council Page
 * Theme: River Stone & Birch
 * Uses only approved photos from nativeacademy.org
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Mail } from "lucide-react";

const councillors = [
  { name: "Councillor Breanna Charleyboy", email: "breannacharleyboy@ulkatcho.ca" },
  { name: "Councillor Brad Jimmie", email: "bradleyjimmie@ulkatcho.ca" },
  { name: "Councillor Stella West", email: "stellawest@ulkatcho.ca" },
  { name: "Councillor Lorne Cahoose", email: "lornecahoose@ulkatcho.ca" },
  { name: "Councillor Corinne Cahoose", email: "ccahoose@ulkatcho.ca" },
];

export default function ChiefCouncil() {
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
          backgroundPosition: "center 40%",
          minHeight: "300px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,26,24,0.55), rgba(26,26,24,0.75))" }}
        />
        <div className="container relative z-10 py-16 md:py-20">
          <div className="ufn-section-label mb-3" style={{ color: "rgba(184,52,27,0.9)" }}>
            Leadership
          </div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#F7F2E8",
            }}
          >
            Chief & Council
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#EDE6D3", borderBottom: "1px solid #D8CEB8" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
            <Link href="/"><span className="hover:text-[#1C3A1A] transition-colors">Home</span></Link>
            <span>/</span>
            <Link href="/about"><span className="hover:text-[#1C3A1A] transition-colors">About</span></Link>
            <span>/</span>
            <span style={{ color: "#1C3A1A" }}>Chief & Council</span>
          </nav>
        </div>
      </div>

      <div className="container py-14">
        {/* Group Photo */}
        <div className="mb-14 scroll-reveal">
          <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
            <img
              src="https://nativeacademy.org/wp-content/uploads/2026/02/cnc2025.jpg"
              alt="Chief and Council 2025"
              className="w-full object-cover"
              style={{ maxHeight: "480px", objectPosition: "top" }}
            />
          </div>
          <div
            className="p-4"
            style={{ backgroundColor: "#EDE6D3", borderLeft: "3px solid #7A4F2E" }}
          >
            <p className="text-sm italic" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
              In Order (left to right): Councillor Stella West, Councillor Corrine Cahoose,
              Chief Derech Sill at oath of office signing ceremony — December 1, 2025
            </p>
          </div>
        </div>

        {/* Chief Section */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">Chief</div>
              <div className="ufn-divider" />
              <h2
                className="mt-4 mb-2"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2.25rem", color: "#1C3A1A" }}
              >
                Derech Sill
              </h2>
              <p
                className="font-ui text-xs tracking-wider uppercase mb-6"
                style={{ color: "#8A8478" }}
              >
                Chief, Ulkatcho First Nation
              </p>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Chief Derech Sill leads Ulkatcho First Nation with a commitment to
                transparent governance, community well-being, and the sustainable future of
                the Nation. Elected in 2025, Chief Sill brings a vision of an independent,
                interconnected community working together for all generations.
              </p>
              <p className="mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Under Chief Sill's leadership, the Nation continues to advance its priorities
                in health, education, housing, economic development, and the protection of
                its ancestral lands and the Dakelh language.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://nativeacademy.org/wp-content/uploads/2026/02/signature-2.png"
                  alt="Chief Derech Sill signature"
                  className="h-12 w-auto object-contain"
                  style={{ filter: "brightness(0.3) sepia(0.5)" }}
                />
                <div>
                  <p className="font-semibold" style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A" }}>
                    Derech Sill
                  </p>
                  <p className="font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
                    Chief, Ulkatcho First Nation
                  </p>
                </div>
              </div>
              <a
                href="mailto:chief@ulkatcho.ca"
                className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                style={{ color: "#B8341B" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9A2B15")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8341B")}
              >
                <Mail size={13} />
                chief@ulkatcho.ca
              </a>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                <img
                  src="https://nativeacademy.org/wp-content/uploads/2026/02/derech.jpg"
                  alt="Chief Derech Sill"
                  className="w-full object-cover"
                  style={{ maxHeight: "500px", objectPosition: "top" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(26,26,24,0.85), transparent)" }}
                >
                  <p
                    className="italic"
                    style={{ fontFamily: "Playfair Display, serif", color: "#F7F2E8", fontSize: "1.1rem" }}
                  >
                    "Working together for the health, strength, and future of our Nation."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Council Members */}
        <section>
          <div className="ufn-section-label mb-3 scroll-reveal">Council</div>
          <div className="ufn-divider scroll-reveal" />
          <h2
            className="mt-4 mb-8 scroll-reveal"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2rem", color: "#1C3A1A" }}
          >
            Council Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {councillors.map((c, i) => (
              <div
                key={c.name}
                className="contact-card scroll-reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-3"
                  style={{ backgroundColor: "rgba(28,58,26,0.08)" }}
                >
                  <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, color: "#1C3A1A", fontSize: "1.1rem" }}>
                    {c.name.split(" ").find(w => !["Councillor", "Chief"].includes(w))?.[0]}
                  </span>
                </div>
                <p
                  className="font-semibold mb-1"
                  style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A" }}
                >
                  {c.name}
                </p>
                <p
                  className="font-ui text-xs tracking-wider uppercase mb-3"
                  style={{ color: "#8A8478" }}
                >
                  Councillor
                </p>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{ fontFamily: "Lora, serif", color: "#B8341B" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9A2B15")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8341B")}
                >
                  <Mail size={12} />
                  {c.email}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
