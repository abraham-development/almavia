type SlideBase = {
  id: string;
  eyebrow: string;
  title: string;
  /** Parte del título que se muestra en itálica Aura Cálida. */
  highlight: string;
  text: string;
  cta: { label: string; href?: string; whatsappMessage?: string };
};

export type Slide =
  | (SlideBase & { kind: "video"; poster: { landscape: string; portrait: string } })
  | (SlideBase & { kind: "image"; image: string; imageAlt: string });

export const slides: Slide[] = [
  {
    id: "esencia",
    kind: "video",
    poster: { landscape: "/video/hero-landscape.jpg", portrait: "/video/hero-portrait.jpg" },
    eyebrow: "#Belleza en equilibrio",
    title: "Cuidarte es un",
    highlight: "arte de vivir.",
    text: "Estética y bienestar integral en un espacio creado para escucharte, acompañarte y realzar tu esencia.",
    cta: { label: "Agendar cita", whatsappMessage: "Hola Almavia, quisiera agendar una cita." },
  },
  {
    id: "facial",
    kind: "image",
    image: "/images/hero-facial.webp",
    imageAlt: "Tratamiento facial en una sala de tonos crema y salvia",
    eyebrow: "#Tratamientos faciales",
    title: "Tu piel habla de",
    highlight: "cómo te sientes.",
    text: "Protocolos personalizados para una piel luminosa, sana y en armonía.",
    cta: { label: "Ver más", href: "#servicios" },
  },
  {
    id: "corporal",
    kind: "image",
    image: "/images/hero-corporal.webp",
    imageAlt: "Tratamiento corporal con aceites botánicos",
    eyebrow: "#Tratamientos corporales",
    title: "Reconecta con",
    highlight: "tu cuerpo.",
    text: "Técnicas corporales que acompañan tu proceso con calma y respeto.",
    cta: { label: "Ver más", href: "#servicios" },
  },
  {
    id: "bienestar",
    kind: "image",
    image: "/images/hero-bienestar.webp",
    imageAlt: "Mujer sonriente en bata de spa junto a una ventana con luz cálida",
    eyebrow: "#Salud integral",
    title: "El bienestar también",
    highlight: "se refleja.",
    text: "Unimos estética, salud y equilibrio emocional en un mismo camino.",
    cta: { label: "Conócenos", href: "#nosotros" },
  },
];
