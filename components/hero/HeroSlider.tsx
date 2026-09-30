"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { slides, type Slide } from "@/data/slides";
import { ArrowIcon } from "../icons";
import { SocialRail } from "../SocialRail";
import { WhatsAppButton } from "../WhatsAppButton";
import { HeroVideo } from "./HeroVideo";

const VIDEO_DELAY = 10_500; // duración del loop de Remotion (video/src/Root.tsx)
const IMAGE_DELAY = 7_000;
const TRANSITION_MS = 1_800; // igual que --animate-hero-* en globals.css
const delays = slides.map((s) => (s.kind === "video" ? VIDEO_DELAY : IMAGE_DELAY));

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function subscribeVisibility(cb: () => void) {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
}
const getHidden = () => document.hidden;

type Transition = { current: number; previous: number | null; count: number };

/**
 * Hero automático (sin controles) con transición "cortina": la nueva imagen se
 * revela con clip-path mientras la anterior retrocede con zoom y parallax.
 * Se detiene si la pestaña no está visible, si el usuario navega con teclado dentro
 * del hero o si prefiere movimiento reducido.
 */
export function HeroSlider() {
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, () => false);
  const [state, setState] = useState<Transition>({ current: 0, previous: null, count: 0 });
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const { current, previous, count } = state;

  // Autoplay: cada slide define su propia duración.
  useEffect(() => {
    if (reducedMotion || hidden || keyboardFocus) return;
    const t = setTimeout(
      () =>
        setState((s) => ({
          current: (s.current + 1) % slides.length,
          previous: s.current,
          count: s.count + 1,
        })),
      delays[current],
    );
    return () => clearTimeout(t);
  }, [current, reducedMotion, hidden, keyboardFocus]);

  // Limpia la capa saliente cuando termina la cortina.
  useEffect(() => {
    if (previous === null) return;
    const t = setTimeout(
      () => setState((s) => (s.count === count ? { ...s, previous: null } : s)),
      TRANSITION_MS + 100,
    );
    return () => clearTimeout(t);
  }, [previous, count]);

  return (
    <section
      id="inicio"
      aria-label="Destacados de Almavia"
      className="relative h-[calc(100svh-var(--header-offset,4.5rem))] max-h-[880px] min-h-[540px] overflow-hidden bg-tierra-900"
      // Pausa invisible para quien navega con teclado (accesibilidad); el mouse no la activa.
      onFocus={(e) => setKeyboardFocus(e.target.matches(":focus-visible"))}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardFocus(false)}
    >
      {slides.map((slide, i) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          index={i}
          role={i === current ? "current" : i === previous ? "previous" : "idle"}
          animate={count > 0 && !reducedMotion}
          activation={count}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Línea de luz que acompaña el borde de la cortina */}
      {count > 0 && !reducedMotion && (
        <span
          key={`edge-${count}`}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-30 w-px animate-hero-edge bg-esencia-50/80 shadow-[0_0_24px_4px_rgba(234,226,210,0.45)]"
        />
      )}

      <SocialRail />
    </section>
  );
}

type SlideRole = "current" | "previous" | "idle";

function HeroSlide({
  slide,
  index,
  role,
  animate,
  activation,
  reducedMotion,
}: {
  slide: Slide;
  index: number;
  role: SlideRole;
  animate: boolean;
  activation: number;
  reducedMotion: boolean;
}) {
  const Heading = index === 0 ? "h1" : "h2";
  const isCurrent = role === "current";

  // Capas: la actual arriba (revelándose), la saliente debajo, el resto oculto.
  const layer = isCurrent
    ? `z-20 ${animate ? "animate-hero-reveal" : ""}`
    : role === "previous"
      ? "z-10"
      : "invisible z-0";

  const media = isCurrent
    ? reducedMotion
      ? ""
      : "animate-hero-zoom"
    : role === "previous" && animate
      ? "animate-hero-leave"
      : "";

  return (
    <div
      role="group"
      aria-roledescription="diapositiva"
      aria-label={`${index + 1} de ${slides.length}`}
      aria-hidden={!isCurrent}
      inert={!isCurrent}
      className={`absolute inset-0 overflow-hidden ${layer}`}
    >
      {/* Sin key: cambiar de animación (zoom ↔ salida) la reinicia sin remontar el video. */}
      <div className={`absolute inset-0 will-change-transform ${media}`}>
        {slide.kind === "video" ? (
          <HeroVideo poster={slide.poster} playing={isCurrent && !reducedMotion} />
        ) : (
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            // En vertical la foto 16:9 cubre la altura: pedir un ancho acorde.
            sizes="(orientation: portrait) 180vh, 100vw"
            className="object-cover object-[70%_center]"
          />
        )}
      </div>

      {/* Velos de contraste en Tierra Íntima */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-tierra-900/85 via-tierra/35 to-tierra/10 lg:bg-gradient-to-r lg:from-tierra-900/75 lg:via-tierra/30 lg:to-transparent"
      />

      <div className="relative mx-auto flex h-full max-w-[1440px] items-end px-6 pb-24 sm:px-10 lg:items-center lg:px-24 lg:pb-0 xl:px-32">
        <div
          key={isCurrent ? `text-${activation}` : "text"}
          className={`max-w-xl text-esencia-50 transition-opacity duration-500 ${isCurrent ? "opacity-100" : "opacity-0"}`}
        >
          <Line delay={700} active={isCurrent} className="mb-5">
            <p className="label text-esencia">{slide.eyebrow}</p>
          </Line>
          <Heading className="font-serif text-5xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <Line delay={850} active={isCurrent} className="pb-1">
              {slide.title}
            </Line>{" "}
            <Line delay={1000} active={isCurrent} className="pb-2">
              <em className="font-normal italic text-aura">{slide.highlight}</em>
            </Line>
          </Heading>
          <Line delay={1200} active={isCurrent} className="mt-5">
            <p className="max-w-md text-base font-light leading-relaxed text-esencia/90 sm:text-lg">
              {slide.text}
            </p>
          </Line>
          <Line delay={1400} active={isCurrent} className="mt-8 pb-1">
            {slide.cta.whatsappMessage ? (
              <WhatsAppButton variant="light" message={slide.cta.whatsappMessage}>
                {slide.cta.label}
              </WhatsAppButton>
            ) : (
              <a
                href={slide.cta.href}
                className="label inline-flex items-center gap-3 border border-esencia-50/80 px-8 py-3.5 text-esencia-50 transition-colors duration-300 hover:bg-esencia-50 hover:text-tierra"
              >
                {slide.cta.label}
                <ArrowIcon className="size-4" />
              </a>
            )}
          </Line>
        </div>
      </div>
    </div>
  );
}

/** Línea de texto que sube desde una máscara, escalonada por `delay`. */
function Line({
  children,
  delay,
  active,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  active: boolean;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span
        className={`block ${active ? "animate-hero-line" : ""}`}
        style={active ? { animationDelay: `${delay}ms` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
