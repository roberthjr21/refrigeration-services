import { Facebook, Instagram, Linkedin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">GP</span>
              </div>
              <div>
                <div className="font-bold text-lg">GP Seguros</div>
                <div className="text-xs opacity-90">Refrigeración</div>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Especialistas en mantenimiento y reparación de equipos de refrigeración industrial con más de 15 años de
              experiencia.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Instagram className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
              <Linkedin className="w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Mantenimiento Preventivo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Reparación de Equipos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Instalación de Sistemas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Emergencias 24/7
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Certificaciones
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#nosotros" className="hover:text-accent transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-accent transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Certificaciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Política de Calidad
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-accent transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>(+57) 316 5371453</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>318 4748117</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent" />
                <span>contacto@gpseguros.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-70">
          <p>&copy; 2024 GP Seguros en Refrigeración. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
