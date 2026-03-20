/*
 * ULKATCHO FIRST NATION — Member Portal Page
 * Theme: River Stone & Birch
 * Frontend only — login form UI, no backend connection
 */

import { useState } from "react";
import { Link } from "wouter";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import ProtectedEmail from "@/components/ProtectedEmail";

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
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape_dc4795fe.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(26, 26, 24, 0.82)" }}
      />



      {/* Login Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-md"
          style={{
            backgroundColor: "#c8d5e0",
            borderTop: "4px solid #c9a227",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div className="p-8 md:p-10">
            {/* UFN Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ufn-crest-colored_7277081e.png"
                alt="Ulkatcho First Nation Crest"
                className="w-auto"
                style={{ height: "100px" }}
              />
            </div>

            <div className="ufn-section-label mb-2">Secure Access</div>
            <h1
              className="mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "1.85rem",
                color: "#1a2e5a",
              }}
            >
              Member Login
            </h1>
            <p
              className="mb-8 text-sm"
              style={{ fontFamily: "Lora, serif", color: "#8b6420" }}
            >
              Ulkatcho First Nation members only
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-ui text-xs tracking-wider uppercase mb-2"
                  style={{ color: "#555555" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#8b6420" }}
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
                      backgroundColor: "#c8d5e0",
                      border: "1px solid #dce6ef",
                      color: "#1a2e5a",
                      fontFamily: "Lora, serif",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#1a2e5a";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#dce6ef";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-ui text-xs tracking-wider uppercase mb-2"
                  style={{ color: "#555555" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#8b6420" }}
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
                      backgroundColor: "#c8d5e0",
                      border: "1px solid #dce6ef",
                      color: "#1a2e5a",
                      fontFamily: "Lora, serif",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#1a2e5a";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "#dce6ef";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#8b6420" }}
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
                  style={{ color: "#8b6420" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a227")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8b6420")}
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
              style={{ borderTop: "1px solid #dce6ef" }}
            >
              <p className="text-sm text-center" style={{ fontFamily: "Lora, serif", color: "#8b6420" }}>
                Need access? Contact{" "}
                <ProtectedEmail user="info" domain="ulkatcho.ca" />
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
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
          >
            <ArrowLeft size={13} />
            Return to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
