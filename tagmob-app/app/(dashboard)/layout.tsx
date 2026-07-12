"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth, IS_FIREBASE_READY } from "@/lib/firebase";
import Sidebar from "@/components/layout/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!IS_FIREBASE_READY) {
      router.push("/sign-in");
      return;
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      if (!currentUser) {
        router.push("/sign-in");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#09090F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#EEEEFF",
        fontFamily: "sans-serif"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 32,
            height: 32,
            border: "3px solid #FF006830",
            borderTopColor: "#FF0068",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }} />
          <p style={{ fontSize: 13, color: "#7878A0", fontWeight: 600 }}>Autenticando...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#09090F" }}>
      <Sidebar />
      <main style={{ flex: 1, overflowX: "hidden", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
