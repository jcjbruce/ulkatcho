/*
 * ULKATCHO FIRST NATION — Member Applications Manager
 * Admin panel to review, approve, and reject member portal applications
 */

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search, CheckCircle, XCircle, Clock, Eye, ChevronDown, ChevronUp } from "lucide-react";

type Application = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  band_number: string | null;
  date_of_birth: string | null;
  address: string | null;
  reason: string | null;
  status: "pending" | "approved" | "rejected";
  admin_notes: string | null;
  created_at: string;
};

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: "rgba(201,162,39,0.15)", color: "#8b6420", label: "Pending" },
  approved: { bg: "rgba(22,163,74,0.1)", color: "#16a34a", label: "Approved" },
  rejected: { bg: "rgba(220,38,38,0.1)", color: "#dc2626", label: "Rejected" },
};

export default function MemberApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});

  const fetchApplications = async () => {
    const { data } = await supabase
      .from("member_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setApplications(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchApplications(); }, []);

  const filtered = applications.filter((a) => {
    const matchSearch =
      `${a.first_name} ${a.last_name} ${a.email}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || a.status === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  const pendingCount = applications.filter((a) => a.status === "pending").length;

  const handleApprove = async (app: Application) => {
    setProcessing(app.id);
    const notes = adminNotes[app.id] || "";

    // Call the Edge Function to create the Supabase auth account
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/approve-member`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          application_id: app.id,
          action: "approve",
          admin_notes: notes,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Unknown error" }));
      alert(`Failed to approve: ${err.error || "Unknown error"}`);
      setProcessing(null);
      return;
    }

    setProcessing(null);
    fetchApplications();
  };

  const handleReject = async (app: Application) => {
    if (!confirm(`Reject application from ${app.first_name} ${app.last_name}?`)) return;
    setProcessing(app.id);
    const notes = adminNotes[app.id] || "";

    const { error } = await supabase
      .from("member_applications")
      .update({ status: "rejected", admin_notes: notes, reviewed_at: new Date().toISOString() })
      .eq("id", app.id);

    if (error) {
      alert("Failed to reject application.");
    }

    setProcessing(null);
    fetchApplications();
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
          Member Applications
        </h1>
        <p className="mt-1 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
          {pendingCount > 0 ? `${pendingCount} pending application${pendingCount > 1 ? "s" : ""} to review` : "No pending applications"}
        </p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative" style={{ width: "260px" }}>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b6420" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2 text-sm"
            style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm"
          style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm py-8 text-center" style={{ color: "#555" }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12" style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}>
          <p className="text-sm" style={{ color: "#555", fontFamily: "Lora, serif" }}>No applications found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const status = STATUS_STYLES[app.status];
            const isExpanded = expanded === app.id;
            const isProcessing = processing === app.id;

            return (
              <div
                key={app.id}
                style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}
              >
                {/* Summary row */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : app.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-semibold" style={{ fontFamily: "Raleway, sans-serif", color: "#1a2e5a" }}>
                        {app.first_name} {app.last_name}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 font-semibold"
                        style={{ backgroundColor: status.bg, color: status.color, fontFamily: "Raleway, sans-serif" }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ fontFamily: "Lora, serif", color: "#888" }}>
                      {app.email} &middot; Applied {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {isExpanded ? <ChevronUp size={16} style={{ color: "#888" }} /> : <ChevronDown size={16} style={{ color: "#888" }} />}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1" style={{ borderTop: "1px solid #f0f4f8" }}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <Detail label="Phone" value={app.phone} />
                      <Detail label="Band Number" value={app.band_number} />
                      <Detail label="Date of Birth" value={app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : null} />
                      <Detail label="Address" value={app.address} />
                    </div>
                    {app.reason && (
                      <div className="mb-4">
                        <span className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>
                          Reason for Access
                        </span>
                        <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#333" }}>{app.reason}</p>
                      </div>
                    )}

                    {/* Admin notes */}
                    <div className="mb-4">
                      <label className="block text-xs font-semibold tracking-wider uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>
                        Admin Notes
                      </label>
                      <textarea
                        value={adminNotes[app.id] ?? app.admin_notes ?? ""}
                        onChange={(e) => setAdminNotes((prev) => ({ ...prev, [app.id]: e.target.value }))}
                        rows={2}
                        className="w-full px-3 py-2 text-sm"
                        style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif" }}
                        placeholder="Internal notes (optional)..."
                      />
                    </div>

                    {/* Actions */}
                    {app.status === "pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(app)}
                          disabled={isProcessing}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wider uppercase cursor-pointer"
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            backgroundColor: "#16a34a",
                            color: "#ffffff",
                            border: "none",
                            opacity: isProcessing ? 0.7 : 1,
                          }}
                        >
                          <CheckCircle size={15} />
                          {isProcessing ? "Processing..." : "Approve & Create Account"}
                        </button>
                        <button
                          onClick={() => handleReject(app)}
                          disabled={isProcessing}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wider uppercase cursor-pointer"
                          style={{
                            fontFamily: "Raleway, sans-serif",
                            backgroundColor: "transparent",
                            color: "#dc2626",
                            border: "1px solid #dc2626",
                            opacity: isProcessing ? 0.7 : 1,
                          }}
                        >
                          <XCircle size={15} />
                          Reject
                        </button>
                      </div>
                    )}

                    {app.status !== "pending" && app.admin_notes && (
                      <p className="text-xs" style={{ fontFamily: "Lora, serif", color: "#888" }}>
                        Notes: {app.admin_notes}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <span className="block text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>
        {label}
      </span>
      <span className="text-sm" style={{ fontFamily: "Lora, serif", color: value ? "#333" : "#ccc" }}>
        {value || "—"}
      </span>
    </div>
  );
}
