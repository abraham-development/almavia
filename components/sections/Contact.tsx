import { site } from "@/lib/site";
import { ClockIcon, MailIcon, PinIcon } from "../icons";
import { SocialLinks } from "../SocialLinks";
import { WhatsAppButton } from "../WhatsAppButton";

export function Contact() {
  const { address, hours } = site;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address.mapsQuery)}&output=embed`;

  return (
    <section id="contactanos" aria-labelledby="contacto-titulo" className="bg-esencia-50">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 sm:px-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-24 lg:py-28">
        <div>
          <p className="label text-raiz-profundo">Contáctanos</p>
          <h2
            id="contacto-titulo"
            className="mt-5 font-serif text-4xl font-light leading-tight sm:text-5xl"
          >
            La calma también <em className="italic text-aura-profundo">forma parte del tratamiento.</em>
          </h2>
          <p className="mt-6 max-w-md font-light leading-relaxed text-tierra/80 sm:text-lg">
            Escríbenos por WhatsApp y te ayudamos a encontrar el tratamiento ideal para ti. Te
            respondemos con gusto.
          </p>

          <dl className="mt-10 space-y-6">
            <div className="flex gap-4">
              <dt>
                <PinIcon className="mt-0.5 size-5 text-raiz" />
                <span className="sr-only">Dirección</span>
              </dt>
              <dd className="font-light">
                {address.street}
                <br />
                {address.district}, {address.city} — {address.country}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <ClockIcon className="mt-0.5 size-5 text-raiz" />
                <span className="sr-only">Horario</span>
              </dt>
              <dd className="font-light">
                {hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt>
                <MailIcon className="mt-0.5 size-5 text-raiz" />
                <span className="sr-only">Correo</span>
              </dt>
              <dd className="font-light">
                <a href={`mailto:${site.email}`} className="hover:text-raiz">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>

          <WhatsAppButton variant="solid" className="mt-10">
            Agendar mi cita por WhatsApp
          </WhatsAppButton>

          <div className="mt-12 border-t border-tierra/15 pt-8">
            <p className="label text-raiz-profundo">Síguenos</p>
            <SocialLinks
              withLabels
              className="mt-4 flex flex-wrap gap-3"
              linkClassName="label flex items-center gap-2.5 border border-tierra/25 px-5 py-3 text-tierra hover:border-(--brand)"
              iconClassName="size-[18px]"
            />
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden bg-brisa lg:min-h-full">
          <iframe
            title={`Mapa de ubicación de Almavia en ${address.district}, ${address.city}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 grayscale-[35%] sepia-[20%]"
          />
        </div>
      </div>
    </section>
  );
}
