import { site } from "./site";

export function buildWhatsAppUrl(message: string = site.whatsapp.defaultMessage) {
  const number = site.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
