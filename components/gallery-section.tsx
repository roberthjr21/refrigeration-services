"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const galleryItems = [
    {
      image: "/placeholder-0a56a.png",
      title: "Mantenimiento de Compresores",
      category: "Mantenimiento",
    },
    {
      image: "/placeholder-4xaaf.png",
      title: "Instalación de Sistemas",
      category: "Instalación",
    },
    {
      image: "/industrial-cooling-tower-repair.png",
      title: "Reparación de Torres",
      category: "Reparación",
    },
    {
      image: "/refrigeration-control-panel-upgrade.png",
      title: "Modernización de Controles",
      category: "Modernización",
    },
    {
      image: "/industrial-freezer-maintenance.png",
      title: "Mantenimiento de Cámaras",
      category: "Mantenimiento",
    },
    {
      image: "/refrigeration-pipe-welding.png",
      title: "Soldadura Especializada",
      category: "Reparación",
    },
    {
      image: "/placeholder-erzsy.png",
      title: "Inspección de Chillers",
      category: "Inspección",
    },
    {
      image: "/placeholder-358ih.png",
      title: "Calibración de Equipos",
      category: "Calibración",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(galleryItems.length / 4))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(galleryItems.length / 4)) % Math.ceil(galleryItems.length / 4))
  }

  const visibleItems = galleryItems.slice(currentIndex * 4, (currentIndex + 1) * 4)

  return (
    <section id="galeria" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nuestro Trabajo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Galería de Proyectos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conoce algunos de nuestros trabajos más destacados en mantenimiento y reparación de equipos industriales
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {visibleItems.map((item, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0 relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-all duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Expand className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {item.category}
                    </Badge>
                    <h3 className="text-primary-foreground font-semibold text-sm">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentIndex === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(galleryItems.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-accent" : "bg-border"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex === Math.ceil(galleryItems.length / 4) - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
