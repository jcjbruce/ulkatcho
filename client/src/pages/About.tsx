/*
 * ULKATCHO FIRST NATION — About Page
 * Design: Green "River Stone & Birch" layout recolored to Steel Blue / Navy / Gold
 * Hub page with Vision, History, Ancestral Origins, Travellers sections + links to sub-pages
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import DocumentPreview, { useDocumentPreview } from "@/components/DocumentPreview";
import { Link } from "wouter";
import { FileText, Eye } from "lucide-react";

const KEY_DOCUMENTS = [
  { title: "Strategic Plan 2022\u20132027", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/THE%20UFN%20STRATEGIC%20PLAN%202022%20-%202027_f6cd9bb5.pdf", type: "PDF" },
  { title: "Health & Wellness Plan 2022\u20132027", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UFN%20HEALTH%20AND%20WELLNESS%20PLAN%20%2822-27%29_97ca3189.pdf", type: "PDF" },
  { title: "Health Evaluation Plan 2024\u20132027", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/UFN%20HEALTH%20AND%20WELLNESS%20EVALUATION%20PLAN%20%2824-27%29_873be218.pdf", type: "PDF" },
  { title: "Total Resource Plan", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/TOTAL%20RESOURCE%20PLAN_0d84c896.pdf", type: "PDF" },
  { title: "Traditional Territory Map", url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/Map%20of%20Our%20Traditional%20Territory_c5160fca.pdf", type: "PDF" },
];

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/culture-banner-ZDravBPAKPgphgD9Bcqw5Q.webp";
const CULTURE_STRIP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/culture-banner-ZDravBPAKPgphgD9Bcqw5Q.webp";
const TERRITORY_IMAGE = "https://nativeacademy.org/wp-content/uploads/2026/02/jcjbruce_wide_view_of_northern_wilderness_with_river_evergree_a8a597ca-47a9-4c69-be99-602622fc9d8f_1-771x1024.png";

export default function About() {
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
        label="About Ulkatcho First Nation"
        heading="Our Nation, Our Story"
        bgPosition="center 30%"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* ============================================================
          OUR VISION & FUTURE
          ============================================================ */}
      <section id="vision" className="py-20" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">Our Vision</div>
              <div className="ufn-divider" />
              <h2 className="mt-4 mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1a2e5a" }}>
                Our Vision & Future
              </h2>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                Ulkatcho First Nation envisions an independent Nation and an interconnected community — one where all generations thrive together. Our vision is rooted in the land, guided by our Elders, and carried forward by our youth.
              </p>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                We are committed to building a Nation where members have access to quality housing, education, health services, and economic opportunities — all while maintaining and strengthening our cultural identity as Dakelh / Carrier people.
              </p>
              <p className="mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                Our priorities include self-determination, transparent governance, environmental stewardship of our ancestral territories, and the revitalization of the Dakelh language and cultural practices for future generations.
              </p>
              <Link href="/vision-future">
                <button className="ufn-btn-primary">Our Vision & Future</button>
              </Link>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="p-8" style={{ backgroundColor: "#1a2e5a", borderLeft: "4px solid #c9a227" }}>
                <p className="text-xl italic leading-relaxed mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#ffffff" }}>
                  "An independent Nation and an interconnected community, working together for all generations."
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
                      <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#c9a227" }} />
                      <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.85)" }}>{item}</p>
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
      <section id="history" className="py-20" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto scroll-reveal">
            <div className="ufn-section-label mb-3">Our Past</div>
            <div className="ufn-divider" />
            <h2 className="mt-4 mb-8" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1a2e5a" }}>
              History of UFN
            </h2>
            <div className="space-y-5">
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                The Ulkatcho First Nation is a Dakelh (Carrier) Nation whose people have inhabited the Chilcotin plateau and surrounding mountain territories of central British Columbia since time immemorial. The name "Ulkatcho" refers to the people of the high country — a reflection of the elevated, rugged landscape that has shaped the culture and identity of this Nation.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                Historically, the Ulkatcho people were semi-nomadic, following seasonal patterns of the land — harvesting pine mushrooms and soapberries in the forests, fishing for trout in the clear mountain rivers, hunting moose and caribou across vast territories, and gathering at seasonal camps to share knowledge and ceremony.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                The community is centered in Anahim Lake, BC, a remote community in the Chilcotin region. Despite the challenges of colonization, the Ulkatcho people have maintained a deep connection to their territory, language, and traditions.
              </p>
              <p className="leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                Today, Ulkatcho First Nation is a registered band under the Indian Act with an elected Chief and Council. The Nation has been actively involved in land use planning, forestry agreements, and economic development initiatives that reflect both traditional values and contemporary needs.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/history-of-ulkatcho-first-nation">
                <button className="ufn-btn-primary">Read Full History</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CULTURE STRIP
          ============================================================ */}
      <div className="relative overflow-hidden" style={{ height: "280px" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url('${CULTURE_STRIP}')`, backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(26,46,90,0.65)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-center text-2xl md:text-3xl italic px-6" style={{ fontFamily: "Playfair Display, serif", color: "#ffffff", maxWidth: "700px" }}>
            "The land continues to guide how we live, learn, and work together as a Nation."
          </p>
        </div>
      </div>

      {/* ============================================================
          ANCESTRAL ORIGINS
          ============================================================ */}
      <section id="origins" className="py-20" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">Our Roots</div>
              <div className="ufn-divider" />
              <h2 className="mt-4 mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#1a2e5a" }}>
                Ancestral Origins
              </h2>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                The Ulkatcho people are part of the broader Dakelh (Carrier) Nation, one of the largest Indigenous language groups in British Columbia. The Dakelh language belongs to the Athabaskan language family and is spoken across a vast territory in central BC.
              </p>
              <p className="mb-4 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                The ancestral territory of Ulkatcho First Nation encompasses the Anahim Lake area, the Itcha-Ilgachuz mountain ranges, the Dean River watershed, and extensive plateau lands. This territory is rich in wildlife — moose, caribou, grizzly bear, wolves — and in cultural significance, marked by ancient trails, obsidian quarry sites, and places of ceremony.
              </p>
              <p className="mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#333", fontSize: "1.05rem" }}>
                Obsidian — volcanic glass found in the territory — was historically traded across vast distances, evidence of the Ulkatcho people's role as skilled travellers and traders long before European contact.
              </p>
              <Link href="/ancestral-origins">
                <button className="ufn-btn-primary">Read More</button>
              </Link>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                <img src={TERRITORY_IMAGE} alt="Ulkatcho ancestral territory" className="w-full object-cover" style={{ maxHeight: "480px" }} />
              </div>
              <div className="mt-4 p-4" style={{ backgroundColor: "#c8d5e0", borderLeft: "3px solid #8b6420" }}>
                <p className="text-sm italic" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                  The Ulkatcho territory spans the Chilcotin plateau and surrounding mountain ranges — a landscape of rivers, forests, and high alpine meadows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TRAVELLERS & ENTREPRENEURS
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#1a2e5a" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <div className="ufn-section-label mb-3" style={{ color: "#c9a227" }}>Our Spirit</div>
            <div className="ufn-divider mx-auto" style={{ backgroundColor: "#8b6420" }} />
            <h2 className="mt-4 mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "#ffffff" }}>
              Travellers & Entrepreneurs
            </h2>
            <p className="mb-5 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)" }}>
              The Ulkatcho people have always been entrepreneurial by nature. Long before European contact, they were skilled traders who moved obsidian and other goods across vast networks connecting interior and coastal peoples. This spirit of enterprise and adaptability continues today.
            </p>
            <p className="mb-8 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)" }}>
              Through the Ulkatcho Group of Companies and partnerships with resource industries, the Nation continues to build economic strength while protecting its lands and asserting its rights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10">
              {[
                { title: "Ulkatcho Group of Companies", desc: "Building economic strength through business partnerships and resource development aligned with community values." },
                { title: "Clean Energy", desc: "Investing in clean energy projects that benefit the community and protect the environment for future generations." },
                { title: "Alliance Agreements", desc: "Five Alliance Agreements signed with industry partners, creating employment and economic opportunity for members." },
              ].map((item) => (
                <div key={item.title} className="p-5 scroll-reveal" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,162,39,0.3)" }}>
                  <h3 className="mb-3" style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: "#ffffff", fontSize: "1.1rem" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.7)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/travellers-and-entrepreneurs">
                <button className="ufn-btn-outline">Read More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          KEY DOCUMENTS
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="text-center mb-10 scroll-reveal">
            <div className="ufn-section-label mb-3">Key Documents</div>
            <div className="ufn-divider mx-auto" />
            <h2 className="mt-4 mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "#1a2e5a" }}>
              Plans & Reports
            </h2>
            <p className="max-w-2xl mx-auto" style={{ fontFamily: "Lora, serif", color: "#555", fontSize: "1rem" }}>
              Access the Nation's key governance and planning documents.
            </p>
          </div>
          <div className="space-y-3">
            {KEY_DOCUMENTS.map((doc, i) => (
              <div
                key={doc.title}
                className="flex items-center gap-4 p-5 scroll-reveal transition-all duration-200"
                style={{
                  backgroundColor: "#e8eef4",
                  border: "1px solid #b8c8d6",
                  borderLeft: "4px solid #1a2e5a",
                  boxShadow: "0 1px 4px rgba(26,46,90,0.06)",
                  transitionDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(26,46,90,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(26,46,90,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(26,46,90,0.08)" }}>
                  <FileText size={18} style={{ color: "#1a2e5a" }} />
                </div>
                <p className="flex-1 font-medium" style={{ fontFamily: "Lora, serif", color: "#1a2e5a", fontSize: "0.95rem" }}>
                  {doc.title}
                </p>
                <button
                  onClick={() => openPreview(doc.url, doc.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-ui text-xs tracking-wider uppercase transition-colors duration-200 cursor-pointer border-0 rounded"
                  style={{ backgroundColor: "#1a2e5a", color: "#ffffff" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a"; }}
                >
                  <Eye size={12} /> View Document
                </button>
              </div>
            ))}
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
