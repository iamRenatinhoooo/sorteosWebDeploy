"use client";
import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = [
    "/images/sorteos/galapagos-premio.png",
    "/images/sorteos/carro-premio.png",
    "/images/sorteos/reloj-premio.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section style={{ 
      position: "relative", width: "100vw", marginLeft: "calc(-50vw + 50%)",
      height: "75vh", minHeight: "500px", overflow: "hidden", marginBottom: "1rem"
    }}>
      {carouselImages.map((img, index) => (
        <div key={index} style={{
          position: "absolute", inset: 0, opacity: currentSlide === index ? 1 : 0,
          transition: "opacity 1.5s ease-in-out", backgroundImage: `url(${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
      ))}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(7,16,30,0.4) 50%, rgba(7,16,30,1) 100%)",
      }} />
      <div style={{ 
        position: "relative", zIndex: 2, height: "100%", display: "flex", 
        flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 10%"
      }}>
        <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "clamp(2.8rem, 8vw, 5.5rem)", fontWeight: 700, lineHeight: "1.1", margin: "0 0 1rem 0", textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>
          <span style={{ color: "var(--accent-gold)" }}>Sorteos</span> <span style={{ color: "var(--text-primary)" }}>La</span> <span style={{ color: "var(--accent-ruby)" }}>Fortuna</span>
        </h1>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", fontStyle: "italic", color: "var(--text-secondary)", maxWidth: "800px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          Participa en nuestros sorteos exclusivos y llévate premios extraordinarios.
        </p>
      </div>
    </section>
  );
}