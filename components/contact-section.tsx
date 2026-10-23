import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contacto" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Contáctanos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para atender tus necesidades de refrigeración industrial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Solicita tu Cotización</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Nombre completo" />
                <Input placeholder="Empresa" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="email" placeholder="Correo electrónico" />
                <Input type="tel" placeholder="Teléfono" />
              </div>
              <Input placeholder="Asunto" />
              <Textarea placeholder="Describe tu proyecto o necesidad..." className="min-h-[120px]" />
              <Button className="w-full bg-accent hover:bg-accent/90">Enviar Solicitud</Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Teléfonos</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <div>(+57) 316 5371453</div>
                      <div>318 4748117</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Correo Electrónico</h3>
                    <div className="text-muted-foreground">contacto@gpsegurosrefrigeracion.com</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ubicación</h3>
                    <div className="text-muted-foreground">
                      Bogotá, Colombia
                      <br />
                      Cobertura nacional
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horarios</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <div>Lun - Vie: 7:00 AM - 6:00 PM</div>
                      <div>Sáb: 8:00 AM - 2:00 PM</div>
                      <div className="text-accent font-medium">Emergencias 24/7</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
