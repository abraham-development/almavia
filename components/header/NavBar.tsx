"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";

/** Segundo nivel del header (solo escritorio): menú centrado con sección activa. */
export function NavBar() {
  const [active, setActive] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActive(`#${top.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Principal" className="hidden border-t border-tierra/10 lg:block">
      <ul className="mx-auto flex max-w-5xl items-center justify-center gap-16 py-3.5 xl:gap-24">
        {navLinks.map((link) => {
          const isActive = active === link.href;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive ? "location" : undefined}
                className="label group relative inline-block py-1 text-tierra/80 transition-colors hover:text-tierra aria-[current]:text-tierra"
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-aura transition-transform duration-500 group-hover:scale-x-100 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
