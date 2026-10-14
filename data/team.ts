export type TeamMember = {
  id: string;
  image: string;
  imageAlt: string;
  // Opcionales hasta que Almavia pase los datos: la tarjeta solo muestra lo que exista.
  name?: string;
  role?: string;
  bio?: string;
  focus?: string[];
};

// Retratos recortados a 4:5 desde recursos_internos/equipo/.
export const team: TeamMember[] = [
  {
    id: "integrante-2",
    image: "/images/equipo-2.webp",
    imageAlt:
      "Dra. Etephany Caro Rivera, anestesióloga de Almavia, con traje blanco en su consultorio",
    name: "Dra. Etephany Caro Rivera",
    role: "Gerenta General | Anestesióloga | Medicina Estética",
    bio: `Soy médica especialista en Anestesiología, con formación en Medicina Estética y una visión de la medicina que integra la ciencia, la seguridad y el bienestar de cada paciente.

Mi experiencia médica me ha permitido comprender la importancia de una atención individualizada, donde cada decisión debe estar respaldada por el conocimiento, el criterio clínico y el respeto por las necesidades de cada persona.

En el campo de la medicina estética, mi filosofía se basa en realzar la belleza natural, preservar la armonía y acompañar los cambios de cada etapa de la vida, buscando resultados sutiles, equilibrados y acordes con la identidad de cada paciente.

Como parte de ALMAVIA, busco ofrecer una experiencia médica diferente: un espacio donde la estética y la salud se complementen, priorizando siempre la evaluación integral, la seguridad y el trato humano.

Creo en una medicina estética que no busca transformar quién eres, sino ayudarte a sentirte bien contigo mismo, con naturalidad y confianza.`,
  },
  {
    id: "integrante-3",
    image: "/images/equipo-3.webp",
    imageAlt:
      "Dr. Richard Jhonatan Navarro, director médico de Almavia, con bata blanca en el consultorio",
    name: "Dr. Richard Jhonatan Navarro",
    role: "Director Médico | Cirujano General | Médico Estético",
    bio: `Médico cirujano con formación y experiencia en Cirugía General y Medicina Estética, comprometido con brindar una atención médica cercana, segura y personalizada.

En ALMAVIA, desarrollo una visión integral del paciente, combinando el criterio médico, la experiencia clínica, la estética y el bienestar para acompañar cada proceso de manera individualizada.

Creo que la medicina estética no se trata de transformar quién eres, sino de potenciar aquello que te hace único, buscando resultados naturales, armónicos y acordes con cada persona.

Mi propósito es ofrecer una experiencia basada en la confianza, la seguridad y el acompañamiento, integrando medicina y tecnología con una atención humana y personalizada.

ALMAVIA nace de esta filosofía: entender, acompañar y realzar tu esencia.`,
  },
  {
    id: "integrante-1",
    image: "/images/equipo-1.webp",
    imageAlt:
      "Lic. Paola B. Gambarini Kristen, psicóloga clínica y organizacional de Almavia, sonriendo en la recepción",
    name: "Lic. Paola B. Gambarini Kristen",
    role: "Psicóloga Clínica y Organizacional",
    bio: "Psicóloga dedicada al acompañamiento emocional y al desarrollo integral de las personas. Mi práctica se fundamenta en la empatía, la escucha activa y un enfoque humano, creando espacios seguros donde cada persona pueda comprenderse, fortalecerse y avanzar hacia su bienestar.",
    focus: ["Bienestar emocional", "Crecimiento personal", "Desarrollo organizacional"],
  },  {
    id: "integrante-4",
    image: "/images/equipo-4.webp",
    imageAlt:
      "Dra. Rocío M. Parrales, gastroenteróloga de Almavia, sonriendo con bata blanca frente a una pared clara",
    name: "Dra. Rocío M. Parrales",
    role: "Gastroenterología | Salud Digestiva y Bienestar Metabólico",
    bio: `Médica gastroenteróloga con formación complementaria en metabolismo y obesidad, enfocada en el cuidado integral de la salud digestiva y metabólica.

Su abordaje busca comprender la relación entre el sistema digestivo, el metabolismo y el bienestar general, promoviendo una atención personalizada orientada a mejorar la salud, favorecer hábitos sostenibles y contribuir a una mejor calidad de vida.`,
  },
];
