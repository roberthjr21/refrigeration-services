import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Settings, Thermometer, Zap, Shield, Clock } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Wrench,
      title: "Mantenimiento Preventivo",
      description: "Programas de mantenimiento diseñados para prevenir fallas y extender la vida útil de tus equipos.",
      features: ["Inspecciones regulares", "Limpieza especializada", "Calibración de sistemas"],
    },
    {
      icon: Settings,
      title: "Reparación de Equipos",
      description: "Diagnóstico y reparación especializada de todo tipo de sistemas de refrigeración industrial.",
      features: ["Diagnóstico preciso", "Repuestos originales", "Garantía en reparaciones"],
    },
    {
      icon: Thermometer,
      title: "Instalación de Sistemas",
      description: "Instalación profesional de nuevos sistemas de refrigeración adaptados a tus necesidades.",
      features: ["Diseño personalizado", "Instalación certificada", "Puesta en marcha"],
    },
    {
      icon: Zap,
      title: "Emergencias 24/7",
      description: "Servicio de emergencia disponible las 24 horas para atender fallas críticas.",
      features: ["Respuesta inmediata", "Técnicos disponibles", "Soluciones rápidas"],
    },
    {
      icon: Shield,
      title: "Certificaciones",
      description: "Certificaciones y documentación técnica para cumplimiento normativo.",
      features: ["Certificados oficiales", "Documentación técnica", "Cumplimiento normativo"],
    },
    {
      icon: Clock,
      title: "Modernización",
      description: "Actualización de sistemas obsoletos con tecnología moderna y eficiente.",
      features: ["Tecnología actual", "Mayor eficiencia", "Ahorro energético"],
    },
  ]

  return (
    <section id="servicios" className="scroll-mt-20 py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos soluciones integrales para el mantenimiento y reparación de equipos de refrigeración industrial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a href={`/?servicio=${encodeURIComponent(service.title)}#contacto`}>Más Información</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
