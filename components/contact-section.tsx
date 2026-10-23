"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"
import { siteConfig } from "@/lib/site-config"

export function ContactSection() {
  const [submissionMessage, setSubmissionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", subject: "", message: "", website: "" },
  })

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get("servicio")
    if (requestedService) setValue("subject", `Información sobre: ${requestedService}`)
  }, [setValue])

  const onSubmit = async (values: ContactFormValues) => {
    setSubmissionMessage(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const result = (await response.json()) as { message?: string }
      if (!response.ok) throw new Error(result.message || "No pudimos enviar tu solicitud. Inténtalo nuevamente.")
      setSubmissionMessage({ type: "success", text: result.message || "Tu solicitud fue enviada correctamente." })
      reset()
    } catch (error) {
      setSubmissionMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Ocurrió un error al enviar la solicitud.",
      })
    }
  }

  return (
    <section id="contacto" className="scroll-mt-20 py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Contáctanos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para atender tus necesidades de refrigeración industrial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader><CardTitle>Solicita tu Cotización</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contact-name">Nombre completo *</label>
                    <Input id="contact-name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} {...register("name")} />
                    {errors.name && <p id="contact-name-error" className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-company">Empresa</label>
                    <Input id="contact-company" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={errors.company ? "contact-company-error" : undefined} {...register("company")} />
                    {errors.company && <p id="contact-company-error" className="text-sm text-destructive">{errors.company.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contact-email">Correo electrónico *</label>
                    <Input id="contact-email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} {...register("email")} />
                    {errors.email && <p id="contact-email-error" className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-phone">Teléfono *</label>
                    <Input id="contact-phone" type="tel" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "contact-phone-error" : undefined} {...register("phone")} />
                    {errors.phone && <p id="contact-phone-error" className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject">Asunto *</label>
                  <Input id="contact-subject" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "contact-subject-error" : undefined} {...register("subject")} />
                  {errors.subject && <p id="contact-subject-error" className="text-sm text-destructive">{errors.subject.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message">Describe tu proyecto o necesidad *</label>
                  <Textarea id="contact-message" required className="min-h-[120px]" aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} {...register("message")} />
                  {errors.message && <p id="contact-message-error" className="text-sm text-destructive">{errors.message.message}</p>}
                </div>
                <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Deja este campo vacío</label>
                  <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>
                {submissionMessage && (
                  <p role={submissionMessage.type === "error" ? "alert" : "status"} aria-live="polite" className={submissionMessage.type === "success" ? "text-sm text-green-700" : "text-sm text-destructive"}>
                    {submissionMessage.text}
                  </p>
                )}
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90">
                  {isSubmitting ? "Enviando solicitud…" : "Enviar Solicitud"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card><CardContent className="p-6"><div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"><Phone className="w-6 h-6 text-accent" /></div>
              <div><h3 className="font-semibold text-foreground mb-2">Teléfonos</h3><div className="space-y-1 text-muted-foreground">
                {siteConfig.contact.phones.map((phone) => <div key={phone.tel}><a href={`tel:${phone.tel}`}>{phone.display}</a> · <a href={`https://wa.me/${phone.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></div>)}
              </div></div>
            </div></CardContent></Card>
            <Card><CardContent className="p-6"><div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"><Mail className="w-6 h-6 text-accent" /></div>
              <div><h3 className="font-semibold text-foreground mb-2">Correo Electrónico</h3><a className="text-muted-foreground" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div>
            </div></CardContent></Card>
            <Card><CardContent className="p-6"><div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"><MapPin className="w-6 h-6 text-accent" /></div>
              <div><h3 className="font-semibold text-foreground mb-2">Ubicación</h3><div className="text-muted-foreground">{siteConfig.contact.city}<br />{siteConfig.contact.coverage}</div></div>
            </div></CardContent></Card>
            <Card><CardContent className="p-6"><div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"><Clock className="w-6 h-6 text-accent" /></div>
              <div><h3 className="font-semibold text-foreground mb-2">Horarios</h3><div className="space-y-1 text-muted-foreground">{siteConfig.contact.hours.map((hour) => <div key={hour}>{hour}</div>)}</div></div>
            </div></CardContent></Card>
          </div>
        </div>
      </div>
    </section>
  )
}
