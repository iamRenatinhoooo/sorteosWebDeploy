"use client";

import LegalSection from "@/app/components/legal/LegalSection";
import LegalTableOfContents from "@/app/components/legal/LegalTableOfContents";

const sections = [
  { id: "responsable", label: "Responsable del Tratamiento" },
  { id: "datos", label: "Datos que Recopilamos" },
  { id: "finalidad", label: "Finalidad del Tratamiento" },
  { id: "legitimacion", label: "Base Legitimadora" },
  { id: "conservacion", label: "Conservación de Datos" },
  { id: "terceros", label: "Compartición con Terceros" },
  { id: "derechos", label: "Derechos del Titular (ARCO+)" },
  { id: "seguridad", label: "Medidas de Seguridad" },
  { id: "cookies", label: "Política de Cookies" },
];

export default function PrivacidadPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
      <aside className="hidden md:block">
        <LegalTableOfContents items={sections} />
      </aside>

      <main>
        <header style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <span style={{ background: "var(--accent-gold)", color: "#000", padding: "0.2rem 0.8rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold" }}>
              LOPDP COMPLIANCE
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "3rem", color: "var(--accent-gold)", margin: 0 }}>
            Política de Privacidad
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
            Marco: LOPDP (Arts. 10, 15, 54) · Actualización: 01 de enero de 2026
          </p>
        </header>

        {/* Tabla Resumen ARCO+ solicitada en el Prompt Maestro */}
        <div style={{ marginBottom: "3rem", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--bg-sunken)", borderRadius: "var(--r-md)", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-mid)" }}>
                <th style={{ padding: "1rem", textAlign: "left", color: "var(--accent-gold)" }}>Derecho</th>
                <th style={{ padding: "1rem", textAlign: "left", color: "var(--accent-gold)" }}>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>Acceso</td>
                <td style={{ padding: "1rem" }}>Conocer qué datos tratamos y para qué.</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>Rectificación</td>
                <td style={{ padding: "1rem" }}>Actualizar o corregir información inexacta.</td>
              </tr>
              <tr>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>Eliminación</td>
                <td style={{ padding: "1rem" }}>Solicitar el borrado de sus datos personales.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <LegalSection index={1} id="responsable" title="Responsable del Tratamiento">
          <p>Sorteos La Fortuna, con domicilio legal en la ciudad de Guayaquil, Guayas, República del Ecuador, actúa como Responsable del Tratamiento de sus datos personales conforme a la normativa vigente[cite: 30, 140, 141].</p>
          <p>Para garantizar la protección de su información, hemos designado canales específicos de atención. Puede contactar con nuestro Delegado de Protección de Datos (DPO) a través de los correos electrónicos <strong>dpo@sorteoslafortuna.ec</strong> y <strong>privacidad@sorteoslafortuna.ec</strong>, o al teléfono +593 9 6326-7270[cite: 31, 32, 33, 142, 143].</p>
          <p>Nos comprometemos a gestionar sus datos bajo los principios de licitud, transparencia y lealtad, asegurando que su privacidad sea nuestra prioridad en cada interacción con la plataforma.</p>
        </LegalSection>

        <LegalSection index={2} id="datos" title="Datos que Recopilamos">
          <p>Para permitir su participación en nuestros sorteos premium, recopilamos datos identificativos básicos como su nombre completo y número de cédula de identidad o pasaporte ecuatoriano[cite: 144, 145].</p>
          <p>Asimismo, tratamos datos de contacto que incluyen su dirección de correo electrónico y número de teléfono móvil para notificaciones de resultados. En cuanto a transacciones, registramos referencias de transferencias bancarias y confirmaciones de pago[cite: 146, 147].</p>
          <p>Es importante aclarar que **no almacenamos datos de tarjetas de crédito o débito**; estos son procesados directamente por pasarelas seguras externas[cite: 148]. También recopilamos datos de navegación como su dirección IP y tipo de navegador mediante cookies técnicas[cite: 149].</p>
        </LegalSection>

        <LegalSection index={3} id="finalidad" title="Finalidad del Tratamiento">
          <p>La finalidad principal de recopilar sus datos es gestionar su participación activa en los sorteos, asegurando que cada boleto esté correctamente vinculado a un titular verificado[cite: 150, 151].</p>
          <p>Adicionalmente, utilizamos su información para verificar que cumple con los requisitos de mayoría de edad y residencia en Ecuador, así como para el procesamiento de pagos y la emisión de comprobantes fiscales[cite: 152, 153].</p>
          <p>Finalmente, tratamos sus datos para enviarle notificaciones críticas sobre resultados de sorteos, entrega de premios y actualizaciones de seguridad del servicio, siempre cumpliendo con nuestras obligaciones legales y fiscales[cite: 154, 155].</p>
        </LegalSection>

        <LegalSection index={4} id="legitimacion" title="Base Legitimadora">
          <p>El tratamiento de sus datos se sustenta legalmente en la ejecución del contrato de participación que usted acepta al adquirir un boleto en nuestra plataforma[cite: 156, 157].</p>
          <p>También nos basamos en el cumplimiento de obligaciones legales impuestas por las autoridades fiscales y de control de Ecuador, lo que justifica la retención de ciertos registros transaccionales[cite: 158].</p>
          <p>Para el envío de comunicaciones comerciales o novedades promocionales no críticas, solicitamos su consentimiento expreso, el cual es revocable en cualquier momento a través de su panel de usuario[cite: 159].</p>
        </LegalSection>

        <LegalSection index={5} id="conservacion" title="Conservación de Datos">
          <p>Conservaremos sus datos personales únicamente durante el tiempo estrictamente necesario para cumplir con la finalidad para la cual fueron recopilados, como la gestión de un sorteo activo[cite: 160].</p>
          <p>No obstante, cierta información transaccional y de identificación se mantendrá bloqueada por un periodo mínimo de 7 años, conforme a lo exigido por la normativa fiscal y contable de la República del Ecuador[cite: 161].</p>
          <p>Una vez transcurridos los plazos legales, procederemos a la eliminación definitiva o anonimización de su información de nuestros sistemas internos y de respaldo[cite: 162].</p>
        </LegalSection>

        <LegalSection index={6} id="terceros" title="Compartición con Terceros">
          <p>Sorteos La Fortuna garantiza que no vende, alquila ni cede sus datos personales a terceras empresas con fines comerciales o publicitarios ajenos a nuestra plataforma[cite: 163, 164].</p>
          <p>Su información solo podrá ser accedida por encargados del tratamiento bajo estrictos contratos de confidencialidad, como proveedores de hosting o servicios de mensajería (Servientrega) para la entrega de premios[cite: 165].</p>
          <p>Comunicaremos sus datos a autoridades judiciales o administrativas únicamente cuando exista un requerimiento legal expreso que nos obligue a ello según la legislación ecuatoriana[cite: 166].</p>
        </LegalSection>

        <LegalSection index={7} id="derechos" title="Derechos del Titular (ARCO+)">
          <p>Como titular de los datos, usted goza de los derechos de Acceso, Rectificación, Supresión, Oposición, Portabilidad y Limitación del tratamiento establecidos en la LOPDP[cite: 167, 168].</p>
          <p>Para ejercer estos derechos, debe enviar una solicitud escrita al correo <strong>privacidad@sorteoslafortuna.ec</strong> adjuntando una copia legible de su documento de identidad para validar su titularidad[cite: 169].</p>
          <p>Nuestro equipo legal y el DPO darán respuesta a su requerimiento en un plazo máximo de 15 días hábiles, informándole sobre las acciones tomadas respecto a su solicitud[cite: 170].</p>
        </LegalSection>

        <LegalSection index={8} id="seguridad" title="Medidas de Seguridad">
          <p>Implementamos protocolos de cifrado SSL (Secure Sockets Layer) y TLS en todas las comunicaciones entre su navegador y nuestros servidores para evitar interceptaciones[cite: 171, 172].</p>
          <p>El acceso a nuestras bases de datos está restringido exclusivamente a personal autorizado, quienes cuentan con controles de autenticación multifactor y registros de auditoría[cite: 173].</p>
          <p>Mantenemos acuerdos de confidencialidad vigentes con todos nuestros colaboradores y proveedores tecnológicos para asegurar que su información nunca sea expuesta a riesgos innecesarios[cite: 174].</p>
        </LegalSection>

        <LegalSection index={9} id="cookies" title="Política de Cookies">
          <p>Utilizamos cookies propias para mantener su sesión activa y cookies de análisis, específicamente de Google Analytics, para entender cómo interactúa con nuestro sitio[cite: 175, 176].</p>
          <p>Usted puede configurar o deshabilitar las cookies en cualquier momento a través de los ajustes de su navegador, aunque esto podría afectar ciertas funcionalidades de la plataforma[cite: 177].</p>
          <p>En su primer acceso, se le presentará un banner de gestión de preferencias donde podrá aceptar o rechazar el uso de cookies no esenciales de forma granular[cite: 178].</p>
        </LegalSection>

        <footer style={{ marginTop: "5rem", padding: "2rem", borderTop: "1px solid var(--border-mid)", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Historial de Versiones: v1.0 - Enero 2026. Sorteos La Fortuna · Guayaquil, Ecuador[cite: 30, 34, 182].
          </p>
        </footer>
      </main>
    </div>
  );
}