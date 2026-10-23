import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/contact-schema"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: "La solicitud no tiene un formato válido." }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ message: "Revisa los datos del formulario e inténtalo nuevamente." }, { status: 400 })
  }
  if (parsed.data.website) {
    return NextResponse.json({ message: "No fue posible validar la solicitud." }, { status: 400 })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { message: "El formulario no está disponible en este momento. Puedes comunicarte por teléfono o correo." },
      { status: 503 },
    )
  }

  try {
    const resend = new Resend(RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: parsed.data.email,
      subject: `Solicitud web: ${parsed.data.subject}`,
      text: [
        `Nombre: ${parsed.data.name}`,
        `Empresa: ${parsed.data.company || "No indicada"}`,
        `Correo: ${parsed.data.email}`,
        `Teléfono: ${parsed.data.phone}`,
        `Asunto: ${parsed.data.subject}`,
        "",
        parsed.data.message,
      ].join("\n"),
    })
    if (error) {
      console.error("Resend contact submission failed", error)
      return NextResponse.json({ message: "No se pudo enviar tu solicitud. Inténtalo más tarde." }, { status: 502 })
    }
    return NextResponse.json({ message: "Gracias. Tu solicitud fue enviada correctamente." })
  } catch (error) {
    console.error("Contact email delivery failed", error)
    return NextResponse.json({ message: "No se pudo enviar tu solicitud. Inténtalo más tarde." }, { status: 502 })
  }
}
