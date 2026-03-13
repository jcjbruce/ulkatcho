/*
 * ULKATCHO FIRST NATION — Home Page
 * Theme: River Stone & Birch
 * 
 * Sections:
 * 1. Emergency Banner (easily editable — see EMERGENCY BANNER comment)
 * 2. Hero with parallax landscape
 * 3. Quick Links
 * 4. Leadership Message (Chief Derech Sill)
 * 5. Community Services
 * 6. Community Departments
 * 7. Land & Culture strip
 * 8. Culture significance section
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Heart, BookOpen, Home as HomeIcon, Trees, DollarSign, Users,
  ArrowRight, MapPin, Phone, Mail, AlertTriangle, ChevronRight
} from "lucide-react";

// ============================================================
// EMERGENCY BANNER — Update the text below to change the banner
// Set SHOW_EMERGENCY_BANNER to false to hide it entirely
// ============================================================
const SHOW_EMERGENCY_BANNER = false;
const EMERGENCY_BANNER_TEXT =
  "NOTICE: Community meeting scheduled for [DATE] at [LOCATION]. All members are encouraged to attend.";
const EMERGENCY_BANNER_LINK = "#";
// ============================================================

const departments = [
  {
    icon: Heart,
    title: "Health & Wellness",
    desc: "Programs and services that support the physical, mental, spiritual, and emotional well-being of community members.",
    href: "/contact#health",
  },
  {
    icon: BookOpen,
    title: "Education & Training",
    desc: "Learning opportunities, student supports, and training programs for youth, adults, and post-secondary students.",
    href: "/education",
  },
  {
    icon: HomeIcon,
    title: "Housing & Capital Works",
    desc: "Safe housing, infrastructure, maintenance, and capital projects that support community needs.",
    href: "/contact#housing",
  },
  {
    icon: Trees,
    title: "Natural Resources",
    desc: "Stewardship of lands, wildlife, and resources, including referrals and environmental management.",
    href: "/contact#natural-resources",
  },
  {
    icon: DollarSign,
    title: "Finance & Administration",
    desc: "Financial services, budgeting, governance support, and administrative operations for the Nation.",
    href: "/contact#finance",
  },
  {
    icon: Users,
    title: "Social Development",
    desc: "Support services for individuals and families, including social assistance and community programs.",
    href: "/contact#social",
  },
];

const cultureItems = [
  { label: "Pine Mushrooms", img: "https://nativeacademy.org/wp-content/uploads/2026/02/jcjbruce_close-up_of_pine_mushrooms_and_soapberries_on_forest_23177d82-09f9-42a6-a7b7-f99db0b5346a_1.png" },
  { label: "Trout & Rivers", img: "https://nativeacademy.org/wp-content/uploads/2026/02/jcjbruce_closeup_of_trout_in_clear_mountain_river_forest_and__26b43ef6-b8a0-4464-8ac7-183c6695c744_1.png" },
  { label: "Our Territory", img: "https://nativeacademy.org/wp-content/uploads/2026/02/jcjbruce_wide_view_of_northern_wilderness_with_river_evergree_a8a597ca-47a9-4c69-be99-602622fc9d8f_1-771x1024.png" },
  { label: "The Land", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/footer-bg-eYuQVBNJBJWnRABpyYsTbv.webp" },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F2E8" }}>
      <Navbar />

      {/* ============================================================
          EMERGENCY BANNER — Edit SHOW_EMERGENCY_BANNER and text above
          ============================================================ */}
      {SHOW_EMERGENCY_BANNER && (
        <div
          className="emergency-pulse fixed top-16 md:top-20 left-0 right-0 z-40 py-3 px-4"
          style={{ backgroundColor: "#B8341B" }}
        >
          <div className="container flex items-center justify-center gap-3">
            <AlertTriangle size={16} style={{ color: "#F7F2E8" }} />
            <p
              className="font-ui text-xs tracking-wider text-center"
              style={{ color: "#F7F2E8", letterSpacing: "0.05em" }}
            >
              {EMERGENCY_BANNER_TEXT}
              {EMERGENCY_BANNER_LINK !== "#" && (
                <a
                  href={EMERGENCY_BANNER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 underline"
                  style={{ color: "#F7F2E8" }}
                >
                  Learn More
                </a>
              )}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          HERO SECTION — Full-bleed parallax landscape
          ============================================================ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "100vh", minHeight: "600px", maxHeight: "900px" }}
      >
        {/* Parallax background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape-XMfDNRn5AqAL8tFS8QhzzA.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: "transform",
          }}
        />
        {/* Gradient overlay — dark at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,24,0.3) 0%, rgba(26,26,24,0.15) 40%, rgba(26,26,24,0.75) 80%, rgba(26,26,24,0.92) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container pb-16 md:pb-20">
            <div className="max-w-3xl">
              <div
                className="ufn-section-label mb-4 animate-fade-in-up"
                style={{
                  animationDelay: "0.1s",
                  color: "#F0C97A",
                  textShadow: "0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)",
                  letterSpacing: "0.22em",
                }}
              >
                Dakelh / Carrier Nation · Anahim Lake, BC
              </div>
              <h1
                className="mb-6 leading-tight animate-fade-in-up"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  color: "#F7F2E8",
                  animationDelay: "0.2s",
                }}
              >
                Rooted in the Land,
                <br />
                <em style={{ color: "#E8C9A0" }}>Strong in Our People</em>
              </h1>
              <p
                className="mb-8 max-w-xl leading-relaxed animate-fade-in-up"
                style={{
                  fontFamily: "Lora, serif",
                  fontSize: "1.1rem",
                  color: "rgba(247, 242, 232, 0.85)",
                  animationDelay: "0.35s",
                }}
              >
                Working together for the health, strength, and future of our Nation —
                guided by the knowledge of Elders and the strength of our youth.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Link href="/about">
                  <button className="ufn-btn-primary">Our Story</button>
                </Link>
                <Link href="/contact">
                  <button className="ufn-btn-outline">Community Services</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
          style={{ color: "rgba(247, 242, 232, 0.5)" }}
        >
          <div
            className="w-px h-12"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(247,242,232,0.5))",
            }}
          />
          <span className="font-ui text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>
            SCROLL
          </span>
        </div>
      </section>

      {/* ============================================================
          QUICK LINKS
          ============================================================ */}
      <section style={{ backgroundColor: "#1C3A1A" }} className="py-0">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Departments", href: "/contact", icon: "🏛" },
              { label: "Education", href: "/education", icon: "📚" },
              { label: "Resources", href: "/resources", icon: "📄" },
              { label: "Member Portal", href: "/member-portal", icon: "🔐" },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <div
                  className="py-5 px-4 flex flex-col items-center gap-2 transition-all duration-200 group"
                  style={{ borderRight: "1px solid rgba(122, 79, 46, 0.3)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(184, 52, 27, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="font-ui text-xs tracking-wider uppercase"
                    style={{ color: "rgba(247, 242, 232, 0.8)" }}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LEADERSHIP MESSAGE
          ============================================================ */}
      <section className="py-20 paper-bg" ref={revealRef}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">Message from Leadership</div>
              <div className="ufn-divider" />
              <h2
                className="mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.15,
                  color: "#1C3A1A",
                }}
              >
                A Message from
                <br />
                Chief and Council
              </h2>
              <p
                className="mb-5 leading-relaxed"
                style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "#3A3530" }}
              >
                The Ulkatcho First Nation is guided by a vision of an independent Nation
                and an interconnected community, working together for all generations. Chief
                and Council are committed to supporting the well-being of members and
                building a strong, sustainable future.
              </p>
              <p
                className="mb-8 leading-relaxed"
                style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "#3A3530" }}
              >
                Through transparent, respectful, and efficient services, leadership works to
                create opportunities for physical, cultural, spiritual, mental, economic, and
                social wellness for all members.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://nativeacademy.org/wp-content/uploads/2026/02/signature-2.png"
                  alt="Chief Derech Sill signature"
                  className="h-14 w-auto object-contain"
                  style={{ filter: "brightness(0.3) sepia(0.5)" }}
                />
                <div>
                  <p
                    className="font-semibold"
                    style={{ fontFamily: "Playfair Display, serif", color: "#1C3A1A" }}
                  >
                    Derech Sill
                  </p>
                  <p
                    className="font-ui text-xs tracking-wider uppercase"
                    style={{ color: "#8A8478" }}
                  >
                    Chief, Ulkatcho First Nation
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/chief-council">
                  <button className="ufn-btn-forest">
                    Meet Chief & Council
                  </button>
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="scroll-reveal relative" style={{ transitionDelay: "0.15s" }}>
              <div
                className="relative overflow-hidden"
                style={{ borderRadius: "2px" }}
              >
                <img
                  src="https://nativeacademy.org/wp-content/uploads/2026/02/derech.jpg"
                  alt="Chief Derech Sill"
                  className="w-full object-cover"
                  style={{ maxHeight: "520px", objectPosition: "top" }}
                />
                {/* Quote overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,26,24,0.9) 0%, transparent 100%)",
                  }}
                >
                  <p
                    className="italic text-lg leading-snug"
                    style={{ fontFamily: "Playfair Display, serif", color: "#F7F2E8" }}
                  >
                    "Working together for the health, strength, and future of our Nation."
                  </p>
                </div>
              </div>
              {/* Decorative border */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full -z-10"
                style={{ border: "2px solid #7A4F2E", borderRadius: "2px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          LAND STRIP — Full-width nature image
          ============================================================ */}
      <div
        className="relative overflow-hidden"
        style={{ height: "320px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/culture-banner-ZDravBPAKPgphgD9Bcqw5Q.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(28, 58, 26, 0.55)" }}
        >
          <div className="text-center">
            <p
              className="font-ui text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(247, 242, 232, 0.7)", letterSpacing: "0.25em" }}
            >
              Our Territory
            </p>
            <h3
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "Playfair Display, serif", color: "#F7F2E8", fontWeight: 600 }}
            >
              Our Homeland,
              <br />
              Since Time Immemorial
            </h3>
          </div>
        </div>
      </div>

      {/* ============================================================
          COMMUNITY SERVICES
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#F7F2E8" }}>
        <div className="container">
          <div className="text-center mb-14 scroll-reveal">
            <div className="ufn-section-label mb-3">Our Community</div>
            <div className="ufn-divider mx-auto" />
            <h2
              className="mt-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#1C3A1A",
              }}
            >
              Community Services
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto"
              style={{ fontFamily: "Lora, serif", color: "#5A5248", fontSize: "1.05rem" }}
            >
              Ulkatcho First Nation provides programs and services that support the health,
              well-being, and future of our members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <Link key={dept.title} href={dept.href}>
                  <div
                    className="ufn-card p-6 h-full scroll-reveal"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(28, 58, 26, 0.08)" }}
                    >
                      <Icon size={20} style={{ color: "#1C3A1A" }} />
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "#1C3A1A",
                      }}
                    >
                      {dept.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ fontFamily: "Lora, serif", color: "#5A5248" }}
                    >
                      {dept.desc}
                    </p>
                    <div
                      className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase"
                      style={{ color: "#B8341B" }}
                    >
                      Learn More <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10 scroll-reveal">
            <Link href="/contact">
              <button className="ufn-btn-forest">View All Departments</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CULTURE & LAND SECTION
          ============================================================ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#1C3A1A" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div
                className="ufn-section-label mb-3"
                style={{ color: "rgba(184, 52, 27, 0.9)" }}
              >
                Our Land, Our Story
              </div>
              <div className="ufn-divider" style={{ backgroundColor: "#7A4F2E" }} />
              <h2
                className="mt-4 mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#F7F2E8",
                  lineHeight: 1.2,
                }}
              >
                Connected to Our Territory
              </h2>
              <p
                className="mb-5 leading-relaxed"
                style={{
                  fontFamily: "Lora, serif",
                  fontSize: "1.05rem",
                  color: "rgba(247, 242, 232, 0.8)",
                }}
              >
                The Anahim Lake plateau and surrounding mountains are our homeland — the
                territory our people have lived on, cared for, and drawn strength from since
                time immemorial. Guided by Elders and traditional knowledge, we work together
                to protect our culture, our wildlife, and the future of our Nation.
              </p>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontFamily: "Lora, serif",
                  fontSize: "1.05rem",
                  color: "rgba(247, 242, 232, 0.8)",
                }}
              >
                The land continues to guide how we live, learn, and work together — through
                pine mushrooms and soapberries, moose and caribou, rivers and trails, the
                Dakelh language, and the wisdom shared between Elders and youth.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Pine Mushrooms", "Moose", "Caribou", "Indian Paintbrush",
                  "Soapberries", "Obsidian", "Trails & Hiking", "Ice Fishing",
                  "Trout", "Rivers", "Dakelh Language", "Elders & Youth",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-ui text-xs tracking-wider px-3 py-1.5"
                    style={{
                      backgroundColor: "rgba(122, 79, 46, 0.3)",
                      color: "rgba(247, 242, 232, 0.8)",
                      border: "1px solid rgba(122, 79, 46, 0.4)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/about">
                <button className="ufn-btn-primary">Our History & Culture</button>
              </Link>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3 scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              {cultureItems.map((item) => (
                <div key={item.label} className="relative overflow-hidden group" style={{ aspectRatio: "1" }}>
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(26,26,24,0.8), transparent)" }}
                  >
                    <span
                      className="font-ui text-xs tracking-wider uppercase"
                      style={{ color: "#F7F2E8" }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT STRIP — Forest trail image
          ============================================================ */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/about-land-Tdq7AzgzPvukSW3GGR5ovS.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(26, 26, 24, 0.65)" }}
        />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center scroll-reveal">
            <div
              className="ufn-section-label mb-4"
              style={{ color: "rgba(184, 52, 27, 0.9)" }}
            >
              A Nation Rooted in Culture
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "#F7F2E8",
              }}
            >
              Guided by Elders,
              <br />
              Strengthened by Youth
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{
                fontFamily: "Lora, serif",
                fontSize: "1.05rem",
                color: "rgba(247, 242, 232, 0.85)",
              }}
            >
                Ulkatcho First Nation is rooted in its homeland, languages, and living
                traditions. Through community programs, education, and cultural initiatives,
                we work together for the well-being of all generations.
            </p>
            <Link href="/about">
              <button className="ufn-btn-primary">Learn Our Story</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT STRIP
          ============================================================ */}
      <section className="py-14" style={{ backgroundColor: "#EDE6D3" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="scroll-reveal">
              <MapPin size={24} className="mx-auto mb-3" style={{ color: "#7A4F2E" }} />
              <p
                className="font-ui text-xs tracking-widest uppercase mb-2"
                style={{ color: "#8A8478" }}
              >
                Address
              </p>
              <p style={{ fontFamily: "Lora, serif", color: "#1C3A1A" }}>
                P.O. Box 3430, Anahim Lake, BC V0L 1C0
              </p>
            </div>
            <div className="scroll-reveal" style={{ transitionDelay: "0.1s" }}>
              <Phone size={24} className="mx-auto mb-3" style={{ color: "#7A4F2E" }} />
              <p
                className="font-ui text-xs tracking-widest uppercase mb-2"
                style={{ color: "#8A8478" }}
              >
                Call Us
              </p>
              <a
                href="tel:+12507423288"
                style={{ fontFamily: "Lora, serif", color: "#1C3A1A" }}
              >
                (250) 742-3288
              </a>
            </div>
            <div className="scroll-reveal" style={{ transitionDelay: "0.2s" }}>
              <Mail size={24} className="mx-auto mb-3" style={{ color: "#7A4F2E" }} />
              <p
                className="font-ui text-xs tracking-widest uppercase mb-2"
                style={{ color: "#8A8478" }}
              >
                Email Us
              </p>
              <a
                href="mailto:info@ulkatcho.ca"
                style={{ fontFamily: "Lora, serif", color: "#1C3A1A" }}
              >
                info@ulkatcho.ca
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
