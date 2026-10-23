import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Calendar, MapPin } from "lucide-react"
import Image from "next/image"
import { siteConfig } from "@/lib/site-config"

export function AboutSection() {
  const statIcons = [Calendar, Users, Award, MapPin]
  // TODO: replace with an authorized real company photo before displaying this block.
  const aboutPhoto = { src: "/placeholder-81nir.png", isReal: false }

  return (
    <section id="nosotros" className="scroll-mt-20 py-20">
      <div className="container mx-auto px-4">
        <div className={aboutPhoto.isReal ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" : "grid grid-cols-1 gap-12 items-center"}>
          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Sobre Nosotros
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">Tus Equipos Quedarán Como Nuevos</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Somos una empresa especializada en el mantenimiento, reparación y modernización de equipos de refrigeración industrial.</p>
              <p>
                Nuestro equipo de técnicos certificados utiliza las mejores prácticas y tecnología de punta para
                garantizar el funcionamiento óptimo de tus sistemas de refrigeración.
              </p>
              <p>
                Nos comprometemos a brindar soluciones integrales que no solo resuelvan problemas inmediatos, sino que
                también prevengan futuras fallas y optimicen el rendimiento de tus equipos.
              </p>
            </div>

            {/* Stats */}
            {siteConfig.showUnverifiedContent && <div className="grid grid-cols-2 gap-4 mt-8">
              {siteConfig.stats.map((stat, index) => {
                const Icon = statIcons[index]
                return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              )})}
            </div>}
          </div>

          {/* Image */}
          {aboutPhoto.isReal && <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={aboutPhoto.src}
                  alt="Técnico trabajando en equipo de refrigeración"
                  width={800}
                  height={1000}
                  className="w-full h-[500px] object-cover"
                />
              </CardContent>
            </Card>

            {/* Floating Card */}
            <Card className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 max-w-xs">
              <CardContent className="p-0">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">
                  Garantía en todos nuestros servicios de mantenimiento y reparación
                </div>
              </CardContent>
            </Card>
          </div>}
        </div>
      </div>
    </section>
  )
}
