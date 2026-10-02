"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import type { TeamMember } from "@/data/team";

// Borde que se ilumina: una luz dorada recorre el borde en loop mientras la card está activa.
// Con mouse se activa al pasar el cursor; en pantallas táctiles, al cruzar el centro de la pantalla.
export function TeamCard({ member }: { member: TeamMember }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card || !window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        card.dataset.active = String(entry.isIntersecting);
      },
      // franja central del viewport: solo una card a la vez
      { rootMargin: "-45% 0px -45% 0px" },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  function setActive(e: PointerEvent<HTMLElement>, active: boolean) {
    if (e.pointerType === "touch") return;
    e.currentTarget.dataset.active = String(active);
  }

  return (
    <article
      ref={ref}
      data-active="false"
      onPointerEnter={(e) => setActive(e, true)}
      onPointerLeave={(e) => setActive(e, false)}
      className="team-card group relative isolate h-full"
    >
      {/* halo exterior y filete luminoso: capas detrás de la card, solo asoman por el borde */}
      <span aria-hidden className="team-glow team-glow-halo" />
      <span aria-hidden className="team-glow team-glow-edge" />

      <div className="relative flex h-full flex-col bg-esencia">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={member.image}
            alt={member.imageAlt}
            fill
            sizes="(min-width: 1152px) 352px, (min-width: 768px) 30vw, 384px"
            className="object-cover transition-transform duration-[1500ms] ease-out group-data-[active=true]:scale-105"
          />
          {/* filete interior claro, como un passe-partout */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 border border-esencia-50/50"
          />
        </div>

        <div className="flex flex-1 flex-col px-7 pb-9 pt-7">
          {member.name && (
            <h4 className="font-serif text-2xl font-light leading-snug sm:text-3xl">{member.name}</h4>
          )}
          <p className={`label text-aura-profundo ${member.name ? "mt-2" : ""}`}>
            {member.role ?? "Equipo Almavia"}
          </p>
          <span aria-hidden className="mt-5 block h-px w-10 bg-aura" />
          {member.bio ? (
            <p className="mt-5 font-light leading-relaxed text-tierra/85">{member.bio}</p>
          ) : (
            <p className="mt-5 font-serif text-lg font-light italic text-tierra/60">
              Biografía próximamente.
            </p>
          )}
        </div>
      </div>

      <span aria-hidden className="team-glow team-glow-inner" />
    </article>
  );
}
