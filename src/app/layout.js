import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/header'; // Asegúrate que la ruta sea correcta
import Footer from './components/footer'; // Asegúrate que la ruta sea correcta

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SorteosLaFortuna — Casino & Sorteos Premium",
  description: "Participa en nuestros sorteos premium y gana premios increíbles. La mejor plataforma de rifas en línea.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      data-theme="night"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col">
        
        {/* El Header aparecerá en todas las páginas */}
        <Header />

        {/* El contenido de cada página (page.js) se renderiza aquí */}
        <main className="flex-grow">
          {children}
        </main>

        {/* El Footer aparecerá al final de todas las páginas */}
        <Footer />
        
      </body>
    </html>
  );
}