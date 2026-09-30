"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type Variant = "landscape" | "portrait";

type Props = {
  poster: Record<Variant, string>;
  /** Si es false el video se pausa (slide no visible o movimiento reducido). */
  playing: boolean;
};

const PORTRAIT_QUERY = "(max-width: 1023px) and (orientation: portrait)";

/**
 * Video de fondo renderizado con Remotion (video/src/HeroLoop.tsx).
 * Elige la versión vertical u horizontal según la pantalla; en SSR solo muestra el poster.
 */
export function HeroVideo({ poster, playing }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY);
    const update = () => setVariant(mq.matches ? "portrait" : "landscape");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !variant) return;
    if (playing) {
      // Arranca desde el inicio para que el loop coincida con la barra de progreso.
      video.currentTime = 0;
      video.play().catch(() => {});
    } else video.pause();
  }, [playing, variant]);

  return (
    <>
      {/* Poster en el HTML inicial (con dirección de arte): es el LCP mientras hidrata el video. */}
      <PosterPicture poster={poster} />
      {variant && (
        <video
          key={variant}
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          muted
          loop
          playsInline
          autoPlay={playing}
          preload="metadata"
          aria-hidden
          tabIndex={-1}
        >
          <source src={`/video/hero-${variant}.webm`} type="video/webm" />
          <source src={`/video/hero-${variant}.mp4`} type="video/mp4" />
        </video>
      )}
    </>
  );
}

function PosterPicture({ poster }: Pick<Props, "poster">) {
  const common = { alt: "", fetchPriority: "high" as const, loading: "eager" as const };
  const {
    props: { srcSet: portrait },
  } = getImageProps({ ...common, src: poster.portrait, width: 1080, height: 1920, sizes: "100vw" });
  const {
    props: { srcSet: landscape, ...rest },
  } = getImageProps({ ...common, src: poster.landscape, width: 1920, height: 1080, sizes: "100vw" });

  return (
    <picture>
      <source media={PORTRAIT_QUERY} srcSet={portrait} />
      <source srcSet={landscape} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt vacío llega desde getImageProps (decorativo) */}
      <img {...rest} className="absolute inset-0 size-full object-cover" />
    </picture>
  );
}
