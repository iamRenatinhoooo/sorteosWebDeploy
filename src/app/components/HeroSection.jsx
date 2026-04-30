const HeroSection = () => {
  return (
    <section style={{ textAlign: "center", marginBottom: "4rem" }}>
      <h1
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: "1.3",
          margin: "0 0 1rem 0",
        }}
      >
        <span style={{ color: "var(--accent-gold)" }}>Sorteos</span>{" "}
        <span style={{ color: "var(--text-primary)" }}>La</span>{" "}
        <span style={{ color: "var(--accent-ruby)" }}>Fortuna</span>
      </h1>

      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1rem, 3vw, 1.2rem)",
          fontStyle: "italic",
          color: "var(--text-secondary)",
          marginBottom: "1.5rem",
          padding: "0 1rem",
        }}
      >
        Participa en nuestros sorteos exclusivos y llévate premios extraordinarios.
      </p>
    </section>
  );
};

export default HeroSection;