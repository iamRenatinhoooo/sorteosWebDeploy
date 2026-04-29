"use client";

import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { PrizeTabs, PrizeCard } from './components/SorteosComponents';
import { NumbersGrid } from './components/activeTab';
import { CheckoutForm } from './components/CheckoutForm';
import { SuccessModal } from './components/SuccessModal';
import './Sorteos.css';
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
      minHeight: "100vh",
      background: "var(--bg-base)",
      color: "var(--text-primary)",
      transition: "background 0.5s, color 0.5s",
      fontFamily: "var(--font-body)",
    }}>

      <main id="sorteos-section" className="main-container">
        {/* sorteosWebDeploy\src\app\components\HeroSection.jsx */}
        <HeroSection />

        {/* sorteosWebDeploy\src\app\components\SorteosComponents.jsx */}
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
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center" }}>No hay sorteos.</div>
            )}
          </div>
        </section>
        
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
        )}

        {/* sorteosWebDeploy\src\app\components\CheckoutForm.jsx */}
        {showPayment && tempReservation && (
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
        )}

      </main>


      {/* sorteosWebDeploy\src\app\components\SuccessModal.jsx */}
      <SuccessModal modal={modal} setModal={setModal} />


    </div>
  );
}