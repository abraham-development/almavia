import Image from "next/image";
import { services } from "@/data/services";
import { WhatsAppButton } from "../WhatsAppButton";

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-esencia-50">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
        <p className="label text-raiz-profundo">Nuestros servicios</p>
        <h2
          id="servicios-titulo"
          className="mt-5 font-serif text-4xl font-light leading-tight text-tierra sm:text-5xl lg:text-6xl"
        >
          Belleza que conecta <em className="italic text-aura-profundo">con tu esencia</em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-tierra/80 sm:text-lg">
          Cada tratamiento se diseña a tu medida, desde la escucha y el respeto por tu proceso,
          integrando estética, salud y bienestar emocional.
        </p>
      </div>

      {/* Fila de imágenes a sangre, como aquamed.pe */}
      <ul className="grid gap-px bg-esencia md:grid-cols-3">
        {services.map((service) => (
          <li key={service.id} id={service.id} className="group relative isolate overflow-hidden">
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-tierra-900/95 via-tierra-900/65 via-50% to-transparent"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-7 text-esencia-50 sm:p-9">
              <p className="label text-esencia">{service.category}</p>
              <h3 className="mt-3 font-serif text-3xl font-light sm:text-4xl">{service.title}</h3>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-esencia/90">
                {service.description}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm font-light text-esencia/90">
                {service.treatments.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden className="size-1 shrink-0 rounded-full bg-aura" />
                    {t}
                  </li>
                ))}
              </ul>
              <WhatsAppButton
                variant="outline-light"
                message={service.whatsappMessage}
                className="mt-7 !px-5 !py-3"
                ariaLabel={`Consultar por WhatsApp sobre ${service.category.toLowerCase()}`}
              >
                Consultar
              </WhatsAppButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
