"use client";

import { useState, useEffect } from "react";
<<<<<<< HEAD
import HeroCarousel from "@/app/components/home/heroCarousel";

=======
import HeroSection from "./components/HeroSection";
import { PrizeTabs, PrizeCard } from './components/SorteosComponents';
import { NumbersGrid } from './components/activeTab';
import { CheckoutForm } from './components/CheckoutForm';
import { SuccessModal } from './components/SuccessModal';
import './Sorteos.css';
>>>>>>> d2e6c5d410a6916c110ffe65c4f9caddd02f8f43
/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
const calculateTimeLeft = (date, time) => {
  if (!date || !time) return { days: 0, hours: 0, minutes: 0 };
  const target = new Date(`${date}T${time}`);
  const now = new Date();
  const difference = target - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0 };
};

const hexToRgb = (hex) => {
  if (!hex) return "0,0,0";
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
  }
  return "0,0,0";
};

const calculateAge = (dobString) => {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

/* ══════════════════════════════════════
   COMPONENT
══════════════════════════════════════ */
export default function SorteosPage() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [tempReservation, setTempReservation] = useState(null);
  const [takenMap, setTakenMap] = useState({});
  const [userPicks, setUserPicks] = useState({});
  const [modal, setModal] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [userData, setUserData] = useState({
    pais: "", provincia: "", ciudad: "", nombre: "", apellidos: "", telefono: "", email: "",
    fecha_nacimiento: "", es_mayor_edad: false
  });

  const [dobError, setDobError] = useState("");

  /* ── Fetch Initial Data ── */
  useEffect(() => {
    const fetchSorteos = async () => {
      try {
        const res = await fetch('/api/sorteos');
        const data = await res.json();
        setPrizes(data);

        const newTakenMap = {};
        data.forEach(p => {
          newTakenMap[p.id] = new Set(p.numerosOcupados || []);
        });
        setTakenMap(newTakenMap);
      } catch (error) {
        console.error("Error al cargar sorteos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSorteos();
  }, []);


  /* ── Derived ── */
  const activePrize = prizes.find((p) => p.id === selected) || null;
  const filteredPrizes = prizes.filter(p => p.estado === activeTab);

  /* ── Number selection ── */
  const handleNumberClick = (num) => {
    if (!selected) return;
    if (takenMap[selected]?.has(num)) return;
    setUserPicks((prev) => {
      const current = new Set(prev[selected] || []);
      current.has(num) ? current.delete(num) : current.add(num);
      return { ...prev, [selected]: current };
    });
  };

  /* ── Efecto de Sonido Casino ── */
  const playWinSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3");
    audio.volume = 0.4;
    audio.play().catch(err => console.log("Audio play blocked by browser"));
  };

  const getWhatsAppUrl = (prizeName, nums) => {
    const phoneNumber = "593986936290";
    const message = `¡Hola Sorteos La Fortuna! 👋\n\nHe realizado una reserva para: *${prizeName}*.\nCliente: *${userData.nombre} ${userData.apellidos}*\nCiudad: *${userData.ciudad}*\nTeléfono: *${userData.telefono}*\nMis números: *${nums.join(" · ")}*.\nTotal a pagar: *$${tempReservation.total.toFixed(2)}*\n\nAdjunto comprobante.`;
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  };

  const handleReserve = () => {
    if (!selected || !userPicks[selected]?.size) return;
    setTempReservation({
      prize: activePrize,
      nums: [...userPicks[selected]],
      total: userPicks[selected].size * activePrize.precio_boleto
    });
    setShowPayment(true);

    setTimeout(() => {
      document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDateChange = (e) => {
    const dateStr = e.target.value;
    let isAdult = userData.es_mayor_edad;
    let error = "";

    if (dateStr) {
      const age = calculateAge(dateStr);
      if (age < 18) {
        error = "Lo sentimos, debes ser mayor de 18 años para participar.";
        isAdult = false;
      }
    }

    setDobError(error);
    setUserData({ ...userData, fecha_nacimiento: dateStr, es_mayor_edad: isAdult });
  };

  const confirmFinalPurchase = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const payload = {
        userData: userData,
        sorteoId: activePrize.id,
        numeros: tempReservation.nums,
        metodoPago: paymentMethod,
        total: tempReservation.total
      };

      const res = await fetch('/api/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        setIsProcessing(false);
        return;
      }

      playWinSound();
      setTakenMap(prev => ({
        ...prev,
        [selected]: new Set([...(prev[selected] || []), ...tempReservation.nums]),
      }));

      setModal(tempReservation);
      setShowPayment(false);
      setUserPicks(prev => ({ ...prev, [selected]: new Set() }));
      setUserData({ pais: "", provincia: "", ciudad: "", nombre: "", apellidos: "", telefono: "", email: "", fecha_nacimiento: "", es_mayor_edad: false });
      setDobError("");
      setPaymentMethod(null);

      if (paymentMethod === 'transfer') {
        window.open(getWhatsAppUrl(tempReservation.prize.nombre, tempReservation.nums), '_blank');
      }

    } catch (err) {
      console.error(err);
      alert("Ocurrió un error de conexión con el servidor.");
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = userData.nombre && userData.apellidos && userData.telefono && userData.email && userData.ciudad && userData.fecha_nacimiento && userData.es_mayor_edad && paymentMethod && !dobError;

  /* ════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════ */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)", color: "var(--accent-gold)", fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>
        Cargando Sorteos...
      </div>
    );
  }

  return (

    <div style={{
      minHeight: "050vh",
      background: "var(--bg-base)",
      color: "var(--text-primary)",
      transition: "background 0.5s, color 0.5s",
      fontFamily: "var(--font-body)",
    }}>

      <main id="sorteos-section" className="main-container">
        {/* sorteosWebDeploy\src\app\components\HeroSection.jsx */}
        <HeroSection />

<<<<<<< HEAD
        <section style={{ textAlign: "center", marginBottom: "-5.5rem" }}>
          <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
            <HeroCarousel />
          </div>
        </section>

=======
        {/* sorteosWebDeploy\src\app\components\SorteosComponents.jsx */}
>>>>>>> d2e6c5d410a6916c110ffe65c4f9caddd02f8f43
        <section>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "var(--accent-gold)" }}>
              ✦ Cartelera de Premios
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem" }}>
              Explora nuestros <em style={{ color: "var(--accent-gold)" }}>Sorteos</em>
            </h2>

            <PrizeTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              setSelected={setSelected} 
              setShowPayment={setShowPayment} 
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            {filteredPrizes.length > 0 ? (
<<<<<<< HEAD
              filteredPrizes.map((prize) => {
                const isFinished = activeTab === "finished";
                const isUpcoming = activeTab === "upcoming";
                const isActive = selected === prize.id;
                const taken = takenMap[prize.id]?.size || 0;
                const free = prize.total_boletos - taken;
                const pct = (taken / prize.total_boletos) * 100;

                const timeLeft = !isFinished && !isUpcoming ? calculateTimeLeft(prize.fecha_sorteo, prize.hora_sorteo) : null;
                const rgbShadow = hexToRgb(prize.color);

                return (
                  <div
                    key={prize.id}
                    style={{
                      background: isActive ? "var(--bg-elevated)" : "var(--bg-surface)",
                      border: isActive ? "2px solid var(--accent-gold)" : "1px solid var(--border-subtle)",
                      borderRadius: "var(--r-lg)",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: isActive ? `0 12px 40px rgba(${rgbShadow}, 0.2)` : "var(--card-shadow)",
                      transition: "all 0.4s var(--ease)",
                      transform: isActive ? "translateY(-8px)" : "translateY(0)",
                      filter: isFinished ? "grayscale(0.5)" : "none",
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", height: "200px", background: "var(--bg-sunken)" }}>
                      <img
                        src={prize.imagen_url || "/images/sorteos/galapagos-premio.png"}
                        alt={prize.nombre}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div style={{ position: "absolute", top: "12px", left: "12px", zIndex: 10 }}>
                        <div style={{
                          background: isFinished ? "#555" : isUpcoming ? "var(--accent-navy)" : prize.color,
                          color: "#FFFFFF", fontSize: "0.65rem", borderRadius: "4px",
                          padding: "0.35rem 0.8rem", fontWeight: 800, textTransform: "uppercase",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.3)", backdropFilter: "blur(4px)"
                        }}>
                          {isFinished ? "Finalizado" : isUpcoming ? "Próximamente" : "Activo"}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
                      <div>
                        <h3 style={{ fontFamily: "var(--font-brand)", fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--text-primary)" }}>
                          {prize.nombre}
                        </h3>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                          <span style={{ fontFamily: "var(--font-numbers)", fontSize: "1.8rem", fontWeight: "700", color: "var(--accent-gold)" }}>
                            ${Number(prize.precio_boleto).toFixed(2)}
                          </span>
                          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>por boleto</span>
                        </div>
                      </div>

                      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }}>
                        {prize.descripcion}
                      </p>

                      {!isFinished && (
                        <div style={{ marginBottom: "0.5rem" }}>
                          <div style={{ height: "4px", background: "var(--border-subtle)", borderRadius: "100px", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(to right, ${prize.color}, var(--accent-gold))`, borderRadius: "100px" }} />
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", marginTop: "0.3rem", color: "var(--text-muted)" }}>
                            <span>{taken} vendidos</span>
                            <span>{free} disponibles</span>
                          </div>
                        </div>
                      )}

                      <div style={{ background: "var(--bg-sunken)", padding: "0.75rem", borderRadius: "var(--r-md)", border: "1px solid var(--border-subtle)", fontSize: "0.75rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                          <span style={{ color: "var(--text-muted)" }}>Fecha:</span>
                          <span style={{ fontWeight: 700 }}>{prize.fecha_sorteo || "Pendiente"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--text-muted)" }}>Hora:</span>
                          <span style={{ fontWeight: 700 }}>{prize.hora_sorteo || "20:00"}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                        {isFinished ? (
                          <div style={{ textAlign: "center" }}>
                            <div className="label-xs" style={{ color: "var(--accent-gold)" }}>Ganador Oficial 🏆</div>
                            <div style={{ fontWeight: 700 }}>{prize.ganador_nombre || "Pendiente..."}</div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Boleto: #{prize.numero_ganador || "-"}</div>
                          </div>
                        ) : isUpcoming ? (
                          <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", fontStyle: "italic" }}>
                            Ventas abren pronto
                          </div>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <div className="label-xs" style={{ color: "var(--accent-ruby)", marginBottom: "0.4rem" }}>Cierra en: ⏳</div>
                            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", fontFamily: "var(--font-numbers)", fontSize: "1.1rem" }}>
                              <span style={{ background: "var(--bg-sunken)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{timeLeft?.days || 0}D</span>
                              <span style={{ background: "var(--bg-sunken)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{timeLeft?.hours || 0}H</span>
                              <span style={{ background: "var(--bg-sunken)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{timeLeft?.minutes || 0}M</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {activeTab === 'active' && (
                        <button
                          onClick={() => {
                            const isSelecting = !isActive;
                            setSelected(isActive ? null : prize.id);
                            setShowPayment(false);

                            if (isSelecting) {
                              setTimeout(() => {
                                document.getElementById('numbers-section')?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start'
                                });
                              }, 150);
                            }
                          }}
                          style={{
                            width: "100%", marginTop: "1rem", padding: "0.8rem",
                            background: isActive ? "var(--bg-sunken)" : prize.color,
                            color: isActive ? prize.color : "#fff",
                            border: isActive ? `1px solid ${prize.color}` : "none",
                            borderRadius: "var(--r-sm)", fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem",
                            cursor: "pointer", transition: "0.3s",
                          }}
                        >
                          {isActive ? "✓ Seleccionado" : "Participar Ahora"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
=======
              filteredPrizes.map((prize) => (
                <PrizeCard
                  key={prize.id}
                  prize={prize}
                  activeTab={activeTab}
                  selected={selected}
                  setSelected={setSelected}
                  setShowPayment={setShowPayment}
                  taken={takenMap[prize.id]?.size || 0}
                  timeLeft={calculateTimeLeft(prize.fecha_sorteo, prize.hora_sorteo)}
                  hexToRgb={hexToRgb}
                />
              ))
>>>>>>> d2e6c5d410a6916c110ffe65c4f9caddd02f8f43
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center" }}>No hay sorteos.</div>
            )}
          </div>
        </section>
<<<<<<< HEAD

        {activePrize && activeTab === 'active' && (
          <section id="numbers-section" className="interactive-section" style={{
            background: "var(--bg-surface)", border: "1px solid var(--border-mid)",
            borderRadius: "var(--r-xl)", marginTop: "2rem",
            marginBottom: showPayment ? "2rem" : "5rem", boxShadow: "var(--card-shadow)",
            animation: "fadeUp 0.5s ease"
          }}>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "45px", height: "45px", borderRadius: "50%", overflow: "hidden", background: "var(--bg-sunken)", flexShrink: 0 }}>
                  <img src={activePrize.imagen_url || "/images/sorteos/galapagos-premio.png"} alt="Premio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                  {activePrize.nombre}
                </h2>
              </div>
              <div className="deco-line">
                <div className="deco-diamond"></div>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                Selecciona tus números de la suerte para este sorteo
              </p>
            </div>

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
                  background: "linear-gradient(135deg, var(--gold-300, #d4af37), var(--gold-500, #aa8c2c))",
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
=======
        
        {/* sorteosWebDeploy/src/app/components/activeTab.jsx */}
        {activePrize && activeTab === 'active' && (
          <NumbersGrid 
            activePrize={activePrize}
            takenMap={takenMap}
            userPicks={userPicks}
            handleNumberClick={handleNumberClick}
            handleReserve={handleReserve}
            showPayment={showPayment}
          />
>>>>>>> d2e6c5d410a6916c110ffe65c4f9caddd02f8f43
        )}

        {/* sorteosWebDeploy\src\app\components\CheckoutForm.jsx */}
        {showPayment && tempReservation && (
<<<<<<< HEAD
          <section id="checkout-section" className="interactive-section" style={{
            background: "var(--bg-surface)", border: "1px solid var(--border-mid)",
            borderRadius: "var(--r-xl)", boxShadow: "var(--card-shadow)",
            animation: "slideUp 0.4s var(--ease)"
          }}>

            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", margin: 0 }}>INGRESE SUS DATOS</h2>
              <div style={{ height: "2px", background: "var(--border-subtle)", marginTop: "0.5rem" }} />
            </div>

            <div className="checkout-grid">
              <div className="full-width">
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>País *</label>
                <select
                  value={userData.pais} onChange={(e) => setUserData({ ...userData, pais: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                >
                  <option value="">Selecciona un país...</option>
                  <option value="Ecuador">Ecuador</option>
                </select>
              </div>

              <div className="full-width">
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Provincia *</label>
                <select
                  value={userData.provincia} onChange={(e) => setUserData({ ...userData, provincia: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                >
                  <option value="">Elige una opción...</option>
                  <option value="Guayas">Guayas</option>
                </select>
              </div>

              <div className="full-width">
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Ciudad *</label>
                <input
                  type="text" value={userData.ciudad} onChange={(e) => setUserData({ ...userData, ciudad: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Nombre *</label>
                <input
                  type="text" value={userData.nombre} onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Apellidos *</label>
                <input
                  type="text" value={userData.apellidos} onChange={(e) => setUserData({ ...userData, apellidos: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                />
              </div>

              <div className="full-width">
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Teléfono *</label>
                <input
                  type="tel" value={userData.telefono} onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                />
              </div>

              <div className="full-width">
                <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Correo electrónico *</label>
                <input
                  type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "var(--r-sm)", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", outline: "none" }}
                />
              </div>

              <div className="full-width" style={{ marginTop: "0.5rem" }}>
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

              <div className="full-width" style={{ marginTop: "1rem", background: "var(--bg-elevated)", padding: "1.5rem", borderRadius: "var(--r-md)", border: "1px solid var(--border-mid)", borderLeft: "4px solid var(--accent-ruby)", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
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
                    <strong>Aviso importante:</strong> En caso de comprobarse que NO es mayor de edad en la verificación del ganador, se procederá a anular el número de boleto automáticamente y no existirá devolución del dinero.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "2rem", marginTop: "3rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", margin: 0 }}>MÉTODO DE PAGO</h2>
              <div style={{ height: "1px", background: "var(--border-subtle)", marginTop: "1rem" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              <div style={{ textAlign: "center", background: "var(--bg-elevated)", padding: "1.5rem", borderRadius: "var(--r-md)", border: "1px solid var(--border-subtle)" }}>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)" }}>Total a pagar por {tempReservation.nums.length} boletos:</p>
                <h3 style={{ color: "var(--accent-gold)", fontSize: "2.2rem", margin: "0.5rem 0 0" }}>${tempReservation.total.toFixed(2)}</h3>
              </div>
              <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Selecciona el método de pago</label>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <button onClick={() => setPaymentMethod('transfer')} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem", padding: "1rem", borderRadius: "var(--r-md)", border: paymentMethod === 'transfer' ? "2px solid var(--accent-gold)" : "1px solid var(--border-mid)", background: "var(--bg-sunken)", cursor: "pointer", color: "var(--text-primary)", transition: "all 0.2s" }}>
                  <span style={{ fontSize: "1.2rem" }}>🏦</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Transferencia</div>
                    <div style={{ fontSize: "0.65rem", opacity: 0.7 }}>Bancos Locales</div>
                  </div>
                </button>
              </div>

              {paymentMethod === 'transfer' && (
                <div style={{ padding: "1.5rem", border: "1px dashed var(--accent-gold)", borderRadius: "var(--r-md)", fontSize: "0.9rem", animation: "fadeIn 0.3s", background: "var(--bg-elevated)" }}>
                  <p style={{ fontWeight: 700, color: "var(--accent-gold)", margin: "0 0 0.8rem" }}>Datos de la Cuenta:</p>
                  <div className="bank-details-grid">
                    <span><b>Banco:</b> Pichincha (Ahorros)</span>
                    <span><b>Cuenta:</b> 2208157036</span>
                    <span><b>Titular:</b> Sorteos La Fortuna S.A.</span>
                    <span><b>CI/RUC:</b> 0900000000001</span>
                  </div>
                  <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                    * Al confirmar, se abrirá WhatsApp para que nos envíes el comprobante.
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-actions">
              <button
                onClick={() => setShowPayment(false)}
                style={{ flex: 1, minWidth: "120px", padding: "1rem", borderRadius: "var(--r-sm)", border: "1px solid var(--border-mid)", background: "var(--bg-elevated)", color: "var(--text-secondary)", fontWeight: 700, cursor: "pointer" }}
              >
                Cancelar
              </button>

              <button
                disabled={isProcessing || !isFormValid}
                onClick={confirmFinalPurchase}
                style={{
                  flex: 2, minWidth: "200px", padding: "1rem", borderRadius: "var(--r-sm)", border: "none",
                  background: (!isFormValid) ? "var(--bg-sunken)" : "var(--accent-gold)",
                  color: (!isFormValid) ? "var(--text-muted)" : "#1a1a1a",
                  fontWeight: 700, cursor: (!isFormValid) ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                {isProcessing ? "Procesando..." :
                  !isFormValid ? (dobError ? "Debes ser mayor de 18 años" : "Completa todos los datos y acepta") :
                    paymentMethod === 'transfer' ? "Confirmar y enviar a WhatsApp 📱" : "Proceder al Pago Seguro"}
              </button>
            </div>
          </section>
=======
          <CheckoutForm 
            showPayment={showPayment}
            tempReservation={tempReservation}
            userData={userData}
            setUserData={setUserData}
            handleDateChange={handleDateChange}
            dobError={dobError}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isProcessing={isProcessing}
            isFormValid={isFormValid}
            setShowPayment={setShowPayment}
            confirmFinalPurchase={confirmFinalPurchase}
          />
>>>>>>> d2e6c5d410a6916c110ffe65c4f9caddd02f8f43
        )}

      </main>


      {/* sorteosWebDeploy\src\app\components\SuccessModal.jsx */}
      <SuccessModal modal={modal} setModal={setModal} />


    </div>
  );
}