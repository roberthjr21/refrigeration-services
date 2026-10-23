import { Badge } from "@/components/ui/badge"

export function ClientsSection() {
  const clients = [
    {
      name: "Inducol",
      logo: "/inducol-logo-industrial.png",
    },
    {
      name: "Wonder",
      logo: "/wonder-food-logo.png",
    },
    {
      name: "Agrosavia",
      logo: "/agrosavia-logo.png",
    },
    {
      name: "Freskaleche",
      logo: "/freskaleche-logo.png",
    },
    {
      name: "Lácteos del Valle",
      logo: "/lacteos-del-valle-logo.png",
    },
    {
      name: "Industrias Alimentarias",
      logo: "/placeholder.svg?height=80&width=160",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nuestros Clientes
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Empresas que Confían en Nosotros</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trabajamos con las principales empresas del sector industrial y alimentario
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <img
                src={client.logo || "/placeholder.svg"}
                alt={`Logo de ${client.name}`}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-muted rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl text-accent mb-4">"</div>
            <blockquote className="text-lg text-muted-foreground italic mb-6">
              GP Seguros en Refrigeración ha sido nuestro aliado estratégico durante más de 5 años. Su profesionalismo y
              calidad en el servicio nos ha permitido mantener nuestros equipos funcionando de manera óptima, reduciendo
              significativamente los tiempos de inactividad.
            </blockquote>
            <div className="font-semibold text-foreground">Carlos Mendoza</div>
            <div className="text-sm text-muted-foreground">Gerente de Mantenimiento - Inducol</div>
          </div>
        </div>
      </div>
    </section>
  )
}
