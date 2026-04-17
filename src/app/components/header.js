"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const [theme, setTheme] = useState("night");

  /* ── Recuperar tema guardado al montar ── */
  useEffect(() => {
    const saved = localStorage.getItem("sorteos-theme") || "night";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  /* ── Cambiar y guardar tema ── */
  const toggleTheme = () => {
    const newTheme = theme === "night" ? "classic" : "night";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("sorteos-theme", newTheme);
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%", height: "90px",
      background: "var(--nav-bg)",
      borderBottom: "1px solid var(--border-mid)",
      backdropFilter: "blur(12px)",
      transition: "background 0.5s",
    }}>
      
      {/* ══════════ LOGO Y TEXTO ══════════ */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", cursor: "pointer" }}>
        <Image 
          src="/logo.png" 
          alt="Logo Sorteos La Fortuna" 
          width={90} // <-- Tamaño tipo ícono, ajústalo si tu logo es más horizontal
          height={40} 
          style={{ objectFit: "contain" }}
          priority 
        />
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: "1.4rem", fontWeight: 900,
          letterSpacing: "0.08em", color: "var(--accent-gold)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          ♦ Sorteos<span style={{ color: "var(--accent-ruby)" }}>La Fortuna</span>
        </div>
      </div>

      {/* ══════════ BOTÓN TEMA ══════════ */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={toggleTheme}
          title={theme === "night" ? "Cambiar a modo clásico" : "Cambiar a modo noche"}
          style={{
            width: "52px", height: "28px", background: "var(--bg-sunken)",
            border: "1px solid var(--border-mid)", borderRadius: "14px",
            position: "relative", cursor: "pointer", display: "flex", alignItems: "center", padding: "3px",
            transition: "all 0.3s",
          }}
        >
          <div style={{
            width: "20px", height: "20px", background: "var(--accent-gold)", borderRadius: "50%",
            transform: theme === "night" ? "translateX(24px)" : "translateX(0)",
            transition: "transform 0.3s var(--ease)", display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px",
          }}>
            {theme === "night" ? "🌙" : "☀️"}
          </div>
        </button>
      </div>
    </header>
  );
}