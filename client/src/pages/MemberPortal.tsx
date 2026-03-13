/*
 * ULKATCHO FIRST NATION — Member Portal Page
 * Theme: River Stone & Birch
 * Frontend only — login form UI, no backend connection
 */

import { useState } from "react";
import { Link } from "wouter";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";

export default function MemberPortal() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — backend connection to be added separately
    alert("Member portal backend connection coming soon. Please contact info@ulkatcho.ca for assistance.");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape-XMfDNRn5AqAL8tFS8QhzzA.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(26, 26, 24, 0.82)" }}
      />

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link href="/">
          <div className="flex items-center gap-3">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/logo-new_03f03d5a.png"
              alt="Ulkatcho First Nation Crest"
              className="w-auto object-contain flex-shrink-0"
              style={{ height: "56px", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.4))" }}
            />
            <div className="leading-tight">
              <div
                className="font-display font-bold"
                style={{ color: "#F7F2E8", fontSize: "1.05rem", letterSpacing: "0.03em" }}
              >
                Ulkatcho
              </div>
              <div
                className="font-ui tracking-widest uppercase"
                style={{ color: "#C8922A", fontSize: "0.6rem", letterSpacing: "0.18em" }}
              >
                First Nation
              </div>
            </div>
          </div>
        </Link>
      </header>

      {/* Login Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-md"
          style={{
            backgroundColor: "#F7F2E8",
            borderTop: "4px solid #B8341B",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div className="p-8 md:p-10">
            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center mb-6"
              style={{ backgroundColor: "#1C3A1A" }}
            >
              <Lock size={24} style={{ color: "#F7F2E8" }} />
            </div>

            <div className="ufn-section-label mb-2">Secure Access</div>
            <h1
              className="mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "1.85rem",
                color: "#1C3A1A",
              }}
            >
              Member Login
            </h1>
            <p
              className="mb-8 text-sm"
              style={{ fontFamily: "Lora, serif", color: "#8A8478" }}
            >
              Ulkatcho First Nation members only
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-ui text-xs tracking-wider uppercase mb-2"
                  style={{ color: "#5A5248" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#8A8478" }}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#EDE6D3",
                      border: "1px solid #D8CEB8",
                      color: "#1C3A1A",
                      fontFamily: "Lora, serif",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#1C3A1A";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#D8CEB8";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-ui text-xs tracking-wider uppercase mb-2"
                  style={{ color: "#5A5248" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#8A8478" }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#EDE6D3",
                      border: "1px solid #D8CEB8",
                      color: "#1C3A1A",
                      fontFamily: "Lora, serif",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#1C3A1A";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#D8CEB8";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#8A8478" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="font-ui text-xs tracking-wider uppercase transition-colors duration-200"
                  style={{ color: "#8A8478" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#B8341B")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8A8478")}
                  onClick={() => alert("Please contact info@ulkatcho.ca to reset your password.")}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="ufn-btn-primary w-full py-3.5 text-center"
              >
                Sign In to Member Portal
              </button>
            </form>

            {/* Help text */}
            <div
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid #D8CEB8" }}
            >
              <p className="text-sm text-center" style={{ fontFamily: "Lora, serif", color: "#8A8478" }}>
                Need access? Contact{" "}
                <a
                  href="mailto:info@ulkatcho.ca"
                  className="underline transition-colors duration-200"
                  style={{ color: "#B8341B" }}
                >
                  info@ulkatcho.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="relative z-10 p-6 text-center">
        <Link href="/">
          <span
            className="inline-flex items-center gap-2 font-ui text-xs tracking-wider uppercase transition-colors duration-200"
            style={{ color: "rgba(247,242,232,0.5)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(247,242,232,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(247,242,232,0.5)")}
          >
            <ArrowLeft size={13} />
            Return to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
