"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PoliticaPrivacidad() {
  // Scroll suave para la navegación interna
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const secciones = [
    { id: "resumen", titulo: "Resumen de Derechos (ARCO+)" },
    { id: "responsable", titulo: "1. Responsable del Tratamiento" },
    { id: "datos", titulo: "2. Datos que Recopilamos" },
    { id: "finalidad", titulo: "3. Finalidad del Tratamiento" },
    { id: "base", titulo: "4. Base Legitimadora" },
    { id: "conservacion", titulo: "5. Conservación de Datos" },
    { id: "terceros", titulo: "6. Compartición con Terceros" },
    { id: "derechos", titulo: "7. Derechos del Titular" },
    { id: "seguridad", titulo: "8. Medidas de Seguridad" },
    { id: "cookies", titulo: "9. Política de Cookies" },
  ];

  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--bg-sunken)",
      padding: "120px 5% 4rem",
      color: "var(--text-muted)",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: "4rem",
        position: "relative"
      }}>
        
        {/* ══════════ ÍNDICE (SIDEBAR) ══════════ */}
        <aside style={{
          flex: "1 1 250px",
          maxWidth: "300px",
          position: "sticky",
          top: "120px",
          height: "fit-content",
        }}>
          <Link href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--accent-gold)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "2rem",
            transition: "opacity 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            <span>←</span> Volver al Inicio
          </Link>

          <h3 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "1.1rem",
            color: "var(--accent-gold)",
            marginBottom: "1.5rem",
            borderBottom: "1px solid var(--border-mid)",
            paddingBottom: "0.5rem"
          }}>
            Privacidad LOPDP
          </h3>
          
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {secciones.map((seccion) => (
              <a 
                key={seccion.id} 
                href={`#${seccion.id}`}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
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
        <section style={{
          flex: "3 1 600px",
          background: "var(--nav-bg)",
          padding: "3rem",
          borderRadius: "12px",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          
          <div style={{ marginBottom: "3rem" }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "2.2rem",
              color: "var(--accent-gold)",
              marginBottom: "0.5rem"
            }}>
              Política de Privacidad
            </h1>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, color: "var(--accent-ruby)", fontWeight: 700, letterSpacing: "1px" }}>
              COMPLIANCE LOPDP ECUADOR
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", lineHeight: "1.8" }}>
            
            {/* Tabla de Derechos */}
            <article id="resumen" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1.5rem", fontFamily: "'Cinzel', serif" }}>
                Tabla Resumen de Derechos (ARCO+)
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", border: "1px solid var(--border-mid)" }}>
                  <thead>
                    <tr style={{ background: "var(--bg-sunken)", color: "var(--accent-gold)" }}>
                      <th style={{ padding: "12px", border: "1px solid var(--border-mid)", textAlign: "left" }}>Derecho</th>
                      <th style={{ padding: "12px", border: "1px solid var(--border-mid)", textAlign: "left" }}>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "12px", border: "1px solid var(--border-mid)", fontWeight: 600 }}>Acceso</td>
                      <td style={{ padding: "12px", border: "1px solid var(--border-mid)" }}>Conocer qué datos tratamos y para qué.</td>
                    </tr>
                    <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                      <td style={{ padding: "12px", border: "1px solid var(--border-mid)", fontWeight: 600 }}>Rectificación</td>
                      <td style={{ padding: "12px", border: "1px solid var(--border-mid)" }}>Actualizar o corregir información inexacta.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px", border: "1px solid var(--border-mid)", fontWeight: 600 }}>Eliminación</td>
                      <td style={{ padding: "12px", border: "1px solid var(--border-mid)" }}>Solicitar el borrado de sus datos personales.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            <article id="responsable" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                1. Responsable del Tratamiento
              </h2>
              <p>
                Sorteos La Fortuna, con domicilio legal en la ciudad de Guayaquil, actúa como Responsable del Tratamiento de sus datos personales conforme a la LOPDP.
              </p>
              <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--bg-sunken)", borderRadius: "8px", borderLeft: "4px solid var(--accent-ruby)" }}>
                <p style={{ fontSize: "0.9rem" }}><strong>Contacto DPO:</strong> dpo@sorteoslafortuna.ec | +593 9 6326-7270</p>
              </div>
            </article>

            <article id="datos" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                2. Datos que Recopilamos
              </h2>
              <ul style={{ paddingLeft: "1.2rem" }}>
                <li>Identificativos: Nombre completo y número de cédula/pasaporte.</li>
                <li>Contacto: Correo electrónico y teléfono móvil.</li>
                <li>Transaccionales: Referencias de transferencias y confirmaciones de pago.</li>
                <li>Técnicos: Dirección IP y cookies de navegación.</li>
              </ul>
              <p style={{ fontSize: "0.85rem", marginTop: "1rem", fontStyle: "italic" }}>
                * No almacenamos datos de tarjetas de crédito; el procesamiento es externo y seguro.
              </p>
            </article>

            <article id="finalidad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                3. Finalidad del Tratamiento
              </h2>
              <p>
                La finalidad principal es gestionar su participación activa en los sorteos y verificar el cumplimiento de los requisitos legales (mayoría de edad y residencia). También utilizamos su información para la emisión de comprobantes fiscales y notificaciones críticas de seguridad.
              </p>
            </article>

            <article id="terceros" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                6. Compartición con Terceros
              </h2>
              <p>
                No vendemos ni cedemos sus datos a terceros con fines comerciales. Su información solo es compartida con encargados del tratamiento esenciales, como proveedores de hosting o <strong>Servientrega</strong> para la logística de entrega de premios.
              </p>
            </article>

            <article id="seguridad" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                8. Medidas de Seguridad
              </h2>
              <p>
                Implementamos protocolos de cifrado <strong>SSL/TLS</strong> en todas nuestras comunicaciones. El acceso a las bases de datos está restringido bajo autenticación multifactor y registros de auditoría constantes para prevenir riesgos.
              </p>
            </article>

            <article id="cookies" style={{ scrollMarginTop: "120px" }}>
              <h2 style={{ color: "var(--accent-gold)", fontSize: "1.3rem", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                9. Política de Cookies
              </h2>
              <p>
                Utilizamos cookies técnicas para mantener la sesión. Puede configurar sus preferencias a través del banner de gestión de cookies en su primer acceso.
              </p>
            </article>

          </div>

          {/* Pie de la página legal */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-mid)", fontSize: "0.8rem", opacity: 0.6 }}>
            <p>Versión: v1.0 | Fecha: Enero 2026 | Sorteos La Fortuna - Guayaquil, Ecuador</p>
          </div>
        </section>
      </div>
    </main>
  );
}