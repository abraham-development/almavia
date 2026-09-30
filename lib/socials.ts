import { siFacebook, siInstagram, siWhatsapp, type SimpleIcon } from "simple-icons";
import { site } from "./site";
import { buildWhatsAppUrl } from "./whatsapp";

export type SocialLink = {
  name: string;
  href: string;
  /** Ícono oficial de Simple Icons (https://github.com/simple-icons/simple-icons). */
  icon: SimpleIcon;
};

// Orden de prioridad de las redes de Almavia.
export const socialLinks: SocialLink[] = [
  { name: "WhatsApp", href: buildWhatsAppUrl(), icon: siWhatsapp },
  { name: "Facebook", href: site.socials.facebook, icon: siFacebook },
  { name: "Instagram", href: site.socials.instagram, icon: siInstagram },
];
