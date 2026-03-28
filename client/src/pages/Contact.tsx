/*
 * ULKATCHO FIRST NATION — Contact Us Page
 * Design: Green "River Stone & Birch" layout recolored to Steel Blue / Navy / Gold
 * Hero+breadcrumb, navy contact cards, contact form, Google Maps, social icons, scroll reveals
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { MapPin, Mail, Phone, Facebook, Youtube, User } from "lucide-react";
import ProtectedEmail from "@/components/ProtectedEmail";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/HuB3H4eV9r4w4hwe36fKPd/ulkatcho-mountain-peak_640350dd.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoBody = `Name: ${formData.name}%0APhone: ${formData.phone}%0A%0A${formData.message}`;
    window.location.href = `mailto:info@ulkatcho.ca?subject=${encodeURIComponent(formData.subject || "Website Inquiry")}&body=${mailtoBody}`;
  };

  const inputStyle = {
    border: "1px solid #dce6ef",
    fontFamily: "Lora, serif",
    color: "#333",
    backgroundColor: "#ffffff",
    outline: "none",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <PageHero
        image={HERO_IMAGE}
        label="Get in Touch"
        heading="Contact Us"
        bgPosition="center 30%"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <div className="container py-14">
        {/* Main contact info cards — navy bg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 scroll-reveal">
          <div className="p-6 text-center" style={{ backgroundColor: "#1a2e5a" }}>
            <MapPin size={28} className="mx-auto mb-3" style={{ color: "#c9a227" }} />
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Address</p>
            <p style={{ fontFamily: "Lora, serif", color: "#ffffff" }}>
              P.O. Box 3430<br />Anahim Lake, BC V0L 1C0
            </p>
          </div>
          <div className="p-6 text-center" style={{ backgroundColor: "#1a2e5a" }}>
            <Phone size={28} className="mx-auto mb-3" style={{ color: "#c9a227" }} />
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Main Office</p>
            <a href="tel:+12507423288" style={{ fontFamily: "Lora, serif", color: "#ffffff" }}>(250) 742-3288</a>
            <p className="mt-2" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              Toll Free: (877) 837-6369
            </p>
            <p className="mt-1" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              Health Clinic: (250) 742-2090
            </p>
          </div>
          <div className="p-6 text-center" style={{ backgroundColor: "#1a2e5a" }}>
            <Mail size={28} className="mx-auto mb-3" style={{ color: "#c9a227" }} />
            <p className="font-ui text-xs tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Email</p>
            <ProtectedEmail user="info" domain="ulkatcho.ca" style={{ fontFamily: "Lora, serif", color: "#ffffff" }} showIcon={true} />
            <p className="mt-2" style={{ fontFamily: "Lora, serif", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              Fax: (250) 742-3411
            </p>
          </div>
        </div>

        {/* Contact Form + Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          {/* Left: Form */}
          <div className="scroll-reveal">
            <div className="ufn-section-label mb-3">Send a Message</div>
            <div className="ufn-divider" />
            <h2 className="mt-4 mb-4" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "2rem", color: "#1a2e5a" }}>
              Looking for Help or Have a Question?
            </h2>
            <p className="mb-8 leading-relaxed" style={{ fontFamily: "Lora, serif", color: "#555", fontSize: "0.95rem" }}>
              Ulkatcho First Nation staff are here to assist community members, partners, and visitors. Please fill out the form below or contact the Band Office directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text" placeholder="Full Name" required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 text-sm"
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#dce6ef"; }}
              />
              <input
                type="email" placeholder="Email Address" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 text-sm"
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#dce6ef"; }}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel" placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 text-sm"
                  style={inputStyle}
                  onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; }}
                  onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#dce6ef"; }}
                />
                <input
                  type="text" placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-sm"
                  style={inputStyle}
                  onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; }}
                  onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#dce6ef"; }}
                />
              </div>
              <textarea
                placeholder="Your Message" rows={5} required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 text-sm resize-y"
                style={inputStyle}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#dce6ef"; }}
              />
              <button type="submit" className="ufn-btn-primary w-full">
                Send Message
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: "https://www.facebook.com/UlkatchoFirstNation", label: "Facebook" },
                { icon: Youtube, href: "https://www.youtube.com/@ulkatchofirstnation", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200"
                  style={{ backgroundColor: "#1a2e5a" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#1a2e5a"; }}
                >
                  <Icon size={18} style={{ color: "#ffffff" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Google Map */}
          <div className="scroll-reveal" style={{ transitionDelay: "0.15s" }}>
            <div style={{ overflow: "hidden", height: "100%", minHeight: "450px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19456.47!2d-125.65!3d52.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5474c0a3a5f0e0c1%3A0x1234567890abcdef!2sAnahim%20Lake%2C%20BC!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ulkatcho First Nation Location - Anahim Lake, BC"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
