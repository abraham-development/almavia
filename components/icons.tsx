import type { SVGProps } from "react";
import { siWhatsapp, type SimpleIcon } from "simple-icons";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 20,
  height: 20,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

const INSTAGRAM_GRADIENT_ID = "brand-instagram-gradient";

/**
 * Ícono de marca a partir de los trazos oficiales de Simple Icons (viewBox 24×24).
 * Con `colored` usa el color oficial de la marca (Instagram: su degradado).
 */
export function BrandIcon({
  icon,
  colored = false,
  ...props
}: IconProps & { icon: SimpleIcon; colored?: boolean }) {
  const fill = !colored
    ? "currentColor"
    : icon.slug === "instagram"
      ? `url(#${INSTAGRAM_GRADIENT_ID})`
      : `#${icon.hex}`;
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...base(props)}>
      <path d={icon.path} />
    </svg>
  );
}

/**
 * Definición única del degradado oficial de Instagram. Va una sola vez en el layout,
 * en un SVG de tamaño cero pero visible (un <defs> dentro de display:none no se pinta).
 */
export function BrandGradients() {
  return (
    <svg aria-hidden focusable={false} width="0" height="0" className="absolute">
      <defs>
        <radialGradient id={INSTAGRAM_GRADIENT_ID} cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="0.25" stopColor="#FF7A00" />
          <stop offset="0.5" stopColor="#FF0069" />
          <stop offset="0.75" stopColor="#D300C5" />
          <stop offset="1" stopColor="#7638FA" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return <BrandIcon icon={siWhatsapp} {...props} />;
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...base(props)}>
      <path d="M3 7h18M3 12h13M3 17h18" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...base(props)}>
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...base(props)}>
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...base(props)}>
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}
