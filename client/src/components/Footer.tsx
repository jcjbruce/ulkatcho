/*
 * ULKATCHO FIRST NATION — Footer Component
 * Theme: River Stone & Birch
 * Dark obsidian background, warm birch text, earth brown accents
 */

import { Link } from "wouter";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(26,26,24,0.97), rgba(26,26,24,1)), url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/footer-bg-eYuQVBNJBJWnRABpyYsTbv.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/logo-new_03f03d5a.png"
                  alt="Ulkatcho First Nation Crest"
                  className="h-20 w-auto object-contain flex-shrink-0"
                  style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
                />
                <div className="leading-tight">
                  <div
                    className="font-display font-bold"
                    style={{ color: "#F7F2E8", fontSize: "1.1rem", letterSpacing: "0.03em" }}
                  >
                    Ulkatcho
                  </div>
                  <div
                    className="font-ui tracking-widest uppercase"
                    style={{ color: "#C8922A", fontSize: "0.6rem", letterSpacing: "0.18em" }}
                  >
                    First Nation
                  </div>
                </div>
              </div>
            </Link>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(247, 242, 232, 0.65)", fontFamily: "Lora, serif" }}
            >
              Rooted in the land, strong in our people. Serving the Dakelh / Carrier Nation
              in the Chilcotin mountains of British Columbia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-ui text-xs tracking-widest uppercase mb-5"
              style={{ color: "#B8341B", letterSpacing: "0.18em" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Chief & Council", href: "/chief-council" },
                { label: "Education", href: "/education" },
                { label: "Resources", href: "/resources" },
                { label: "Careers", href: "/careers" },
                { label: "Contact Us", href: "/contact" },
                { label: "Member Portal", href: "/member-portal" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span
                      className="font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                      style={{ color: "rgba(247, 242, 232, 0.6)" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#F7F2E8")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "rgba(247, 242, 232, 0.6)")
                      }
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4
              className="font-ui text-xs tracking-widest uppercase mb-5"
              style={{ color: "#B8341B", letterSpacing: "0.18em" }}
            >
              Departments
            </h4>
            <ul className="space-y-3">
              {[
                "Health & Wellness",
                "Education & Training",
                "Housing & Capital Works",
                "Natural Resources",
                "Finance & Administration",
                "Social Development",
                "Indian Registry",
              ].map((dept) => (
                <li key={dept}>
                  <Link href="/contact">
                    <span
                      className="font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                      style={{ color: "rgba(247, 242, 232, 0.6)" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#F7F2E8")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "rgba(247, 242, 232, 0.6)")
                      }
                    >
                      {dept}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-ui text-xs tracking-widest uppercase mb-5"
              style={{ color: "#B8341B", letterSpacing: "0.18em" }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#7A4F2E" }}
                />
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(247, 242, 232, 0.75)", fontFamily: "Lora, serif" }}
                  >
                    P.O. Box 3430
                    <br />
                    Anahim Lake, BC V0L 1C0
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="shrink-0" style={{ color: "#7A4F2E" }} />
                <a
                  href="tel:+12507423288"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(247, 242, 232, 0.75)", fontFamily: "Lora, serif" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#F7F2E8")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(247, 242, 232, 0.75)")
                  }
                >
                  (250) 742-3288
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="shrink-0" style={{ color: "#7A4F2E" }} />
                <a
                  href="mailto:info@ulkatcho.ca"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(247, 242, 232, 0.75)", fontFamily: "Lora, serif" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#F7F2E8")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(247, 242, 232, 0.75)")
                  }
                >
                  info@ulkatcho.ca
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(122, 79, 46, 0.3)" }}>
              <p
                className="font-ui text-xs tracking-wider uppercase mb-2"
                style={{ color: "rgba(247, 242, 232, 0.4)" }}
              >
                Health Clinic
              </p>
              <a
                href="tel:+12507422090"
                className="text-sm"
                style={{ color: "rgba(247, 242, 232, 0.6)", fontFamily: "Lora, serif" }}
              >
                (250) 742-2090
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(122, 79, 46, 0.25)" }}
        >
          <p
            className="font-ui text-xs"
            style={{ color: "rgba(247, 242, 232, 0.35)", letterSpacing: "0.05em" }}
          >
            © {new Date().getFullYear()} Ulkatcho First Nation. All rights reserved.
          </p>
          <p
            className="font-ui text-xs"
            style={{ color: "rgba(247, 242, 232, 0.35)", letterSpacing: "0.05em" }}
          >
            Dakelh / Carrier Nation · Anahim Lake, BC
          </p>
        </div>
      </div>
    </footer>
  );
}
