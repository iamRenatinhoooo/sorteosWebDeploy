"use client";

export default function LegalTableOfContents({ items }) {
  return (
    <nav style={{ 
      position: "sticky", 
      top: "120px", 
      padding: "1.5rem", 
      background: "var(--bg-surface)", 
      borderRadius: "var(--r-lg)",
      border: "1px solid var(--border-mid)",
      height: "fit-content"
    }}>
      <h3 style={{ 
        fontFamily: "var(--font-brand)", 
        fontSize: "0.9rem", 
        color: "var(--accent-gold)", 
        marginBottom: "1rem",
        textTransform: "uppercase" 
      }}>
        Contenido del Documento
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {items.map((item, idx) => (
          <li key={idx}>
            <a href={`#${item.id}`} style={{ 
              fontSize: "0.85rem", 
              color: "var(--text-muted)", 
              transition: "color 0.2s" 
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--accent-gold)"}
            onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
            >
              {idx + 1}. {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}