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
    <main className="main-privacy" style={{
      background: "var(--bg-sunken)",
      color: "var(--text-muted)",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div className="privacy-layout">
        
        {/* ══════════ ÍNDICE (SIDEBAR) ══════════ */}
        <aside className="privacy-sidebar">
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
            Privacidad LOPDP
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
        <section className="privacy-content" style={{
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
              Política de Privacidad
            </h1>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, color: "var(--accent-ruby)", fontWeight: 700, letterSpacing: "1px" }}>
              COMPLIANCE LOPDP ECUADOR
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", lineHeight: "1.8", fontSize: "0.95rem" }}>
            
            {/* Tabla de Derechos */}
            <article id="resumen" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1.5rem", fontFamily: "'Cinzel', serif" }}>
                Tabla Resumen de Derechos (ARCO+)
              </h2>
              <div style={{ overflowX: "auto", borderRadius: "8px" }}>
                <table style={{ width: "100%", minWidth: "500px", borderCollapse: "collapse", fontSize: "0.9rem", border: "1px solid var(--border-mid)" }}>
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

            <article id="responsable" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                1. Responsable del Tratamiento
              </h2>
              <p>
                Sorteos La Fortuna, con domicilio legal en la ciudad de Guayaquil, actúa como Responsable del Tratamiento de sus datos personales conforme a la LOPDP.
              </p>
              <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--bg-sunken)", borderRadius: "8px", borderLeft: "4px solid var(--accent-ruby)" }}>
                <p style={{ fontSize: "0.9rem", margin: 0 }}><strong>Contacto DPO:</strong> dpo@sorteoslafortuna.ec | +593 9 6326-7270</p>
              </div>
            </article>

            <article id="datos" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                2. Datos que Recopilamos
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                La plataforma recopila únicamente los datos necesarios para el funcionamiento de los sorteos y la correcta gestión de los usuarios. Entre ellos se incluyen:
              </p>
              <ul style={{ marginBottom: "0.5rem", listStyleType: "disc", paddingLeft: "20px" }}>
                <li>Datos de identificación básica: País, provincia, ciudad y fecha de nacimiento.</li>
                <li>Datos de contacto: Correo electrónico y número de teléfono móvil.</li>
                <li>Datos transaccionales: Información relacionada con pagos realizados, como referencias de transferencias o confirmaciones de pago.</li>
              </ul>
              <p>
                La plataforma no solicita ni almacena datos sensibles como números de cédula, pasaporte o información bancaria confidencial. Los pagos son procesados a través de medios externos autorizados, por lo que Sorteos La Fortuna no tiene acceso directo a datos financieros como números de tarjetas de crédito o débito.
              </p>
            </article>

            <article id="finalidad" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                3. Finalidad del Tratamiento
              </h2>
              <p>
                Los datos personales recopilados son utilizados con las siguientes finalidades:
              </p>
              <ul style={{ marginBottom: "0.5rem", listStyleType: "disc", paddingLeft: "20px" }}>
                <li>Gestionar la participación del usuario en los sorteos, incluyendo la asignación de números y el registro de su participación.  </li>
                <li>Verificar el cumplimiento de los requisitos establecidos en la plataforma, como la mayoría de edad. </li>
                <li> Contactar al usuario en relación con los sorteos, incluyendo notificaciones de resultados o comunicación con ganadores.</li>
              </ul>
              <p>
                En ningún caso los datos personales serán utilizados para fines distintos a los aquí establecidos.
              </p>
            </article>

            <article id="terceros" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                6. Compartición con Terceros
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                Sorteos La Fortuna no vende, alquila ni cede los datos personales de los usuarios a terceros con fines comerciales. La información podrá ser compartida únicamente con proveedores de servicios necesarios para el funcionamiento de la plataforma, quienes actuarán como encargados del tratamiento de datos y estarán obligados a garantizar la confidencialidad y seguridad de la información.
              </p>
              <p>
                En ningún caso se realizará una cesión de datos distinta a las aquí descritas sin el consentimiento previo del usuario, salvo obligación legal.
              </p>
            </article>

            <article id="seguridad" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                8. Medidas de Seguridad
              </h2>
              <p>
                Implementamos protocolos de cifrado <strong>SSL/TLS</strong> en todas nuestras comunicaciones. El acceso a las bases de datos está restringido bajo autenticación multifactor y registros de auditoría constantes para prevenir riesgos.
              </p>
            </article>

            <article id="cookies" className="privacy-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                9. Política de Cookies
              </h2>
              <p>
                Utilizamos cookies técnicas para mantener la sesión. Puede configurar sus preferencias a través del banner de gestión de cookies en su primer acceso.
              </p>
            </article>

          </div>

          {/* Pie de la página legal */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border-mid)", fontSize: "0.8rem", opacity: 0.6 }}>
            <p style={{ margin: 0 }}>Versión: v1.0 | Fecha: Enero 2026 | Sorteos La Fortuna - Guayaquil, Ecuador</p>
          </div>
        </section>
      </div>

      <style>{`
        /* --- ESTILOS BASE (MÓVIL PRIMERO) --- */
        .main-privacy {
          min-height: 100vh;
          padding: 100px 1.5rem 3rem; /* Menos padding en móvil */
        }

        .privacy-layout {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column; /* Apila los elementos en celular */
          gap: 2rem;
          position: relative;
        }

        .privacy-sidebar {
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

        .privacy-content {
          padding: 1.5rem; /* Menos padding interno en celular */
          border-radius: 12px;
          overflow: hidden; /* Evita que la tabla rompa el diseño si es muy grande */
        }

        /* Ajuste para que el scroll respete el header superior */
        .privacy-article {
          scroll-margin-top: 100px; 
        }

        /* --- MEDIA QUERIES (TABLET Y PC) --- */
        @media (min-width: 768px) {
          .main-privacy {
            padding: 120px 5% 4rem;
          }

          .privacy-layout {
            flex-direction: row; /* Diseño original lado a lado */
            gap: 4rem;
          }

          .privacy-sidebar {
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

          .privacy-content {
            flex: 3 1 600px;
            padding: 3rem; /* Padding amplio original */
          }

          .privacy-article {
            scroll-margin-top: 120px;
          }
        }
      `}</style>
    </main>
  );
}