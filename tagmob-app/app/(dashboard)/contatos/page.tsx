"use client";

import { useEffect, useState } from "react";
import { Users, Search, Mail, Phone, Building2, User } from "lucide-react";
import type { ContactDTO } from "@/lib/crm";

export default function ContatosPage() {
  const [contacts, setContacts] = useState<ContactDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/crm/contacts")
      .then((r) => r.json())
      .then((json) => { if (json.data) setContacts(json.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return c.nome.toLowerCase().includes(q) || (c.email?.toLowerCase().includes(q) ?? false) || (c.empresaNome?.toLowerCase().includes(q) ?? false);
  });

  return (
    <div style={{ padding: "28px 32px", minHeight: "100vh", backgroundColor: "#09090F" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Users size={18} color="#39FF14" />
          <span style={{ fontSize: 10, fontWeight: 800, color: "#39FF14", letterSpacing: "0.06em" }}>CRM · CONTATOS</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#EEEEFF" }}>Contatos</h1>
        <p style={{ fontSize: 14, color: "#7878A0" }}>Stakeholders, decisores e parceiros do ecossistema TAGMOB.</p>
      </div>

      <div style={{ position: "relative", marginBottom: 20, maxWidth: 320 }}>
        <Search size={14} color="#7878A0" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar contato..."
          style={{ width: "100%", background: "#111120", border: "1px solid #1A1A30", borderRadius: 8, padding: "8px 12px 8px 34px", fontSize: 13, color: "#EEEEFF", outline: "none" }} />
      </div>

      {loading ? (
        <p style={{ color: "#7878A0" }}>Carregando contatos...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {filtered.map((c) => (
            <div key={c.id} style={{ background: "#111120", border: "1px solid #1A1A30", borderRadius: 12, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#39FF1418", border: "1px solid #39FF1430", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#39FF14" }}>
                  {c.nome[0]}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#EEEEFF" }}>{c.nome}</p>
                  {c.cargo && <p style={{ fontSize: 11, color: "#7878A0" }}>{c.cargo}</p>}
                </div>
              </div>
              {c.empresaNome && <p style={{ fontSize: 12, color: "#7878A0", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><Building2 size={12} />{c.empresaNome}</p>}
              {c.email && <p style={{ fontSize: 12, color: "#3A3A5C", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}><Mail size={12} />{c.email}</p>}
              {c.telefone && <p style={{ fontSize: 12, color: "#3A3A5C", display: "flex", alignItems: "center", gap: 5 }}><Phone size={12} />{c.telefone}</p>}
              {c.ownerUser && <p style={{ fontSize: 11, color: "#3A3A5C", marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}><User size={11} />{c.ownerUser.fullName}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
