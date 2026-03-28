/*
 * ULKATCHO FIRST NATION — Home Page
 * Design: "River Stone & Birch" layout elements recolored to Steel Blue / Navy / Gold
 * Parallax hero, decorative photo borders, culture tags, 2×2 photo grid, staggered reveals
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";
import {
  Heart, GraduationCap, Home as HomeIcon, Leaf, DollarSign, Users,
  Building2, BookOpen, Compass, ChevronRight, MapPin, Phone, Mail,
  AlertTriangle, LayoutGrid, FolderOpen, Handshake, Mountain, UserCheck
} from "lucide-react";
import ProtectedEmail from "@/components/ProtectedEmail";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho-mountain-hero_b310447d.jpg";
const CHIEF_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/cnc-photo2-signing_3148f0c2.jpg";
const SIGNATURE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/signature-2_6e391c73.png";
const CULTURE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho-sunset-enhanced_6d1d73f6.jpg";
const LAND_STRIP_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/culture-banner-ZDravBPAKPgphgD9Bcqw5Q.webp";

// ============================================================
// EMERGENCY BANNER — Set to true and update text to show
// ============================================================
const SHOW_EMERGENCY_BANNER = false;
const EMERGENCY_BANNER_TEXT =
  "NOTICE: Community meeting scheduled for [DATE] at [LOCATION]. All members are encouraged to attend.";

const cultureImages = [
  { label: "Pine Mushrooms", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ufn-pine-mushrooms2-G7EiUfnatFNw7jqwFH4yMb.webp" },
  { label: "Moose", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ufn-moose-plateau2-h8J9vKQpjXrGkkL3VoPTvt.webp" },
  { label: "Rivers & Trout", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ufn-river-trout2-WCuyC6fMED6AWYsntcbHAv.webp" },
  { label: "Indian Paintbrush", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ufn-paintbrush-meadow2-EFJXbmx2rndqxtXra42x6k.webp" },
];

const departments = [
  {
    icon: Heart,
    title: "Health & Wellness",
    desc: "Programs and services that support the physical, mental, spiritual, and emotional well-being of community members.",
    href: "/departments",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    desc: "Learning opportunities, student supports, and training programs for youth, adults, and post-secondary students.",
    href: "/education",
  },
  {
    icon: HomeIcon,
    title: "Housing & Capital Works",
    desc: "Safe housing, infrastructure, maintenance, and capital projects that support community needs.",
    href: "/departments",
  },
  {
    icon: Leaf,
    title: "Natural Resources",
    desc: "Stewardship of lands, wildlife, and resources, including referrals and environmental management.",
    href: "/departments",
  },
  {
    icon: DollarSign,
    title: "Finance & Administration",
    desc: "Financial services, budgeting, governance support, and administrative operations for the Nation.",
    href: "/departments",
  },
  {
    icon: Users,
    title: "Social Development",
    desc: "Support services for individuals and families, including social assistance and community programs.",
    href: "/departments",
  },
];

const featureBoxes = [
  {
    icon: Handshake,
    title: "Departments & Services",
    desc: "Access housing, health, social, and community services.",
    href: "/departments",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    desc: "Student supports, forms, training, and learning opportunities.",
    href: "/education",
  },
  {
    icon: Mountain,
    title: "Our Vision & Future",
    desc: "Learn about Ulkatcho's values, priorities, and direction for the future.",
    href: "/vision-future",
  },
];

const cultureTags = [
  "Pine Mushrooms", "Moose", "Caribou", "Indian Paintbrush",
  "Soapberries", "Obsidian", "Trails & Hiking", "Ice Fishing",
  "Trout", "Rivers", "Dakelh Language", "Elders & Youth",
];

const culturePoints = [
  "Strong connections to land, water, and wildlife",
  "Living languages and cultural teachings",
  "Knowledge shared between Elders and youth",
  "A community growing together for future generations",
];

export default function Home() {
  const { get } = useSiteContent("home", {
    "emergency_banner.is_visible": String(SHOW_EMERGENCY_BANNER),
    "emergency_banner.text": EMERGENCY_BANNER_TEXT,
    "images.hero": HERO_IMAGE,
    "images.chief": CHIEF_IMAGE,
    "images.culture": CULTURE_IMAGE,
    "images.land_strip": LAND_STRIP_IMAGE,
    "images.gallery_1": cultureImages[0].img,
    "images.gallery_2": cultureImages[1].img,
    "images.gallery_3": cultureImages[2].img,
    "images.gallery_4": cultureImages[3].img,
    "hero.label": "Dakelh / Carrier Nation · Anahim Lake, BC",
    "hero.heading_line1": "Rooted in the Land,",
    "hero.heading_line2": "Strong in Our People",
    "hero.subheading": "Working together for the health, strength, and future of our Nation — guided by the knowledge of Elders and the strength of our youth.",
    "leadership_message.label": "Message from Leadership",
    "leadership_message.heading_line1": "A Message from",
    "leadership_message.heading_line2": "Chief and Council",
    "leadership_message.paragraph1": "The Ulkatcho First Nation is guided by a vision of an independent Nation and an interconnected community, working together for all generations. Chief and Council are committed to supporting the well-being of members and building a strong, sustainable future.",
    "leadership_message.paragraph2": "Through transparent, respectful, and efficient services, leadership works to create opportunities for physical, cultural, spiritual, mental, economic, and social wellness for all members.",
    "leadership_message.chief_name": "Derech Sill",
    "leadership_message.chief_title": "Chief, Ulkatcho First Nation",
    "leadership_message.quote": "Working together for the health, strength, and future of our Nation.",
    "community_services.label": "Our Community",
    "community_services.heading": "Community Services",
    "community_services.paragraph": "Ulkatcho First Nation provides programs and services that support the health, well-being, and future of our members.",
    "culture_land.label": "Our Land, Our Story",
    "culture_land.heading": "Connected to Our Territory",
    "culture_land.paragraph1": "From the Anahim Lake plateau to our ancestral territories, our people have lived on and cared for this land for generations. Guided by Elders and traditional knowledge, we work together to protect our culture, our wildlife, and the future of our Nation.",
    "culture_land.paragraph2": "The land continues to guide how we live, learn, and work together — through pine mushrooms and soapberries, moose and caribou, rivers and trails, the Dakelh language, and the wisdom shared between Elders and youth.",
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      {/* Emergency Banner */}
      {get("emergency_banner.is_visible") === "true" && (
        <div
          className="emergency-pulse fixed top-16 md:top-20 left-0 right-0 z-40 py-3 px-4"
          style={{ backgroundColor: "#b91c1c" }}
        >
          <div className="container flex items-center justify-center gap-3">
            <AlertTriangle size={16} style={{ color: "#fff" }} />
            <p className="font-ui text-xs tracking-wider text-center" style={{ color: "#fff" }}>
              {get("emergency_banner.text")}
            </p>
          </div>
        </div>
      )}

      {/* ============================================================
          HERO — Full-viewport parallax, content bottom-left
          ============================================================ */}
      <section
        className="relative overflow-hidden"
        style={{ height: "100vh", minHeight: "600px", maxHeight: "900px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${get("images.hero")}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: "transform",
          }}
        />
        {/* Left-side dark gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(26,46,90,0.88) 0%, rgba(26,46,90,0.7) 35%, rgba(26,46,90,0.25) 60%, transparent 80%)",
          }}
        />
        {/* Bottom gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(26,46,90,0.25) 0%, transparent 30%, transparent 60%, rgba(26,46,90,0.5) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="container">
            <div className="max-w-2xl">
              <div className="ufn-section-label mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s", color: "#c9a227" }}>
                {get("hero.label")}
              </div>
              <h1
                className="mb-6 leading-tight animate-fade-in-up"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  color: "#ffffff",
                  animationDelay: "0.2s",
                }}
              >
                {get("hero.heading_line1")}
                <br />
                <em style={{ color: "#c9a227" }}>{get("hero.heading_line2")}</em>
              </h1>
              <p
                className="mb-8 max-w-xl leading-relaxed animate-fade-in-up"
                style={{
                  fontFamily: "Lora, serif",
                  fontSize: "1.1rem",
                  color: "rgba(255,255,255,0.88)",
                  animationDelay: "0.35s",
                }}
              >
                {get("hero.subheading")}
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <Link href="/about">
                  <button className="ufn-btn-primary">Our Story</button>
                </Link>
                <Link href="/departments">
                  <button className="ufn-btn-outline">Community Services</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — right side */}
        <div
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <div
            className="w-px h-12"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(201,162,39,0.8))" }}
          />
          <span className="font-ui text-xs tracking-widest" style={{ writingMode: "vertical-rl" }}>
            SCROLL
          </span>
        </div>
      </section>

      {/* ============================================================
          QUICK LINKS BAR — Navy with gold hover
          ============================================================ */}
      <section style={{ backgroundColor: "#1a2e5a" }} className="py-0">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: LayoutGrid, label: "Departments", href: "/departments" },
              { icon: BookOpen, label: "Education", href: "/education" },
              { icon: FolderOpen, label: "Resources", href: "/resources" },
              { icon: UserCheck, label: "Member Portal", href: "/member-portal" },
            ].map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href}>
                <div
                  className="py-5 px-4 flex flex-col items-center gap-2 transition-all duration-200 group cursor-pointer"
                  style={{ borderRight: "1px solid rgba(201,162,39,0.2)", color: "#ffffff" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227";
                    (e.currentTarget as HTMLElement).style.color = "#1a2e5a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                >
                  <Icon size={22} style={{ color: "#c9a227" }} className="group-hover:text-[#1a2e5a] transition-colors" />
                  <span className="font-ui font-semibold text-xs tracking-widest uppercase">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          THREE FEATURE BOXES — ufn-card with gold left border
          ============================================================ */}
      <section className="py-16" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureBoxes.map(({ icon: Icon, title, desc, href }) => (
              <Link key={title} href={href}>
                <div className="ufn-card p-8 cursor-pointer h-full flex flex-col" style={{ borderRadius: "0" }}>
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ backgroundColor: "#1a2e5a" }}
                  >
                    <Icon size={22} style={{ color: "#c9a227" }} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3" style={{ color: "#1a2e5a" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "#444", fontFamily: "Lora, serif" }}>
                    {desc}
                  </p>
                  <div className="flex items-center gap-1 mt-5 font-ui font-semibold text-xs tracking-wider uppercase" style={{ color: "#c9a227" }}>
                    Learn More <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LEADERSHIP MESSAGE — Decorative border behind photo, quote overlay
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3">{get("leadership_message.label")}</div>
              <div className="ufn-divider" />
              <h2
                className="mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.15,
                  color: "#1a2e5a",
                }}
              >
                {get("leadership_message.heading_line1")}
                <br />
                {get("leadership_message.heading_line2")}
              </h2>
              <p className="mb-5 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "#333" }}>
                {get("leadership_message.paragraph1")}
              </p>
              <p className="mb-8 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "#333" }}>
                {get("leadership_message.paragraph2")}
              </p>
              <div>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#1a2e5a",
                    fontSize: "1.35rem",
                    letterSpacing: "0.01em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {get("leadership_message.chief_name")}
                </p>
                <p
                  className="font-ui font-semibold tracking-widest uppercase"
                  style={{ color: "#8b6420", fontSize: "0.75rem" }}
                >
                  {get("leadership_message.chief_title")}
                </p>
              </div>
              <div className="mt-6">
                <Link href="/chief-council">
                  <button className="ufn-btn-primary">Meet Chief & Council</button>
                </Link>
              </div>
            </div>

            {/* Photo with decorative border + quote overlay */}
            <div className="scroll-reveal relative" style={{ transitionDelay: "0.15s" }}>
              <div className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                <img
                  src={get("images.chief")}
                  alt="Councillor Stella West, Councillor Corrine Cahoose, and Chief Derech Sill at oath of office signing ceremony"
                  className="w-full object-cover"
                  style={{ maxHeight: "520px", objectPosition: "center" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(to top, rgba(26,46,90,0.9) 0%, transparent 100%)" }}
                >
                  <p className="italic text-lg leading-snug" style={{ fontFamily: "Playfair Display, serif", color: "#ffffff" }}>
                    "{get("leadership_message.quote")}"
                  </p>
                </div>
              </div>
              {/* Decorative offset border */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full -z-10"
                style={{ border: "2px solid #c9a227", borderRadius: "2px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          YOUTUBE — Full-width cinematic video section
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#152548" }}>
        <div className="container">
          <div className="text-center mb-10 scroll-reveal">
            <div className="ufn-section-label mb-3" style={{ color: "#c9a227" }}>Our Land, Our Story</div>
            <div className="ufn-divider mx-auto" style={{ backgroundColor: "#c9a227" }} />
            <h2
              className="mt-4 mb-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              Connected to Our Territory
            </h2>
            <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)" }}>
              From the Anahim Lake plateau to our ancestral territories, our people have been on and cared for this land for generations.
            </p>
          </div>
          <div className="max-w-5xl mx-auto scroll-reveal" style={{ transitionDelay: "0.15s" }}>
            <div className="relative w-full" style={{ paddingBottom: "56.25%", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.4)", border: "2px solid rgba(201,162,39,0.25)" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/3GOv15AnITo"
                title="Former Chief Lynda Price - Full of Heart in Anahim Lake"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
            <p className="mt-4 text-center text-sm" style={{ fontFamily: "Lora, serif", color: "rgba(201,162,39,0.7)" }}>
              Former Chief Lynda Price | Full of Heart in Anahim Lake
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          LAND STRIP — Full-width nature image with overlay text
          ============================================================ */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${get("images.land_strip")}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(26,46,90,0.6)" }}
        >
          <div className="text-center">
            <p
              className="font-ui text-xs tracking-widest uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.25em" }}
            >
              Our Territory
            </p>
            <h3
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "Playfair Display, serif", color: "#ffffff", fontWeight: 600 }}
            >
              From the Anahim Lake Plateau
              <br />
              to Our Ancestral Lands
            </h3>
          </div>
        </div>
      </div>

      {/* ============================================================
          COMMUNITY SERVICES — Centered heading, 3×2 card grid, staggered reveals
          ============================================================ */}
      <section className="py-20" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="text-center mb-14 scroll-reveal">
            <div className="ufn-section-label mb-3">{get("community_services.label")}</div>
            <div className="ufn-divider mx-auto" />
            <h2
              className="mt-4"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#1a2e5a",
              }}
            >
              {get("community_services.heading")}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ fontFamily: "Lora, serif", color: "#555", fontSize: "1.05rem" }}>
              {get("community_services.paragraph")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <Link key={dept.title} href={dept.href}>
                  <div
                    className="ufn-card p-6 h-full scroll-reveal cursor-pointer"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4"
                      style={{ backgroundColor: "rgba(26,46,90,0.08)" }}
                    >
                      <Icon size={20} style={{ color: "#1a2e5a" }} />
                    </div>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "#1a2e5a",
                      }}
                    >
                      {dept.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                      {dept.desc}
                    </p>
                    <div className="flex items-center gap-1 font-ui text-xs tracking-wider uppercase" style={{ color: "#c9a227" }}>
                      Learn More <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10 scroll-reveal">
            <Link href="/departments">
              <button className="ufn-btn-primary">View All Departments</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CULTURE & LAND — Navy bg, tags/pills left, 2×2 photo grid right
          ============================================================ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#1a2e5a" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="ufn-section-label mb-3" style={{ color: "#c9a227" }}>
                {get("culture_land.label")}
              </div>
              <div className="ufn-divider" style={{ backgroundColor: "#c9a227" }} />
              <h2
                className="mt-4 mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {get("culture_land.heading")}
              </h2>
              <p className="mb-5 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)" }}>
                {get("culture_land.paragraph1")}
              </p>
              <p className="mb-8 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)" }}>
                {get("culture_land.paragraph2")}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {cultureTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-ui text-xs tracking-wider px-3 py-1.5"
                    style={{
                      backgroundColor: "rgba(201,162,39,0.15)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(201,162,39,0.35)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href="/history-of-ulkatcho-first-nation">
                <button className="ufn-btn-primary">Our History & Culture</button>
              </Link>
            </div>

            {/* 2×2 Photo grid with hover zoom + label reveal */}
            <div className="grid grid-cols-2 gap-3 scroll-reveal" style={{ transitionDelay: "0.15s" }}>
              {cultureImages.map((item, i) => (
                <div key={item.label} className="relative overflow-hidden group" style={{ aspectRatio: "1" }}>
                  <img
                    src={get(`images.gallery_${i + 1}`) || item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(26,46,90,0.85), transparent)" }}
                  >
                    <span className="font-ui text-xs tracking-wider uppercase" style={{ color: "#ffffff" }}>
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
          ABOUT STRIP — Parallax fixed bg with culture text
          ============================================================ */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          backgroundImage: `url('${get("images.culture")}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(26,46,90,0.82)" }} />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center scroll-reveal" style={{ backgroundColor: "rgba(26,46,90,0.45)", padding: "3rem 2.5rem", borderRadius: "2px", border: "1px solid rgba(201,162,39,0.2)", backdropFilter: "blur(4px)" }}>
            <div className="ufn-section-label mb-4" style={{ color: "#c9a227" }}>
              A Nation Rooted in Culture
            </div>
            <h2
              className="mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                color: "#ffffff",
              }}
            >
              Guided by Elders,
              <br />
              Strengthened by Youth
            </h2>
            <p className="mb-6 leading-relaxed" style={{ fontFamily: "Lora, serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)" }}>
              Ulkatcho First Nation is deeply connected to its ancestral lands, languages, and traditions. Through community programs, education, and cultural initiatives, we work together for the well-being of all generations.
            </p>
            <div className="mb-10 flex flex-col items-center">
              {culturePoints.map((point) => (
                <div key={point} className="flex items-center gap-3 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#c9a227" }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Lora, serif" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/about">
              <button className="ufn-btn-outline">Learn Our Story</button>
            </Link>
          </div>
        </div>
      </section>



      {/* ============================================================
          CONTACT STRIP — Cream bg, 3-column centered icons
          ============================================================ */}
      <section className="py-14" style={{ backgroundColor: "#c8d5e0" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="scroll-reveal">
              <MapPin size={24} className="mx-auto mb-3" style={{ color: "#c9a227" }} />
              <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "#8b6420" }}>
                Address
              </p>
              <p style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>
                P.O. Box 3430, Anahim Lake, BC V0L 1C0
              </p>
            </div>
            <div className="scroll-reveal" style={{ transitionDelay: "0.1s" }}>
              <Phone size={24} className="mx-auto mb-3" style={{ color: "#c9a227" }} />
              <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "#8b6420" }}>
                Call Us
              </p>
              <a href="tel:+12507423288" style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>
                (250) 742-3288
              </a>
            </div>
            <div className="scroll-reveal" style={{ transitionDelay: "0.2s" }}>
              <Mail size={24} className="mx-auto mb-3" style={{ color: "#c9a227" }} />
              <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "#8b6420" }}>
                Email Us
              </p>
              <ProtectedEmail user="info" domain="ulkatcho.ca" style={{ fontFamily: "Lora, serif", color: "#c9a227" }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
