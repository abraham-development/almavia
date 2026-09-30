import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

// Paleta del brandbook ALMAVIA
const TIERRA = "#5B4739";
const AURA = "202, 169, 146"; // #CAA992
const ESENCIA = "234, 226, 210"; // #EAE2D2

export const heroLoopSchema = z.object({
  images: z.array(z.string()).min(2),
  /** Posición del recorte (object-position), útil para la versión vertical. */
  focus: z.string(),
});

export type HeroLoopProps = z.infer<typeof heroLoopSchema>;

export const SLIDE_FRAMES = 105; // 3,5 s por imagen a 30 fps
export const WIPE_FRAMES = 45; // 1,5 s de barrido
const FEATHER = 14; // ancho del borde difuso del barrido, en %
const ANGLE = -100; // el barrido avanza de derecha a izquierda, como la cortina de la web

/**
 * Loop perfecto: cada imagen vive en una línea de tiempo circular y entra con un
 * barrido diagonal de borde suave acompañado por un destello de luz crema, más un
 * zoom que se asienta. El último fotograma empalma con el primero, así el
 * <video loop> de la web no tiene cortes.
 */
export const HeroLoop: React.FC<HeroLoopProps> = ({ images, focus }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const life = SLIDE_FRAMES + WIPE_FRAMES;

  // Progreso del barrido de la imagen que está entrando (null si no hay transición).
  let wipe: number | null = null;

  const layers = images.map((src, i) => {
    const local = (frame - i * SLIDE_FRAMES + durationInFrames) % durationInFrames;
    if (local >= life) return null;

    const progress = interpolate(local, [0, WIPE_FRAMES], [0, 1], {
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.77, 0, 0.175, 1),
    });
    if (local < WIPE_FRAMES) wipe = progress;

    // Posición del borde: de -FEATHER a 100+FEATHER para revelar por completo.
    const edge = -FEATHER + progress * (100 + FEATHER * 2);
    const mask =
      progress >= 1
        ? undefined
        : `linear-gradient(${ANGLE}deg, #000 ${edge - FEATHER}%, transparent ${edge + FEATHER}%)`;

    const scale = interpolate(local, [0, WIPE_FRAMES + 20, life], [1.22, 1.07, 1.02], {
      easing: Easing.out(Easing.cubic),
    });
    // Deriva alterna para que cada imagen se mueva distinto.
    const drift = interpolate(local, [0, life], [i % 2 === 0 ? -2 : 2, 0]);

    return (
      <AbsoluteFill
        key={src}
        style={{ zIndex: life - local, maskImage: mask, WebkitMaskImage: mask }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: focus,
            transform: `scale(${scale}) translateX(${drift}%)`,
          }}
        />
      </AbsoluteFill>
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: TIERRA }}>
      {layers}
      {wipe !== null && <LightSweep progress={wipe} />}
      <LightLeak />
      <Grain />

      {/* Velo cálido suave; el contraste del texto lo da el overlay de la web. */}
      <AbsoluteFill
        style={{
          zIndex: 1000,
          background: `linear-gradient(180deg, rgba(${ESENCIA},0.06) 0%, rgba(91,71,57,0.18) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Banda de luz crema que viaja sobre el borde del barrido. */
const LightSweep: React.FC<{ progress: number }> = ({ progress }) => {
  const edge = -FEATHER + progress * (100 + FEATHER * 2);
  const strength = Math.sin(progress * Math.PI) * 0.55;
  return (
    <AbsoluteFill
      style={{
        zIndex: 998,
        mixBlendMode: "screen",
        background: `linear-gradient(${ANGLE}deg, transparent ${edge - 10}%, rgba(${ESENCIA},${strength}) ${edge}%, transparent ${edge + 10}%)`,
      }}
    />
  );
};

/** Destello de luz en Aura Cálida que orbita lentamente (periodo = duración total). */
const LightLeak: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = (frame / durationInFrames) * Math.PI * 2;
  const x = 70 + Math.cos(t) * 18;
  const y = 30 + Math.sin(t) * 14;
  const strength = 0.22 + Math.sin(t * 2) * 0.06;

  return (
    <AbsoluteFill
      style={{
        zIndex: 999,
        mixBlendMode: "soft-light",
        background: `radial-gradient(ellipse 55% 60% at ${x}% ${y}%, rgba(${AURA},${strength}) 0%, rgba(${AURA},0) 70%)`,
      }}
    />
  );
};

/** Grano de película sutil, cambia cada 2 fotogramas. */
const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 12;
  return (
    <AbsoluteFill style={{ zIndex: 1001, opacity: 0.07, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
