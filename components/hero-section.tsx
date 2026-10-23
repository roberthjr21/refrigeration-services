import { Button } from "@/components/ui/button"
import { Shield, Wrench, Clock } from "lucide-react"

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/industrial-refrigeration-worker.png')`,
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground mb-6 leading-tight">
            Calidad y Confiabilidad
            <span className="block text-accent">a Tu Alcance</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl leading-relaxed">
            Especialistas en mantenimiento y reparación de equipos de refrigeración industrial. Más de 15 años
            garantizando el funcionamiento óptimo de tus sistemas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Solicitar Cotización
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Ver Servicios
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-primary-foreground">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <div className="font-semibold">Garantía Total</div>
                <div className="text-sm opacity-90">En todos nuestros trabajos</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-primary-foreground">
              <Clock className="w-8 h-8 text-accent" />
              <div>
                <div className="font-semibold">Servicio 24/7</div>
                <div className="text-sm opacity-90">Emergencias atendidas</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-primary-foreground">
              <Wrench className="w-8 h-8 text-accent" />
              <div>
                <div className="font-semibold">Técnicos Certificados</div>
                <div className="text-sm opacity-90">Personal especializado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
