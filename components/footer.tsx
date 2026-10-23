import { Facebook, Instagram, Linkedin, Phone, Mail } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const socialItems = [
  { name: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { name: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { name: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2" role="img" aria-label={siteConfig.companyName}>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center"><span className="text-accent-foreground font-bold text-lg">GP</span></div>
              <div><div className="font-bold text-lg">GP Seguros</div><div className="text-xs opacity-90">Refrigeración</div></div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">Especialistas en mantenimiento y reparación de equipos de refrigeración industrial.</p>
            <div className="flex space-x-4">
              {socialItems.filter((item) => item.href).map(({ name, href, Icon }) => (
                <a key={name} href={href!} aria-label={name} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 transition-opacity"><Icon className="w-5 h-5" /></a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm opacity-90">
              {["Mantenimiento Preventivo", "Reparación de Equipos", "Instalación de Sistemas", "Emergencias 24/7", "Certificaciones"].map((service) => <li key={service}><a href="#servicios" className="hover:text-accent transition-colors">{service}</a></li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="#nosotros" className="hover:text-accent transition-colors">Sobre Nosotros</a></li>
              <li><a href="#galeria" className="hover:text-accent transition-colors">Galería</a></li>
              <li><a href="#contacto" className="hover:text-accent transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              {siteConfig.contact.phones.map((phone) => <div key={phone.tel} className="flex items-center space-x-2"><Phone className="w-4 h-4 text-accent" /><a href={`tel:${phone.tel}`}>{phone.display}</a></div>)}
              <div className="flex items-center space-x-2"><Mail className="w-4 h-4 text-accent" /><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} {siteConfig.companyName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
