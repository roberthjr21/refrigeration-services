import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { siteConfig } from "@/lib/site-config"
import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"], display: "swap", variable: "--font-open-sans" })
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--font-montserrat", weight: ["600", "900"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "GP Seguros en Refrigeración | Mantenimiento Industrial",
  description: "Especialistas en mantenimiento y reparación de equipos de refrigeración industrial en Colombia.",
  openGraph: {
    title: "GP Seguros en Refrigeración | Mantenimiento Industrial",
    description: "Especialistas en mantenimiento y reparación de equipos de refrigeración industrial en Colombia.",
    locale: "es_CO",
    type: "website",
    siteName: siteConfig.companyName,
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", title: "GP Seguros en Refrigeración | Mantenimiento Industrial", description: "Especialistas en mantenimiento y reparación de equipos de refrigeración industrial en Colombia." },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${openSans.variable} ${montserrat.variable} antialiased`}>
      <body>{children}{process.env.VERCEL === "1" && <Analytics />}</body>
    </html>
  )
}
