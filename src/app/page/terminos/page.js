"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function TerminosYCondiciones() {
  // Habilitar scroll suave para toda la página al montar este componente
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const secciones = [
    { id: "aceptacion", titulo: "1. Aceptación de los Términos" },
    { id: "requisitos", titulo: "2. Requisitos de Participación" },
    { id: "adquisicion", titulo: "3. Adquisición de Boletos" },
    { id: "realizacion", titulo: "4. Realización del Sorteo" },
    { id: "entrega", titulo: "5. Entrega de Premios" },
    { id: "ley-aplicable", titulo: "6. Ley Aplicable y Jurisdicción" },
  ];

  return (
    <main className="main-terms" style={{
      background: "var(--bg-sunken)",
      color: "var(--text-muted)",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div className="terms-layout">
        
        {/* ══════════ ÍNDICE (SIDEBAR) ══════════ */}
        <aside className="terms-sidebar">
          {/* Botón de regreso a Inicio */}
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
            Contenido
          </h3>
          
          <nav className="sidebar-nav">
            {secciones.map((seccion) => (
              <a 
                key={seccion.id} 
                href={`#${seccion.id}`}
                className="nav-link"
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
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

        {/* ══════════ CONTENIDO DE TÉRMINOS ══════════ */}
        <section className="terms-content" style={{
          background: "var(--nav-bg)",
          border: "1px solid var(--border-mid)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}>
          
          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              color: "var(--accent-gold)",
              marginBottom: "0.5rem",
              lineHeight: 1.2
            }}>
              Términos y Condiciones
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", lineHeight: "1.8", fontSize: "0.95rem" }}>
            
            <article id="aceptacion" className="term-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                1. Aceptación de los Términos
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                El acceso y uso de la plataforma Sorteos La Fortuna implica la aceptación plena, expresa e incondicional de los presentes Términos y Condiciones por parte del usuario. Al registrarse o participar en cualquier sorteo, usted declara haber leído y comprendido la totalidad de este documento jurídico y su vinculación legal.
              </p>
              <p>
                En caso de no estar de acuerdo con alguna de las disposiciones aquí establecidas, el usuario deberá abstenerse inmediatamente de utilizar los servicios de la plataforma. El uso continuado del sitio tras cualquier modificación constituye la aceptación de los nuevos términos.
              </p>
            </article>

            <article id="requisitos" className="term-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                2. Requisitos de Participación
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                Para participar en los sorteos, es requisito indispensable ser persona natural mayor de 18 años de edad al momento de la adquisición del boleto. Sorteos La Fortuna se reserva el derecho de solicitar la verificación de la mayoría de edad mediante documento de identidad oficial.
              </p>
              <p>
                El participante deberá poseer una cédula de identidad o pasaporte ecuatoriano válido y estar domiciliado dentro del territorio de la República del Ecuador. Queda prohibida la participación a personas inhabilitadas legalmente.
              </p>
            </article>

            <article id="adquisicion" className="term-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                3. Adquisición de Boletos
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                Cada boleto adquirido otorga el derecho de participación exclusivamente para un sorteo específico e individualizado, identificado por su nombre y fecha en la plataforma. La adquisición de un boleto no garantiza la obtención de un premio, sino el derecho a participar en el proceso de selección aleatoria.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                Rige una política estricta de no devolución de los importes pagados por los boletos, salvo en casos de cancelación total del sorteo por causas imputables directamente a la organización. Salvo que se indique lo contrario en la descripción del premio, existe un límite máximo de 10 boletos por persona para cada sorteo con el fin de garantizar la equidad en la participación.
              </p>
              <p>
                El proceso de reserva se completa únicamente tras la confirmación efectiva del pago a través de los canales autorizados. Una vez validado el pago (sea mediante transferencia o pasarela digital), el sistema emitirá un comprobante digital que acredita la titularidad de los números seleccionados.
              </p>
            </article>

            <article id="realizacion" className="term-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                4. Realización del Sorteo
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                Los sorteos se llevarán a cabo rigurosamente en la fecha, hora y lugar publicados previamente en la ficha técnica de cada premio dentro de la plataforma. Sorteos La Fortuna se reserva la facultad de realizar transmisiones en vivo del proceso a través de sus canales oficiales de redes sociales para garantizar la transparencia.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                El resultado del sorteo, obtenido mediante los mecanismos de selección aleatoria implementados, tendrá carácter de definitivo, inapelable e irrevocable. No se admitirán reclamaciones basadas en errores de interpretación de las mecánicas de juego una vez efectuado el sorteo.
              </p>
              <p>
                La plataforma utiliza algoritmos de generación de números aleatorios o sistemas físicos certificados que aseguran la neutralidad y la igualdad de oportunidades para todos los boletos pagados y confirmados.
              </p>
            </article>

            <article id="entrega" className="term-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                5. Entrega de Premios
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                Tras la finalización del sorteo, el ganador será notificado oficialmente por Sorteos La Fortuna en un plazo máximo de 48 horas a través del correo electrónico o número telefónico proporcionado en su registro. El ganador dispondrá de un plazo máximo de 30 días calendario para reclamar su premio.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                <strong>Logística de Entrega:</strong> Con el fin de asegurar la integridad del premio y la satisfacción del usuario, los premios serán entregados de manera presencial a través del servicio de Entrega de Servientrega en la dirección consignada por el ganador al momento de la validación. Este servicio especializado garantiza el seguimiento y la seguridad del artículo durante el tránsito.
              </p>
              <p>
                Es condición obligatoria la presentación del documento de identidad original para la verificación de los datos antes de la entrega física del premio. Los premios son estrictamente personales, no transferibles a terceros y bajo ninguna circunstancia podrán ser canjeados por su valor en dinero en efectivo u otros bienes.
              </p>
            </article>

            <article id="ley-aplicable" className="term-article">
              <h2 style={{ color: "var(--accent-gold)", fontSize: "clamp(1.1rem, 3vw, 1.3rem)", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
                6. Ley Aplicable y Jurisdicción
              </h2>
              <p style={{ marginBottom: "1rem" }}>
                Para todos los efectos legales derivados del uso de esta plataforma, las partes se someten expresamente a las leyes vigentes de la República del Ecuador.
              </p>
              <p>
                Cualquier controversia técnica o jurídica será resuelta ante los jueces y tribunales competentes de la ciudad de Guayaquil, provincia del Guayas, renunciando los participantes a cualquier otro fuero o jurisdicción.
              </p>
            </article>

          </div>
        </section>
      </div>

      <style>{`
        /* --- ESTILOS BASE (MÓVIL PRIMERO) --- */
        .main-terms {
          min-height: 100vh;
          padding: 100px 1.5rem 3rem; /* Menos padding en móvil */
        }

        .terms-layout {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column; /* Apila los elementos en celular */
          gap: 2rem;
          position: relative;
        }

        .terms-sidebar {
          width: 100%;
          /* En móvil no queremos que sea sticky para que no tape la lectura */
          position: relative; 
          top: 0;
        }

        .sidebar-title {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        /* En móvil, el índice se vuelve un carrusel horizontal para ahorrar espacio */
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
          white-space: nowrap; /* Evita que el texto del enlace salte de línea */
          background: var(--bg-surface);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid var(--border-subtle);
        }

        .terms-content {
          padding: 1.5rem; /* Menos padding interno en móvil */
          border-radius: 12px;
        }

        /* Ajuste para que al hacer clic en el índice, el título no quede escondido detrás del header */
        .term-article {
          scroll-margin-top: 100px; 
        }

        /* --- MEDIA QUERIES (TABLET Y PC) --- */
        @media (min-width: 768px) {
          .main-terms {
            padding: 120px 5% 4rem;
          }

          .terms-layout {
            flex-direction: row; /* Diseño original lado a lado */
            gap: 4rem;
          }

          .terms-sidebar {
            flex: 1 1 250px;
            max-width: 300px;
            position: sticky; /* Vuelve a ser fijo al hacer scroll */
            top: 120px; 
            height: fit-content;
          }

          .sidebar-title {
            font-size: 1.2rem;
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

          .terms-content {
            flex: 3 1 600px;
            padding: 3rem; /* Padding amplio original */
          }

          .term-article {
            scroll-margin-top: 120px;
          }
        }
      `}</style>
    </main>
  );
}