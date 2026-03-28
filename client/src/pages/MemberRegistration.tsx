/*
 * ULKATCHO FIRST NATION — Member Registration Page
 * Public form for band members to request portal access
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle, User, Mail, Phone, Hash, Calendar, MapPin, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function MemberRegistration() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    band_number: "",
    date_of_birth: "",
    address: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError("");

    const { error: dbError } = await supabase.from("member_applications").insert({
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone || null,
      band_number: form.band_number || null,
      date_of_birth: form.date_of_birth || null,
      address: form.address || null,
      reason: form.reason || null,
    });

    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong. Please try again or contact info@ulkatcho.ca for assistance.");
      return;
    }

    setSubmitted(true);
  };

  const inputStyle = {
    backgroundColor: "#c8d5e0",
    border: "1px solid #dce6ef",
    color: "#1a2e5a",
    fontFamily: "Lora, serif",
  };

  const labelStyle = {
    fontFamily: "Raleway, sans-serif",
    color: "#555555",
  };

  const iconStyle = { color: "#8b6420" };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col relative"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape_dc4795fe.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="fixed inset-0" style={{ backgroundColor: "rgba(26, 26, 24, 0.82)" }} />
        <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div
            className="w-full max-w-md text-center"
            style={{
              backgroundColor: "#c8d5e0",
              borderTop: "4px solid #c9a227",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
          >
            <div className="p-8 md:p-10">
              <CheckCircle size={48} style={{ color: "#16a34a" }} className="mx-auto mb-4" />
              <h1
                className="mb-3"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#1a2e5a",
                }}
              >
                Application Submitted
              </h1>
              <p className="text-sm mb-6" style={{ fontFamily: "Lora, serif", color: "#555" }}>
                Thank you, {form.first_name}. Your request for member portal access has been received.
                An administrator will review your application and you will be notified by email once approved.
              </p>
              <Link href="/member-portal">
                <span className="ufn-btn-primary inline-block px-6 py-3 text-center cursor-pointer">
                  Return to Login
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/hero-landscape_dc4795fe.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0" style={{ backgroundColor: "rgba(26, 26, 24, 0.82)" }} />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-lg"
          style={{
            backgroundColor: "#c8d5e0",
            borderTop: "4px solid #c9a227",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div className="p-8 md:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ufn-crest-colored_7277081e.png"
                alt="Ulkatcho First Nation Crest"
                className="w-auto"
                style={{ height: "80px" }}
              />
            </div>

            <div className="ufn-section-label mb-2">Request Access</div>
            <h1
              className="mb-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#1a2e5a",
              }}
            >
              Member Registration
            </h1>
            <p className="mb-6 text-sm" style={{ fontFamily: "Lora, serif", color: "#8b6420" }}>
              Submit your information below to request member portal access. An administrator will review your application.
            </p>

            {error && (
              <div className="mb-4 p-3 text-sm" style={{ backgroundColor: "rgba(220,38,38,0.1)", color: "#dc2626", fontFamily: "Lora, serif" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                    First Name *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                    <input
                      type="text"
                      value={form.first_name}
                      onChange={(e) => update("first_name", e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                    Last Name *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                    <input
                      type="text"
                      value={form.last_name}
                      onChange={(e) => update("last_name", e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Phone + Band Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                    Phone
                  </label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                    Band Number
                  </label>
                  <div className="relative">
                    <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                    <input
                      type="text"
                      value={form.band_number}
                      onChange={(e) => update("band_number", e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth + Address */}
              <div>
                <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                  <input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) => update("date_of_birth", e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                  Address
                </label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={iconStyle} />
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block font-ui text-xs tracking-wider uppercase mb-1" style={labelStyle}>
                  Reason for Access
                </label>
                <div className="relative">
                  <FileText size={14} className="absolute left-3 top-3" style={iconStyle} />
                  <textarea
                    value={form.reason}
                    onChange={(e) => update("reason", e.target.value)}
                    rows={3}
                    placeholder="Brief description of why you need portal access..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm outline-none resize-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="ufn-btn-primary w-full py-3 text-center"
                style={{ opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>

            {/* Back to login */}
            <div className="mt-6 pt-4" style={{ borderTop: "1px solid #dce6ef" }}>
              <p className="text-sm text-center" style={{ fontFamily: "Lora, serif", color: "#8b6420" }}>
                Already have an account?{" "}
                <Link href="/member-portal">
                  <span className="underline cursor-pointer" style={{ color: "#1a2e5a" }}>Sign in here</span>
                </Link>
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
