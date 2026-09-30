import type { CSSProperties } from "react";
import { socialLinks } from "@/lib/socials";
import { BrandIcon } from "./icons";

type Props = {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
  /** Muestra el nombre de la red junto al ícono. */
  withLabels?: boolean;
};

/**
 * Lista de redes (WhatsApp, Facebook, Instagram) con los íconos oficiales de
 * Simple Icons, siempre en el color de su marca. `--brand` queda disponible para
 * estilos de hover (p. ej. el borde).
 */
export function SocialLinks({
  className = "",
  linkClassName = "",
  iconClassName = "size-5",
  withLabels = false,
}: Props) {
  return (
    <ul className={className}>
      {socialLinks.map(({ name, href, icon }) => {
        const external = href.startsWith("http");
        return (
          <li key={name}>
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={withLabels ? undefined : name}
              style={{ "--brand": `#${icon.hex}` } as CSSProperties}
              className={`group transition-colors duration-300 ${linkClassName}`}
            >
              <BrandIcon
                icon={icon}
                colored
                className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${iconClassName}`}
              />
              {withLabels && <span>{name}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
