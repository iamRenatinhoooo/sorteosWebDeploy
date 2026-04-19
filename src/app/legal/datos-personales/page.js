// En lugar de usar ../../
import LegalSection from "@/app/components/legal/LegalSection";
import LegalTableOfContents from "@/app/components/legal/LegalTableOfContents";

export const metadata = {
  title: "Tratamiento de Datos Personales — Sorteos La Fortuna",
  description: "Política de tratamiento de datos personales conforme a la LOPDP de Ecuador.",
};

const sections = [
  { id: "marco", label: "Marco Normativo" },
  { id: "responsable", label: "Responsable del Tratamiento" },
  { id: "derechos", label: "Derechos del Titular (ARCO+)" },
  { id: "seguridad", label: "Medidas de Seguridad" },
];

export default function DatosPersonalesPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
      <aside>
        <LegalTableOfContents items={sections} />
      </aside>

      <main>
        <header style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "2.5rem", color: "var(--accent-gold)" }}>
            Tratamiento de Datos Personales
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
            Cumplimiento LOPDP Ecuador · Versión 1.0 (2026)
          </p>
        </header>

        <LegalSection index={1} id="marco" title="Marco Normativo">
          <p>Este documento se rige por la Ley Orgánica de Protección de Datos Personales (LOPDP) publicada en el Registro Oficial Suplemento N.° 459 del 26 de mayo de 2021.</p>
        </LegalSection>

        <LegalSection index={2} id="responsable" title="Responsable del Tratamiento">
          <p>Sorteos La Fortuna (SorteosVIP), domiciliada en Guayaquil, Ecuador, es la entidad responsable del tratamiento de sus datos personales. Correo de contacto: <strong>dpo@sorteosvip.ec</strong>.</p>
        </LegalSection>

        <LegalSection index={3} id="derechos" title="Derechos del Titular (ARCO+)">
          <p>Usted tiene derecho al acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento de sus datos. Para ejercer estos derechos, envíe una solicitud firmada a privacidad@sorteosvip.ec.</p>
        </LegalSection>
      </main>
    </div>
  );
}