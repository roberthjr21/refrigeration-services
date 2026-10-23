import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site-config"

export function ClientsSection() {
  return (
    <section className="py-20">
      {siteConfig.showUnverifiedContent && <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Nuestros Clientes</Badge>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Empresas que Confían en Nosotros</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trabajamos con las principales empresas del sector industrial y alimentario
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {siteConfig.clients.map((client) => (
            <div key={client.name} className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105">
              <Image
                src={client.logo}
                alt={`Logo de ${client.name}`}
                width={200}
                height={80}
                sizes="(max-width: 768px) 40vw, (max-width: 1024px) 25vw, 16vw"
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 bg-muted rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl text-accent mb-4">&quot;</div>
            <blockquote className="text-lg text-muted-foreground italic mb-6">{siteConfig.testimonial.quote}</blockquote>
            <div className="font-semibold text-foreground">{siteConfig.testimonial.author}</div>
            <div className="text-sm text-muted-foreground">{siteConfig.testimonial.role}</div>
          </div>
        </div>
      </div>}
    </section>
  )
}
