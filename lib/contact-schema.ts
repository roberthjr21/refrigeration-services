import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre completo.").max(120, "El nombre es demasiado largo."),
  company: z.string().trim().max(120, "El nombre de la empresa es demasiado largo."),
  email: z.string().trim().email("Escribe un correo electrónico válido.").max(254, "El correo es demasiado largo."),
  phone: z.string().trim().min(7, "Escribe un teléfono válido.").max(30, "El teléfono es demasiado largo."),
  subject: z.string().trim().min(2, "Escribe el asunto de tu solicitud.").max(160, "El asunto es demasiado largo."),
  message: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres).").max(5000, "El mensaje es demasiado largo."),
  website: z.string().max(120, "Solicitud inválida."),
  serviceSlug: z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Selecciona un servicio válido.").optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
