export type TeamMember = {
  id: string;
  image: string;
  imageAlt: string;
  // Opcionales hasta que Almavia pase los datos: la tarjeta solo muestra lo que exista.
  name?: string;
  role?: string;
  bio?: string;
};

// Retratos recortados a 4:5 desde recursos_internos/equipo/.
export const team: TeamMember[] = [
  {
    id: "integrante-1",
    image: "/images/equipo-1.webp",
    imageAlt: "Integrante del equipo de Almavia sonriendo en la recepción, bajo el logo de la clínica",
  },
  {
    id: "integrante-2",
    image: "/images/equipo-2.webp",
    imageAlt: "Integrante del equipo de Almavia con traje blanco, sentada en su consultorio",
  },
  {
    id: "integrante-3",
    image: "/images/equipo-3.webp",
    imageAlt: "Integrante del equipo de Almavia con bata blanca, sentado en el consultorio",
  },
];
