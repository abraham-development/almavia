"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { navLinks, site } from "@/lib/site";
import { CloseIcon } from "../icons";
import { SocialLinks } from "../SocialLinks";
import { WhatsAppButton } from "../WhatsAppButton";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="menu-movil"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      inert={!open}
      className={`fixed inset-0 z-[60] flex flex-col bg-tierra text-esencia transition-[opacity,visibility] duration-500 lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="label flex items-center gap-2 py-2 text-esencia"
        >
          <CloseIcon className="size-5" />
          Cerrar
        </button>
        <Image
          src="/brand/isotipo-crema.webp"
          alt=""
          width={480}
          height={553}
          sizes="48px"
          className="h-11 w-auto"
        />
      </div>

      <nav aria-label="Móvil" className="flex flex-1 flex-col justify-center px-8">
        <ul className="space-y-2">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-700 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <a
                href={link.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-2 font-serif text-5xl font-light text-esencia-50"
              >
                <span className="label text-brisa">0{i + 1}</span>
                <span className="transition-colors group-hover:text-aura">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-6 border-t border-esencia/15 px-8 py-8">
        <WhatsAppButton variant="light" className="w-full justify-center">
          Agendar por WhatsApp
        </WhatsAppButton>
        <div className="flex items-center justify-between">
          <p className="label text-esencia/70">
            {site.address.district} · {site.address.city}
          </p>
          <SocialLinks
            className="flex gap-3"
            linkClassName="flex size-10 items-center justify-center rounded-full bg-esencia-50"
            iconClassName="size-[18px]"
          />
        </div>
      </div>
    </div>
  );
}
