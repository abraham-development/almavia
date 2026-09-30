"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Botón flotante de WhatsApp que aparece al salir del hero. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.7)] transition-all duration-500 hover:scale-105 sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
