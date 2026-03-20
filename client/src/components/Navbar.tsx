/*
 * ULKATCHO FIRST NATION — Navbar v5
 * Palette: Steel Blue #c8d5e0 bg | Navy #1a2e5a text | Gold #c9a227 hover/active
 * Logo: Transparent background version
 * Nav: About Us (dropdown 4) | Education | Resources | Careers | Contact Us (dropdown 2, text links to /contact) | Member Login
 * Dropdown: White card with gold top accent, delayed close for better UX
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/V2-removebg-preview_b987a228.png";

const aboutItems = [
  { label: "Our Vision & Future", href: "/vision-future" },
  { label: "History of UFN", href: "/history-of-ulkatcho-first-nation" },
  { label: "Ancestral Origins", href: "/ancestral-origins" },
  { label: "Travellers & Entrepreneurs", href: "/travellers-entrepreneurs" },
];

const contactItems = [
  { label: "Departments", href: "/departments" },
  { label: "Chief & Council", href: "/chief-council" },
];

const navLinks = [
  { label: "Education", href: "/education" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [location] = useLocation();

  // Refs for delayed close
  const aboutTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contactTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setContactOpen(false);
  }, [location]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
      if (contactTimeout.current) clearTimeout(contactTimeout.current);
    };
  }, []);

  const handleAboutEnter = useCallback(() => {
    if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
    setAboutOpen(true);
  }, []);

  const handleAboutLeave = useCallback(() => {
    aboutTimeout.current = setTimeout(() => setAboutOpen(false), 200);
  }, []);

  const handleContactEnter = useCallback(() => {
    if (contactTimeout.current) clearTimeout(contactTimeout.current);
    setContactOpen(true);
  }, []);

  const handleContactLeave = useCallback(() => {
    contactTimeout.current = setTimeout(() => setContactOpen(false), 200);
  }, []);

  const isActive = (href: string) => location === href;

  const dropdownStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #dce6ef",
    borderTop: "3px solid #c9a227",
    boxShadow: "0 12px 40px rgba(26,46,90,0.15)",
  };

  const renderDropdownItem = (item: { label: string; href: string }, idx: number, total: number) => (
    <Link key={item.href} href={item.href}>
      <div
        className="px-5 py-3 text-sm font-ui font-medium transition-all duration-150 cursor-pointer"
        style={{
          color: "#1a2e5a",
          letterSpacing: "0.03em",
          borderBottom: idx < total - 1 ? "1px solid #eef2f6" : "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#f0ece0";
          (e.currentTarget as HTMLElement).style.color = "#c9a227";
          (e.currentTarget as HTMLElement).style.paddingLeft = "28px";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#1a2e5a";
          (e.currentTarget as HTMLElement).style.paddingLeft = "20px";
        }}
      >
        {item.label}
      </div>
    </Link>
  );

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#c8d5e0",
        borderBottom: scrolled ? "3px solid #c9a227" : "3px solid transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(26,46,90,0.1)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: "80px" }}>

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center group transition-opacity duration-200 hover:opacity-85">
              <img
                src={LOGO_URL}
                alt="Ulkatcho First Nation"
                className="w-auto object-contain flex-shrink-0"
                style={{ height: "70px" }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" style={{ height: "80px" }}>

            {/* About Us dropdown */}
            <div
              className="relative flex items-center"
              style={{ height: "100%" }}
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <button
                className="nav-link-ufn flex items-center gap-1"
                style={{ color: isActive("/about") ? "#c9a227" : "#1a2e5a" }}
              >
                About Us
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200"
                  style={{ transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {aboutOpen && (
                <>
                  {/* Invisible bridge to prevent gap-triggered close */}
                  <div
                    className="absolute left-0 w-full"
                    style={{ top: "100%", height: "8px" }}
                  />
                  <div
                    className="absolute left-0 w-60 py-1 z-50"
                    style={{ top: "calc(100% + 8px)", ...dropdownStyle }}
                  >
                    {aboutItems.map((item, idx) => renderDropdownItem(item, idx, aboutItems.length))}
                  </div>
                </>
              )}
            </div>

            {/* Standard links */}
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className="nav-link-ufn flex items-center"
                  style={{ color: isActive(item.href) ? "#c9a227" : "#1a2e5a", height: "80px" }}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Contact Us dropdown — text links to /contact, dropdown shows Departments & Chief & Council */}
            <div
              className="relative flex items-center"
              style={{ height: "100%" }}
              onMouseEnter={handleContactEnter}
              onMouseLeave={handleContactLeave}
            >
              <Link href="/contact">
                <span
                  className="nav-link-ufn flex items-center gap-1 cursor-pointer"
                  style={{ color: isActive("/contact") ? "#c9a227" : "#1a2e5a" }}
                >
                  Contact Us
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: contactOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </span>
              </Link>
              {contactOpen && (
                <>
                  {/* Invisible bridge to prevent gap-triggered close */}
                  <div
                    className="absolute left-0 w-full"
                    style={{ top: "100%", height: "8px" }}
                  />
                  <div
                    className="absolute left-0 w-52 py-1 z-50"
                    style={{ top: "calc(100% + 8px)", ...dropdownStyle }}
                  >
                    {contactItems.map((item, idx) => renderDropdownItem(item, idx, contactItems.length))}
                  </div>
                </>
              )}
            </div>

            {/* Member Login button */}
            <Link href="/member-portal">
              <button
                className="font-ui font-semibold text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
                style={{
                  backgroundColor: "#1a2e5a",
                  color: "#ffffff",
                  border: "2px solid #1a2e5a",
                  letterSpacing: "0.1em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#1a2e5a";
                  (e.currentTarget as HTMLElement).style.borderColor = "#c9a227";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a";
                  (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderColor = "#1a2e5a";
                }}
              >
                Member Login
              </button>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            style={{ color: "#1a2e5a" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{ backgroundColor: "#1a2e5a", borderTop: "3px solid #c9a227" }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {/* About Us group */}
            <div className="font-ui font-semibold text-xs tracking-widest uppercase py-2 px-2" style={{ color: "#c9a227" }}>
              About Us
            </div>
            {aboutItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="py-2 px-4 text-sm font-ui" style={{ color: "#ffffff" }}>
                  {item.label}
                </div>
              </Link>
            ))}

            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className="py-2.5 px-2 font-ui font-semibold text-xs tracking-widest uppercase"
                  style={{ color: isActive(item.href) ? "#c9a227" : "#ffffff" }}
                >
                  {item.label}
                </div>
              </Link>
            ))}

            {/* Contact Us group */}
            <Link href="/contact">
              <div className="font-ui font-semibold text-xs tracking-widest uppercase py-2 px-2 mt-1 cursor-pointer" style={{ color: "#c9a227" }}>
                Contact Us
              </div>
            </Link>
            {contactItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="py-2 px-4 text-sm font-ui" style={{ color: "#ffffff" }}>
                  {item.label}
                </div>
              </Link>
            ))}

            <Link href="/member-portal">
              <button
                className="mt-3 w-full font-ui font-semibold text-xs tracking-widest uppercase py-3"
                style={{ backgroundColor: "#c9a227", color: "#ffffff" }}
              >
                Member Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
