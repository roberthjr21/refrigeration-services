"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "GalerÃ­a", href: "#galeria" },
    { name: "Contacto", href: "#contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2" role="img" aria-label={siteConfig.companyName}>
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">GP</span>
            </div>
            <div className="text-primary-foreground">
            <div className="font-bold text-lg">GP Seguros</div>
              <div className="text-xs opacity-90">RefrigeraciÃ³n</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-primary-foreground hover:text-accent transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-primary-foreground text-sm">
              <Phone className="inline w-4 h-4 mr-1" />
              <a href={`tel:${siteConfig.contact.phones[0].tel}`}>{siteConfig.contact.phones[0].display}</a>
            </div>
            <Button asChild variant="secondary" size="sm">
              <a href="#contacto">
              Cotizar
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menÃº" : "Abrir menÃº"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-navigation" className={`md:hidden py-4 border-t border-border ${isMenuOpen ? "" : "hidden"}`}>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground hover:text-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="text-primary-foreground text-sm mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  <a href={`tel:${siteConfig.contact.phones[0].tel}`}>{siteConfig.contact.phones[0].display}</a>
                </div>
                <Button asChild variant="secondary" size="sm" className="w-full">
                  <a href="#contacto" onClick={() => setIsMenuOpen(false)}>
                  Cotizar
                  </a>
                </Button>
              </div>
            </nav>
        </div>
      </div>
    </header>
  )
}
