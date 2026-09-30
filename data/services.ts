export type Service = {
  id: string;
  category: string;
  title: string;
  description: string;
  treatments: string[];
  image: string;
  imageAlt: string;
  whatsappMessage: string;
};

// Lista base editable: ajusta tratamientos y textos según la oferta real de Almavia.
export const services: Service[] = [
  {
    id: "faciales",
    category: "Tratamientos faciales",
    title: "Tu piel, en equilibrio",
    description:
      "Protocolos personalizados que respetan el ritmo de tu piel y realzan su luminosidad natural.",
    treatments: ["Limpieza facial profunda", "Hidratación y glow", "Rejuvenecimiento facial", "Peeling suave"],
    image: "/images/servicio-facial.webp",
    imageAlt: "Tratamiento facial con piedra gua sha sobre piel luminosa",
    whatsappMessage: "Hola Almavia, quisiera información sobre los tratamientos faciales.",
  },
  {
    id: "corporales",
    category: "Tratamientos corporales",
    title: "Cuidado que se siente",
    description:
      "Técnicas que acompañan a tu cuerpo desde el bienestar, sin prisas ni estándares imposibles.",
    treatments: ["Drenaje linfático", "Moldeamiento corporal", "Masajes relajantes", "Reafirmación"],
    image: "/images/servicio-corporal.webp",
    imageAlt: "Tratamiento corporal de drenaje con toalla de lino",
    whatsappMessage: "Hola Almavia, quisiera información sobre los tratamientos corporales.",
  },
  {
    id: "bienestar",
    category: "Bienestar integral",
    title: "Salud desde adentro",
    description:
      "Acompañamiento integral que une estética, salud y equilibrio emocional para un cambio auténtico.",
    treatments: ["Evaluación integral", "Orientación nutricional", "Acompañamiento emocional", "Planes personalizados"],
    image: "/images/servicio-bienestar.webp",
    imageAlt: "Manos sosteniendo una taza de infusión herbal junto a hierbas frescas",
    whatsappMessage: "Hola Almavia, quisiera información sobre el programa de bienestar integral.",
  },
];
