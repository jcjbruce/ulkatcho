/*
 * ULKATCHO FIRST NATION — Departments Page
 * Palette: White bg | Navy #1a2e5a | Steel blue #c9a227
 * Layout: Grouped table with department headers matching screenshot exactly
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import ProtectedEmail from "@/components/ProtectedEmail";
import { supabase } from "@/lib/supabase";

type DeptRow = {
  name: string;
  title: string;
  phone: string;
  email: string;
};

type DeptGroup = {
  heading: string;
  rows: DeptRow[];
};

export default function Departments() {
  const [departments, setDepartments] = useState<DeptGroup[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("departments")
        .select("*, department_staff(*)")
        .order("sort_order")
        .order("sort_order", { referencedTable: "department_staff" });
      setDepartments(
        (data ?? []).map((d: any) => ({
          heading: d.heading,
          rows: (d.department_staff ?? []).map((s: any) => ({
            name: s.name,
            title: s.title,
            phone: s.phone,
            email: s.email,
          })),
        }))
      );
    }
    load();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#c8d5e0" }}>
      <Navbar />

      <SimplePageHeader
        heading="Departments"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
          { label: "Departments" },
        ]}
      />

      <div className="container py-14">
        {/* Departments Table */}
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse" style={{ border: "1px solid #d0dce8" }}>
            <tbody>
              {departments.map((group) => (
                <>
                  {/* Department Header Row */}
                  <tr key={`header-${group.heading}`}>
                    <td
                      colSpan={2}
                      className="px-4 py-3 text-center font-bold"
                      style={{
                        backgroundColor: "#1a2e5a",
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1rem",
                        color: "#ffffff",
                        borderBottom: "2px solid #c9a227",
                      }}
                    >
                      {group.heading}
                    </td>
                  </tr>
                  {/* Data Rows */}
                  {group.rows.map((row, i) => (
                    <tr
                      key={`${group.heading}-${i}`}
                      style={{
                        borderBottom: "1px solid #e8edf2",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <td
                        className="px-4 py-3"
                        style={{
                          fontFamily: "Lora, serif",
                          color: "#333",
                          fontSize: "0.9rem",
                          borderRight: "1px solid #e0e8f0",
                          width: "50%",
                          verticalAlign: "top",
                        }}
                      >
                        {row.name && <div className="font-semibold" style={{ color: "#1a2e5a" }}>{row.name}</div>}
                        <div style={{ color: "#555" }}>{row.title}</div>
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{
                          fontFamily: "Lora, serif",
                          color: "#333",
                          fontSize: "0.9rem",
                          width: "50%",
                          verticalAlign: "top",
                        }}
                      >
                        <div>{row.phone}</div>
                        <ProtectedEmail
                          user={row.email.split("@")[0]}
                          domain={row.email.split("@")[1]}
                          showIcon={false}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}
