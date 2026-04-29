export const CheckoutForm = ({
  showPayment,
  tempReservation,
  userData,
  setUserData,
  handleDateChange,
  dobError,
  paymentMethod,
  setPaymentMethod,
  isProcessing,
  isFormValid,
  setShowPayment,
  confirmFinalPurchase
}) => {
  if (!showPayment || !tempReservation) return null;

  return (
    <section id="checkout-section" className="interactive-section" style={{
      background: "var(--bg-surface)", border: "1px solid var(--border-mid)",
      borderRadius: "var(--r-xl)", boxShadow: "var(--card-shadow)",
      animation: "slideUp 0.4s var(--ease)",
      padding: "2rem"
    }}>

      {/* Formulario de Datos */}
      <div className="checkout-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(6, 1fr)", 
        gap: "1.2rem" 
      }}>
        
        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>País *</label>
          <select
            value={userData.pais} onChange={(e) => setUserData({ ...userData, pais: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          >
            <option value="">Selecciona un país...</option>
            <option value="Ecuador">Ecuador</option>
          </select>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Provincia *</label>
          <select
            value={userData.provincia} onChange={(e) => setUserData({ ...userData, provincia: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          >
            <option value="">Elige una opción...</option>
            <option value="Guayas">Guayas</option>
          </select>
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Ciudad *</label>
          <input
            type="text" value={userData.ciudad} onChange={(e) => setUserData({ ...userData, ciudad: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          />
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Nombre *</label>
          <input
            type="text" value={userData.nombre} onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          />
        </div>

        <div style={{ gridColumn: "span 3" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Apellidos *</label>
          <input
            type="text" value={userData.apellidos} onChange={(e) => setUserData({ ...userData, apellidos: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          />
        </div>

        <div style={{ gridColumn: "span 2" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Teléfono *</label>
          <input
            type="tel" value={userData.telefono} onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          />
        </div>

        <div style={{ gridColumn: "span 4" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Correo electrónico *</label>
          <input
            type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
          />
        </div>

        <div style={{ gridColumn: "span 3", marginTop: "0.5rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Fecha de Nacimiento *</label>
          <input
            type="date" value={userData.fecha_nacimiento} onChange={handleDateChange}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none", colorScheme: "dark" }}
          />
          {dobError && (
            <span style={{ color: "var(--accent-ruby)", fontSize: "0.85rem", marginTop: "0.5rem", display: "block", fontWeight: "bold" }}>
              ⚠️ {dobError}
            </span>
          )}
        </div>

        <div style={{ gridColumn: "span 6", marginTop: "1rem", background: "var(--bg-elevated)", padding: "1.5rem", borderRadius: "var(--r-md)", border: "1px solid var(--border-mid)", borderLeft: "4px solid var(--accent-ruby)", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: (dobError || !userData.fecha_nacimiento) ? "not-allowed" : "pointer", fontSize: "0.95rem", fontWeight: 700, color: (dobError || !userData.fecha_nacimiento) ? "var(--text-muted)" : "var(--text-primary)" }}>
            <input
              type="checkbox"
              checked={userData.es_mayor_edad}
              disabled={!!dobError || !userData.fecha_nacimiento}
              onChange={(e) => setUserData({ ...userData, es_mayor_edad: e.target.checked })}
              style={{ width: "22px", height: "22px", accentColor: "var(--accent-gold)", cursor: (dobError || !userData.fecha_nacimiento) ? "not-allowed" : "pointer" }}
            />
            Declaro que soy mayor de edad (18+ años) *
          </label>
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: "1.5" }}>
              <strong>Aviso importante:</strong> En caso de comprobarse que NO es mayor de edad en la verificación del ganador, se procederá a anular el número de boleto automáticamente.
            </p>
          </div>
        </div>
      </div>

      {/* Sección Pago */}
      <div style={{ marginBottom: "2rem", marginTop: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", margin: 0 }}>SELECCIONA EL MÉTODO DE PAGO</h2>
        <div style={{ height: "1px", background: "var(--border-subtle)", marginTop: "1rem" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ textAlign: "center", background: "var(--bg-elevated)", padding: "1.5rem", borderRadius: "var(--r-md)", border: "1px solid var(--border-subtle)" }}>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Total a pagar por {tempReservation.nums.length} boletos:</p>
          <h3 style={{ color: "var(--accent-gold)", fontSize: "2.2rem", margin: "0.5rem 0 0" }}>${tempReservation.total.toFixed(2)}</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <button onClick={() => setPaymentMethod('transfer')} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem", padding: "1rem", borderRadius: "var(--r-md)", border: paymentMethod === 'transfer' ? "2px solid var(--accent-gold)" : "1px solid var(--border-mid)", background: "var(--bg-sunken)", cursor: "pointer", color: "var(--text-primary)" }}>
            <span>🏦</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Transferencia o depósito </div>
              <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>Bancos Locales</div>
            </div>
          </button>
        </div>

        {paymentMethod === 'transfer' && (
          <div style={{ padding: "1.5rem", border: "1px dashed var(--accent-gold)", borderRadius: "var(--r-md)", background: "var(--bg-elevated)", animation: "fadeIn 0.3s" }}>
            <p style={{ fontWeight: 700, color: "var(--accent-gold)", margin: "0 0 0.8rem" }}>Datos de la Cuenta:</p>
            <div className="bank-details-grid">
              <span><b>Banco:</b> Pichincha (Ahorros)</span><br/>
              <span><b>Cuenta:</b> 2208157036</span><br/>
              <span><b>Titular:</b> Sorteos La Fortuna S.A.</span>
            </div>
          </div>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="checkout-actions" style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <button
          onClick={() => setShowPayment(false)}
          style={{ flex: 1, padding: "1rem", borderRadius: "var(--r-sm)", border: "1px solid var(--border-mid)", background: "var(--bg-elevated)", color: "var(--text-secondary)", fontWeight: 700, cursor: "pointer" }}
        >
          Cancelar
        </button>

        <button
          disabled={isProcessing || !isFormValid}
          onClick={confirmFinalPurchase}
          style={{
            flex: 2, padding: "1rem", borderRadius: "var(--r-sm)", border: "none",
            background: (!isFormValid) ? "var(--bg-sunken)" : "var(--accent-gold)",
            color: (!isFormValid) ? "var(--text-muted)" : "#1a1a1a",
            fontWeight: 700, cursor: (!isFormValid) ? "not-allowed" : "pointer"
          }}
        >
          {isProcessing ? "Procesando..." : !isFormValid ? "Completa los datos" : "Confirmar y enviar WhatsApp 📱"}
        </button>
      </div>
    </section>
  );
};