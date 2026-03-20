import { useAuth } from "@/contexts/AuthContext";
import { useLocation, Link } from "wouter";
import { Briefcase, FileText, Users, Building2, Settings, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Resources", href: "/admin/resources", icon: FileText },
  { label: "Departments", href: "/admin/departments", icon: Building2 },
  { label: "Council", href: "/admin/council", icon: UserCircle },
  { label: "Site Content", href: "/admin/content", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSignOut = async () => {
    await signOut();
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f0f4f8" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-200"
        style={{
          width: sidebarOpen ? "240px" : "64px",
          backgroundColor: "#1a2e5a",
          minHeight: "100vh",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div
            className="w-9 h-9 flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#c9a227" }}
          >
            <span style={{ color: "#1a2e5a", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1rem" }}>U</span>
          </div>
          {sidebarOpen && (
            <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "0.95rem", color: "#ffffff" }}>
              UFN Admin
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className="flex items-center gap-3 px-4 py-2.5 mx-2 mb-0.5 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                    borderLeft: isActive ? "3px solid #c9a227" : "3px solid transparent",
                    color: isActive ? "#c9a227" : "rgba(255,255,255,0.7)",
                  }}
                >
                  <Icon size={18} />
                  {sidebarOpen && (
                    <span className="text-sm" style={{ fontFamily: "Raleway, sans-serif", fontWeight: isActive ? 600 : 400 }}>
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User / Sign out */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {sidebarOpen && user && (
            <p className="text-xs mb-2 truncate" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Raleway, sans-serif" }}>
              {user.email}
            </p>
          )}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm w-full px-0 py-1 cursor-pointer"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Raleway, sans-serif", background: "none", border: "none" }}
          >
            <LogOut size={16} />
            {sidebarOpen && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
