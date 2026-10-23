# GP Seguros en Refrigeración

Sitio web de una sola página para presentar los servicios de refrigeración industrial de GP Seguros en Refrigeración y recibir solicitudes de cotización. El formulario se procesa en una API de Next.js, guarda las solicitudes en PostgreSQL y las notifica por correo con Resend.

## Funcionalidades

- Página adaptable a móviles con navegación a las secciones de inicio, servicios, empresa, galería y contacto.
- Catálogo visual de seis servicios: mantenimiento preventivo, reparación, instalación, emergencias, certificaciones y modernización.
- Secciones informativas con galería de proyectos, datos de contacto, logos de clientes y testimonio.
- Formulario con validación en cliente y servidor, campos de contacto y detección básica de spam mediante un campo honeypot.
- Persistencia de solicitudes en PostgreSQL y notificación por correo electrónico con Resend.
- Metadata Open Graph y archivos `robots.txt` y `sitemap.xml` condicionados a la configuración del dominio público.
- Analítica de Vercel cuando la aplicación se ejecuta en Vercel.

## Tecnologías

- Next.js 15 (App Router), React 19 y TypeScript.
- Tailwind CSS 4 y componentes de interfaz basados en Radix UI.
- PostgreSQL con el cliente `pg`.
- Resend para notificaciones de correo.
- React Hook Form y Zod para gestionar y validar el formulario.

## Requisitos

- Node.js 20.9 o superior y npm.
- PostgreSQL 13 o superior, local o accesible mediante una URL de conexión.
- Una API key de Resend, un remitente verificado y una dirección de destino para recibir solicitudes.

## Puesta en marcha local

1. Instala las dependencias y crea el archivo de variables local:

   ```powershell
   npm install
   Copy-Item .env.example .env.local
   ```

2. Completa las variables de `.env.local` según la tabla siguiente. Para ejecutar el formulario se necesitan PostgreSQL y Resend; la aplicación puede iniciarse sin ellos, pero no podrá aceptar solicitudes.

3. Crea el esquema y los datos iniciales:

   ```powershell
   npm run db:setup
   ```

   El comando lee `.env.local`, comprueba la conexión y aplica `db/schema.sql`. El esquema puede aplicarse nuevamente: las tablas, índices y registros semilla existentes se conservan.

4. Inicia el servidor de desarrollo:

   ```powershell
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Requerida para | Descripción |
| --- | --- | --- |
| `DATABASE_URL` | Formulario y `db:setup` | URL privada de conexión a PostgreSQL. Solo se usa en el servidor. |
| `RESEND_API_KEY` | Envío del formulario | API key privada de Resend. |
| `CONTACT_TO_EMAIL` | Envío del formulario | Dirección que recibirá las solicitudes. |
| `CONTACT_FROM_EMAIL` | Envío del formulario | Remitente verificado en Resend. |
| `NEXT_PUBLIC_SITE_URL` | Dominio público y SEO | URL pública canónica del sitio, por ejemplo `https://midominio.com`. |

No publiques `.env.local`, credenciales ni valores secretos en el repositorio. No agregues el prefijo `NEXT_PUBLIC_` a `DATABASE_URL` ni a las claves de Resend: las variables con ese prefijo se exponen al navegador. `.env.example` contiene los nombres de las variables sin valores.

## Formulario y base de datos

`POST /api/contact` valida los campos recibidos y comprueba que el honeypot esté vacío. Para procesar una solicitud deben estar configurados `DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`.

La API registra la solicitud en `quote_requests` y después intenta enviar el correo. Si el registro falla, devuelve un error y no indica que la solicitud se guardó. Si el registro fue exitoso pero falla la notificación, la solicitud permanece guardada y la respuesta informa que el correo está pendiente; no es necesario enviar el formulario otra vez.

`db/schema.sql` define las tablas de solicitudes, servicios, galería, clientes, testimonios y ajustes del sitio, además de índices, triggers y datos iniciales. **Actualmente solo las solicitudes del formulario están conectadas a PostgreSQL**: los servicios, la galería, los logos, las cifras, el testimonio y los datos de contacto que se muestran se cargan desde el código. No hay un panel administrativo.

## Estructura del proyecto

```text
app/
  api/contact/route.ts   Endpoint del formulario
  globals.css            Estilos globales y tema
  layout.tsx             Layout, fuentes y metadata
  page.tsx               Composición de la página principal
  robots.ts              Reglas de indexación
  sitemap.ts             Sitemap del sitio
components/              Secciones y componentes de interfaz
db/schema.sql            Esquema y datos iniciales de PostgreSQL
lib/
  contact-schema.ts      Validación del formulario
  db.ts                  Pool de conexiones PostgreSQL
  site-config.ts         Datos de contacto y contenido del sitio
scripts/setup-db.mjs     Aplicación del esquema de base de datos
public/                  Imágenes, logos e iconos
```

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor local de desarrollo. |
| `npm run lint` | Ejecuta ESLint en el proyecto. |
| `npx tsc --noEmit` | Comprueba los tipos de TypeScript sin generar archivos. |
| `npm run build` | Genera la compilación de producción. |
| `npm start` | Inicia la aplicación compilada. |
| `npm run db:setup` | Aplica el esquema y los datos iniciales a PostgreSQL. |

## Despliegue

El proyecto puede desplegarse en Vercel con la configuración de Next.js:

1. Configura las cinco variables de entorno en el entorno de despliegue. Usa las credenciales de producción para PostgreSQL y Resend.
2. Verifica el dominio del remitente en Resend y confirma que `CONTACT_TO_EMAIL` sea la dirección deseada.
3. Define `NEXT_PUBLIC_SITE_URL` con el dominio público definitivo. Sin esta variable, el sitemap queda vacío y el archivo robots bloquea la indexación.
4. Aplica `db/schema.sql` una vez contra la base de datos de producción, ejecutando `npm run db:setup` desde un entorno con acceso a ella. El comando lee `.env.local`; también se pueden suministrar las variables desde el entorno de ejecución.
5. Ejecuta `npm run build` y despliega la aplicación.

El endpoint de contacto y el acceso a PostgreSQL usan runtime Node.js. `images.unoptimized` está habilitado en `next.config.mjs`; se puede revisar si el entorno de despliegue admite el optimizador de imágenes de Next.js.

## Antes de publicar

- Reemplaza las imágenes provisionales de `public/` por fotografías autorizadas de los proyectos.
- Confirma con la empresa las cifras, logos y testimonio que se muestran; `showUnverifiedContent` está activado en `lib/site-config.ts`.
- Verifica el correo, teléfono, horario, cobertura y dominio oficiales en `lib/site-config.ts`.
- Revisa afirmaciones comerciales como “Garantía Total”, “Técnicos Certificados” y la garantía del 100 % antes de publicarlas.
