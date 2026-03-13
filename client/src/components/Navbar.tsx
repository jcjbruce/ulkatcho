/* 
 * ULKATCHO FIRST NATION — Navbar Component
 * Theme: River Stone & Birch
 * Deep forest green header, Raleway navigation labels, paintbrush red active indicator
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Vision & Future", href: "/about#vision" },
      { label: "History of UFN", href: "/about#history" },
      { label: "Ancestral Origins", href: "/about#origins" },
      { label: "Chief & Council", href: "/chief-council" },
    ],
  },
  { label: "Education", href: "/education" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(26, 26, 24, 0.97)" : "rgba(26, 26, 24, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(122, 79, 46, 0.3)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: "80px" }}>
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 group transition-opacity duration-200 hover:opacity-85">
              {/* New transparent-background crest logo */}
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/logo-new_03f03d5a.png"
                alt="Ulkatcho First Nation Crest"
                className="w-auto object-contain flex-shrink-0"
                style={{ height: "72px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
              />
              {/* Site name in website typography */}
              <div className="hidden sm:block leading-tight">
                <div
                  className="font-display font-bold tracking-wide"
                  style={{ color: "#F7F2E8", fontSize: "1.05rem", letterSpacing: "0.04em" }}
                >
                  Ulkatcho
                </div>
                <div
                  className="font-ui tracking-widest uppercase"
                  style={{ color: "#C8922A", fontSize: "0.62rem", letterSpacing: "0.18em" }}
                >
                  First Nation
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className="nav-link-ufn flex items-center gap-1 py-2"
                    style={{
                      color: isActive(item.href)
                        ? "#F7F2E8"
                        : "rgba(247, 242, 232, 0.75)",
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{
                        transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0)",
                      }}
                    />
                  </button>
                ) : (
                  <Link href={item.href}>
                    <span
                      className={`nav-link-ufn py-2 ${isActive(item.href) ? "active" : ""}`}
                      style={{
                        color: isActive(item.href)
                          ? "#F7F2E8"
                          : "rgba(247, 242, 232, 0.75)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div
                    className="absolute top-full left-0 mt-1 py-2 min-w-52"
                    style={{
                      backgroundColor: "#1C3A1A",
                      border: "1px solid rgba(122, 79, 46, 0.4)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}>
                        <div
                          className="px-4 py-2.5 font-ui text-xs tracking-wider uppercase transition-colors duration-150"
                          style={{
                            color: "rgba(247, 242, 232, 0.8)",
                            fontSize: "0.75rem",
                          }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.backgroundColor =
                              "rgba(184, 52, 27, 0.2)";
                            (e.target as HTMLElement).style.color = "#F7F2E8";
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.backgroundColor = "transparent";
                            (e.target as HTMLElement).style.color =
                              "rgba(247, 242, 232, 0.8)";
                          }}
                        >
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link href="/member-portal">
              <button className="ufn-btn-primary font-ui text-xs py-2 px-5">
                Member Login
              </button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            style={{ color: "#F7F2E8" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            backgroundColor: "#1A1A18",
            borderColor: "rgba(122, 79, 46, 0.3)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="w-full text-left px-3 py-3 font-ui text-xs tracking-wider uppercase flex items-center justify-between"
                      style={{ color: "rgba(247, 242, 232, 0.8)" }}
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        style={{
                          transform:
                            activeDropdown === item.label
                              ? "rotate(180deg)"
                              : "rotate(0)",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          <Link key={child.label} href={child.href}>
                            <div
                              className="px-3 py-2.5 font-ui text-xs tracking-wider uppercase"
                              style={{ color: "rgba(247, 242, 232, 0.6)" }}
                            >
                              {child.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href}>
                    <div
                      className="px-3 py-3 font-ui text-xs tracking-wider uppercase"
                      style={{
                        color: isActive(item.href)
                          ? "#F7F2E8"
                          : "rgba(247, 242, 232, 0.8)",
                      }}
                    >
                      {item.label}
                    </div>
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: "rgba(122, 79, 46, 0.3)" }}>
              <Link href="/member-portal">
                <button className="ufn-btn-primary w-full font-ui text-xs py-3">
                  Member Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
