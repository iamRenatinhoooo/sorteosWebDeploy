
import LegalSection from "@/app/components/legal/LegalSection";


export default function PrivacidadPage() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "2.5rem", color: "var(--accent-gold)" }}>Política de Privacidad</h1>
        <p style={{ color: "var(--text-muted)" }}>Cumplimiento LOPDP Ecuador Art. 10 y 15 [cite: 137]</p>
      </header>

      <LegalSection index={1} title="Responsable del Tratamiento">
        <p>SorteosVIP es el responsable del tratamiento de sus datos personales. Para consultas, contacte a <strong>privacidad@sorteosvip.ec</strong>.</p>
      </LegalSection>

      <LegalSection index={2} title="Finalidad del Tratamiento">
        <p>Recopilamos su nombre, cédula y contacto exclusivamente para la gestión de su participación en los sorteos y la entrega de premios.</p>
        <p>No almacenamos datos de tarjetas de crédito; los pagos son procesados por pasarelas seguras externas (PayPal, PayPhone, Deuna!)[cite: 148].</p>
      </LegalSection>
    </main>
  );
}