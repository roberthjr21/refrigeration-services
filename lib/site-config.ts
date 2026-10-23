export const siteConfig = {
  companyName: "GP Seguros en Refrigeración",
  // TODO: reemplazar por el dominio oficial antes del despliegue público.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://example.com",
  contact: {
    phones: [
      { display: "(+57) 316 5371453", tel: "+573165371453", whatsapp: "573165371453" },
      { display: "318 4748117", tel: "+573184748117", whatsapp: "573184748117" },
    ],
    // TODO: confirmar con el dueño que esta dirección de correo esté activa y sea oficial.
    email: "contacto@gpsegurosrefrigeracion.com",
    city: "Bogotá, Colombia",
    coverage: "Cobertura nacional",
    hours: ["Lun - Vie: 7:00 AM - 6:00 PM", "Sáb: 8:00 AM - 2:00 PM", "Emergencias 24/7"],
  },
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
  },
  showUnverifiedContent: process.env.NEXT_PUBLIC_SHOW_UNVERIFIED_CONTENT === "true",
  // TODO: verificar con el dueño las cifras antes de publicarlas.
  stats: [
    { label: "Años de Experiencia", value: "15+" },
    { label: "Clientes Satisfechos", value: "500+" },
    { label: "Proyectos Completados", value: "1000+" },
    { label: "Ciudades Atendidas", value: "25+" },
  ],
  // TODO: verificar con el dueño los nombres y permisos de uso de logos.
  clients: [
    { name: "Inducol", logo: "/inducol-logo-industrial.webp" },
    { name: "Wonder", logo: "/wonder-food-logo.webp" },
    { name: "Agrosavia", logo: "/agrosavia-logo.webp" },
    { name: "Freskaleche", logo: "/freskaleche-logo.webp" },
    { name: "Lácteos del Valle", logo: "/lacteos-del-valle-logo.webp" },
  ],
  // TODO: verificar con el dueño el texto y permiso para publicar el testimonio.
  testimonial: {
    quote: "GP Seguros en Refrigeración ha sido nuestro aliado estratégico durante más de 5 años. Su profesionalismo y calidad en el servicio nos ha permitido mantener nuestros equipos funcionando de manera óptima, reduciendo significativamente los tiempos de inactividad.",
    author: "Carlos Mendoza",
    role: "Gerente de Mantenimiento - Inducol",
  },
} as const
