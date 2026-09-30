import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import { SocialLinks } from "../SocialLinks";

export function Footer() {
  return (
    <footer className="bg-tierra text-esencia">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 py-16 text-center sm:px-12 lg:py-20">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/brand/isotipo-crema.webp"
            alt=""
            width={480}
            height={553}
            sizes="80px"
            className="h-20 w-auto"
          />
          <Image
            src="/brand/wordmark-crema.webp"
            alt="Almavia — Estética y salud integral"
            width={900}
            height={224}
            sizes="200px"
            className="h-12 w-auto"
          />
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="label text-esencia/80 transition-colors hover:text-aura">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks
          className="flex gap-4"
          linkClassName="flex size-12 items-center justify-center rounded-full bg-esencia-50 transition-shadow hover:shadow-[0_0_0_3px_var(--brand)]"
          iconClassName="size-[18px]"
        />
      </div>

      <div className="border-t border-esencia/10">
        <div className="label mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-6 py-6 text-[0.65rem] text-esencia/85 sm:flex-row sm:px-12">
          <p>© {new Date().getFullYear()} Almavia. Todos los derechos reservados.</p>
          <p>
            {site.address.district} · {site.address.city} · {site.address.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
