"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  { image: "/placeholder-0a56a.png", title: "Mantenimiento de Compresores", category: "Mantenimiento" },
  { image: "/placeholder-4xaaf.png", title: "Instalación de Sistemas", category: "Instalación" },
  { image: "/industrial-cooling-tower-repair.png", title: "Reparación de Torres", category: "Reparación" },
  { image: "/refrigeration-control-panel-upgrade.png", title: "Modernización de Controles", category: "Modernización" },
  { image: "/industrial-freezer-maintenance.png", title: "Mantenimiento de Cámaras", category: "Mantenimiento" },
  { image: "/refrigeration-pipe-welding.png", title: "Soldadura Especializada", category: "Reparación" },
  { image: "/placeholder-erzsy.png", title: "Inspección de Chillers", category: "Inspección" },
  { image: "/placeholder-358ih.png", title: "Calibración de Equipos", category: "Calibración" },
]

function getPageSize() {
  if (window.matchMedia("(min-width: 1024px)").matches) return 4
  if (window.matchMedia("(min-width: 768px)").matches) return 2
  return 1
}

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pageSize, setPageSize] = useState(1)
  const pageCount = Math.ceil(galleryItems.length / pageSize)

  useEffect(() => {
    const updatePageSize = () => setPageSize(getPageSize())
    updatePageSize()
    window.addEventListener("resize", updatePageSize)
    return () => window.removeEventListener("resize", updatePageSize)
  }, [])

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, pageCount - 1))
  }, [pageCount])

  const visibleItems = galleryItems.slice(currentIndex * pageSize, (currentIndex + 1) * pageSize)

  return (
    <section id="galeria" className="scroll-mt-20 py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Nuestro Trabajo</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Galería de Proyectos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conoce algunos de nuestros trabajos más destacados en mantenimiento y reparación de equipos industriales
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {visibleItems.map((item) => (
            <Card key={item.title} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 relative">
                <Image
                  src={item.image}
                  alt={`${item.title} de refrigeración industrial`}
                  width={640}
                  height={480}
                  sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 23vw"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{item.category}</Badge>
                  <h3 className="text-primary-foreground font-semibold text-sm">{item.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-4" aria-label="Paginación de la galería">
          <Button variant="outline" size="sm" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0} aria-label="Ver imágenes anteriores">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex space-x-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir a la página ${index + 1}`}
                aria-current={index === currentIndex ? "page" : undefined}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-accent" : "bg-border"}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentIndex((index) => Math.min(pageCount - 1, index + 1))} disabled={currentIndex === pageCount - 1} aria-label="Ver imágenes siguientes">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
