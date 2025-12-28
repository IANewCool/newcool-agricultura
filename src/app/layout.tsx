import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agricultura Chile - INDAP | NewCooltura Informada",
  description: "Oficinas INDAP, programas de apoyo agricola, calculadora de rentabilidad y recursos para agricultores chilenos",
  keywords: ["INDAP", "agricultura Chile", "PRODESAL", "creditos agricolas", "riego", "pequenos agricultores"],
  openGraph: {
    title: "Agricultura Chile - NewCooltura Informada",
    description: "Programas INDAP, creditos y recursos para agricultores",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
