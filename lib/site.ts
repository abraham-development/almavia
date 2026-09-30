// Datos del negocio centralizados. Reemplaza los valores provisionales por los reales.
export const site = {
  name: "Almavia",
  tagline: "Estética y salud integral",
  description:
    "Almavia es un espacio de estética y bienestar integral en Lima donde cada tratamiento acompaña tu proceso de renovación con empatía, confianza y cuidado profesional.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://almavia.pe",
  whatsapp: {
    // Solo dígitos, con código de país (Perú = 51). Se define en .env.local y no se
    // muestra en la página: solo se usa dentro de los enlaces de WhatsApp.
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    defaultMessage: "Hola Almavia, quisiera agendar una cita.",
  },
  address: {
    street: "Calle Los Pinos 156",
    unit: "Oficina 205-B",
    district: "Miraflores",
    city: "Lima",
    country: "Perú",
    // Sin la oficina: Google Maps ubica mejor el pin solo con calle y número.
    mapsQuery: "Calle Los Pinos 156, Miraflores, Lima, Perú",
  },
  hours: [
    { days: "Lunes a viernes", time: "9:00 – 20:00" },
    { days: "Sábados", time: "9:00 – 14:00" },
  ],
  email: "hola@almavia.pe",
  // Redes sociales (WhatsApp usa el número de .env.local). URLs sin parámetros de rastreo.
  socials: {
    facebook: "https://www.facebook.com/people/Almavia-Almavia/61590138785982/",
    instagram: "https://www.instagram.com/almavia.clinic/",
  },
} as const;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contáctanos", href: "#contactanos" },
] as const;
