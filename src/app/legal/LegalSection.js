"use client";

export default function LegalSection({ id, title, children, index }) {
  return (
    <section id={id} style={{ marginBottom: "3rem", scrollMarginTop: "120px" }}>
      <div className="deco-line" style={{ justifyContent: "flex-start", gap: "1rem" }}>
        <div className="deco-diamond"></div>
        <h2 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "1.8rem", 
          color: "var(--text-primary)",
          margin: 0 
        }}>
          {index}. {title}
        </h2>
      </div>
      <div style={{ 
        marginTop: "1.5rem", 
        color: "var(--text-secondary)", 
        lineHeight: "1.8",
        fontSize: "1rem",
        textAlign: "justify",
        background: "var(--bg-sunken)",
        padding: "2rem",
        borderRadius: "var(--r-md)",
        border: "1px solid var(--border-subtle)"
      }}>
        {children}
      </div>
    </section>
  );
}

