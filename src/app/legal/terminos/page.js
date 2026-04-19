"use client";

import LegalSection from "@/app/components/legal/LegalSection";
import LegalTableOfContents from "@/app/components/legal/LegalTableOfContents";

/**
 * Metadata para SEO
 * Nota: En Next.js App Router, para usar 'use client' y metadata en el mismo archivo, 
 * lo ideal es separar la metadata a un archivo layout o componente de servidor, 
 * pero aquí se prioriza la lógica funcional solicitada.
 */

const sections = [
  { id: "aceptacion", label: "Aceptación de los Términos" },
  { id: "requisitos", label: "Requisitos de Participación" },
  { id: "boletos", label: "Adquisición de Boletos" },
  { id: "sorteo", label: "Realización del Sorteo" },
  { id: "premios", label: "Entrega de Premios" },
  { id: "jurisdiccion", label: "Ley Aplicable y Jurisdicción" },
];

export default function TerminosPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
      <aside className="hidden md:block">
        <LegalTableOfContents items={sections} />
      </aside>

      <main>
        <header style={{ marginBottom: "4rem" }}>
          <div style={{ color: "var(--accent-gold)", fontSize: "0.7rem", fontWeight: "700", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>DOCUMENTO LEGAL V.1.0</div>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "3rem", color: "var(--accent-gold)", margin: 0 }}>
            Términos y Condiciones
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
            Última actualización: 01 de enero de 2026 [cite: 90]
          </p>
        </header>

        {/* Sección 1: Aceptación */}
        <LegalSection index={1} id="aceptacion" title="Aceptación de los Términos">
          <p>El acceso y uso de la plataforma Sorteos La Fortuna implica la aceptación plena, expresa e incondicional de los presentes Términos y Condiciones por parte del usuario[cite: 92, 93]. Al registrarse o participar en cualquier sorteo, usted declara haber leído y comprendido la totalidad de este documento jurídico y su vinculación legal[cite: 95].</p>
          <p>En caso de no estar de acuerdo con alguna de las disposiciones aquí establecidas, el usuario deberá abstenerse inmediatamente de utilizar los servicios de la plataforma[cite: 94]. El uso continuado del sitio tras cualquier modificación constituye la aceptación de los nuevos términos[cite: 121].</p>
        </LegalSection>

        {/* Sección 2: Requisitos */}
        <LegalSection index={2} id="requisitos" title="Requisitos de Participación">
          <p>Para participar en los sorteos, es requisito indispensable ser persona natural mayor de 18 años de edad al momento de la adquisición del boleto[cite: 97]. Sorteos La Fortuna se reserva el derecho de solicitar la verificación de la mayoría de edad mediante documento de identidad oficial[cite: 115].</p>
          <p>El participante deberá poseer una cédula de identidad o pasaporte ecuatoriano válido y estar domiciliado dentro del territorio de la República del Ecuador[cite: 98, 99]. Queda prohibida la participación a personas inhabilitadas legalmente[cite: 100].</p>
        </LegalSection>

        {/* Sección 3: Adquisición de Boletos */}
        <LegalSection index={3} id="boletos" title="Adquisición de Boletos">
          <p>Cada boleto adquirido otorga el derecho de participación exclusivamente para un sorteo específico e individualizado, identificado por su nombre y fecha en la plataforma[cite: 102]. La adquisición de un boleto no garantiza la obtención de un premio, sino el derecho a participar en el proceso de selección aleatoria.</p>
          <p>Rige una política estricta de no devolución de los importes pagados por los boletos, salvo en casos de cancelación total del sorteo por causas imputables directamente a la organización[cite: 103]. Salvo que se indique lo contrario en la descripción del premio, existe un límite máximo de 10 boletos por persona para cada sorteo con el fin de garantizar la equidad en la participación[cite: 104].</p>
          <p>El proceso de reserva se completa únicamente tras la confirmación efectiva del pago a través de los canales autorizados. Una vez validado el pago (sea mediante transferencia o pasarela digital), el sistema emitirá un comprobante digital que acredita la titularidad de los números seleccionados[cite: 105].</p>
        </LegalSection>

        {/* Sección 4: Realización del Sorteo */}
        <LegalSection index={4} id="sorteo" title="Realización del Sorteo">
          <p>Los sorteos se llevarán a cabo rigurosamente en la fecha, hora y lugar publicados previamente en la ficha técnica de cada premio dentro de la plataforma[cite: 107]. Sorteos La Fortuna se reserva la facultad de realizar transmisiones en vivo del proceso a través de sus canales oficiales de redes sociales para garantizar la transparencia[cite: 108].</p>
          <p>El resultado del sorteo, obtenido mediante los mecanismos de selección aleatoria implementados, tendrá carácter de definitivo, inapelable e irrevocable[cite: 109]. No se admitirán reclamaciones basadas en errores de interpretación de las mecánicas de juego una vez efectuado el sorteo.</p>
          <p>La plataforma utiliza algoritmos de generación de números aleatorios o sistemas físicos certificados que aseguran la neutralidad y la igualdad de oportunidades para todos los boletos pagados y confirmados[cite: 110].</p>
        </LegalSection>

        {/* Sección 5: Entrega de Premios */}
        <LegalSection index={5} id="premios" title="Entrega de Premios">
          <p>Tras la finalización del sorteo, el ganador será notificado oficialmente por Sorteos La Fortuna en un plazo máximo de 48 horas a través del correo electrónico o número telefónico proporcionado en su registro[cite: 112]. El ganador dispondrá de un plazo máximo de 30 días calendario para reclamar su premio[cite: 113].</p>
          <p><strong>Logística de Entrega:</strong> Con el fin de asegurar la integridad del premio y la satisfacción del usuario, los premios serán entregados de manera presencial a través del servicio de Entrega de Servientrega en la dirección consignada por el ganador al momento de la validación. Este servicio especializado garantiza el seguimiento y la seguridad del artículo durante el tránsito.</p>
          <p>Es condición obligatoria la presentación del documento de identidad original para la verificación de los datos antes de la entrega física del premio[cite: 115]. Los premios son estrictamente personales, no transferibles a terceros y bajo ninguna circunstancia podrán ser canjeados por su valor en dinero en efectivo u otros bienes[cite: 114].</p>
        </LegalSection>

        {/* Sección 6: Jurisdicción */}
        <LegalSection index={6} id="jurisdiccion" title="Ley Aplicable y Jurisdicción">
          <p>Para todos los efectos legales derivados del uso de esta plataforma, las partes se someten expresamente a las leyes vigentes de la República del Ecuador[cite: 125].</p>
          <p>Cualquier controversia técnica o jurídica será resuelta ante los jueces y tribunales competentes de la ciudad de Guayaquil, provincia del Guayas, renunciando los participantes a cualquier otro fuero o jurisdicción[cite: 126, 127].</p>
        </LegalSection>

        <footer style={{ marginTop: "5rem", padding: "2.5rem", borderTop: "1px solid var(--border-mid)", textAlign: "center", background: "var(--bg-sunken)", borderRadius: "var(--r-md)" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--accent-gold)", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Conforme a la Ley Orgánica de Protección de Datos Personales (Ecuador) [cite: 137]
          </p>
        </footer>
      </main>
    </div>
  );
}