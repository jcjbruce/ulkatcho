import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, Check, ExternalLink } from "lucide-react";

type ContentRow = {
  id: string;
  page: string;
  section: string;
  field: string;
  value: string;
};

type FieldDef = { field: string; label: string; type: "text" | "textarea" | "toggle" };
type SectionDef = { section: string; label: string; fields: FieldDef[] };
type PageDef = { key: string; label: string; path: string; sections: SectionDef[] };

const PAGES: PageDef[] = [
  {
    key: "home", label: "Home Page", path: "/",
    sections: [
      { section: "emergency_banner", label: "Emergency Banner", fields: [
        { field: "is_visible", label: "Show Emergency Banner", type: "toggle" },
        { field: "text", label: "Banner Text", type: "textarea" },
      ]},
      { section: "hero", label: "Hero Section", fields: [
        { field: "label", label: "Hero Label (above heading)", type: "text" },
        { field: "heading_line1", label: "Heading Line 1", type: "text" },
        { field: "heading_line2", label: "Heading Line 2 (emphasized)", type: "text" },
        { field: "subheading", label: "Subheading Paragraph", type: "textarea" },
      ]},
      { section: "leadership_message", label: "Leadership Message", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading_line1", label: "Heading Line 1", type: "text" },
        { field: "heading_line2", label: "Heading Line 2", type: "text" },
        { field: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { field: "paragraph2", label: "Paragraph 2", type: "textarea" },
        { field: "chief_name", label: "Chief Name", type: "text" },
        { field: "chief_title", label: "Chief Title", type: "text" },
        { field: "quote", label: "Quote", type: "text" },
      ]},
      { section: "community_services", label: "Community Services", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph", label: "Section Description", type: "textarea" },
      ]},
      { section: "culture_land", label: "Culture & Land Section", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { field: "paragraph2", label: "Paragraph 2", type: "textarea" },
      ]},
    ],
  },
  {
    key: "about", label: "About", path: "/about",
    sections: [
      { section: "hero", label: "Page Hero", fields: [
        { field: "label", label: "Hero Label", type: "text" },
        { field: "heading", label: "Hero Heading", type: "text" },
      ]},
      { section: "vision", label: "Vision Section", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { field: "paragraph2", label: "Paragraph 2", type: "textarea" },
        { field: "paragraph3", label: "Paragraph 3", type: "textarea" },
        { field: "quote", label: "Vision Quote", type: "text" },
      ]},
      { section: "history", label: "History Section", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { field: "paragraph2", label: "Paragraph 2", type: "textarea" },
        { field: "paragraph3", label: "Paragraph 3", type: "textarea" },
        { field: "paragraph4", label: "Paragraph 4", type: "textarea" },
      ]},
      { section: "origins", label: "Ancestral Origins Section", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { field: "paragraph2", label: "Paragraph 2", type: "textarea" },
        { field: "paragraph3", label: "Paragraph 3", type: "textarea" },
      ]},
      { section: "travellers", label: "Travellers Section", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph1", label: "Paragraph 1", type: "textarea" },
        { field: "paragraph2", label: "Paragraph 2", type: "textarea" },
      ]},
    ],
  },
  {
    key: "education", label: "Education", path: "/education",
    sections: [
      { section: "hero", label: "Page Hero", fields: [
        { field: "label", label: "Hero Label", type: "text" },
        { field: "heading", label: "Hero Heading", type: "text" },
      ]},
      { section: "intro", label: "Introduction", fields: [
        { field: "paragraph", label: "Intro Paragraph", type: "textarea" },
      ]},
      { section: "important_note", label: "Important Note Banner", fields: [
        { field: "heading", label: "Note Heading", type: "text" },
        { field: "text", label: "Note Text", type: "textarea" },
      ]},
      { section: "k12", label: "K-12 Education", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "contact_text", label: "Contact Info Text", type: "textarea" },
      ]},
      { section: "postsec", label: "Post-Secondary", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "deadlines_heading", label: "Deadlines Heading", type: "text" },
        { field: "contact_person", label: "Contact Person", type: "text" },
        { field: "contact_extension", label: "Contact Extension", type: "text" },
      ]},
    ],
  },
  {
    key: "careers", label: "Careers", path: "/careers",
    sections: [
      { section: "hero", label: "Page Hero", fields: [
        { field: "label", label: "Hero Label", type: "text" },
        { field: "heading", label: "Hero Heading", type: "text" },
      ]},
      { section: "priority_policy", label: "Priority Hiring Policy", fields: [
        { field: "heading", label: "Policy Heading", type: "text" },
        { field: "paragraph", label: "Policy Description", type: "textarea" },
        { field: "contact_text", label: "Contact Text", type: "text" },
      ]},
      { section: "partner", label: "Partner Organizations", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "paragraph", label: "Section Description", type: "textarea" },
      ]},
    ],
  },
  {
    key: "contact", label: "Contact", path: "/contact",
    sections: [
      { section: "hero", label: "Page Hero", fields: [
        { field: "label", label: "Hero Label", type: "text" },
        { field: "heading", label: "Hero Heading", type: "text" },
      ]},
      { section: "main", label: "Contact Information", fields: [
        { field: "phone", label: "Main Phone", type: "text" },
        { field: "toll_free", label: "Toll Free", type: "text" },
        { field: "health_clinic", label: "Health Clinic Phone", type: "text" },
        { field: "fax", label: "Fax", type: "text" },
        { field: "address_line1", label: "Address Line 1", type: "text" },
        { field: "address_line2", label: "Address Line 2", type: "text" },
        { field: "email", label: "General Email", type: "text" },
      ]},
      { section: "hours", label: "Office Hours", fields: [
        { field: "weekday", label: "Weekday Hours", type: "text" },
        { field: "weekend", label: "Weekend Hours", type: "text" },
      ]},
      { section: "form", label: "Contact Form", fields: [
        { field: "label", label: "Form Section Label", type: "text" },
        { field: "heading", label: "Form Heading", type: "text" },
        { field: "paragraph", label: "Form Description", type: "textarea" },
      ]},
    ],
  },
  {
    key: "vision", label: "Vision & Future", path: "/vision-future",
    sections: [
      { section: "hero", label: "Page Header", fields: [
        { field: "heading", label: "Page Heading", type: "text" },
      ]},
      { section: "intro", label: "Introduction", fields: [
        { field: "paragraph", label: "Intro Paragraph", type: "textarea" },
      ]},
      { section: "strategic_plan", label: "Strategic Plan", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
      ]},
      { section: "downloads", label: "Downloads Section", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
      ]},
      { section: "cta", label: "Call to Action", fields: [
        { field: "paragraph", label: "CTA Text", type: "textarea" },
      ]},
    ],
  },
  {
    key: "history", label: "History", path: "/history-of-ulkatcho-first-nation",
    sections: [
      { section: "hero", label: "Page Header", fields: [
        { field: "heading", label: "Page Heading", type: "text" },
      ]},
      { section: "section_1", label: "Ulkatcho First Nation", fields: [
        { field: "label", label: "Section Label", type: "text" },
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content (paragraphs separated by blank lines)", type: "textarea" },
      ]},
      { section: "section_2", label: "Our People", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_3", label: "Fat of the Land", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_4", label: "Tanya Lakes", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_5", label: "Family Ties", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_6", label: "Nagwuntl'oo", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_7", label: "Anahim Lake", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_8", label: "Settlement in Anahim Lake", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "intro", label: "Intro Text", type: "text" },
        { field: "body", label: "Section Content (reasons)", type: "textarea" },
      ]},
      { section: "section_9", label: "Ulkatcho Village – A Brief History", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_10", label: "Besbut'a (Anahim Peak)", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
    ],
  },
  {
    key: "ancestral", label: "Ancestral Origins", path: "/ancestral-origins",
    sections: [
      { section: "hero", label: "Page Header", fields: [
        { field: "heading", label: "Page Heading", type: "text" },
      ]},
      { section: "section_1", label: "Ulkatcho and Tŝilhqot'in in Bella Coola", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_2", label: "Mabel's Hall", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_3", label: "Clallamin House", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_4", label: "Story of Chief ʔAnahim", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_5", label: "Clayton Mack – Family Ties", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
    ],
  },
  {
    key: "travellers", label: "Travellers", path: "/travellers-entrepreneurs",
    sections: [
      { section: "hero", label: "Page Header", fields: [
        { field: "heading", label: "Page Heading", type: "text" },
      ]},
      { section: "intro", label: "Introduction", fields: [
        { field: "body", label: "Intro Content", type: "textarea" },
      ]},
      { section: "section_2", label: "Always on the Move", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
      { section: "section_3", label: "Henry Jack's Story", fields: [
        { field: "heading", label: "Section Heading", type: "text" },
        { field: "body", label: "Section Content", type: "textarea" },
      ]},
    ],
  },
];

export default function SiteContentEditor() {
  const [activePage, setActivePage] = useState(PAGES[0].key);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentPage = PAGES.find((p) => p.key === activePage)!;

  const fetchContent = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .eq("page", activePage);

    const map: Record<string, string> = {};
    (data ?? []).forEach((row: ContentRow) => {
      map[`${row.section}.${row.field}`] = row.value;
    });
    setContent(map);
    setLoading(false);
  };

  useEffect(() => { fetchContent(); }, [activePage]);

  const updateField = (section: string, field: string, value: string) => {
    setContent((prev) => ({ ...prev, [`${section}.${field}`]: value }));
    setSaved(false);
  };

  const saveAll = async () => {
    setSaving(true);
    const upserts = Object.entries(content).map(([key, value]) => {
      const [section, ...rest] = key.split(".");
      const field = rest.join(".");
      return { page: activePage, section, field, value };
    });

    for (const row of upserts) {
      await supabase.from("site_content").upsert(row, { onConflict: "page,section,field" });
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>Site Content</h1>
        <div className="flex items-center gap-3">
          <a
            href={currentPage.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase"
            style={{ fontFamily: "Raleway, sans-serif", color: "#555", border: "1px solid #dce6ef", textDecoration: "none" }}
          >
            <ExternalLink size={14} /> Preview Page
          </a>
          <button
            onClick={saveAll}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase"
            style={{ fontFamily: "Raleway, sans-serif", backgroundColor: saved ? "#16a34a" : "#1a2e5a", color: "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
          >
            {saved ? <><Check size={16} /> Saved!</> : saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Page selector — scrollable for many pages */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className="px-4 py-2 text-sm font-semibold tracking-wider uppercase whitespace-nowrap shrink-0"
            style={{
              fontFamily: "Raleway, sans-serif",
              backgroundColor: activePage === p.key ? "#1a2e5a" : "#ffffff",
              color: activePage === p.key ? "#ffffff" : "#555",
              border: "1px solid #e8edf2",
              cursor: "pointer",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: "#555" }}>Loading...</p>
      ) : (
        <div className="space-y-6">
          {currentPage.sections.map((sec) => (
            <div key={sec.section} style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2", padding: "20px" }}>
              <h3 className="mb-4 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>
                {sec.label}
              </h3>
              <div className="space-y-3">
                {sec.fields.map((f) => {
                  const key = `${sec.section}.${f.field}`;
                  const value = content[key] ?? "";

                  if (f.type === "toggle") {
                    return (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value === "true"}
                          onChange={(e) => updateField(sec.section, f.field, String(e.target.checked))}
                          className="accent-[#c9a227] w-4 h-4"
                        />
                        <span className="text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>{f.label}</span>
                      </label>
                    );
                  }

                  if (f.type === "textarea") {
                    return (
                      <div key={key}>
                        <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>{f.label}</label>
                        <textarea
                          value={value}
                          onChange={(e) => updateField(sec.section, f.field, e.target.value)}
                          rows={5}
                          className="w-full px-3 py-2 text-sm"
                          style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={key}>
                      <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>{f.label}</label>
                      <input
                        value={value}
                        onChange={(e) => updateField(sec.section, f.field, e.target.value)}
                        className="w-full px-3 py-2 text-sm"
                        style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
