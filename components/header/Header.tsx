"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { NavBar } from "./NavBar";
import { TopBar } from "./TopBar";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Expone la altura real del header para el scroll-padding de las anclas.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${Math.round(entry.borderBoxSize[0].blockSize)}px`,
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        ref={ref}
        className={`sticky top-0 z-50 border-b border-tierra/10 bg-esencia/95 backdrop-blur-md transition-shadow duration-500 ${
          compact ? "shadow-[0_8px_30px_-18px_rgba(91,71,57,0.45)]" : ""
        }`}
      >
        <TopBar compact={compact} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
        <NavBar />
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
