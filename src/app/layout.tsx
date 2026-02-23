import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

import FloatingContact from "@/components/ui/FloatingContact";

export const metadata: Metadata = {
  title: "MediaRooms | Reservas Directas",
  description: "Llena tu hotel con reservas directas. Te ayudamos a conseguir más clientes sin depender de terceros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <head>
        <style>
          {`
            @font-face {
              font-family: 'Gebuk';
              src: url('/fonts/Gebuk-Regular.otf') format('opentype'), local('Gebuk Regular'), local('Gebuk-Regular');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `}
        </style>
      </head>
      <body className="antialiased">
        <Header />
        <FloatingContact />
        {children}
      </body>
    </html>
  );
}
