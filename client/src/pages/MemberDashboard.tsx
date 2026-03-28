/*
 * ULKATCHO FIRST NATION — Member Dashboard
 * Authenticated member area with access to member-only documents
 */

import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { LogOut, FileText, Download, ExternalLink, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Resource = {
  id: string;
  title: string;
  url: string;
  file_type: string;
  category: string;
  is_member_only: boolean;
};

export default function MemberDashboard() {
  const { user, signOut, isMember, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !isMember) {
      setLocation("/member-portal");
    }
  }, [loading, isMember, setLocation]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .eq("is_active", true)
        .eq("is_member_only", true)
        .order("category")
        .order("title");
      setResources(data ?? []);
      setLoadingDocs(false);
    }
    if (user) load();
  }, [user]);

  const filtered = resources.filter(
    (r) => search === "" || r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#c8d5e0" }}>
        <p style={{ color: "#555", fontFamily: "Lora, serif" }}>Loading...</p>
      </div>
    );
  }

  if (!isMember) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 md:py-20" style={{ backgroundColor: "#1a2e5a" }}>
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="ufn-section-label" style={{ color: "rgba(201,162,39,0.8)" }}>
              Member Portal
            </div>
            <h1
              className="mt-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "#ffffff",
              }}
            >
              Welcome, {user?.user_metadata?.first_name || user?.email?.split("@")[0] || "Member"}
            </h1>
            <p className="mt-3 text-sm" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.7)" }}>
              Access member-only documents and resources below.
            </p>
            <button
              onClick={handleSignOut}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase cursor-pointer"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </section>

        {/* Member Documents */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#1a2e5a",
                }}
              >
                Member Documents
              </h2>
              <div className="relative" style={{ width: "240px" }}>
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8b6420" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full pl-9 pr-3 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dce6ef",
                    fontFamily: "Lora, serif",
                    color: "#1a2e5a",
                  }}
                />
              </div>
            </div>

            {loadingDocs ? (
              <p className="text-sm py-8 text-center" style={{ color: "#555", fontFamily: "Lora, serif" }}>
                Loading documents...
              </p>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-12"
                style={{ backgroundColor: "#ffffff", border: "1px solid #e8edf2" }}
              >
                <FileText size={32} className="mx-auto mb-3" style={{ color: "#ccc" }} />
                <p className="text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                  {search ? "No documents match your search." : "No member-only documents available yet."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 transition-shadow hover:shadow-lg"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e8edf2",
                      borderLeft: "3px solid #c9a227",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <FileText size={20} className="mt-0.5 shrink-0" style={{ color: "#1a2e5a" }} />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-semibold mb-1 line-clamp-2"
                          style={{ fontFamily: "Raleway, sans-serif", color: "#1a2e5a" }}
                        >
                          {doc.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs px-2 py-0.5"
                            style={{
                              fontFamily: "Raleway, sans-serif",
                              fontWeight: 600,
                              backgroundColor: "rgba(26,46,90,0.08)",
                              color: "#1a2e5a",
                            }}
                          >
                            {doc.file_type}
                          </span>
                          <span className="text-xs" style={{ fontFamily: "Lora, serif", color: "#888" }}>
                            {doc.category}
                          </span>
                        </div>
                      </div>
                      <ExternalLink size={14} className="shrink-0 mt-1" style={{ color: "#8b6420" }} />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Public resources link */}
            <div className="mt-8 text-center">
              <Link href="/resources">
                <span
                  className="inline-flex items-center gap-2 text-sm cursor-pointer"
                  style={{ fontFamily: "Lora, serif", color: "#1a2e5a", textDecoration: "underline" }}
                >
                  <Download size={14} />
                  View all public resources
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
