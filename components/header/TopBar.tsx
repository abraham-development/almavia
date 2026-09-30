import { MenuIcon } from "../icons";
import { WhatsAppButton } from "../WhatsAppButton";
import { Logo } from "./Logo";

type Props = {
  compact: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
};

/**
 * Primer nivel del header: logo centrado con columnas laterales simétricas.
 * Escritorio: [vacío | logo | WhatsApp]. Móvil: [hamburguesa | logo | WhatsApp].
 */
export function TopBar({ compact, menuOpen, onOpenMenu }: Props) {
  return (
    <div
      className={`mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 transition-[padding] duration-500 sm:px-6 lg:px-12 ${
        compact ? "py-2.5" : "py-3 lg:py-5"
      }`}
    >
      <div className="flex justify-start">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          aria-label="Abrir menú"
          className="label -ml-1 flex items-center gap-2.5 p-2 text-tierra lg:hidden"
        >
          <MenuIcon className="size-6" />
          <span className="hidden sm:inline">Menú</span>
        </button>
      </div>

      <Logo compact={compact} />

      <div className="flex justify-end">
        {/* Los wrappers controlan la visibilidad: el botón ya define su propio display. */}
        <span className="contents sm:hidden">
          <WhatsAppButton variant="icon" />
        </span>
        <span className="hidden sm:contents">
          <WhatsAppButton variant="underline">Agendar cita</WhatsAppButton>
        </span>
      </div>
    </div>
  );
}
