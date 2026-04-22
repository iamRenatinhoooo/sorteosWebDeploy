"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function TratamientoDatosPersonales() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const secciones = [
    { id: "marco", titulo: "1. Marco Normativo" },
    { id: "responsable", titulo: "2. Responsable y DPO" },
    { id: "titulares", titulo: "3. Categorías de Titulares" },
    { id: "datos", titulo: "4. Categorías de Datos" },
    { id: "principios", titulo: "5. Principios Rectores" },
    { id: "bases", titulo: "6. Bases de Legitimación" },
    { id: "derechos", titulo: "7. Derechos del Titular" },
    { id: "ejercicio", titulo: "8. Ejercicio de Derechos" },
    { id: "transferencias", titulo: "9. Transferencias Internacionales" },
    { id: "seguridad", titulo: "10. Medidas de Seguridad" },
    { id: "vigencia", titulo: "11. Vigencia y Actualización" },
    { id: "glosario", titulo: "Glosario Técnico" },
  ];

  return (
    <main className="main-data-policy" style={{
      background: "var(--bg-sunken)",
      color: "var(--text-muted)",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div className="policy-layout">
        
        {/* ══════════ ÍNDICE (SIDEBAR) ══════════ */}
        <aside className="policy-sidebar">
          <Link href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--accent-gold)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "1.5rem",
            transition: "opacity 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            <span>←</span> Volver al Inicio
          </Link>

          <h3 className="sidebar-title" style={{
            fontFamily: "'Cinzel', serif",
            color: "var(--accent-gold)",
            borderBottom: "1px solid var(--border-mid)",
            paddingBottom: "0.5rem"
          }}>
            Documento Técnico
          </h3>
          
          <nav className="sidebar-nav">
            {secciones.map((seccion) => (
              <a 
                key={seccion.id} 
                href={`#${seccion.id}`}
                className="nav-link"
                style={{
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-ruby)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                {seccion.titulo}
              </a>
            ))}
          </nav>
        </aside>

        {/* ══════════ CONTENIDO ══════════ */}
        <section className="policy-content" style={{
          background: "var(--nav-bg)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          
          <div style={{ marginBottom: "3rem" }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              color: "var(--accent-gold)",
              marginBottom: "0.5rem",
              lineHeight: 1.2
            }}>
              Política de Tratamiento de Datos Personales
            </h1>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.75rem", background: "var(--chip-bg)", padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>
                DOCUMENTO TÉCNICO JURÍDICO
              </span>
              <span style={{ fontSize: "0.85rem", opacity: 0.7, whiteSpace: "nowrap" }}>Versión: 1.0 | Enero 2026</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", lineHeight: "1.8", fontSize: "0.95rem" }}>
            
            <article id="marco" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                1. Marco Normativo
              </h2>
              <p>
                La presente política se fundamenta en la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong>, publicada en el Registro Oficial Suplemento N.° 459 el 26 de mayo de 2021, y su Reglamento General.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Asimismo, se integra conforme a las directrices emitidas por la Autoridad de Protección de Datos Personales del Ecuador (ADPE) y normativas complementarias como la Ley Orgánica de Transparencia y Acceso a la Información Pública (LOTTAIP) y el Código de Comercio.
              </p>
            </article>

            <article id="responsable" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                2. Responsable y Delegado de Protección de Datos (DPO)
              </h2>
              <p>
                Sorteos La Fortuna, con domicilio en Guayaquil, Ecuador, asume la responsabilidad del tratamiento de sus datos personales. Para garantizar el cumplimiento normativo, se ha designado un Delegado de Protección de Datos (DPO).
              </p>
              <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--bg-sunken)", borderRadius: "8px", borderLeft: "4px solid var(--accent-gold)" }}>
                <p style={{ margin: 0 }}>Puede contactar con el DPO para consultas técnicas o reclamos al correo <strong>dpo@sorteoslafortuna.ec</strong> o al teléfono <strong>+593 9 6326-7270</strong>.</p>
              </div>
            </article>

            <article id="titulares" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                3. Categorías de Titulares
              </h2>
              <p>Esta política aplica a los siguientes grupos:</p>
              <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Usuarios registrados en la plataforma.</li>
                <li>Compradores de boletos para sorteos.</li>
                <li>Personas que interactúan mediante canales oficiales (WhatsApp, redes sociales).</li>
                <li>Visitantes del sitio web que generen datos de navegación.</li>
              </ul>
            </article>

            <article id="datos" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                4. Categorías de Datos Tratados
              </h2>
              <h3 style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 600, marginTop: "1rem" }}>A. Datos Ordinarios:</h3>
              <p>Incluyen información de identificación (nombres, cédula), datos de contacto (correo, teléfono) y datos transaccionales de pago.</p>

              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(220, 38, 38, 0.05)", borderRadius: "8px", border: "1px solid rgba(220, 38, 38, 0.2)" }}>
                <strong style={{ color: "var(--accent-ruby)" }}>Declaración Oficial:</strong>
                <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>Sorteos La Fortuna <strong>NO</strong> trata categorías especiales de datos como salud, biometría, origen étnico o filiación política.</p>
              </div>
            </article>

            <article id="principios" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                5. Principios Rectores (Art. 10 LOPDP)
              </h2>
              <p>Nos regimos por los siguientes principios:</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                  <li>Licitud, lealtad y transparencia</li>
                  <li>Limitación de la finalidad</li>
                  <li>Minimización de datos</li>
                </ul>
                <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                  <li>Exactitud</li>
                  <li>Limitación del plazo de conservación</li>
                  <li>Integridad y confidencialidad</li>
                </ul>
              </div>
              <p style={{ marginTop: "1rem" }}>
                Aplicamos además el principio de responsabilidad proactiva, mediante medidas técnicas y organizativas para asegurar el tratamiento adecuado de su información.
              </p>
            </article>

            <article id="bases" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                6. Bases de Legitimación
              </h2>
              <p>El tratamiento de datos se fundamenta en:</p>
              <ol style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", listStyleType: "lower-alpha" }}>
                <li>El consentimiento libre, específico e informado del titular (Art. 15 LOPDP).</li>
                <li>La ejecución del contrato de participación en sorteos.</li>
                <li>El cumplimiento de obligaciones legales.</li>
                <li>El interés legítimo de la empresa, siempre que no prevalezcan los derechos del titular.</li>
              </ol>
            </article>

            <article id="derechos" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                7. Derechos del Titular (ARCO+)
              </h2>
              <p>Usted dispone de los siguientes derechos:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                {["Acceso", "Rectificación", "Cancelación / Supresión", "Oposición", "Portabilidad", "Limitación del tratamiento"].map((derecho) => (
                  <span key={derecho} style={{ background: "var(--chip-bg)", border: "1px solid var(--border-subtle)", padding: "0.4rem 0.8rem", borderRadius: "20px", fontSize: "0.85rem" }}>
                    {derecho}
                  </span>
                ))}
              </div>
              <p style={{ marginTop: "1.5rem" }}>
                Adicionalmente, tiene el derecho a no ser objeto de decisiones automatizadas que produzcan efectos jurídicos en su contra.
              </p>
            </article>

            <article id="ejercicio" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                8. Ejercicio de Derechos
              </h2>
              <p>
                Para ejercer sus derechos, debe enviar una solicitud al correo <strong>dpo@sorteoslafortuna.ec</strong> con el asunto: <br/>
                <span style={{ display: "inline-block", background: "var(--bg-sunken)", padding: "0.3rem 0.6rem", borderRadius: "4px", marginTop: "0.5rem", border: "1px solid var(--border-mid)" }}>
                  "Ejercicio de Derechos LOPDP"
                </span>
              </p>
              <p style={{ marginTop: "1rem" }}>
                Debe adjuntar una copia de su documento de identidad. Sorteos La Fortuna responderá en un plazo máximo de 15 días hábiles.
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                Asimismo, usted puede presentar una reclamación ante la ADPE si considera que sus derechos han sido vulnerados.
              </p>
            </article>

            <article id="transferencias" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                9. Transferencias Internacionales
              </h2>
              <p>
                Sus datos pueden ser almacenados en servidores de proveedores de hosting situados fuera del Ecuador (Art. 54 LOPDP). En todos los casos, se garantizan niveles adecuados de protección mediante cláusulas contractuales tipo.
              </p>
            </article>

            <article id="seguridad" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                10. Medidas de Seguridad Implementadas
              </h2>
              <p>Aplicamos las siguientes medidas técnicas y organizativas:</p>
              <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <li>Cifrado en tránsito mediante <strong>TLS 1.3</strong></li>
                <li>Cifrado en reposo con estándar <strong>AES-256</strong></li>
                <li>Autenticación multifactor (MFA) para accesos internos</li>
                <li>Auditorías de seguridad anuales</li>
                <li>Plan de respuesta ante incidentes</li>
              </ul>
              <p style={{ marginTop: "1rem" }}>
                En caso de incidentes de seguridad, se notificará a la ADPE en un plazo máximo de 72 horas, cuando sea requerido.
              </p>
            </article>

            <article id="vigencia" className="policy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                11. Vigencia y Actualización
              </h2>
              <p>
                La presente política entra en vigor el 01 de enero de 2026. Cualquier modificación será notificada con al menos 10 días de anticipación, mediante correo electrónico o avisos dentro de la plataforma.
              </p>
            </article>

            {/* GLOSARIO TÉCNICO */}
            <article id="glosario" className="policy-article" style={{ marginTop: "2rem" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1.5rem", fontFamily: "'Cinzel', serif", borderBottom: "1px solid var(--border-mid)", paddingBottom: "0.5rem" }}>
                Glosario Técnico
              </h2>
              <div style={{ background: "var(--bg-sunken)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border-mid)", fontFamily: "monospace", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div><strong style={{ color: "var(--accent-ruby)" }}>LOPDP:</strong> Ley Orgánica de Protección de Datos Personales del Ecuador.</div>
                <div><strong style={{ color: "var(--accent-ruby)" }}>ADPE:</strong> Autoridad de Protección de Datos Personales del Ecuador.</div>
                <div><strong style={{ color: "var(--accent-ruby)" }}>DPO:</strong> Data Protection Officer o Delegado de Protección de Datos.</div>
                <div><strong style={{ color: "var(--accent-ruby)" }}>ARCO+:</strong> Derechos de Acceso, Rectificación, Cancelación y Oposición.</div>
                <div><strong style={{ color: "var(--accent-ruby)" }}>TLS 1.3:</strong> Protocolo de seguridad para comunicaciones cifradas en red.</div>
                <div><strong style={{ color: "var(--accent-ruby)" }}>AES-256:</strong> Algoritmo de cifrado avanzado de 256 bits para protección de datos en reposo.</div>
              </div>
            </article>

          </div>
        </section>
      </div>

      <style>{`
        /* --- ESTILOS BASE (MÓVIL PRIMERO) --- */
        .main-data-policy {
          min-height: 100vh;
          padding: 100px 1.5rem 3rem; /* Menos padding en móvil */
        }

        .policy-layout {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column; /* Apila los elementos en celular */
          gap: 2rem;
          position: relative;
        }

        .policy-sidebar {
          width: 100%;
          position: relative; 
          top: 0;
        }

        .sidebar-title {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        /* En móvil, el índice se vuelve un carrusel horizontal */
        .sidebar-nav {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin; /* Firefox */
        }

        .sidebar-nav::-webkit-scrollbar {
          height: 4px;
        }
        
        .sidebar-nav::-webkit-scrollbar-thumb {
          background: var(--border-mid);
          border-radius: 4px;
        }

        .nav-link {
          white-space: nowrap; /* Evita saltos de línea en el enlace */
          background: var(--bg-surface);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.85rem;
        }

        .policy-content {
          padding: 1.5rem; /* Menos padding interno en celular */
          border-radius: 12px;
          overflow: hidden; 
        }

        /* Ajuste para que el scroll respete el header superior */
        .policy-article {
          scroll-margin-top: 100px; 
        }

        /* --- MEDIA QUERIES (TABLET Y PC) --- */
        @media (min-width: 768px) {
          .main-data-policy {
            padding: 120px 5% 4rem;
          }

          .policy-layout {
            flex-direction: row; /* Diseño original lado a lado */
            gap: 4rem;
          }

          .policy-sidebar {
            flex: 1 1 250px;
            max-width: 300px;
            position: sticky; /* Vuelve a ser fijo al hacer scroll */
            top: 120px; 
            height: fit-content;
          }

          .sidebar-title {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
          }

          /* El índice vuelve a ser una lista vertical */
          .sidebar-nav {
            flex-direction: column;
            overflow-x: visible;
            gap: 0.8rem;
          }

          .nav-link {
            white-space: normal;
            background: transparent;
            padding: 0;
            border: none;
            border-radius: 0;
          }

          .policy-content {
            flex: 3 1 600px;
            padding: 3rem; /* Padding amplio original */
          }

          .policy-article {
            scroll-margin-top: 120px;
          }
        }
      `}</style>
    </main>
  );
}