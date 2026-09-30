import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type Variant = "outline" | "outline-light" | "solid" | "light" | "underline" | "icon";

const variants: Record<Variant, string> = {
  outline:
    "border border-tierra/70 px-6 py-3.5 text-tierra hover:bg-tierra hover:text-esencia-50",
  "outline-light":
    "border border-esencia-50/80 px-6 py-3.5 text-esencia-50 hover:bg-esencia-50 hover:text-tierra",
  solid: "bg-tierra px-6 py-3.5 text-esencia-50 hover:bg-tierra-900",
  light: "bg-esencia-50 px-6 py-3.5 text-tierra hover:bg-esencia",
  underline:
    "border-b border-tierra/80 pb-1.5 text-tierra hover:border-aura hover:text-raiz",
  icon: "size-11 justify-center rounded-full border border-tierra/40 text-tierra hover:bg-tierra hover:text-esencia-50",
};

type Props = {
  message?: string;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
  /** Etiqueta accesible, obligatoria en la variante de solo ícono. */
  ariaLabel?: string;
};

export function WhatsAppButton({
  message,
  variant = "outline",
  className = "",
  children = "Agendar cita",
  ariaLabel,
}: Props) {
  const isIcon = variant === "icon";
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? (isIcon ? "Agendar cita por WhatsApp" : undefined)}
      className={`label inline-flex items-center gap-2.5 transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <WhatsAppIcon className={isIcon ? "size-5" : "size-4 shrink-0"} />
      {!isIcon && <span>{children}</span>}
    </a>
  );
}
