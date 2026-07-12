import Sidebar from "@/components/layout/sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#09090F" }}>
      <Sidebar />
      <main style={{ flex: 1, overflowX: "hidden", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
