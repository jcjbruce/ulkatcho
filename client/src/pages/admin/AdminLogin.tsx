import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      setLocation("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#c8d5e0" }}>
      <div className="w-full max-w-md p-8" style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 24px rgba(26,46,90,0.10)" }}>
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "#1a2e5a" }}
          >
            <span style={{ color: "#c9a227", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.25rem" }}>U</span>
          </div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1.5rem", color: "#1a2e5a" }}>
            Admin Login
          </h1>
          <p className="mt-1 text-sm" style={{ fontFamily: "Lora, serif", color: "#555" }}>
            Ulkatcho First Nation Website Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1.5" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm"
              style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif", color: "#333" }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase mb-1.5" style={{ fontFamily: "Raleway, sans-serif", color: "#8b6420" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm"
              style={{ border: "1px solid #dce6ef", fontFamily: "Lora, serif", color: "#333" }}
            />
          </div>

          {error && (
            <div className="p-3 text-sm" style={{ backgroundColor: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-semibold tracking-wider uppercase transition-colors"
            style={{
              fontFamily: "Raleway, sans-serif",
              backgroundColor: "#1a2e5a",
              color: "#ffffff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
