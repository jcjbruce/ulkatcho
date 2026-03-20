/*
 * ULKATCHO FIRST NATION — PageHero Component
 * Consistent hero banner for all interior pages (not homepage).
 * Design: Full-width background image with strong navy overlay for legibility,
 *         gold accent label, large Playfair heading, optional subtitle,
 *         gold bottom accent bar, and breadcrumb strip below.
 * Palette: Navy #1a2e5a | Gold #c9a227 | Steel blue #c8d5e0 | White #ffffff
 */

import { Link } from "wouter";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  /** Background image URL */
  image: string;
  /** Small gold label above the heading (e.g. "Our Heritage") */
  label: string;
  /** Main heading text */
  heading: string;
  /** Optional subtitle below heading */
  subtitle?: string;
  /** Breadcrumb trail — last item is current page (no link) */
  breadcrumbs: BreadcrumbItem[];
  /** Background position override (default: "center 50%") */
  bgPosition?: string;
}

export default function PageHero({
  image,
  label,
  heading,
  subtitle,
  breadcrumbs,
  bgPosition = "center 50%",
}: PageHeroProps) {
  return (
    <>
      {/* Hero Banner */}
      <div
        className="relative pt-16 md:pt-20 overflow-hidden"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: bgPosition,
          height: "340px",
        }}
      >
        {/* Strong navy overlay — two-layer gradient for maximum legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,46,90,0.72) 0%, rgba(26,46,90,0.82) 60%, rgba(26,46,90,0.92) 100%)",
          }}
        />

        {/* Content */}
        <div className="container relative z-10 py-16 md:py-24">
          {/* Gold accent line */}
          <div
            style={{
              width: "3rem",
              height: "3px",
              backgroundColor: "#c9a227",
              marginBottom: "1rem",
            }}
          />

          {/* Section label */}
          <div
            className="ufn-section-label mb-3"
            style={{ color: "#c9a227" }}
          >
            {label}
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              color: "#ffffff",
              lineHeight: 1.15,
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {heading}
          </h1>

          {/* Optional subtitle */}
          {subtitle && (
            <p
              className="mt-4 max-w-xl"
              style={{
                fontFamily: "Lora, serif",
                color: "rgba(255,255,255,0.88)",
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom gold accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "3px", backgroundColor: "#c9a227" }}
        />
      </div>

      {/* Breadcrumb strip */}
      <div style={{ backgroundColor: "#c8d5e0", borderBottom: "1px solid #b8c8d6" }}>
        <div className="container py-3">
          <nav
            className="flex items-center gap-2 font-ui text-xs tracking-wider uppercase"
            style={{ color: "#8b6420" }}
          >
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {isLast || !crumb.href ? (
                    <span style={{ color: "#1a2e5a" }}>{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href}>
                      <span className="hover:text-[#1a2e5a] transition-colors cursor-pointer">
                        {crumb.label}
                      </span>
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
