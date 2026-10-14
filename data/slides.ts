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
    eyebrow: "#Medicina estética integral",
    title: "Equilibramos tu bienestar.",
    highlight: "Realzamos tu esencia.",
    text: "Medicina estética, salud y bienestar emocional en un mismo lugar, con un equipo médico que te escucha y te acompaña.",
    cta: { label: "Agendar cita", whatsappMessage: "Hola Almavia, quisiera agendar una cita." },
  },
  {
    id: "estetica",
    kind: "image",
    image: "/images/hero-estetica.webp",
    imageAlt: "Médica estética con bata y guantes evaluando el rostro de una paciente recostada",
    eyebrow: "#Medicina estética",
    title: "Resultados naturales,",
    highlight: "con criterio médico.",
    text: "Tratamientos para prevenir y mejorar los signos del envejecimiento y optimizar la calidad de tu piel.",
    cta: { label: "Ver tratamientos", href: "#medicina-estetica" },
  },
  {
    id: "metabolica",
    kind: "image",
    image: "/images/hero-metabolica.webp",
    imageAlt: "Médica sonriente conversando con una paciente en un consultorio luminoso",
    eyebrow: "#Salud digestiva y metabólica",
    title: "Tu bienestar comienza",
    highlight: "desde el interior.",
    text: "Salud digestiva, metabolismo y control del peso desde una perspectiva médica integral.",
    cta: { label: "Ver tratamientos", href: "#salud-digestiva" },
  },
  {
    id: "emocional",
    kind: "image",
    image: "/images/hero-emocional.webp",
    imageAlt: "Mujer serena sentada en un sillón verde salvia en un consultorio de psicología",
    eyebrow: "#Bienestar emocional",
    title: "Tu bienestar emocional",
    highlight: "también merece atención.",
    text: "Un espacio de escucha y acompañamiento profesional para cuidar tu salud emocional.",
    cta: { label: "Ver más", href: "#psicologia" },
  },
];
