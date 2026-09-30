import { SocialLinks } from "./SocialLinks";

/** Rail vertical de redes sobre el hero (solo escritorio), inspirado en aquamed.pe. */
export function SocialRail() {
  return (
    <div className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
      <SocialLinks
        className="flex flex-col items-center gap-3"
        linkClassName="flex size-10 items-center justify-center rounded-full bg-esencia-50/95 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.5)] hover:bg-esencia-50"
        iconClassName="size-[18px]"
      />
      <span aria-hidden className="h-16 w-px bg-esencia-50/40" />
    </div>
  );
}
