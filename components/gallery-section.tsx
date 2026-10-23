import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const galleryItems = [
  // TODO: replace placeholder records with real, authorized project photos.
  { image: "/placeholder-0a56a.png", title: "Mantenimiento de Compresores", category: "Mantenimiento", isReal: false },
  { image: "/placeholder-4xaaf.png", title: "Instalación de Sistemas", category: "Instalación", isReal: false },
  { image: "/industrial-cooling-tower-repair.webp", title: "Reparación de Torres", category: "Reparación", isReal: true },
  { image: "/refrigeration-control-panel-upgrade.webp", title: "Modernización de Controles", category: "Modernización", isReal: true },
  { image: "/industrial-freezer-maintenance.webp", title: "Mantenimiento de Cámaras", category: "Mantenimiento", isReal: true },
  { image: "/refrigeration-pipe-welding.webp", title: "Soldadura Especializada", category: "Reparación", isReal: true },
  { image: "/placeholder-erzsy.png", title: "Inspección de Chillers", category: "Inspección", isReal: false },
  { image: "/placeholder-358ih.png", title: "Calibración de Equipos", category: "Calibración", isReal: false },
].filter((item) => item.isReal)

export function GallerySection() {
  return (
    <section id="galeria" className="scroll-mt-20 bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-4">Nuestro Trabajo</Badge>
          <h2 className="mb-4 text-3xl font-black text-foreground md:text-4xl">Galería de Proyectos</h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Conoce algunos de nuestros trabajos más destacados en mantenimiento y reparación de equipos industriales
          </p>
        </div>
        <div
          role="region"
          aria-label="Galería de proyectos; desliza horizontalmente para ver más imágenes"
          className="-mx-4 mb-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 scroll-smooth"
        >
          {galleryItems.map((item) => (
            <Card key={item.title} className="w-[85%] min-w-[85%] snap-start overflow-hidden transition-shadow duration-300 hover:shadow-lg md:w-[calc((100%-1.5rem)/2)] md:min-w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)] lg:min-w-[calc((100%-4.5rem)/4)]">
              <CardContent className="group relative p-0">
                <Image
                  src={item.image}
                  alt={`${item.title} de refrigeración industrial`}
                  width={960}
                  height={720}
                  sizes="(max-width: 767px) 85vw, (max-width: 1023px) 46vw, 22vw"
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">{item.category}</Badge>
                  <h3 className="text-sm font-semibold text-primary-foreground">{item.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
