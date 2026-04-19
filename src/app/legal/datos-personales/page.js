"use client";

import LegalSection from "@/app/components/legal/LegalSection";
import LegalTableOfContents from "@/app/components/legal/LegalTableOfContents";

const sections = [
  { id: "marco-normativo", label: "Marco Normativo" },
  { id: "responsable-dpo", label: "Responsable y DPO" },
  { id: "categorias-titulares", label: "Categorías de Titulares" },
  { id: "categorias-datos", label: "Categorías de Datos" },
  { id: "principios", label: "Principios Rectores" },
  { id: "legitimacion", label: "Bases de Legitimación" },
  { id: "derechos-arco", label: "Derechos del Titular" },
  { id: "ejercicio-derechos", label: "Ejercicio de Derechos" },
  { id: "transferencias", label: "Transferencias Internacionales" },
  { id: "seguridad", label: "Medidas de Seguridad" },
  { id: "vigencia", label: "Vigencia y Actualización" },
  { id: "glosario", label: "Glosario Técnico" },
];

export default function DatosPersonalesPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
      <aside className="hidden md:block">
        <LegalTableOfContents items={sections} />
      </aside>

      <main>
        {/* Portada Interna [cite: 245] */}
        <header style={{ 
          padding: "3rem", 
          background: "var(--bg-sunken)", 
          borderRadius: "var(--r-lg)", 
          border: "1px solid var(--border-mid)",
          marginBottom: "4rem",
          textAlign: "center"
        }}>
          <div style={{ color: "var(--accent-gold)", fontSize: "0.8rem", fontWeight: "bold", letterSpacing: "0.3em", marginBottom: "1rem" }}>
            DOCUMENTO TÉCNICO JURÍDICO
          </div>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "2.2rem", color: "var(--text-primary)", margin: "0 0 1rem" }}>
            Política de Tratamiento de Datos Personales
          </h1>
          <div style={{ display: "inline-block", border: "1px solid var(--accent-gold)", padding: "0.5rem 1.5rem", borderRadius: "100px", color: "var(--accent-gold)", fontSize: "0.8rem" }}>
            Versión 1.0 · Enero 2026
          </div>
        </header>

        <LegalSection index={1} id="marco-normativo" title="Marco Normativo">
          <p>La presente política se fundamenta en la Ley Orgánica de Protección de Datos Personales (LOPDP), publicada en el Registro Oficial Suplemento N.° 459 el 26 de mayo de 2021, y su Reglamento General.</p>
          <p>Asimismo, se integra conforme a las directrices emitidas por la Autoridad de Protección de Datos Personales del Ecuador (ADPE) y normativas complementarias como la Ley Orgánica de Transparencia y Acceso a la Información Pública (LOTTAIP) y el Código de Comercio.</p>
        </LegalSection>

        <LegalSection index={2} id="responsable-dpo" title="Responsable y Delegado de Protección de Datos (DPO)">
          <p>Sorteos La Fortuna (SorteosVIP), con domicilio en Guayaquil, Ecuador, asume la responsabilidad del tratamiento de sus datos personales.</p>
          <p>Para garantizar el cumplimiento normativo, se ha designado un Delegado de Protección de Datos (DPO). Puede contactar con el DPO para consultas técnicas o reclamos al correo <strong>dpo@sorteosvip.ec</strong> o al teléfono +593 4 000-0000.</p>
        </LegalSection>

        <LegalSection index={3} id="categorias-titulares" title="Categorías de Titulares">
          <p>Esta política aplica a los siguientes grupos: usuarios registrados en la plataforma, compradores de boletos para sorteos, personas que interactúan mediante canales oficiales (WhatsApp, redes sociales) y visitantes del sitio web que generen datos de navegación.</p>
        </LegalSection>

        <LegalSection index={4} id="categorias-datos" title="Categorías de Datos Tratados">
          <p><strong>A. Datos Ordinarios:</strong> Incluyen información de identificación (nombres, cédula), datos de contacto (correo, teléfono) y datos transaccionales de pago.</p>
          <p><strong>B. Datos de Navegación:</strong> Recopilamos IP, geolocalización aproximada, tipo de dispositivo, sistema operativo y duración de la sesión.</p>
          <p style={{ fontWeight: "bold", color: "var(--accent-ruby)" }}>Declaración: SorteosVIP NO trata categorías especiales de datos como salud, biometría, origen étnico o filiación política.</p>
        </LegalSection>

        <LegalSection index={5} id="principios" title="Principios Rectores (Art. 10 LOPDP)">
          <p>Nos regimos por los principios de licitud, lealtad y transparencia; limitación de la finalidad; minimización de datos; exactitud; limitación del plazo de conservación; e integridad y confidencialidad.</p>
          <p>Aplicamos el principio de responsabilidad proactiva mediante medidas técnicas y organizativas para asegurar el tratamiento adecuado de su información.</p>
        </LegalSection>

        <LegalSection index={6} id="legitimacion" title="Bases de Legitimación">
          <p>El tratamiento se legitima en: (a) el consentimiento libre y específico del titular (Art. 15 LOPDP); (b) la ejecución del contrato de participación en sorteos; (c) el cumplimiento de obligaciones legales; y (d) el interés legítimo de la empresa siempre que no prevalezcan los derechos del titular.</p>
        </LegalSection>

        <LegalSection index={7} id="derechos-arco" title="Derechos del Titular (ARCO+)">
          <p>Usted dispone de los derechos de acceso, rectificación, cancelación/supresión, oposición, portabilidad y limitación del tratamiento.</p>
          <p>Adicionalmente, tiene el derecho a no ser objeto de decisiones basadas única o principalmente en valoraciones automatizadas que produzcan efectos jurídicos en su contra.</p>
        </LegalSection>

        <LegalSection index={8} id="ejercicio-derechos" title="Ejercicio de Derechos">
          <p>Para ejercer sus derechos, debe enviar una solicitud al correo <strong>dpo@sorteosvip.ec</strong> con el asunto "Ejercicio de Derechos LOPDP", adjuntando copia de su documento de identidad.</p>
          <p>SorteosVIP responderá en un plazo máximo de 15 días hábiles. También puede presentar una reclamación ante la ADPE si considera que sus derechos han sido vulnerados.</p>
        </LegalSection>

        <LegalSection index={9} id="transferencias" title="Transferencias Internacionales">
          <p>Sus datos pueden ser almacenados en servidores de proveedores de hosting situados fuera de Ecuador (Art. 54 LOPDP), asegurando siempre niveles adecuados de protección mediante cláusulas contractuales tipo.</p>
        </LegalSection>

        <LegalSection index={10} id="seguridad" title="Medidas de Seguridad Implementadas">
          <p>Utilizamos cifrado en tránsito mediante TLS 1.3 y cifrado en reposo con el estándar AES-256 para datos sensibles.</p>
          <p>Contamos con autenticación multifactor (MFA) para accesos internos, realizamos auditorías de seguridad anuales y mantenemos un plan de respuesta ante incidentes con notificación a la ADPE en 72 horas si fuera necesario.</p>
        </LegalSection>

        <LegalSection index={11} id="vigencia" title="Vigencia y Actualización">
          <p>Esta política entra en vigor el 01 de enero de 2026. Cualquier cambio será notificado con al menos 10 días de anticipación mediante correo electrónico o avisos destacados en la plataforma.</p>
        </LegalSection>

        {/* Glosario Técnico [cite: 247] */}
        <section id="glosario" style={{ marginTop: "4rem", padding: "2rem", background: "var(--bg-sunken)", borderRadius: "var(--r-md)", border: "1px solid var(--border-subtle)" }}>
          <h3 style={{ fontFamily: "var(--font-brand)", color: "var(--accent-gold)", marginBottom: "1.5rem" }}>Glosario Técnico</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
            <li><strong>LOPDP:</strong> Ley Orgánica de Protección de Datos Personales del Ecuador.</li>
            <li><strong>ADPE:</strong> Autoridad de Protección de Datos Personales del Ecuador.</li>
            <li><strong>DPO:</strong> Data Protection Officer o Delegado de Protección de Datos.</li>
            <li><strong>ARCO+:</strong> Derechos de Acceso, Rectificación, Cancelación y Oposición.</li>
            <li><strong>TLS 1.3:</strong> Protocolo de seguridad para comunicaciones cifradas en red.</li>
            <li><strong>AES-256:</strong> Algoritmo de cifrado avanzado de 256 bits para protección de datos en reposo.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
