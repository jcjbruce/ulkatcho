/*
 * ULKATCHO FIRST NATION — Departments Page
 * Palette: White bg | Navy #1a2e5a | Steel blue #c9a227
 * Layout: Grouped table with department headers matching screenshot exactly
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimplePageHeader from "@/components/SimplePageHeader";
import ProtectedEmail from "@/components/ProtectedEmail";


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

const departments: DeptGroup[] = [
  {
    heading: "Education Department",
    rows: [
      { name: "Joy Holte", title: "Director of Education", phone: "250-742-3260 Ext. 210", email: "educationdirector@ulkatcho.ca" },
      { name: "Corrine Cahoose", title: "Post Secondary", phone: "250-742-3260 Ext. 209", email: "postsecondary@ulkatcho.ca" },
      { name: "", title: "K – 12 Education Liaison", phone: "250-742-3260 Ext. 212", email: "k-12liaison@ulkatcho.ca" },
    ],
  },
  {
    heading: "Housing & Capital Works",
    rows: [
      { name: "Omid Zareian", title: "Asset Manager", phone: "250-742-3288 ext. 208", email: "assets@ulkatcho.ca" },
    ],
  },
  {
    heading: "Health Clinic",
    rows: [
      { name: "", title: "Director of Health", phone: "250-742-2090", email: "healthdirector@ulkatcho.ca" },
    ],
  },
  {
    heading: "Natural Resources",
    rows: [
      { name: "Alyisha Knapp", title: "Director of Natural Resources", phone: "250-742-3288 ext 205", email: "naturalresources@ulkatcho.ca" },
      { name: "Breanna Charleyboy", title: "Referrals Officer", phone: "250-742-3288 ext 221", email: "referrals@ulkatcho.ca" },
    ],
  },
  {
    heading: "Administration",
    rows: [
      { name: "", title: "Band Manager", phone: "250-742-3288 Ext. 218", email: "OperationsManager@ulkatcho.ca" },
    ],
  },
  {
    heading: "Finance",
    rows: [
      { name: "", title: "Director of Finance", phone: "250-742-3288 Ext. 202", email: "financedirector@ulkatcho.ca" },
    ],
  },
  {
    heading: "Social Development / Family And Children",
    rows: [
      { name: "Clara Cahoose", title: "Social Assistant Clerk", phone: "250-742-3260 Ext. 215", email: "saintake@ulkatcho.ca" },
    ],
  },
  {
    heading: "Indian Registry",
    rows: [
      { name: "Liz Anderson", title: "Indian Registry Administrator", phone: "250-742-3288 Ext. 220", email: "landerson@ulkatcho.ca" },
    ],
  },
];

export default function Departments() {
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
