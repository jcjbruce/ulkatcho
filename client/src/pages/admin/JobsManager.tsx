import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";

type Job = {
  id: string;
  title: string;
  slug: string;
  department: string;
  type: string;
  location: string;
  posted_date: string;
  closing_date: string | null;
  description: string;
  requirements: string[];
  contact_email: string;
  contact_ext: string | null;
  is_partner: boolean;
  partner_name: string | null;
  partner_url: string | null;
  is_active: boolean;
  sort_order: number;
};

const JOB_TYPES = ["Full Time", "Part Time", "Temporary", "Freelance", "Internship"];

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const emptyJob: Omit<Job, "id"> = {
  title: "",
  slug: "",
  department: "Various",
  type: "Full Time",
  location: "Anahim Lake, BC",
  posted_date: new Date().toISOString().split("T")[0],
  closing_date: null,
  description: "",
  requirements: [],
  contact_email: "OperationsManager@ulkatcho.ca",
  contact_ext: "218",
  is_partner: false,
  partner_name: null,
  partner_url: null,
  is_active: true,
  sort_order: 0,
};

export default function JobsManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<(Omit<Job, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [requirementsText, setRequirementsText] = useState("");

  const fetchJobs = async () => {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .order("sort_order")
      .order("title");
    setJobs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = async (job: Job) => {
    await supabase.from("jobs").update({ is_active: !job.is_active }).eq("id", job.id);
    fetchJobs();
  };

  const deleteJob = async (id: string) => {
    await supabase.from("jobs").delete().eq("id", id);
    setDeleteConfirm(null);
    fetchJobs();
  };

  const openEditor = (job?: Job) => {
    if (job) {
      setEditing(job);
      setRequirementsText(job.requirements?.join("\n") ?? "");
    } else {
      setEditing({ ...emptyJob });
      setRequirementsText("");
    }
  };

  const saveJob = async () => {
    if (!editing) return;
    setSaving(true);
    const data = {
      ...editing,
      slug: editing.slug || slugify(editing.title),
      requirements: requirementsText.split("\n").map((r) => r.trim()).filter(Boolean),
    };
    const { id, ...rest } = data as Job;

    if (id) {
      await supabase.from("jobs").update(rest).eq("id", id);
    } else {
      await supabase.from("jobs").insert(rest);
    }
    setSaving(false);
    setEditing(null);
    fetchJobs();
  };

  if (editing) {
    return (
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
            {(editing as Job).id ? "Edit Job" : "New Job"}
          </h1>
          <button
            onClick={() => setEditing(null)}
            className="text-sm px-4 py-2"
            style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>

        <div className="space-y-4 max-w-2xl" style={{ backgroundColor: "#ffffff", padding: "24px", border: "1px solid #e8edf2" }}>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Title *</label>
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
              className="w-full px-3 py-2 text-sm"
              style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Department</label>
              <input
                value={editing.department}
                onChange={(e) => setEditing({ ...editing, department: e.target.value })}
                className="w-full px-3 py-2 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Type</label>
              <select
                value={editing.type}
                onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                className="w-full px-3 py-2 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              >
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Location</label>
              <input
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full px-3 py-2 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Closing Date</label>
              <input
                type="date"
                value={editing.closing_date ?? ""}
                onChange={(e) => setEditing({ ...editing, closing_date: e.target.value || null })}
                className="w-full px-3 py-2 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              />
              <p className="text-xs mt-1" style={{ color: "#888" }}>Leave empty for "Open Until Filled"</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Description</label>
            <textarea
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={5}
              className="w-full px-3 py-2 text-sm"
              style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Requirements (one per line)</label>
            <textarea
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 text-sm"
              style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              placeholder="e.g.&#10;Valid driver's license&#10;2+ years experience"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Contact Email</label>
              <input
                value={editing.contact_email}
                onChange={(e) => setEditing({ ...editing, contact_email: e.target.value })}
                className="w-full px-3 py-2 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Contact Ext</label>
              <input
                value={editing.contact_ext ?? ""}
                onChange={(e) => setEditing({ ...editing, contact_ext: e.target.value || null })}
                className="w-full px-3 py-2 text-sm"
                style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>
              <input
                type="checkbox"
                checked={editing.is_partner}
                onChange={(e) => setEditing({ ...editing, is_partner: e.target.checked })}
                className="accent-[#c9a227]"
              />
              Partner Opportunity
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>
              <input
                type="checkbox"
                checked={editing.is_active}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                className="accent-[#c9a227]"
              />
              Active (visible on site)
            </label>
          </div>

          {editing.is_partner && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Partner Name</label>
                <input
                  value={editing.partner_name ?? ""}
                  onChange={(e) => setEditing({ ...editing, partner_name: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm"
                  style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Partner URL</label>
                <input
                  value={editing.partner_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, partner_url: e.target.value || null })}
                  className="w-full px-3 py-2 text-sm"
                  style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <button
              onClick={saveJob}
              disabled={saving || !editing.title}
              className="px-6 py-2.5 text-sm font-semibold tracking-wider uppercase"
              style={{
                fontFamily: "Raleway, sans-serif",
                backgroundColor: "#1a2e5a",
                color: "#ffffff",
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Saving..." : "Save Job"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 text-sm tracking-wider uppercase"
              style={{ fontFamily: "Raleway, sans-serif", color: "#555", background: "none", border: "1px solid #dce6ef", cursor: "pointer" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
          Job Postings
        </h1>
        <button
          onClick={() => openEditor()}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold tracking-wider uppercase"
          style={{ fontFamily: "Raleway, sans-serif", backgroundColor: "#1a2e5a", color: "#ffffff", border: "none", cursor: "pointer" }}
        >
          <Plus size={16} /> Add Job
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4" style={{ maxWidth: "320px" }}>
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b6420" }} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="w-full pl-9 pr-3 py-2 text-sm"
          style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
        />
      </div>

      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: "#555" }}>Loading...</p>
      ) : (
        <div style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "#f8fafb", borderBottom: "1px solid #e8edf2" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Type</th>
                <th className="text-center px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job.id} style={{ borderBottom: "1px solid #f0f4f8" }}>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium" style={{ fontFamily: "Lora, serif", color: "#1a2e5a" }}>{job.title}</span>
                    {job.is_partner && (
                      <span className="ml-2 text-xs px-1.5 py-0.5" style={{ backgroundColor: "#fef3cd", color: "#8b6420", fontSize: "0.65rem" }}>PARTNER</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm hidden md:table-cell" style={{ fontFamily: "Lora, serif", color: "#555" }}>{job.type}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="text-xs px-2 py-1 font-semibold"
                      style={{
                        backgroundColor: job.is_active ? "#dcfce7" : "#fee2e2",
                        color: job.is_active ? "#166534" : "#991b1b",
                        fontSize: "0.65rem",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      {job.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleActive(job)}
                        title={job.is_active ? "Deactivate" : "Activate"}
                        className="p-1.5 cursor-pointer"
                        style={{ background: "none", border: "none", color: "#555" }}
                      >
                        {job.is_active ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        onClick={() => openEditor(job)}
                        title="Edit"
                        className="p-1.5 cursor-pointer"
                        style={{ background: "none", border: "none", color: "#1a2e5a" }}
                      >
                        <Pencil size={15} />
                      </button>
                      {deleteConfirm === job.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="text-xs px-2 py-1 cursor-pointer"
                            style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", fontSize: "0.65rem" }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs px-2 py-1 cursor-pointer"
                            style={{ background: "none", border: "1px solid #ddd", color: "#555", fontSize: "0.65rem" }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(job.id)}
                          title="Delete"
                          className="p-1.5 cursor-pointer"
                          style={{ background: "none", border: "none", color: "#dc2626" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-sm" style={{ color: "#555" }}>
                    {search ? "No jobs match your search." : "No jobs yet. Click \"Add Job\" to create one."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
