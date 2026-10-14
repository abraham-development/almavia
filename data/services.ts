export type Treatment = {
  name: string;
  tagline: string;
  /** Párrafos separados por una línea en blanco. */
  description: string;
};

export type Service = {
  id: string;
  category: string;
  title: string;
  /** Parte del título que se muestra en itálica Aura Cálida. */
  highlight: string;
  /** Párrafos separados por una línea en blanco. */
  intro: string;
  treatments: Treatment[];
  /** Opcional: la tarjeta se ve completa sin foto. */
  image?: string;
  imageAlt?: string;
  /** Foto extra solo en escritorio, para llenar la columna de tratamientos cuando es corta. */
  desktopImage?: string;
  desktopImageAlt?: string;
  whatsappMessage: string;
};

// Áreas y tratamientos tal como los redactó Almavia.
export const services: Service[] = [
  {
    id: "medicina-estetica",
    category: "Medicina estética",
    title: "Realzamos tu belleza,",
    highlight: "respetando tu esencia.",
    intro:
      "Nuestra unidad de Medicina Estética ofrece tratamientos orientados a prevenir y mejorar los signos del envejecimiento, armonizar los rasgos faciales y optimizar la calidad de la piel, priorizando resultados naturales y equilibrados.",
    treatments: [
      {
        name: "Toxina botulínica",
        tagline: "Suaviza las líneas de expresión sin perder tu naturalidad.",
        description:
          "Tratamiento que ayuda a relajar temporalmente determinados músculos faciales, suavizando las arrugas de expresión de la frente, el entrecejo y el contorno de los ojos. Su aplicación personalizada busca una apariencia más descansada y fresca, conservando la expresividad del rostro.",
      },
      {
        name: "Ácido hialurónico",
        tagline: "Armonía, definición y equilibrio facial.",
        description:
          "Tratamiento que permite restaurar volúmenes, mejorar determinados contornos y armonizar las proporciones del rostro. Se utiliza en zonas como labios, mentón y otras áreas faciales, según las necesidades de cada paciente.",
      },
      {
        name: "Bioestimuladores de colágeno",
        tagline: "Estimula la firmeza natural de tu piel.",
        description:
          "Tratamientos diseñados para favorecer la producción de colágeno y mejorar progresivamente la firmeza, elasticidad y calidad de la piel. Una alternativa para abordar la flacidez y determinados signos del envejecimiento cutáneo.",
      },
      {
        name: "Enzimas faciales",
        tagline: "Tratamientos personalizados para mejorar el contorno facial.",
        description:
          "Procedimientos inyectables orientados a tratar determinadas acumulaciones de grasa localizada, dependiendo de la formulación utilizada. Su indicación requiere una evaluación médica individual y la selección de productos adecuados.",
      },
      {
        name: "Biorevitalización facial",
        tagline: "Una piel que refleja vitalidad y frescura.",
        description: `Tratamientos enfocados en mejorar la hidratación, textura, luminosidad y calidad de la piel mediante la aplicación de productos seleccionados según sus necesidades.

Ideales para quienes buscan una piel con apariencia más saludable y revitalizada, sin modificar sus rasgos faciales.`,
      },
      {
        name: "Limpieza facial con Hydrafacial",
        tagline: "Limpieza profunda, hidratación y cuidado de tu piel.",
        description: `Procedimiento de limpieza facial asistido por tecnología que combina exfoliación, extracción de impurezas e hidratación, de acuerdo con las necesidades de cada tipo de piel.

Ayuda a mejorar la sensación de limpieza, suavidad y luminosidad, ofreciendo una experiencia de cuidado facial confortable.`,
      },
    ],
    image: "/images/servicio-estetica.webp",
    imageAlt: "Médica estética con bata y guantes marcando el rostro de una paciente antes del tratamiento",
    whatsappMessage: "Hola Almavia, quisiera información sobre los tratamientos de medicina estética.",
  },
  {
    id: "medicina-regenerativa",
    category: "Medicina regenerativa y bienestar",
    title: "Renovación y vitalidad,",
    highlight: "con respaldo médico.",
    intro:
      "Ofrecemos procedimientos orientados a acompañar el cuidado de la piel y atender necesidades específicas de salud y bienestar, con protocolos individualizados y supervisión médica.",
    treatments: [
      {
        name: "Plasma rico en plaquetas (PRP)",
        tagline: "Aprovechamos los componentes naturales de tu organismo.",
        description: `Procedimiento que utiliza plasma obtenido de la propia sangre del paciente, con una concentración de plaquetas que contienen factores de crecimiento.

Se emplea en determinados protocolos de rejuvenecimiento cutáneo y cuidado capilar, con el objetivo de favorecer procesos de reparación tisular y mejorar algunas características de la piel.`,
      },
      {
        name: "Sueroterapia intravenosa",
        tagline: "Atención personalizada para tus necesidades de salud.",
        description: `Administración intravenosa de soluciones que pueden contener vitaminas, minerales y otros componentes, cuando existe una indicación médica específica.

Cada protocolo se determina mediante una evaluación clínica, considerando las necesidades individuales, los antecedentes de salud y la seguridad del paciente.`,
      },
    ],
    image: "/images/servicio-regenerativa.webp",
    imageAlt: "Manos con guantes sosteniendo un tubo de plasma rico en plaquetas junto a una centrífuga",
    desktopImage: "/images/servicio-sueroterapia.webp",
    desktopImageAlt:
      "Paciente recibiendo sueroterapia intravenosa, con un suero de vitaminas y viales junto a la profesional",
    whatsappMessage: "Hola Almavia, quisiera información sobre medicina regenerativa y bienestar.",
  },
  {
    id: "medicina-estetica-corporal",
    category: "Medicina estética corporal",
    title: "Tecnología y cuidado médico",
    highlight: "para tu bienestar corporal.",
    intro: `Combinamos aparatología especializada y procedimientos médicos para abordar la grasa localizada, la apariencia de la piel y el contorno corporal.

Nuestros tratamientos se adaptan a las características y objetivos de cada paciente.`,
    treatments: [
      {
        name: "Reducción de medidas",
        tagline: "Define tu contorno corporal con un enfoque personalizado.",
        description:
          "Programas que combinan diferentes tecnologías y procedimientos orientados al tratamiento de la adiposidad localizada y la mejora del contorno corporal, según evaluación individual.",
      },
      {
        name: "Heccus Turbo",
        tagline: "Tecnología para el contorno corporal.",
        description:
          "Equipo de aparatología corporal que combina tecnologías como ultrasonido y corrientes eléctricas, utilizadas en protocolos estéticos para trabajar zonas con grasa localizada y complementar programas de remodelación corporal.",
      },
      {
        name: "Radiofrecuencia corporal",
        tagline: "Cuidado de la firmeza y la apariencia de la piel.",
        description:
          "Tecnología que genera calentamiento controlado de los tejidos, utilizada en procedimientos estéticos orientados a mejorar la apariencia de la flacidez cutánea y complementar tratamientos de contorno corporal.",
      },
      {
        name: "Enzimas lipolíticas",
        tagline: "Tratamiento focalizado para zonas específicas.",
        description: `Procedimientos inyectables dirigidos al manejo de determinadas acumulaciones de grasa localizada, según el producto empleado y su indicación médica.

Su aplicación está sujeta a una evaluación individual de seguridad, idoneidad y expectativas.`,
      },
    ],
    image: "/images/servicio-estetica-corporal.webp",
    imageAlt: "Profesional con bata aplicando un equipo de radiofrecuencia sobre el abdomen de una paciente",
    whatsappMessage: "Hola Almavia, quisiera información sobre los tratamientos de medicina estética corporal.",
  },
  {
    id: "psicologia",
    category: "Psicología y bienestar emocional",
    title: "Tu bienestar emocional",
    highlight: "también merece atención.",
    intro: `En ALMAVIA entendemos que cuidar de uno mismo implica atender tanto la salud física como la emocional.

Brindamos un espacio de escucha, acompañamiento y orientación profesional, donde cada persona pueda comprender sus emociones, fortalecer sus recursos personales y trabajar en su bienestar psicológico.`,
    treatments: [
      {
        name: "Terapia psicológica individual",
        tagline: "Un espacio seguro para escucharte y comprenderte.",
        description:
          "Sesiones personalizadas que permiten abordar dificultades emocionales, situaciones de estrés, ansiedad, autoestima, relaciones interpersonales y otros desafíos de la vida cotidiana.",
      },
      {
        name: "Acompañamiento emocional",
        tagline: "Herramientas para afrontar los desafíos de cada etapa.",
        description:
          "Atención psicológica orientada al desarrollo de recursos emocionales, el autoconocimiento y el fortalecimiento de estrategias saludables para afrontar situaciones personales.",
      },
      {
        name: "Autoestima y bienestar personal",
        tagline: "Construye una relación más saludable contigo mismo.",
        description:
          "Sesiones orientadas a fortalecer la autoestima, trabajar la autoimagen, reconocer necesidades emocionales y promover el bienestar personal.",
      },
      {
        name: "Desarrollo organizacional",
        tagline: "Acompañamos a equipos y organizaciones en su proceso.",
        description:
          "Acompañamiento psicológico orientado al clima laboral, la comunicación, el liderazgo y el bienestar en el trabajo, con un enfoque humano y personalizado.",
      },
    ],
    image: "/images/servicio-psicologia.webp",
    imageAlt: "Sesión de terapia psicológica en un consultorio cálido, con la paciente sentada en un sillón verde salvia",
    whatsappMessage: "Hola Almavia, quisiera información sobre la atención en psicología.",
  },
  {
    id: "salud-digestiva",
    category: "Salud digestiva y bienestar metabólico",
    title: "Tu bienestar comienza",
    highlight: "desde el interior.",
    intro: `En ALMAVIA abordamos la salud digestiva, el metabolismo y el control del peso desde una perspectiva médica integral.

Nuestra atención busca comprender los factores que influyen en la salud de cada paciente y desarrollar estrategias personalizadas, sostenibles y basadas en evidencia científica.`,
    treatments: [
      {
        name: "Evaluación y manejo integral del sobrepeso y la obesidad",
        tagline: "Mucho más que perder peso: mejorar tu salud.",
        description: `Evaluación médica orientada a identificar factores metabólicos, digestivos y clínicos relacionados con el exceso de peso.

Diseñamos estrategias individualizadas que pueden incluir modificaciones del estilo de vida, seguimiento médico y tratamiento farmacológico cuando corresponda.`,
      },
      {
        name: "Tratamiento médico con agonistas del receptor GLP-1",
        tagline: "Un enfoque médico para el control del peso.",
        description: `En pacientes que cumplen criterios clínicos, determinados medicamentos basados en incretinas, como los agonistas del receptor GLP-1, pueden formar parte de un programa integral de tratamiento del sobrepeso y la obesidad.

Su indicación requiere evaluación médica, selección adecuada del paciente y seguimiento de la respuesta y posibles efectos adversos.`,
      },
      {
        name: "Evaluación de la salud metabólica",
        tagline: "Comprender tu metabolismo es parte de cuidar tu salud.",
        description:
          "Atención médica orientada a evaluar factores relacionados con el peso, la glucosa, los lípidos y otros indicadores de salud cardiometabólica, con el objetivo de identificar riesgos y orientar medidas de prevención y tratamiento.",
      },
      {
        name: "Salud digestiva",
        tagline: "Una buena salud digestiva contribuye a tu bienestar general.",
        description:
          "Evaluación especializada de síntomas y trastornos del aparato digestivo, con un abordaje individualizado orientado al diagnóstico, tratamiento y seguimiento de las condiciones gastrointestinales.",
      },
      {
        name: "Seguimiento médico y mantenimiento del peso",
        tagline: "El objetivo no es solo alcanzar resultados, sino mantener hábitos saludables.",
        description:
          "Acompañamiento médico para evaluar la evolución del tratamiento, ajustar estrategias y favorecer cambios sostenibles que contribuyan al bienestar y la salud a largo plazo.",
      },
    ],
    image: "/images/servicio-digestiva.webp",
    imageAlt: "Médica con estetoscopio explicando a una paciente con un modelo anatómico del aparato digestivo",
    whatsappMessage: "Hola Almavia, quisiera información sobre salud digestiva y bienestar metabólico.",
  },
];
