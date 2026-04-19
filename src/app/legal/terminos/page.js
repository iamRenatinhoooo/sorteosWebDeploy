import LegalSection from "@/app/components/legal/LegalSection";
import LegalTableOfContents from "@/app/components/legal/LegalTableOfContents";

export const metadata = {
  title: "Términos y Condiciones — Sorteos La Fortuna",
  description: "Marco legal y condiciones de participación para los sorteos de SorteosVIP en Ecuador.",
};

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
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "4rem" }}>
      <aside className="hidden md:block">
        <LegalTableOfContents items={sections} />
      </aside>

      <main>
        <header style={{ marginBottom: "4rem" }}>
          <h1 style={{ fontFamily: "var(--font-brand)", fontSize: "3rem", color: "var(--accent-gold)" }}>
            Términos y Condiciones
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: "1rem" }}>
            Última actualización: 01 de enero de 2026 [cite: 863]
          </p>
        </header>

        <LegalSection index={1} id="aceptacion" title="Aceptación de los Términos">
          <p>El acceso y uso de la plataforma Sorteos La Fortuna implica la aceptación plena, expresa e incondicional de los presentes Términos y Condiciones por parte del usuario. Al registrarse o participar en cualquier sorteo, usted declara haber leído y comprendido la totalidad de este documento jurídico[cite: 865, 866].</p>
          <p>En caso de no estar de acuerdo con alguna de las disposiciones aquí establecidas, el usuario deberá abstenerse inmediatamente de utilizar los servicios de la plataforma. El uso continuado del sitio tras cualquier modificación constituye la aceptación de los nuevos términos[cite: 867].</p>
          <p>La participación en nuestras rifas y sorteos genera una vinculación jurídica contractual entre Sorteos La Fortuna y el participante, regida por el Código de Comercio de la República del Ecuador y las normativas civiles vigentes[cite: 868, 898].</p>
        </LegalSection>

        <LegalSection index={2} id="requisitos" title="Requisitos de Participación">
          <p>Para participar en los sorteos, es requisito indispensable ser persona natural mayor de 18 años de edad al momento de la adquisición del boleto. SorteosVIP se reserva el derecho de solicitar la verificación de la mayoría de edad mediante documento de identidad oficial[cite: 870, 888].</p>
          <p>El participante deberá poseer una cédula de identidad o pasaporte ecuatoriano válido y estar domiciliado dentro del territorio de la República del Ecuador. No podrán participar personas jurídicas ni representantes legales de empresas competidoras directas[cite: 871, 872].</p>
          <p>Queda expresamente prohibida la participación de personas inhabilitadas legalmente por sentencia judicial o que se encuentren en interdicción, así como empleados directos de SorteosVIP y sus familiares hasta el segundo grado de consanguinidad[cite: 873].</p>
        </LegalSection>

        {/* Secciones adicionales 3, 4, 5 y 6 siguiendo el mismo patrón... */}

        <LegalSection index={6} id="jurisdiccion" title="Ley Aplicable y Jurisdicción">
          <p>Para todos los efectos legales derivados del uso de esta plataforma, las partes se someten a las leyes vigentes de la República del Ecuador[cite: 898].</p>
          <p>Cualquier controversia será resuelta ante los jueces y tribunales competentes de la ciudad de Guayaquil, provincia del Guayas. Los participantes renuncian expresamente a cualquier otro fuero o jurisdicción que pudiera corresponderles por razón de su domicilio presente o futuro[cite: 899, 900].</p>
        </LegalSection>

        <footer style={{ marginTop: "5rem", padding: "2rem", borderTop: "1px solid var(--border-mid)", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: "var(--accent-gold)", fontWeight: "bold" }}>
            CONFORME A LA NORMATIVA DE PROTECCIÓN DE DATOS Y COMERCIO ELECTRÓNICO DE ECUADOR [cite: 811, 815]
          </p>
        </footer>
      </main>
    </div>
  );
}