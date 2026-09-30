# Almavia — Landing

Landing de **Almavia, estética y salud integral**. Next.js 16 (App Router) + Tailwind v4, video del hero hecho con Remotion e imágenes generadas con APIMart (Seedream).

## Puesta en marcha

```bash
cp .env.example .env.local   # completa APIMART_API_KEY y NEXT_PUBLIC_WHATSAPP_NUMBER
pnpm install
npm --prefix video install   # proyecto Remotion
pnpm dev
```

## Flujo de assets

| Comando | Qué hace |
|---|---|
| `pnpm brand` | Recorta `recursos_internos/Logotipo_almavia.png` en isotipo y wordmark (versión horizontal y crema) y genera los íconos. |
| `pnpm images` | Genera las imágenes con Seedream (`--force` regenera, `--only=a,b` filtra). Deja webp en `public/images/` y jpg en `video/public/images/`. |
| `pnpm video:studio` | Abre Remotion Studio para editar `video/src/HeroLoop.tsx`. |
| `pnpm video:render` | Renderiza `public/video/hero-{landscape,portrait}.{mp4,webm,jpg}`. |

## Dónde editar

- Datos del negocio (WhatsApp, dirección, horario, redes): `lib/site.ts`
- Servicios: `data/services.ts`
- Slides del hero: `data/slides.ts`
- Paleta y tipografías (brandbook): `app/globals.css`, `app/layout.tsx`
