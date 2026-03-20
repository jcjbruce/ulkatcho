/*
 * ULKATCHO FIRST NATION — Footer
 * Palette: Dark slate #1a2e5a bg | Gold #c9a227 headings | White text
 * Layout: Logo-only on left, 3 link columns right, copyright bar at bottom
 */

import { Link } from "wouter";

const LOGO_ONLY_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/V2-removebg-previewcopy_2d50266e.png";

export default function Footer() {
  return (
    <footer>
      {/* Main footer */}
      <div style={{ backgroundColor: "#1a2e5a", borderTop: "4px solid #c9a227" }}>
        <div className="container py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 items-start">

            {/* Logo - centered in its 2-column space */}
            <div className="lg:col-span-2 flex items-start justify-center">
              <Link href="/">
                <img
                  src={LOGO_ONLY_URL}
                  alt="Ulkatcho First Nation"
                  className="w-auto cursor-pointer"
                  style={{ height: "130px" }}
                />
              </Link>
            </div>

            {/* Community */}
            <div>
              <h4
                className="font-bold text-xs tracking-wider uppercase mb-4 underline"
                style={{ fontFamily: "Raleway, sans-serif", color: "#c9a227", textUnderlineOffset: "4px" }}
              >
                COMMUNITY
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Departments", href: "/departments" },
                  { label: "Education", href: "/education" },
                  { label: "Resources", href: "/resources" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span
                        className="text-sm transition-colors duration-200 cursor-pointer"
                        style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.8)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a227")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div>
              <h4
                className="font-bold text-xs tracking-wider uppercase mb-4 underline"
                style={{ fontFamily: "Raleway, sans-serif", color: "#c9a227", textUnderlineOffset: "4px" }}
              >
                OPPORTUNITIES
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Careers", href: "/careers" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Chief & Council", href: "/chief-council" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span
                        className="text-sm transition-colors duration-200 cursor-pointer"
                        style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.8)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a227")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Ulkatcho */}
            <div>
              <h4
                className="font-bold text-xs tracking-wider uppercase mb-4 underline"
                style={{ fontFamily: "Raleway, sans-serif", color: "#c9a227", textUnderlineOffset: "4px" }}
              >
                ABOUT ULKATCHO
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Vision & Future", href: "/vision-future" },
                  { label: "Ancestral Origins", href: "/ancestral-origins" },
                  { label: "History", href: "/history-of-ulkatcho-first-nation" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span
                        className="text-sm transition-colors duration-200 cursor-pointer"
                        style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.8)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a227")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)")}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ backgroundColor: "#1a2e3a" }}>
        <div className="container py-4 text-center">
          <p className="text-xs" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} UFN | Powered by{" "}
            <a
              href="https://mentee.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a227")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
            >
              Mentee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
