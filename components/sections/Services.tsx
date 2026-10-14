import Image from "next/image";
import { services, type Service } from "@/data/services";
import { WhatsAppButton } from "../WhatsAppButton";

function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {text.split(/\n\n+/).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

// Un área por bloque: presentación fija a la izquierda y tratamientos desplegables a la derecha.
function ServiceArea({ service, index }: { service: Service; index: number }) {
  const titleId = `${service.id}-titulo`;
  return (
    <article
      id={service.id}
      aria-labelledby={titleId}
      className={`border-t border-tierra/10 ${index % 2 === 0 ? "bg-esencia" : "bg-esencia-50"}`}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-12 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:sticky lg:top-[calc(var(--header-offset,0px)+2.5rem)] lg:col-span-5 lg:self-start">
          <span className="font-serif text-2xl italic text-raiz-profundo">0{index + 1}</span>
          <p className="label mt-3 text-raiz-profundo">{service.category}</p>
          <h3
            id={titleId}
            className="mt-5 font-serif text-4xl font-light leading-tight text-tierra sm:text-5xl"
          >
            {service.title} <em className="italic text-aura-profundo">{service.highlight}</em>
          </h3>
          <Paragraphs
            text={service.intro}
            className="mt-6 space-y-4 text-base font-light leading-relaxed text-tierra/85 sm:text-lg"
          />
          {service.image && (
            <div className="relative mt-10 aspect-[4/5] max-w-sm overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt ?? ""}
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <WhatsAppButton
            message={service.whatsappMessage}
            className="mt-10"
            ariaLabel={`Consultar por WhatsApp sobre ${service.category.toLowerCase()}`}
          >
            Consultar
          </WhatsAppButton>
        </div>

        <ul className="divide-y divide-tierra/15 border-y border-tierra/15 lg:col-span-7">
          {service.treatments.map((treatment) => (
            <li key={treatment.name}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="block font-serif text-2xl font-light leading-snug text-tierra transition-colors group-hover:text-raiz-profundo sm:text-[1.75rem]">
                      {treatment.name}
                    </span>
                    <span className="mt-1.5 block font-serif text-lg italic text-aura-profundo">
                      {treatment.tagline}
                    </span>
                  </span>
                  {/* «+» que gira a «×» al abrir */}
                  <span
                    aria-hidden
                    className="relative mt-2 size-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-tierra" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-tierra" />
                  </span>
                </summary>
                <Paragraphs
                  text={treatment.description}
                  className="max-w-prose space-y-3 pb-7 font-light leading-relaxed text-tierra/85"
                />
              </details>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-esencia-50">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <p className="label text-raiz-profundo">Nuestros servicios</p>
        <h2
          id="servicios-titulo"
          className="mt-5 font-serif text-4xl font-light leading-tight text-tierra sm:text-5xl lg:text-6xl"
        >
          Medicina, estética y bienestar <em className="italic text-aura-profundo">en un mismo lugar.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-tierra/80 sm:text-lg">
          Un equipo médico y de psicología que trabaja en conjunto. Cada tratamiento parte de una
          evaluación profesional y se adapta a tu salud, tus objetivos y tu proceso.
        </p>

        <nav aria-label="Áreas de servicio" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="label inline-block border border-tierra/30 px-4 py-2.5 text-tierra transition-colors hover:border-tierra hover:bg-tierra hover:text-esencia-50"
                >
                  {service.category}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {services.map((service, i) => (
        <ServiceArea key={service.id} service={service} index={i} />
      ))}
    </section>
  );
}
