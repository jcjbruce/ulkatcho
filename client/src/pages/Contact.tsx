/*
 * ULKATCHO FIRST NATION — Contact & Departments Page
 * Theme: River Stone & Birch
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Mail, Phone, MapPin, User } from "lucide-react";

const chiefCouncil = [
  { name: "Chief Derech Sill", role: "Chief", email: "chief@ulkatcho.ca" },
  { name: "Councillor Breanna Charleyboy", role: "Councillor", email: "breannacharleyboy@ulkatcho.ca" },
  { name: "Councillor Brad Jimmie", role: "Councillor", email: "bradleyjimmie@ulkatcho.ca" },
  { name: "Councillor Stella West", role: "Councillor", email: "stellawest@ulkatcho.ca" },
  { name: "Councillor Lorne Cahoose", role: "Councillor", email: "lornecahoose@ulkatcho.ca" },
  { name: "Councillor Corinne Cahoose", role: "Councillor", email: "ccahoose@ulkatcho.ca" },
];

const departments = [
  {
    id: "education",
    name: "Education Director",
    person: "Joy Holte",
    email: "educationdirector@ulkatcho.ca",
    phone: "250-742-3260",
    ext: "210",
  },
  {
    id: "postsecondary",
    name: "Post Secondary",
    person: "Corrine Cahoose",
    email: "postsecondary@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "209",
  },
  {
    id: "k12",
    name: "K-12 Liaison",
    person: "",
    email: "k-12liaison@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "212",
  },
  {
    id: "housing",
    name: "Housing & Capital Works",
    person: "Omid Zareian",
    email: "assets@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "208",
  },
  {
    id: "health",
    name: "Health Clinic",
    person: "",
    email: "healthdirector@ulkatcho.ca",
    phone: "250-742-2090",
    ext: "",
  },
  {
    id: "natural-resources",
    name: "Natural Resources",
    person: "Alyisha Knapp",
    email: "naturalresources@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "205",
  },
  {
    id: "referrals",
    name: "Referrals",
    person: "Breanna Charleyboy",
    email: "referrals@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "221",
  },
  {
    id: "finance",
    name: "Finance",
    person: "",
    email: "financedirector@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "202",
  },
  {
    id: "social",
    name: "Social Development",
    person: "Clara Cahoose",
    email: "saintake@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "215",
  },
  {
    id: "registry",
    name: "Indian Registry",
    person: "Liz Anderson",
    email: "landerson@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "220",
  },
  {
    id: "operations",
    name: "Band Manager / Operations",
    person: "",
    email: "OperationsManager@ulkatcho.ca",
    phone: "250-742-3288",
    ext: "218",
  },
];

export default function Contact() {
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
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/footer-bg-eYuQVBNJBJWnRABpyYsTbv.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          minHeight: "300px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(26,26,24,0.6), rgba(26,26,24,0.8))" }}
        />
        <div className="container relative z-10 py-16 md:py-20">
          <div className="ufn-section-label mb-3" style={{ color: "rgba(184,52,27,0.9)" }}>
            Get in Touch
          </div>
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#F7F2E8",
            }}
          >
            Contact & Departments
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#EDE6D3", borderBottom: "1px solid #D8CEB8" }}>
        <div className="container py-3">
          <nav className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase" style={{ color: "#8A8478" }}>
            <Link href="/"><span className="hover:text-[#1C3A1A] transition-colors">Home</span></Link>
            <span>/</span>
            <span style={{ color: "#1C3A1A" }}>Contact</span>
          </nav>
        </div>
      </div>

      <div className="container py-14">
        {/* Main contact info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 scroll-reveal">
          <div
            className="p-6 text-center"
            style={{ backgroundColor: "#1C3A1A" }}
          >
            <MapPin size={28} className="mx-auto mb-3" style={{ color: "#B8341B" }} />
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(247,242,232,0.6)" }}>
              Address
            </p>
            <p style={{ fontFamily: "Lora, serif", color: "#F7F2E8" }}>
              P.O. Box 3430<br />Anahim Lake, BC V0L 1C0
            </p>
          </div>
          <div
            className="p-6 text-center"
            style={{ backgroundColor: "#1C3A1A" }}
          >
            <Phone size={28} className="mx-auto mb-3" style={{ color: "#B8341B" }} />
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(247,242,232,0.6)" }}>
              Main Office
            </p>
            <a href="tel:+12507423288" style={{ fontFamily: "Lora, serif", color: "#F7F2E8" }}>
              (250) 742-3288
            </a>
            <p className="mt-2" style={{ fontFamily: "Lora, serif", color: "rgba(247,242,232,0.6)", fontSize: "0.85rem" }}>
              Health Clinic: (250) 742-2090
            </p>
          </div>
          <div
            className="p-6 text-center"
            style={{ backgroundColor: "#1C3A1A" }}
          >
            <Mail size={28} className="mx-auto mb-3" style={{ color: "#B8341B" }} />
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(247,242,232,0.6)" }}>
              Email
            </p>
            <a href="mailto:info@ulkatcho.ca" style={{ fontFamily: "Lora, serif", color: "#F7F2E8" }}>
              info@ulkatcho.ca
            </a>
          </div>
        </div>

        {/* Chief & Council */}
        <section className="mb-14">
          <div className="ufn-section-label mb-3 scroll-reveal">Leadership</div>
          <div className="ufn-divider scroll-reveal" />
          <h2
            className="mt-4 mb-8 scroll-reveal"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2rem", color: "#1C3A1A" }}
          >
            Chief and Council
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chiefCouncil.map((person, i) => (
              <div
                key={person.name}
                className="contact-card scroll-reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(28,58,26,0.08)" }}
                  >
                    <User size={16} style={{ color: "#1C3A1A" }} />
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-0.5"
                      style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A", fontSize: "1rem" }}
                    >
                      {person.name}
                    </p>
                    <p
                      className="font-ui text-xs tracking-wider uppercase mb-2"
                      style={{ color: "#8A8478" }}
                    >
                      {person.role}
                    </p>
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-1.5 text-sm transition-colors duration-200"
                      style={{ fontFamily: "Lora, serif", color: "#B8341B" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9A2B15")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8341B")}
                    >
                      <Mail size={12} />
                      {person.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 scroll-reveal">
            <Link href="/chief-council">
              <button className="ufn-btn-forest">View Chief & Council Page</button>
            </Link>
          </div>
        </section>

        {/* Departments */}
        <section>
          <div className="ufn-section-label mb-3 scroll-reveal">Administration</div>
          <div className="ufn-divider scroll-reveal" />
          <h2
            className="mt-4 mb-8 scroll-reveal"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2rem", color: "#1C3A1A" }}
          >
            Community Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept, i) => (
              <div
                key={dept.id}
                id={dept.id}
                className="contact-card scroll-reveal"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div
                  className="font-ui text-xs tracking-widest uppercase mb-1"
                  style={{ color: "#B8341B" }}
                >
                  {dept.name}
                </div>
                {dept.person && (
                  <p
                    className="font-semibold mb-2"
                    style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A" }}
                  >
                    {dept.person}
                  </p>
                )}
                <div className="flex flex-col gap-1.5">
                  <a
                    href={`mailto:${dept.email}`}
                    className="flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ fontFamily: "Lora, serif", color: "#5A5248" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#B8341B")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#5A5248")}
                  >
                    <Mail size={12} style={{ color: "#7A4F2E" }} />
                    {dept.email}
                  </a>
                  <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "Lora, serif", color: "#5A5248" }}>
                    <Phone size={12} style={{ color: "#7A4F2E" }} />
                    <a href={`tel:+1${dept.phone.replace(/-/g, "")}`} style={{ color: "#5A5248" }}>
                      {dept.phone}
                    </a>
                    {dept.ext && (
                      <span style={{ color: "#8A8478" }}>ext. {dept.ext}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
