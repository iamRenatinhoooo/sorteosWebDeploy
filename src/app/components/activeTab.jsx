export const NumbersGrid = ({ 
  activePrize, 
  takenMap, 
  userPicks, 
  handleNumberClick, 
  handleReserve, 
  showPayment 
}) => {
  if (!activePrize) return null;

  return (
    <section id="numbers-section" className="interactive-section" style={{
      background: "var(--bg-surface)", border: "1px solid var(--border-mid)",
      borderRadius: "var(--r-xl)", marginTop: "2rem",
      marginBottom: showPayment ? "2rem" : "5rem", boxShadow: "var(--card-shadow)",
      animation: "fadeUp 0.5s ease", padding: "2.5rem" // Añadido padding para que respire
    }}>
      {/* Header del Selector */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
          <div style={{ width: "45px", height: "45px", borderRadius: "50%", overflow: "hidden", background: "var(--bg-sunken)", flexShrink: 0 }}>
            <img src={activePrize.imagen_url || "/images/sorteos/galapagos-premio.png"} alt="Premio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            {activePrize.nombre}
          </h2>
        </div>
        <div className="deco-line"><div className="deco-diamond"></div></div>
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Selecciona tus números de la suerte para este sorteo
        </p>
      </div>

      {/* Grid de Números */}
      <div style={{
        display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(40px, 1fr))`,
        gap: "8px", marginBottom: "2rem", background: "var(--bg-sunken)",
        border: "1px solid var(--border-subtle)", borderRadius: "var(--r-lg)", padding: "1.5rem",
      }}>
        {Array.from({ length: activePrize.total_boletos }, (_, i) => i + 1).map((num) => {
          const isTaken = takenMap[activePrize.id]?.has(num);
          const isPicked = userPicks[activePrize.id]?.has(num);

          return (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={isTaken}
              style={{
                height: "44px", borderRadius: "var(--r-sm)",
                border: isTaken ? "1px solid var(--border-subtle)" : isPicked ? `2px solid ${activePrize.color}` : "1px solid var(--border-mid)",
                background: isTaken ? "var(--bg-sunken)" : isPicked ? activePrize.color : "var(--bg-elevated)",
                color: isTaken ? "var(--text-muted)" : isPicked ? "#fff" : "var(--text-primary)",
                fontWeight: 700, cursor: isTaken ? "not-allowed" : "pointer",
                opacity: isTaken ? 0.4 : 1, transition: "all 0.2s"
              }}
            >
              {isTaken ? "X" : String(num).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      {/* Barra Inferior de Selección */}
      <div style={{
        background: "var(--bg-elevated)", padding: "1.5rem", borderRadius: "var(--r-lg)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
      }}>
        <div>
          <span className="label-xs">Números Seleccionados:</span>
          <p style={{ margin: 0, fontSize: "1.2rem", color: "var(--accent-gold)", fontWeight: 700 }}>
            {userPicks[activePrize.id]?.size > 0
              ? [...userPicks[activePrize.id]].sort((a, b) => a - b).join(" · ")
              : "Ninguno"}
          </p>
        </div>

        <button
          onClick={handleReserve}
          disabled={!userPicks[activePrize.id]?.size}
          style={{
            background: "linear-gradient(135deg, #d4af37, #aa8c2c)",
            color: "#1a1a1a", padding: "0.8rem 1.5rem", border: "none", borderRadius: "var(--r-sm)",
            fontWeight: 700, cursor: "pointer", flex: "1 1 auto",
            boxShadow: userPicks[activePrize.id]?.size ? "0 4px 15px rgba(201,168,76,0.3)" : "none",
            opacity: userPicks[activePrize.id]?.size ? 1 : 0.5
          }}
        >
          {showPayment ? "👇 Continúa abajo" : "🎟️ Reservar Ahora"}
        </button>
      </div>
    </section>
  );
};