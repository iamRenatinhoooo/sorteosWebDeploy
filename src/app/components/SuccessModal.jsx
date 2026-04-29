export const SuccessModal = ({ modal, setModal }) => {
  // Si modal es null o undefined, no renderizamos nada
  if (!modal) return null;

  return (
    <div
      onClick={() => setModal(null)}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: "1rem",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)", border: "1px solid var(--border-mid)",
          borderRadius: "var(--r-xl)", width: "100%", maxWidth: "500px", overflow: "hidden",
          animation: "slideUp 0.3s var(--ease)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "1.5rem 1.5rem", borderBottom: "1px solid var(--border-subtle)",
          display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-elevated)",
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
            🎉 ¡Reserva Exitosa!
          </h2>
          <button
            onClick={() => setModal(null)}
            style={{
              width: "32px", height: "32px", background: "var(--chip-bg)", border: "1px solid var(--border-subtle)",
              borderRadius: "50%", color: "var(--text-muted)", fontSize: "1.1rem", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent-ruby)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--chip-bg)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎊</div>

          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
            Has reservado números para{" "}
            <span style={{ color: "var(--accent-gold)", fontWeight: 700, fontFamily: "'Cinzel', serif" }}>
              {modal.prize?.nombre}
            </span>
          </p>

          <div style={{
            background: "var(--bg-sunken)", border: "1px solid var(--border-mid)",
            borderRadius: "var(--r-lg)", padding: "1.5rem", marginBottom: "1.5rem",
          }}>
            <div className="label-xs" style={{ marginBottom: "0.75rem" }}>
              Tus Números de Suerte
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--border-mid), transparent)" }} />
              <div style={{ width: "6px", height: "6px", background: "var(--accent-gold)", transform: "rotate(45deg)", flexShrink: 0 }} />
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, var(--border-mid), transparent)" }} />
            </div>
            <p style={{
              margin: 0, fontSize: "1.8rem", fontFamily: "'Cinzel', serif", fontWeight: 700,
              color: "var(--accent-gold)", letterSpacing: "0.1em",
            }}>
              {modal.nums?.sort((a, b) => a - b).join(" · ")}
            </p>
          </div>

          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginBottom: "1.5rem" }}>
            Guarda una captura de pantalla como comprobante 📸
          </p>
        </div>

        {/* Footer / Actions */}
        <div style={{
          padding: "1.25rem 1.5rem", borderTop: "1px solid var(--border-subtle)",
          display: "flex", justifyContent: "flex-end", gap: "0.75rem", background: "var(--bg-elevated)", flexWrap: "wrap"
        }}>
          <button
            onClick={() => setModal(null)}
            style={{
              background: "var(--chip-bg)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)",
              borderRadius: "var(--r-sm)", padding: "0.6rem 1.2rem", fontSize: "0.78rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.3s",
              fontFamily: "var(--font-body)", flex: "1 1 auto"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-accent)"; e.currentTarget.style.color = "var(--accent-gold)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            Cerrar
          </button>
          <button
            onClick={() => setModal(null)}
            style={{
              background: "linear-gradient(135deg, #d4af37, #aa8c2c)",
              color: "#1a1a1a", border: "none", borderRadius: "var(--r-sm)", padding: "0.6rem 1.4rem",
              fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
              cursor: "pointer", transition: "all 0.3s", fontFamily: "var(--font-body)", flex: "1 1 auto"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,168,76,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            ✦ ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};