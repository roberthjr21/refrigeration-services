import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Montserrat } from "next/font/google"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "GP Seguros en Refrigeración - Mantenimiento Industrial",
  description:
    "Especialistas en mantenimiento y reparación de equipos de refrigeración industrial. Calidad y confiabilidad a tu alcance.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${openSans.variable} ${montserrat.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
