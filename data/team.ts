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
    bio: `Soy médica especialista en Anestesiología, con formación en Medicina Estética. Integro la ciencia, la seguridad y el bienestar de cada paciente, con una atención individualizada y criterio clínico.

En ALMAVIA busco realzar la belleza natural y acompañar cada etapa, con resultados sutiles y una atención que prioriza la evaluación integral y el trato humano.`,
  },
  {
    id: "integrante-3",
    image: "/images/equipo-3.webp",
    imageAlt:
      "Dr. Richard Jhonatan Navarro, director médico de Almavia, con bata blanca en el consultorio",
    name: "Dr. Richard Jhonatan Navarro",
    role: "Director Médico | Cirujano General | Médico Estético",
    bio: `Médico cirujano con formación en Cirugía General y Medicina Estética. En ALMAVIA acompaño cada proceso de forma cercana y personalizada, uniendo criterio médico, estética y bienestar.

Creo en una medicina estética que no transforma quién eres, sino que potencia lo que te hace único, con resultados naturales y una atención basada en la confianza y la seguridad.`,
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
