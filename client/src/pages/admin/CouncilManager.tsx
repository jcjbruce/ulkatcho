import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2 } from "lucide-react";

type CouncilMember = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
};

const emptyMember = { name: "", email: "", role: "Councillor", photo_url: null, sort_order: 0, is_active: true };

export default function CouncilManager() {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(typeof emptyMember & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchMembers = async () => {
    const { data } = await supabase.from("council_members").select("*").order("sort_order");
    setMembers(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const saveMember = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, ...rest } = editing as CouncilMember;
    if (id) {
      await supabase.from("council_members").update(rest).eq("id", id);
    } else {
      await supabase.from("council_members").insert(rest);
    }
    setSaving(false);
    setEditing(null);
    fetchMembers();
  };

  const deleteMember = async (id: string) => {
    await supabase.from("council_members").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchMembers();
  };

  if (editing) {
    return (
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
            {editing.id ? "Edit Council Member" : "New Council Member"}
          </h1>
          <button onClick={() => setEditing(null)} className="text-sm px-4 py-2" style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}>Cancel</button>
        </div>
        <div className="space-y-4 max-w-lg" style={{ backgroundColor: "#ffffff", padding: "24px", border: "1px solid #e8edf2" }}>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Full Name *</label>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} placeholder="e.g. Chief Derech Sill" />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Email *</label>
            <input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Role</label>
            <select value={editing.role ?? "Councillor"} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}>
              <option value="Chief">Chief</option>
              <option value="Councillor">Councillor</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Photo URL</label>
            <input value={editing.photo_url ?? ""} onChange={(e) => setEditing({ ...editing, photo_url: e.target.value || null })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} placeholder="https://..." />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>
              <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} className="accent-[#c9a227]" />
              Active
            </label>
          </div>
          <div className="pt-4 flex gap-3">
            <button onClick={saveMember} disabled={saving || !editing.name || !editing.email} className="px-6 py-2.5 text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#fff", border: "none", cursor: "pointer" }}>{saving ? "Saving..." : "Save"}</button>
            <button onClick={() => setEditing(null)} className="px-6 py-2.5 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>Chief & Council</h1>
        <button onClick={() => setEditing({ ...emptyMember })} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#ffffff", border: "none", cursor: "pointer" }}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: "#555" }}>Loading...</p>
      ) : (
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafb", borderBottom: "1px solid #e8edf2" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Role</th>
                <th className="text-right px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                  <td className="px-4 py-3 text-sm font-medium" style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>{m.name}</td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell" style={{ fontFamily: "Lora, serif", color: "#555" }}>{m.email}</td>
                  <td className="px-4 py-3 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>{m.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditing(m)} className="p-1.5 cursor-pointer" style={{ background: "none", border: "none", color: "#1a2e5a" }}><Pencil size={15} /></button>
                      {deleteConfirm === m.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => deleteMember(m.id)} className="text-xs px-2 py-1 cursor-pointer" style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "0.65rem" }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 cursor-pointer" style={{ background: "none", border: "1px solid #ddd", color: "#555", fontSize: "0.65rem" }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(m.id)} className="p-1.5 cursor-pointer" style={{ background: "none", border: "none", color: "#dc2626" }}><Trash2 size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-sm" style={{ color: "#555" }}>No council members yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
