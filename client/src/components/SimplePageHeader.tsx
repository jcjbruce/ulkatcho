/*
 * ULKATCHO FIRST NATION — SimplePageHeader Component
 * Clean text header for About Us sub-pages.
 * Design: Light background (#f0f5fa), centered navy Playfair heading,
 *         gold bottom accent bar (4px), no background image.
 * Used for: Vision & Future, History, Ancestral Origins, Travellers & Entrepreneurs
 */

import { Link } from "wouter";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SimplePageHeaderProps {
  /** Main heading text */
  heading: string;
  /** Breadcrumb trail — last item is current page (no link) */
  breadcrumbs: BreadcrumbItem[];
}

export default function SimplePageHeader({
  heading,
  breadcrumbs,
}: SimplePageHeaderProps) {
  return (
    <>
      {/* Page Header */}
      <div style={{ marginTop: "80px", backgroundColor: "#f0f5fa", borderBottom: "4px solid #c9a227" }}>
        <div className="container py-12">
          <h1
            className="text-center"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1a2e5a",
            }}
          >
            {heading}
          </h1>
        </div>
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
