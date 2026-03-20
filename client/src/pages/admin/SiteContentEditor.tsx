import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Save, Check } from "lucide-react";

type ContentRow = {
  id: string;
  page: string;
  section: string;
  field: string;
  value: string;
};

const PAGES = [
  { key: "home", label: "Home Page", sections: [
    { section: "emergency_banner", fields: [
      { field: "is_visible", label: "Show Emergency Banner", type: "toggle" },
      { field: "text", label: "Banner Text", type: "textarea" },
    ]},
    { section: "hero", fields: [
      { field: "heading", label: "Hero Heading", type: "text" },
      { field: "subheading", label: "Hero Subheading", type: "text" },
    ]},
    { section: "leadership_message", fields: [
      { field: "author", label: "Author Name", type: "text" },
      { field: "body", label: "Message Body", type: "textarea" },
    ]},
  ]},
  { key: "contact", label: "Contact Page", sections: [
    { section: "main", fields: [
      { field: "phone", label: "Main Phone", type: "text" },
      { field: "fax", label: "Fax", type: "text" },
      { field: "address_line1", label: "Address Line 1", type: "text" },
      { field: "address_line2", label: "Address Line 2", type: "text" },
      { field: "email", label: "General Email", type: "text" },
    ]},
    { section: "hours", fields: [
      { field: "weekday", label: "Weekday Hours", type: "text" },
      { field: "weekend", label: "Weekend Hours", type: "text" },
    ]},
  ]},
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
      const [section, field] = key.split(".");
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
        <button
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase"
          style={{ fontFamily: "Raleway, sans-serif", backgroundColor: saved ? "#16a34a" : "#1a2e5a", color: "#ffffff", border: "none", cursor: "pointer", transition: "background-color 0.2s" }}
        >
          {saved ? <><Check size={16} /> Saved!</> : saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {/* Page selector */}
      <div className="flex gap-2 mb-6">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className="px-4 py-2 text-sm font-semibold tracking-wider uppercase"
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
                {sec.section.replace(/_/g, " ")}
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
                          rows={4}
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
