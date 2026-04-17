"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("pedidos");
  const [pedidos, setPedidos] = useState([]);
  const [sorteos, setSorteos] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSorteoId, setEditingSorteoId] = useState(null);
  const [newSorteo, setNewSorteo] = useState({
    nombre: "", estado: "upcoming", descripcion: "", emoji: "🎁", color: "#C9A84C",
    total_boletos: 100, precio_boleto: 5.00, fecha_sorteo: "", hora_sorteo: ""
  });

  const [showRoulette, setShowRoulette] = useState(false);
  const [rouletteSorteo, setRouletteSorteo] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState(0); 

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) await checkRole(session.user.id);
      else setLoadingAuth(false);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) checkRole(session.user.id);
      else { setIsAdmin(false); setLoadingAuth(false); }
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const checkRole = async (userId) => {
    try {
      const { data, error } = await supabase.from("perfiles").select("rol").eq("id", userId).maybeSingle();
      if (error) throw error;
      if (data?.rol === "admin") {
        setIsAdmin(true);
        fetchDashboardData(); 
      } else {
        setLoginError("Acceso denegado: Rol de administrador no detectado.");
        await supabase.auth.signOut();
      }
    } catch (error) {
      setLoginError("Error verificando permisos.");
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingAuth(true); setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setLoginError("Credenciales incorrectas."); setLoadingAuth(false); }
  };

  const handleLogout = async () => await supabase.auth.signOut();

  const fetchDashboardData = async () => {
    const { data: dataPedidos, error: errPedidos } = await supabase
      .from('pedidos')
      .select(`*, clientes (nombre, apellidos, telefono, email), sorteos (nombre), boletos (numero)`)
      .order('created_at', { ascending: false });
    if (!errPedidos) setPedidos(dataPedidos);

    const { data: dataSorteos, error: errSorteos } = await supabase
      .from('sorteos')
      .select('*') 
      .order('created_at', { ascending: false });
    if (!errSorteos) setSorteos(dataSorteos);
  };

  const aprobarPago = async (pedidoId) => {
    if(!confirm("¿Estás seguro de marcar este pedido como COMPLETADO? Los boletos pasarán a estado 'pagado'.")) return;
    try {
      const { error: errPedido } = await supabase.from('pedidos').update({ estado_pago: 'completado' }).eq('id', pedidoId);
      if (errPedido) throw errPedido;
      const { error: errBoletos } = await supabase.from('boletos').update({ estado: 'pagado' }).eq('pedido_id', pedidoId);
      if (errBoletos) throw errBoletos;
      alert("Pago aprobado con éxito.");
      fetchDashboardData(); 
    } catch (error) { alert("Error: " + error.message); }
  };

  const openCrearModal = () => {
    setEditingSorteoId(null);
    setNewSorteo({ nombre: "", estado: "upcoming", descripcion: "", emoji: "🎁", color: "#C9A84C", total_boletos: 100, precio_boleto: 5.00, fecha_sorteo: "", hora_sorteo: "" });
    setShowCreateModal(true);
  };

  const openEditarModal = (sorteo) => {
    setEditingSorteoId(sorteo.id);
    setNewSorteo({
      nombre: sorteo.nombre, estado: sorteo.estado, descripcion: sorteo.descripcion || "", emoji: sorteo.emoji || "🎁",
      color: sorteo.color || "#C9A84C", total_boletos: sorteo.total_boletos, precio_boleto: sorteo.precio_boleto,
      fecha_sorteo: sorteo.fecha_sorteo || "", hora_sorteo: sorteo.hora_sorteo || ""
    });
    setShowCreateModal(true);
  };

  const handleGuardarSorteo = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      if (editingSorteoId) {
        const { error } = await supabase.from('sorteos').update(newSorteo).eq('id', editingSorteoId);
        if (error) throw error; alert("Sorteo actualizado.");
      } else {
        const { error } = await supabase.from('sorteos').insert([newSorteo]);
        if (error) throw error; alert("Sorteo creado.");
      }
      setShowCreateModal(false); fetchDashboardData();
    } catch (error) { alert("Error: " + error.message); } finally { setIsSubmitting(false); }
  };

  const openRouletteModal = async (sorteo) => {
    const { data, error } = await supabase
      .from('boletos')
      .select('numero, pedidos( clientes(nombre, apellidos) )')
      .eq('sorteo_id', sorteo.id)
      .eq('estado', 'pagado');

    if (error || !data || data.length === 0) {
      alert("No hay boletos con pagos completados para este sorteo.");
      return;
    }

    const participantes = data.map(b => ({
      numero: b.numero,
      nombre: `${b.pedidos?.clientes?.nombre || 'Cliente'} ${b.pedidos?.clientes?.apellidos || ''}`.trim()
    }));

    setCandidates(participantes);
    setRouletteSorteo(sorteo);
    setWinner(null);
    setRotation(0);
    setShowRoulette(true);
  };

  const getConicGradient = () => {
    if (candidates.length === 0) return "none";
    const sliceAngle = 360 / candidates.length;
    const colors = ['var(--accent-gold)', '#1a1a1a', '#4ABFB8', '#E8879A'];
    
    const gradientParts = candidates.map((_, i) => {
      const startAngle = i * sliceAngle;
      const endAngle = (i + 1) * sliceAngle;
      const color = colors[i % colors.length];
      return `${color} ${startAngle}deg ${endAngle}deg`;
    });

    return `conic-gradient(${gradientParts.join(", ")})`;
  };

  const girarRuleta = () => {
    if (candidates.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
    
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3");
    audio.volume = 0.5; audio.play().catch(()=>{});

    const winnerIndex = Math.floor(Math.random() * candidates.length);
    const finalWinner = candidates[winnerIndex];

    const sliceAngle = 360 / candidates.length;
    const centerWinnerAngle = (winnerIndex * sliceAngle) + (sliceAngle / 2);
    const baseRotation = 360 - centerWinnerAngle;
    const totalSpins = 360 * 5;
    const targetRotation = totalSpins + baseRotation;

    setRotation(targetRotation);

    setTimeout(() => {
      setWinner(finalWinner);
      setIsSpinning(false);
      guardarGanadorEnBD(finalWinner);
    }, 5000); 
  };

  const guardarGanadorEnBD = async (ganador) => {
    try {
      await supabase.from('sorteos').update({
        estado: 'finished',
        ganador_nombre: ganador.nombre,
        numero_ganador: ganador.numero
      }).eq('id', rouletteSorteo.id);
      
      fetchDashboardData(); 
    } catch (error) {
      console.error("No se pudo guardar el ganador en la BD", error);
    }
  };

  if (loadingAuth) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", color: "#C9A84C" }}>Verificando credenciales...</div>;

  if (!session || !isAdmin) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)" }}>
        <div style={{ background: "var(--bg-surface)", padding: "3rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-mid)", maxWidth: "400px", width: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
          <h2 style={{ color: "var(--accent-gold)", textAlign: "center", fontFamily: "'Cinzel', serif", marginBottom: "2rem" }}>Panel de Control</h2>
          {loginError && <div style={{ background: "rgba(255,0,0,0.1)", color: "#ff4444", padding: "0.8rem", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.85rem", textAlign: "center" }}>{loginError}</div>}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Correo Administrador</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }} />
            </div>
            <button type="submit" style={{ background: "var(--accent-gold)", color: "#1a1a1a", padding: "1rem", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", marginTop: "1rem" }}>Ingresar al Panel</button>
          </form>
        </div>
      </div>
      
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-primary)", fontFamily: "var(--font-body)", position: "relative" }}>
      
      <header style={{ background: "var(--bg-surface)", padding: "1rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-mid)", paddingTop: "5rem"}}>
        <h1 style={{ fontFamily: "'Cinzel', serif", color: "var(--accent-gold)", margin: 0, fontSize: "1.5rem" }}>Admin Fortuna</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{session.user.email}</span>
          <button onClick={handleLogout} style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>Salir</button>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 5%" }}>
        
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => setActiveTab('pedidos')} style={{ background: activeTab === 'pedidos' ? 'var(--accent-gold)' : 'transparent', color: activeTab === 'pedidos' ? '#1a1a1a' : 'var(--text-secondary)', padding: "0.5rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }}>
            Gestión de Pedidos
          </button>
          <button onClick={() => setActiveTab('sorteos_activos')} style={{ background: activeTab === 'sorteos_activos' ? 'var(--accent-gold)' : 'transparent', color: activeTab === 'sorteos_activos' ? '#1a1a1a' : 'var(--text-secondary)', padding: "0.5rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }}>
            Sorteos Activos
          </button>
          <button onClick={() => setActiveTab('sorteos_finalizados')} style={{ background: activeTab === 'sorteos_finalizados' ? 'var(--accent-gold)' : 'transparent', color: activeTab === 'sorteos_finalizados' ? '#1a1a1a' : 'var(--text-secondary)', padding: "0.5rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }}>
            Sorteos Finalizados
          </button>
        </div>

        {activeTab === 'pedidos' && (
          <div style={{ overflowX: "auto" }}>
            <h2 style={{ marginBottom: "1.5rem", fontFamily: "var(--font-display)" }}>Últimas Reservas</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--bg-surface)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "var(--bg-sunken)", textAlign: "left", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <th style={{ padding: "1rem" }}>Fecha</th>
                  <th style={{ padding: "1rem" }}>Cliente</th>
                  <th style={{ padding: "1rem" }}>Sorteo</th>
                  <th style={{ padding: "1rem" }}>Rifas</th>
                  <th style={{ padding: "1rem" }}>Método</th>
                  <th style={{ padding: "1rem" }}>Total</th>
                  <th style={{ padding: "1rem" }}>Estado</th>
                  <th style={{ padding: "1rem" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(p => (
                  <tr key={p.id} style={{ borderTop: "1px solid var(--border-subtle)", fontSize: "0.9rem" }}>
                    <td style={{ padding: "1rem" }}>{new Date(p.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ fontWeight: "bold" }}>{p.clientes?.nombre} {p.clientes?.apellidos}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{p.clientes?.telefono}</div>
                    </td>
                    <td style={{ padding: "1rem" }}>{p.sorteos?.nombre}</td>
                    <td style={{ padding: "1rem", fontWeight: "bold", color: "var(--accent-gold)" }}>
                      {p.boletos && p.boletos.length > 0 
                        ? p.boletos.map(b => b.numero).sort((a,b)=>a-b).join(" · ") 
                        : "Ninguno"}
                    </td>
                    <td style={{ padding: "1rem", textTransform: "uppercase", fontSize: "0.75rem" }}>{p.metodo_pago}</td>
                    <td style={{ padding: "1rem", fontWeight: "bold", color: "#4BC98A" }}>${p.total_pagar}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ background: p.estado_pago === 'completado' ? 'rgba(75, 201, 138, 0.2)' : 'rgba(255, 171, 0, 0.2)', color: p.estado_pago === 'completado' ? '#4BC98A' : '#FFAB00', padding: "0.3rem 0.6rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: "bold" }}>
                        {p.estado_pago}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      {p.estado_pago === 'pendiente' && (
                        <button onClick={() => aprobarPago(p.id)} style={{ background: "#4BC98A", color: "#1a1a1a", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "bold", cursor: "pointer" }}>
                          Aprobar Pago
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {pedidos.length === 0 && <tr><td colSpan="8" style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No hay pedidos registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'sorteos_activos' && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", margin: 0 }}>Sorteos En Curso</h2>
              <button onClick={openCrearModal} style={{ background: "var(--accent-gold)", color: "#1a1a1a", border: "none", padding: "0.6rem 1.2rem", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", transition: "all 0.3s" }}>
                + Crear Nuevo Sorteo
              </button>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {sorteos.filter(s => s.estado !== 'finished').map(s => (
                <div key={s.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--r-lg)", padding: "1.5rem", position: "relative" }}>
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "15px", height: "15px", borderRadius: "50%", background: s.color }}></div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2.5rem" }}>{s.emoji}</span>
                    <span style={{ background: "var(--bg-sunken)", padding: "0.3rem 0.8rem", borderRadius: "100px", fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase", height: "fit-content" }}>{s.estado}</span>
                  </div>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-primary)" }}>{s.nombre}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 1rem 0" }}>Boletos: {s.total_boletos} | Precio: ${s.precio_boleto}</p>
                  
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => openEditarModal(s)} style={{ flex: 1, padding: "0.5rem", background: "transparent", border: "1px solid var(--border-mid)", color: "var(--text-secondary)", borderRadius: "6px", cursor: "pointer" }}>
                      Editar
                    </button>
                    <button onClick={() => openRouletteModal(s)} style={{ flex: 1, padding: "0.5rem", background: "var(--accent-ruby)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                      🎰 Ruleta
                    </button>
                  </div>
                </div>
              ))}
              {sorteos.filter(s => s.estado !== 'finished').length === 0 && <p style={{ color: "var(--text-muted)" }}>No hay sorteos activos.</p>}
            </div>
          </div>
        )}

        {activeTab === 'sorteos_finalizados' && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", margin: 0 }}>Historial de Sorteos Finalizados</h2>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {sorteos.filter(s => s.estado === 'finished').map(s => (
                <div key={s.id} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--r-lg)", padding: "1.5rem", position: "relative", opacity: 0.9 }}>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2.5rem", filter: "grayscale(100%)" }}>{s.emoji}</span>
                    <span style={{ background: "#333", color: "#fff", padding: "0.3rem 0.8rem", borderRadius: "100px", fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase", height: "fit-content" }}>FINALIZADO</span>
                  </div>
                  
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-primary)" }}>{s.nombre}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0 0 1rem 0" }}>Finalizado el: {new Date(s.created_at).toLocaleDateString()}</p>
                  
                  <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--bg-sunken)", borderRadius: "8px", border: "1px dashed var(--accent-gold)", textAlign: "center" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--accent-gold)", textTransform: "uppercase", fontWeight: "bold", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
                      🏆 Ganador Oficial
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                      {s.ganador_nombre || "Desconocido"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                      Boleto de Suerte: <strong style={{ color: "var(--accent-gold)" }}>#{s.numero_ganador || "-"}</strong>
                    </div>
                  </div>

                </div>
              ))}
              {sorteos.filter(s => s.estado === 'finished').length === 0 && <p style={{ color: "var(--text-muted)" }}>Aún no hay sorteos finalizados.</p>}
            </div>
          </div>
        )}

      </main>

      {showRoulette && rouletteSorteo && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "1rem" }}>
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--r-xl)", border: "2px solid var(--accent-gold)", width: "100%", maxWidth: "500px", padding: "3rem 2rem", textAlign: "center", position: "relative", boxShadow: "0 0 50px rgba(201,168,76,0.3)" }}>
            
            {!isSpinning && !winner && (
              <button onClick={() => setShowRoulette(false)} style={{ position: "absolute", top: "1rem", right: "1.5rem", background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "2rem", cursor: "pointer" }}>×</button>
            )}

            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", margin: "0 0 0.5rem" }}>
              {rouletteSorteo.nombre}
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem" }}>{candidates.length} boletos participando</p>

            <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 2.5rem' }}>
              
              <div style={{
                position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)',
                width: 0, height: 0, borderLeft: '15px solid transparent', borderRight: '15px solid transparent',
                borderTop: '25px solid var(--accent-ruby)', zIndex: 10, filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))'
              }}></div>

              <div style={{
                width: '100%', height: '100%', borderRadius: '50%', border: '4px solid var(--accent-gold)',
                background: getConicGradient(),
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.15, 1)' : 'none',
                position: 'relative', overflow: 'hidden', boxShadow: '0 0 20px rgba(0,0,0,0.5)'
              }}>
                {candidates.map((c, i) => {
                  const sliceAngle = 360 / candidates.length;
                  const angle = (i * sliceAngle) + (sliceAngle / 2);
                  return (
                    <div key={i} style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px)`,
                      color: '#fff', fontWeight: 'bold', textShadow: '1px 1px 3px #000',
                      textAlign: 'center', width: '60px'
                    }}>
                      <div style={{ fontSize: '1rem', color: 'var(--accent-gold)' }}>#{c.numero}</div>
                      {candidates.length <= 25 && (
                         <div style={{ fontSize: '0.65rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                           {c.nombre.split(' ')[0]}
                         </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {winner ? (
              <div>
                <h3 style={{ color: "var(--accent-ruby)", fontSize: "1.5rem", animation: "fadeIn 0.5s ease", margin: 0 }}>¡TENEMOS UN GANADOR! 🎉</h3>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--accent-gold)", margin: "0.5rem 0 1rem" }}>
                  {winner.nombre} (Boleto #{winner.numero})
                </p>
                <button onClick={() => setShowRoulette(false)} style={{ marginTop: "1rem", background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-mid)", padding: "0.8rem 2rem", borderRadius: "8px", cursor: "pointer" }}>
                  Cerrar
                </button>
              </div>
            ) : (
              <button 
                onClick={girarRuleta} 
                disabled={isSpinning}
                style={{ 
                  background: isSpinning ? "var(--bg-sunken)" : "linear-gradient(135deg, var(--gold-300, #d4af37), var(--gold-500, #aa8c2c))", 
                  color: isSpinning ? "var(--text-muted)" : "#1a1a1a", 
                  border: "none", padding: "1rem 3rem", borderRadius: "100px", fontSize: "1.2rem", fontWeight: "bold", 
                  cursor: isSpinning ? "default" : "pointer", boxShadow: isSpinning ? "none" : "0 5px 20px rgba(201,168,76,0.4)",
                  transition: "all 0.3s"
                }}
              >
                {isSpinning ? "Girando..." : "🎰 Tirar de la Ruleta"}
              </button>
            )}

          </div>
        </div>
      )}

      {showCreateModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "var(--bg-surface)", borderRadius: "var(--r-lg)", border: "1px solid var(--accent-gold)", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", padding: "2rem", boxShadow: "0 10px 40px rgba(201,168,76,0.15)" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1rem" }}>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", color: "var(--accent-gold)" }}>
                {editingSorteoId ? "Editar Sorteo" : "Crear Nuevo Sorteo"}
              </h2>
              <button onClick={() => setShowCreateModal(false)} style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "1.5rem", cursor: "pointer" }}>×</button>
            </div>

            <form onSubmit={handleGuardarSorteo} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Nombre del Premio *</label>
                  <input type="text" required value={newSorteo.nombre} onChange={e => setNewSorteo({...newSorteo, nombre: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Descripción *</label>
                  <textarea required rows="3" value={newSorteo.descripcion} onChange={e => setNewSorteo({...newSorteo, descripcion: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none", resize: "none" }}></textarea>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Total de Boletos *</label>
                  <input type="number" min="1" required disabled={editingSorteoId !== null} value={newSorteo.total_boletos} onChange={e => setNewSorteo({...newSorteo, total_boletos: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none", opacity: editingSorteoId ? 0.5 : 1 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Precio por Boleto ($) *</label>
                  <input type="number" step="0.01" min="0" required value={newSorteo.precio_boleto} onChange={e => setNewSorteo({...newSorteo, precio_boleto: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Fecha de Sorteo (Opcional)</label>
                  <input type="date" value={newSorteo.fecha_sorteo} onChange={e => setNewSorteo({...newSorteo, fecha_sorteo: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Hora de Sorteo (Opcional)</label>
                  <input type="time" value={newSorteo.hora_sorteo} onChange={e => setNewSorteo({...newSorteo, hora_sorteo: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }} />
                </div>
                <div style={{ display: "flex", gap: "1rem", gridColumn: "1 / -1" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Emoji 🎨</label>
                    <input type="text" maxLength="2" value={newSorteo.emoji} onChange={e => setNewSorteo({...newSorteo, emoji: e.target.value})} style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none", textAlign: "center", fontSize: "1.2rem" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Color Base</label>
                    <input type="color" value={newSorteo.color} onChange={e => setNewSorteo({...newSorteo, color: e.target.value})} style={{ width: "100%", height: "42px", padding: "0", borderRadius: "6px", border: "none", cursor: "pointer", background: "transparent" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.4rem", color: "var(--text-secondary)" }}>Estado Inicial</label>
                    <select value={newSorteo.estado} onChange={e => setNewSorteo({...newSorteo, estado: e.target.value})} style={{ width: "100%", height: "42px", padding: "0.6rem", borderRadius: "6px", background: "var(--bg-sunken)", border: "1px solid var(--border-subtle)", color: "#fff", outline: "none" }}>
                      <option value="upcoming">Próximo (Upcoming)</option>
                      <option value="active">Activo (Active)</option>
                      <option value="finished">Finalizado (Finished)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border-subtle)" }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ flex: 1, padding: "0.8rem", background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-mid)", borderRadius: "6px", cursor: "pointer" }}>Cancelar</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 2, padding: "0.8rem", background: "var(--accent-gold)", color: "#1a1a1a", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? "Guardando..." : (editingSorteoId ? "Guardar Cambios" : "Crear Sorteo Oficial")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}