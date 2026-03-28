import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Search, ExternalLink } from "lucide-react";

type Resource = {
  id: string;
  title: string;
  url: string;
  file_type: string;
  category: string;
  is_active: boolean;
  is_member_only: boolean;
  sort_order: number;
};

const CATEGORIES = [
  "Governance & Council",
  "Plans, Policies & Reports",
  "News Releases & Notices",
  "Newsletters",
  "Elections",
  "Community Programs",
  "Business & Economic Development",
];

const FILE_TYPES = ["PDF", "PNG", "DOCX", "WEB"];

const emptyResource = {
  title: "",
  url: "",
  file_type: "PDF",
  category: CATEGORIES[0],
  is_active: true,
  is_member_only: false,
  sort_order: 0,
};

export default function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [editing, setEditing] = useState<(typeof emptyResource & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchResources = async () => {
    const { data } = await supabase.from("resources").select("*").order("category").order("sort_order").order("title");
    setResources(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, []);

  const filtered = resources.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || r.category === filterCat;
    return matchSearch && matchCat;
  });

  const deleteResource = async (id: string) => {
    await supabase.from("resources").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchResources();
  };

  const saveResource = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, ...rest } = editing as Resource;
    if (id) {
      await supabase.from("resources").update(rest).eq("id", id);
    } else {
      await supabase.from("resources").insert(rest);
    }
    setSaving(false);
    setEditing(null);
    fetchResources();
  };

  if (editing) {
    return (
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
            {editing.id ? "Edit Resource" : "New Resource"}
          </h1>
          <button onClick={() => setEditing(null)} className="text-sm px-4 py-2" style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}>Cancel</button>
        </div>
        <div className="space-y-4 max-w-2xl" style={{ backgroundColor: "#ffffff", padding: "24px", border: "1px solid #e8edf2" }}>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Title *</label>
            <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>URL *</label>
            <input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Category</label>
              <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>File Type</label>
              <select value={editing.file_type} onChange={(e) => setEditing({ ...editing, file_type: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}>
                {FILE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={editing.is_member_only ?? false}
                onChange={(e) => setEditing({ ...editing, is_member_only: e.target.checked })}
                className="accent-[#c9a227] w-4 h-4"
              />
              <span className="text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>Member-only (requires portal login to view)</span>
            </label>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={saveResource} disabled={saving || !editing.title || !editing.url} className="px-6 py-2.5 text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#ffffff", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: (saving || !editing.title || !editing.url) ? 0.7 : 1 }}>
              {saving ? "Saving..." : "Save Resource"}
            </button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>Resources</h1>
        <button onClick={() => setEditing({ ...emptyResource })} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#ffffff", border: "none", cursor: "pointer" }}>
          <Plus size={16} /> Add Resource
        </button>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative" style={{ width: "240px" }}>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b6420" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}>
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: "#555" }}>Loading...</p>
      ) : (
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafb", borderBottom: "1px solid #e8edf2" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Type</th>
                <th className="text-right px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                  <td className="px-4 py-3 text-sm" style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>{r.title}</td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell" style={{ fontFamily: "Lora, serif", color: "#555" }}>{r.category}</td>
                  <td className="px-4 py-3 text-xs hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#888" }}>{r.file_type}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="p-1.5" style={{ color: "#555" }}><ExternalLink size={15} /></a>
                      <button onClick={() => setEditing(r)} className="p-1.5 cursor-pointer" style={{ background: "none", border: "none", color: "#1a2e5a" }}><Pencil size={15} /></button>
                      {deleteConfirm === r.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => deleteResource(r.id)} className="text-xs px-2 py-1 cursor-pointer" style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "0.65rem" }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 cursor-pointer" style={{ background: "none", border: "1px solid #ddd", color: "#555", fontSize: "0.65rem" }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(r.id)} className="p-1.5 cursor-pointer" style={{ background: "none", border: "none", color: "#dc2626" }}><Trash2 size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-sm" style={{ color: "#555" }}>No resources found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
