# refrigeration-services

Landing page de una sola ruta para GP Seguros en Refrigeración. Presenta servicios de refrigeración industrial, información de contacto, una galería y un formulario de cotización.

## Requisitos

- Node.js 20.9 o superior.
- npm.
- Una cuenta y una API key de Resend para recibir solicitudes del formulario.

## Desarrollo local

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abre http://localhost:3000. Completa las variables de `.env.local` antes de probar el envío real del formulario.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `RESEND_API_KEY` | API key privada de Resend. |
| `CONTACT_TO_EMAIL` | Dirección que recibe las solicitudes. |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend. |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, usada en metadata, robots y sitemap. |

No publiques valores secretos en el repositorio. El ejemplo de variables está en `.env.example`.

## Comandos

```bash
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Despliegue

El proyecto puede desplegarse en Vercel usando el preset de Next.js. Configura las cuatro variables de entorno en el proyecto antes de desplegar. Verifica el dominio de `CONTACT_FROM_EMAIL` en Resend y asigna `NEXT_PUBLIC_SITE_URL` a la URL pública real. El endpoint de correo usa runtime Node.js.

`images.unoptimized` permanece activado en `next.config.mjs` hasta confirmar que el despliegue puede usar el optimizador de imágenes de Next.js.
