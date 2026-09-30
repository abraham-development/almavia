import Image from "next/image";
import Link from "next/link";

type Props = {
  compact?: boolean;
  tone?: "tierra" | "crema";
  className?: string;
};

/**
 * Versión horizontal del logotipo (isotipo + wordmark) armada con los recortes
 * oficiales del PNG de marca. No se deforma ni se recolorea: la variante crema es
 * la que el brandbook usa sobre fondos Tierra Íntima / Raíz Serena.
 */
export function Logo({ compact = false, tone = "tierra", className = "" }: Props) {
  const suffix = tone === "crema" ? "-crema" : "";
  return (
    <Link
      href="#inicio"
      aria-label="Almavia, estética y salud integral — ir al inicio"
      className={`flex items-center gap-2 transition-all duration-500 sm:gap-3 ${className}`}
    >
      <Image
        src={`/brand/isotipo${suffix}.webp`}
        alt=""
        width={480}
        height={553}
        sizes="64px"
        preload
        className={`w-auto transition-all duration-500 ${
          compact ? "h-10 lg:h-11" : "h-11 lg:h-[4.25rem]"
        }`}
      />
      <Image
        src={`/brand/wordmark${suffix}.webp`}
        alt="Almavia — Estética y salud integral"
        width={900}
        height={224}
        sizes="(min-width: 1024px) 200px, 170px"
        preload
        className={`w-auto transition-all duration-500 ${
          compact ? "h-9 lg:h-9" : "h-9 min-[380px]:h-10 lg:h-12"
        }`}
      />
    </Link>
  );
}
