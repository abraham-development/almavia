import Image from "next/image";
import { team } from "@/data/team";
import { TeamCard } from "./TeamCard";

const pillars = [
  {
    title: "Empatía",
    text: "Te escuchamos y acompañamos cada etapa de tu proceso, a tu ritmo.",
  },
  {
    title: "Confianza",
    text: "Respaldo profesional y un espacio seguro donde te sientes comprendida y valorada.",
  },
  {
    title: "Bienestar integral",
    text: "Estética, salud y equilibrio emocional en una misma experiencia de cuidado.",
  },
];

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-titulo" className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[720px]">
          <Image
            src="/images/nosotros-hombro.webp"
            alt="Detalle de hombro y clavícula con piel luminosa"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="relative flex items-center bg-esencia px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
          {/* "A" monumental translúcida, como la referencia móvil */}
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-8 select-none font-serif text-[28rem] leading-none text-tierra/[0.05] lg:text-[36rem]"
          >
            A
          </span>
          <div className="relative max-w-lg">
            <p className="label text-raiz-profundo">Sobre Almavia</p>
            <h2
              id="nosotros-titulo"
              className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl"
            >
              Más que una clínica, <em className="italic text-aura-profundo">una experiencia de cuidado.</em>
            </h2>
            <div className="mt-8 space-y-5 text-base font-light leading-relaxed text-tierra/85 sm:text-lg">
              <p>
                ALMAVIA nace de una visión integral del cuidado, donde la salud, la belleza y el
                bienestar emocional se conectan. Partimos de una valoración profesional y de tus
                objetivos para ofrecerte una atención personalizada que respete tu esencia.
              </p>
              <p>
                Creemos que cuidarte también significa escucharte, comprender cómo te sientes y
                respetar tu proceso. Por eso, te brindamos una atención profesional y cercana, en un
                espacio que invita a la calma y la confianza.
              </p>
            </div>

            <figure className="mt-10 border-l border-aura pl-6">
              <p className="label text-raiz-profundo">Nuestra misión</p>
              <blockquote className="mt-3 font-serif text-2xl font-light italic leading-snug">
                Brindarte atención integral y personalizada, cuidando tu salud física y emocional y
                realzando tu belleza natural, con criterio profesional, empatía y respeto.
              </blockquote>
            </figure>
          </div>
        </div>
      </div>

      <div className="bg-brisa">
        <ul className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-12 md:grid-cols-3 lg:py-20">
          {pillars.map((p, i) => (
            <li key={p.title} className="text-center md:text-left">
              <span className="font-serif text-2xl italic text-raiz-profundo">0{i + 1}</span>
              <h3 className="label mt-3 text-sm text-tierra">{p.title}</h3>
              <p className="mt-3 font-light leading-relaxed text-tierra">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div aria-labelledby="equipo-titulo" role="group" className="bg-esencia-50">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h3
              id="equipo-titulo"
              className="font-serif text-4xl font-light leading-tight sm:text-5xl"
            >
              Ellos son parte <em className="italic text-aura-profundo">del equipo Almavia.</em>
            </h3>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-tierra/80 text-balance sm:text-lg">
              Profesionales que te acompañan con criterio, cercanía y respeto por tu proceso.
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-sm gap-10 md:max-w-none md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-10">
            {team.map((member) => (
              <li key={member.id}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
