import { createHash } from "node:crypto"
import { after, NextResponse } from "next/server"
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

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { message: "El formulario no está conectado a la base de datos. Configura DATABASE_URL para habilitarlo." },
      { status: 503 },
    )
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const ip = forwardedFor || request.headers.get("x-real-ip")?.trim() || "unknown"
  // TODO: configurar IP_HASH_SALT con un secreto aleatorio largo en cada entorno.
  const ipHashSalt = process.env.IP_HASH_SALT || ""
  const ipHash = createHash("sha256").update(`${ip}${ipHashSalt}`).digest("hex")
  const userAgent = request.headers.get("user-agent")?.slice(0, 1000) || null

  let requestId: string
  try {
    const database = getQuoteDatabase()
    const recent = await database.query<{ count: string }>(
      `SELECT count(*)::text AS count
       FROM quote_requests
       WHERE ip_hash = $1 AND created_at >= now() - interval '1 hour'`,
      [ipHash],
    )
    if (Number(recent.rows[0]?.count ?? 0) >= 5) {
      return NextResponse.json(
        { message: "Recibimos varias solicitudes desde esta conexión. Inténtalo de nuevo más tarde." },
        { status: 429 },
      )
    }

    const saved = await database.query<{ id: string }>(
      `INSERT INTO quote_requests
        (full_name, company, email, phone, subject, message, service_id, ip_hash, user_agent, email_sent)
       VALUES
        ($1, $2, $3, $4, $5, $6,
         (SELECT id FROM services WHERE slug = $7 AND is_active = true LIMIT 1), $8, $9, false)
       RETURNING id`,
      [
        parsed.data.name,
        parsed.data.company || null,
        parsed.data.email,
        parsed.data.phone,
        parsed.data.subject,
        parsed.data.message,
        parsed.data.serviceSlug ?? null,
        ipHash,
        userAgent,
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

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return NextResponse.json(
      { message: "Tu solicitud quedó guardada. El correo de notificación está pendiente de configuración; no necesitas enviarla de nuevo." },
      { status: 202 },
    )
  }

  after(async () => {
    try {
      const resend = new Resend(RESEND_API_KEY)
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
        return
      }
      await getQuoteDatabase().query("UPDATE quote_requests SET email_sent = true WHERE id = $1", [requestId])
    } catch (error) {
      console.error("Contact email delivery failed", error)
    }
  })

  return NextResponse.json({ message: "Gracias. Tu solicitud fue guardada; la notificación al equipo está en proceso." }, { status: 202 })
}
