import Link from 'next/link';

export const metadata = {
  robots: "noindex, follow",
};

export default function LegalLayout({ children }) {
  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", paddingTop: "120px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 5% 5rem" }}>
        <nav style={{ marginBottom: "2rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--accent-gold)" }}>Inicio</Link> 
          <span style={{ margin: "0 0.5rem" }}>&gt;</span> 
          <span>Legal</span>
        </nav>
        {children}
      </div>
    </div>
  );
}