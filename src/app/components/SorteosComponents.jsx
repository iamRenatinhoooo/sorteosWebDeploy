import React from 'react';

// --- COMPONENTE DE TABS ---
export const PrizeTabs = ({ activeTab, setActiveTab, setSelected, setShowPayment }) => {
  const tabs = [
    { id: "active", label: "Activos", icon: "🔥" },
    { id: "upcoming", label: "Próximos", icon: "⏳" },
    { id: "finished", label: "Finalizados", icon: "🏆" }
  ];

  return (
    <div className="tabs-container" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => { setActiveTab(tab.id); setSelected(null); setShowPayment(false); }}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            padding: "0.5rem 1rem", position: "relative",
            color: activeTab === tab.id ? "var(--accent-gold)" : "var(--text-muted)",
            transition: "all 0.3s ease", fontWeight: 700, fontSize: "0.8rem", 
            textTransform: "uppercase", letterSpacing: "0.1em"
          }}
        >
          {tab.icon} {tab.label}
          {activeTab === tab.id && (
            <div style={{
              position: "absolute", bottom: "-0.5rem", left: 0, right: 0,
              height: "2px", background: "var(--accent-gold)", boxShadow: "0 0 10px var(--accent-gold)"
            }} />
          )}
        </button>
      ))}
    </div>
  );
};

// --- COMPONENTE DE TARJETA DE PREMIO ---
export const PrizeCard = ({ 
  prize, activeTab, selected, setSelected, setShowPayment, 
  taken, timeLeft, hexToRgb }) => {
  const isFinished = activeTab === "finished";
  const isUpcoming = activeTab === "upcoming";
  const isActive = selected === prize.id;
  const free = prize.total_boletos - taken;
  const pct = (taken / prize.total_boletos) * 100;
  const rgbShadow = hexToRgb(prize.color);

  const handleSelect = () => {
    const isSelecting = !isActive;
    setSelected(isActive ? null : prize.id);
    setShowPayment(false);
    if (isSelecting) {
      setTimeout(() => {
        document.getElementById('numbers-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  return (
    <div style={{
      background: isActive ? "var(--bg-elevated)" : "var(--bg-surface)",
      border: isActive ? "2px solid var(--accent-gold)" : "1px solid var(--border-subtle)",
      borderRadius: "var(--r-lg)", display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
      boxShadow: isActive ? `0 12px 40px rgba(${rgbShadow}, 0.2)` : "var(--card-shadow)",
      transition: "all 0.4s var(--ease)",
      transform: isActive ? "translateY(-8px)" : "translateY(0)",
      filter: isFinished ? "grayscale(0.5)" : "none",
    }}>
      {/* Imagen y Badge */}
      <div style={{ position: "relative", width: "100%", height: "200px", background: "var(--bg-sunken)" }}>
        <img src={prize.imagen_url || "/images/placeholder.png"} alt={prize.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10 }}>
          <div style={{
            background: isFinished ? "#555" : isUpcoming ? "var(--accent-navy)" : prize.color,
            color: "#FFFFFF", fontSize: "0.65rem", borderRadius: "4px", padding: "0.35rem 0.8rem", fontWeight: 800, textTransform: "uppercase"
          }}>
            {isFinished ? "Finalizado" : isUpcoming ? "Próximamente" : "Activo"}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
        <h3>{prize.nombre}</h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
          <span style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--accent-gold)" }}>${Number(prize.precio_boleto).toFixed(2)}</span>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>POR BOLETO</span>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>{prize.descripcion}</p>

        {/* Progreso de ventas */}
        {!isFinished && (
          <div>
            <div style={{ height: "4px", background: "var(--border-subtle)", borderRadius: "100px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(to right, ${prize.color}, var(--accent-gold))` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", marginTop: "0.3rem" }}>
              <span>{taken} vendidos</span>
              <span>{free} libres</span>
            </div>
          </div>
        )}

        {/* Footer de la tarjeta: Ganador o Contador */}
        <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
          {isFinished ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "var(--accent-gold)", fontSize: "0.7rem" }}>Ganador 🏆</div>
              <div style={{ fontWeight: 700 }}>{prize.ganador_nombre || "Pendiente"}</div>
            </div>
          ) : isUpcoming ? (
            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem" }}>Ventas abren pronto</div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--accent-ruby)" }}>Cierra en:</div>
              <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center", fontWeight: 700 }}>
                <span>{timeLeft?.days}D</span><span>{timeLeft?.hours}H</span><span>{timeLeft?.minutes}M</span>
              </div>
            </div>
          )}
        </div>

        {activeTab === 'active' && (
          <button onClick={handleSelect} style={{ 
            width: "100%", padding: "0.8rem", borderRadius: "var(--r-sm)", fontWeight: 700, cursor: "pointer",
            background: isActive ? "var(--bg-sunken)" : prize.color,
            color: isActive ? prize.color : "#fff",
            border: isActive ? `1px solid ${prize.color}` : "none"
          }}>
            {isActive ? "✓ Seleccionado" : "Participar Ahora"}
          </button>
        )}
      </div>
    </div>
  );
};