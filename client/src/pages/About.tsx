/*
 * ULKATCHO FIRST NATION — About Page
 * Theme: River Stone & Birch
 * Sections: Vision & Future, History, Ancestral Origins, Travellers & Entrepreneurs
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function About() {
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
          backgroundPosition: "center 30%",
          minHeight: "380px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,24,0.5) 0%, rgba(26,26,24,0.7) 100%)",
          }}
        />
        <div className="container relative z-10 py-20 md:py-28">
          <div className="ufn-section-label mb-3" style={{ color: "rgba(184,52,27,0.9)" }}>
            About Ulkatcho First Nation
          </div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#F7F2E8",
              lineHeight: 1.15,
            }}
          >
            Our Nation, Our Story
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#EDE6D3", borderBottom: "1px solid #D8CEB8" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
            <Link href="/"><span className="hover:text-[#1C3A1A] transition-colors">Home</span></Link>
            <span>/</span>
            <span style={{ color: "#1C3A1A" }}>About Us</span>
          </nav>
        </div>
      </div>

      {/* ============================================================
          OUR VISION & FUTURE
          ============================================================ */}
      <section id="vision" className="py-20 paper-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">Our Vision</div>
              <div className="ufn-divider" />
              <h2
                className="mt-4 mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#1C3A1A",
                }}
              >
                Our Vision & Future
              </h2>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Ulkatcho First Nation envisions an independent Nation and an interconnected
                community — one where all generations thrive together. Our vision is rooted
                in the land, guided by our Elders, and carried forward by our youth.
              </p>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                We are committed to building a Nation where members have access to quality
                housing, education, health services, and economic opportunities — all while
                maintaining and strengthening our cultural identity as Dakelh / Carrier people.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Our priorities include self-determination, transparent governance, environmental
                stewardship of our ancestral territories, and the revitalization of the Dakelh
                language and cultural practices for future generations.
              </p>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              <div
                className="p-8"
                style={{
                  backgroundColor: "#1C3A1A",
                  borderLeft: "4px solid #B8341B",
                }}
              >
                <p
                  className="text-xl italic leading-relaxed mb-6"
                  style={{ fontFamily: "Playfair Display, serif", color: "#F7F2E8" }}
                >
                  "An independent Nation and an interconnected community, working together
                  for all generations."
                </p>
                <div className="space-y-4">
                  {[
                    "Self-determination and strong governance",
                    "Health, wellness, and cultural vitality",
                    "Economic development and opportunity",
                    "Environmental stewardship of our lands",
                    "Dakelh language revitalization",
                    "Strength through Elders and youth",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: "#B8341B" }}
                      />
                      <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "rgba(247,242,232,0.85)" }}>
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HISTORY
          ============================================================ */}
      <section id="history" className="py-20" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto scroll-reveal">
            <div className="ufn-section-label mb-3">Our Past</div>
            <div className="ufn-divider" />
            <h2
              className="mt-4 mb-8"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#1C3A1A",
              }}
            >
              History of UFN
            </h2>
            <div className="space-y-5">
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                The Ulkatcho First Nation is a Dakelh (Carrier) Nation whose people have
                inhabited the Chilcotin plateau and surrounding mountain territories of
                central British Columbia since time immemorial. The name "Ulkatcho" refers
                to the people of the high country — a reflection of the elevated, rugged
                landscape that has shaped the culture and identity of this Nation.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Historically, the Ulkatcho people were semi-nomadic, following seasonal
                patterns of the land — harvesting pine mushrooms and soapberries in the
                forests, fishing for trout in the clear mountain rivers, hunting moose and
                caribou across vast territories, and gathering at seasonal camps to share
                knowledge and ceremony.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                The community is centered in Anahim Lake, BC, a remote community in the
                Chilcotin region. Despite the challenges of colonization, the Ulkatcho people
                have maintained a deep connection to their territory, language, and traditions.
                The Nation continues to assert its rights and title over its ancestral lands
                through governance, resource management, and cultural revitalization.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Today, Ulkatcho First Nation is a registered band under the Indian Act with
                an elected Chief and Council. The Nation has been actively involved in land
                use planning, forestry agreements, and economic development initiatives that
                reflect both traditional values and contemporary needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CULTURE STRIP
          ============================================================ */}
      <div
        className="relative overflow-hidden"
        style={{ height: "280px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/culture-banner-ZDravBPAKPgphgD9Bcqw5Q.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(28, 58, 26, 0.6)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="text-center text-2xl md:text-3xl italic px-6"
            style={{ fontFamily: "Playfair Display, serif", color: "#F7F2E8", maxWidth: "700px" }}
          >
            "The land continues to guide how we live, learn, and work together as a Nation."
          </p>
        </div>
      </div>

      {/* ============================================================
          ANCESTRAL ORIGINS
          ============================================================ */}
      <section id="origins" className="py-20 paper-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">Our Roots</div>
              <div className="ufn-divider" />
              <h2
                className="mt-4 mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#1C3A1A",
                }}
              >
                Ancestral Origins
              </h2>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                The Ulkatcho people are part of the broader Dakelh (Carrier) Nation, one of
                the largest Indigenous language groups in British Columbia. The Dakelh
                language belongs to the Athabaskan language family and is spoken across a
                vast territory in central BC.
              </p>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                The ancestral territory of Ulkatcho First Nation encompasses the Anahim Lake
                area, the Itcha-Ilgachuz mountain ranges, the Dean River watershed, and
                extensive plateau lands. This territory is rich in wildlife — moose, caribou,
                grizzly bear, wolves — and in cultural significance, marked by ancient trails,
                obsidian quarry sites, and places of ceremony.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#3A3530", fontSize: "1.05rem" }}>
                Obsidian — volcanic glass found in the territory — was historically traded
                across vast distances, evidence of the Ulkatcho people's role as skilled
                travellers and traders long before European contact. These trade networks
                connected the Dakelh people to coastal nations and interior peoples across
                what is now BC and beyond.
              </p>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "2px" }}
              >
                <img
                  src="https://nativeacademy.org/wp-content/uploads/2026/02/jcjbruce_wide_view_of_northern_wilderness_with_river_evergree_a8a597ca-47a9-4c69-be99-602622fc9d8f_1-771x1024.png"
                  alt="Ulkatcho ancestral territory"
                  className="w-full object-cover"
                  style={{ maxHeight: "480px" }}
                />
              </div>
              <div
                className="mt-4 p-4"
                style={{ backgroundColor: "#EDE6D3", borderLeft: "3px solid #7A4F2E" }}
              >
                <p
                  className="text-sm italic"
                  style={{ fontFamily: "Lora, serif", color: "#5A5248" }}
                >
                  The Ulkatcho territory spans the Chilcotin plateau and surrounding mountain
                  ranges — a landscape of rivers, forests, and high alpine meadows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TRAVELLERS & ENTREPRENEURS
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#1C3A1A" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <div className="ufn-section-label mb-3" style={{ color: "rgba(184,52,27,0.9)" }}>
              Our Spirit
            </div>
            <div className="ufn-divider mx-auto" style={{ backgroundColor: "#7A4F2E" }} />
            <h2
              className="mt-4 mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#F7F2E8",
              }}
            >
              Travellers & Entrepreneurs
            </h2>
            <p
              className="mb-5 leading-relaxed"
              style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(247,242,232,0.8)" }}
            >
              The Ulkatcho people have always been entrepreneurial by nature. Long before
              European contact, they were skilled traders who moved obsidian and other goods
              across vast networks connecting interior and coastal peoples. This spirit of
              enterprise and adaptability continues today.
            </p>
            <p
              className="mb-8 leading-relaxed"
              style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(247,242,232,0.8)" }}
            >
              Through the Ulkatcho Group of Companies and partnerships with resource
              industries, the Nation continues to build economic strength while protecting
              its lands and asserting its rights. The same spirit that drove ancient trade
              routes now drives modern economic development — always rooted in the land and
              guided by community values.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10">
              {[
                {
                  title: "Ulkatcho Group of Companies",
                  desc: "Building economic strength through business partnerships and resource development aligned with community values.",
                },
                {
                  title: "Clean Energy",
                  desc: "Investing in clean energy projects that benefit the community and protect the environment for future generations.",
                },
                {
                  title: "Alliance Agreements",
                  desc: "Five Alliance Agreements signed with industry partners, creating employment and economic opportunity for members.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 scroll-reveal"
                  style={{ backgroundColor: "rgba(247,242,232,0.07)", border: "1px solid rgba(122,79,46,0.3)" }}
                >
                  <h3
                    className="mb-3"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: "#F7F2E8", fontSize: "1.1rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "Lora, serif", color: "rgba(247,242,232,0.7)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
