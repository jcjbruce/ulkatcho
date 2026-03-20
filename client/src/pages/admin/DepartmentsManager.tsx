import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, UserPlus } from "lucide-react";

type Staff = {
  id: string;
  department_id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  sort_order: number;
};

type Department = {
  id: string;
  heading: string;
  sort_order: number;
  department_staff: Staff[];
};

export default function DepartmentsManager() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingDept, setEditingDept] = useState<{ id?: string; heading: string; sort_order: number } | null>(null);
  const [editingStaff, setEditingStaff] = useState<(Partial<Staff> & { department_id: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "dept" | "staff"; id: string } | null>(null);

  const fetchData = async () => {
    const { data } = await supabase
      .from("departments")
      .select("*, department_staff(*)")
      .order("sort_order")
      .order("sort_order", { referencedTable: "department_staff" });
    setDepartments(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const saveDept = async () => {
    if (!editingDept) return;
    setSaving(true);
    if (editingDept.id) {
      await supabase.from("departments").update({ heading: editingDept.heading, sort_order: editingDept.sort_order }).eq("id", editingDept.id);
    } else {
      await supabase.from("departments").insert({ heading: editingDept.heading, sort_order: editingDept.sort_order });
    }
    setSaving(false);
    setEditingDept(null);
    fetchData();
  };

  const deleteDept = async (id: string) => {
    await supabase.from("departments").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchData();
  };

  const saveStaff = async () => {
    if (!editingStaff) return;
    setSaving(true);
    const { id, ...rest } = editingStaff as Staff;
    if (id) {
      await supabase.from("department_staff").update(rest).eq("id", id);
    } else {
      await supabase.from("department_staff").insert(rest);
    }
    setSaving(false);
    setEditingStaff(null);
    fetchData();
  };

  const deleteStaff = async (id: string) => {
    await supabase.from("department_staff").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchData();
  };

  // Inline modal for editing
  const renderModal = (title: string, onSave: () => void, onCancel: () => void, children: React.ReactNode) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="w-full max-w-md p-6" style={{ backgroundColor: "#ffffff", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
        <h2 className="mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.25rem", color: "#1a2e5a" }}>{title}</h2>
        <div className="space-y-3">{children}</div>
        <div className="flex gap-3 mt-5">
          <button onClick={onSave} disabled={saving} className="px-5 py-2 text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#fff", border: "none", cursor: "pointer" }}>{saving ? "Saving..." : "Save"}</button>
          <button onClick={onCancel} className="px-5 py-2 text-sm" style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>Departments</h1>
        <button onClick={() => setEditingDept({ heading: "", sort_order: 0 })} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#ffffff", border: "none", cursor: "pointer" }}>
          <Plus size={16} /> Add Department
        </button>
      </div>

      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: "#555" }}>Loading...</p>
      ) : (
        <div className="space-y-3">
          {departments.map((dept) => (
            <div key={dept.id} style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}>
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer"
                onClick={() => setExpanded(expanded === dept.id ? null : dept.id)}
                style={{ borderBottom: expanded === dept.id ? "1px solid #e8edf2" : "none" }}
              >
                <div className="flex items-center gap-3">
                  {expanded === dept.id ? <ChevronUp size={16} style={{ color: "#8b6420" }} /> : <ChevronDown size={16} style={{ color: "#8b6420" }} />}
                  <span className="font-medium text-sm" style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>{dept.heading}</span>
                  <span className="text-xs px-1.5 py-0.5" style={{ backgroundColor: "#f0f4f8", color: "#555", fontSize: "0.65rem" }}>{dept.department_staff.length} staff</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); setEditingDept({ id: dept.id, heading: dept.heading, sort_order: dept.sort_order }); }} className="p-1.5 cursor-pointer" style={{ background: "none", border: "none", color: "#1a2e5a" }}><Pencil size={14} /></button>
                  {deleteConfirm?.type === "dept" && deleteConfirm.id === dept.id ? (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => deleteDept(dept.id)} className="text-xs px-2 py-1 cursor-pointer" style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "0.65rem" }}>Delete</button>
                      <button onClick={() => setDeleteConfirm(null)} className="text-xs px-2 py-1 cursor-pointer" style={{ background: "none", border: "1px solid #ddd", color: "#555", fontSize: "0.65rem" }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ type: "dept", id: dept.id }); }} className="p-1.5 cursor-pointer" style={{ background: "none", border: "none", color: "#dc2626" }}><Trash2 size={14} /></button>
                  )}
                </div>
              </div>

              {expanded === dept.id && (
                <div className="px-4 py-3">
                  <table className="w-full mb-3">
                    <thead>
                      <tr style={{ borderBottom: "1px solid #f0f4f8" }}>
                        <th className="text-left pb-2 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Name</th>
                        <th className="text-left pb-2 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Title</th>
                        <th className="text-left pb-2 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Phone</th>
                        <th className="text-left pb-2 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Email</th>
                        <th className="text-right pb-2" style={{ width: "60px" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dept.department_staff.map((s) => (
                        <tr key={s.id} style={{ borderBottom: "1px solid #f8fafb" }}>
                          <td className="py-2 text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>{s.name || "—"}</td>
                          <td className="py-2 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>{s.title}</td>
                          <td className="py-2 text-sm hidden md:table-cell" style={{ fontFamily: "Lora, serif", color: "#555" }}>{s.phone}</td>
                          <td className="py-2 text-sm hidden md:table-cell" style={{ fontFamily: "Lora, serif", color: "#555" }}>{s.email}</td>
                          <td className="py-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => setEditingStaff(s)} className="p-1 cursor-pointer" style={{ background: "none", border: "none", color: "#1a2e5a" }}><Pencil size={13} /></button>
                              {deleteConfirm?.type === "staff" && deleteConfirm.id === s.id ? (
                                <div className="flex gap-1">
                                  <button onClick={() => deleteStaff(s.id)} className="text-xs px-1.5 py-0.5 cursor-pointer" style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "0.6rem" }}>Yes</button>
                                  <button onClick={() => setDeleteConfirm(null)} className="text-xs px-1.5 py-0.5 cursor-pointer" style={{ background: "none", border: "1px solid #ddd", color: "#555", fontSize: "0.6rem" }}>No</button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirm({ type: "staff", id: s.id })} className="p-1 cursor-pointer" style={{ background: "none", border: "none", color: "#dc2626" }}><Trash2 size={13} /></button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => setEditingStaff({ department_id: dept.id, name: "", title: "", phone: "", email: "", sort_order: 0 })}
                    className="flex items-center gap-1.5 text-xs cursor-pointer px-3 py-1.5"
                    style={{ fontFamily: "Raleway, sans-serif", color: "#1a2e5a", background: "none", border: "1px dashed #ccc" }}
                  >
                    <UserPlus size={13} /> Add Staff Member
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Department modal */}
      {editingDept && renderModal(
        editingDept.id ? "Edit Department" : "New Department",
        saveDept,
        () => setEditingDept(null),
        <>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Department Name</label>
            <input value={editingDept.heading} onChange={(e) => setEditingDept({ ...editingDept, heading: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Sort Order</label>
            <input type="number" value={editingDept.sort_order} onChange={(e) => setEditingDept({ ...editingDept, sort_order: Number(e.target.value) })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
        </>
      )}

      {/* Staff modal */}
      {editingStaff && renderModal(
        editingStaff.id ? "Edit Staff" : "New Staff Member",
        saveStaff,
        () => setEditingStaff(null),
        <>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Name</label>
            <input value={editingStaff.name ?? ""} onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} placeholder="Leave empty if position is vacant" />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Title *</label>
            <input value={editingStaff.title ?? ""} onChange={(e) => setEditingStaff({ ...editingStaff, title: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Phone *</label>
            <input value={editingStaff.phone ?? ""} onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Email *</label>
            <input value={editingStaff.email ?? ""} onChange={(e) => setEditingStaff({ ...editingStaff, email: e.target.value })} className="w-full px-3 py-2 text-sm" style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }} />
          </div>
        </>
      )}
    </AdminLayout>
  );
}
