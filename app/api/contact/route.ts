import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema } from "@/lib/contact-schema"
import { getQuoteDatabase } from "@/lib/db"

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

  const { DATABASE_URL, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!DATABASE_URL) {
    return NextResponse.json(
      { message: "El formulario no está conectado a la base de datos. Configura DATABASE_URL para habilitarlo." },
      { status: 503 },
    )
  }
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { message: "El formulario no está disponible. Configura el servicio de correo o comunícate por teléfono." },
      { status: 503 },
    )
  }

  let requestId: string
  try {
    const database = getQuoteDatabase()
    const serviceTitle = parsed.data.subject.match(/^Información sobre:\s*(.+)$/i)?.[1]?.trim() ?? null
    const saved = await database.query<{ id: string }>(
      `INSERT INTO quote_requests
        (full_name, company, email, phone, subject, message, service_id)
       VALUES
        ($1, $2, $3, $4, $5, $6,
         (SELECT id FROM services WHERE title = $7 AND is_active = true LIMIT 1))
       RETURNING id`,
      [
        parsed.data.name,
        parsed.data.company || null,
        parsed.data.email,
        parsed.data.phone,
        parsed.data.subject,
        parsed.data.message,
        serviceTitle,
      ],
    )
    requestId = saved.rows[0].id
  } catch (error) {
    console.error("Could not save quote request", error)
    return NextResponse.json(
      { message: "No pudimos registrar tu solicitud. Inténtalo más tarde o comunícate por teléfono." },
      { status: 503 },
    )
  }

  const resend = new Resend(RESEND_API_KEY)
  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: parsed.data.email,
      subject: `Solicitud web: ${parsed.data.subject}`,
      text: [
        `Número de solicitud: ${requestId}`,
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
      console.error("Resend contact notification failed", error)
      return NextResponse.json(
        { message: "Tu solicitud quedó guardada. La notificación por correo está pendiente; no necesitas enviarla de nuevo." },
        { status: 202 },
      )
    }
  } catch (error) {
    console.error("Contact email delivery failed", error)
    return NextResponse.json(
      { message: "Tu solicitud quedó guardada. La notificación por correo está pendiente; no necesitas enviarla de nuevo." },
      { status: 202 },
    )
  }

  try {
    await getQuoteDatabase().query("UPDATE quote_requests SET email_sent = true WHERE id = $1", [requestId])
  } catch (error) {
    console.error("Could not mark quote notification as sent", error)
  }

  return NextResponse.json({ message: "Gracias. Tu solicitud fue guardada y enviada al equipo." })
}
