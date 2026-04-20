"use client";

import Link from "next/link"; // Importación necesaria para la navegación 

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-sunken)",
      borderTop: "1px solid var(--border-mid)",
      padding: "3rem 5% 2rem",
      position: "relative",
    }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
        
        {/* Marca */}
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--accent-gold)", marginBottom: "1rem" }}>
            ♦ Sorteos<span style={{ color: "var(--accent-ruby)" }}> La Fortuna</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
            Llevando alegría y premios increíbles desde Guayaquil para todo el país.
          </p>
        </div>

        {/* Pagos */}
        <div>
          <h4 style={{ fontSize: "0.7rem", color: "var(--accent-gold)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Métodos de Pago</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["💳 Visa", "💳 Mastercard", "🏦 Transferencia", "📱 Deuna!"].map((m) => (
              <span key={m} style={{ background: "var(--chip-bg)", border: "1px solid var(--border-subtle)", padding: "0.35rem 0.75rem", borderRadius: "4px", fontSize: "0.7rem" }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Legal - Secciones actualizadas según Prompt Maestro  */}
        <div>
          <h4 style={{ fontSize: "0.7rem", color: "var(--accent-gold)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Información Legal</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "2.2" }}>
            <li>
              <Link href="/page/terminos" style={{ transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "inherit"}>
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link href="/page/privacidad" style={{ transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "inherit"}>
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/page/datos-personales" style={{ transition: "color 0.3s" }} onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"} onMouseLeave={(e) => e.target.style.color = "inherit"}>
                Tratamiento de Datos Personales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1.5rem" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
          © 2026 Sorteos La Fortuna · Todos los derechos reservados · Ecuador
        </p>
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.7 }}>
          🔞 Solo para mayores de 18 años. Juega responsablemente.
        </p>
      </div>
    </footer>
  );
}