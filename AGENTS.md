<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Almavia — memoria del proyecto

Landing de **Almavia, estética y salud integral** (Lima). Una sola página en español (`lang="es"`, Open Graph `es_PE`). Abraham itera en código. La dirección y las redes ya son reales; los textos, el horario y el email siguen provisionales hasta que él los reemplace.

## Cómo usar y actualizar esta memoria

Este archivo es el contexto persistente entre sesiones. Léelo al empezar.

Al cerrar un cambio que deje una decisión, convención o corrección reutilizable, actualiza la sección que corresponda y añade una línea fechada en **Aprendizajes**. No registres ediciones triviales, ni secretos, ni el contenido de `.env.local`. El bloque `nextjs-agent-rules` de arriba lo reescribe `next dev`: no lo borres ni lo reescribas.

## Stack

- Next.js **16.3.6** (App Router, Turbopack) + React 19 + TypeScript estricto + Tailwind v4.
- Gestor: **pnpm 11.21.0** (`packageManager`). Alias `@/*` → raíz. `video/` está excluido del `tsconfig` de la landing.
- Íconos de redes: `simple-icons`. Recorte de marca e imágenes: `sharp`.
- Video del hero: proyecto Remotion 4 aparte en `video/`, instalado y ejecutado con **npm** (`pnpm video:studio`, `pnpm video:render`).

Antes de escribir código de Next, lee la guía relevante en `node_modules/next/dist/docs/`. El layout raíz usa `LayoutProps<"/">`.

## Arranque

```bash
pnpm install
pnpm dev          # http://localhost:3000  (carga .env.local)
```

No hay plantilla versionada: `.env.example` se eliminó en `alma1.3`. `.env*` está en `.gitignore` (la excepción `!.env.example` sigue, pero el archivo no existe). Las variables locales van en `.env.local`, que no se commitea. El `README.md` todavía dice `cp .env.example .env.local`; esa instrucción ya no aplica.

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Solo dígitos, con código de país (Perú `51`). No se muestra en la página. |
| `NEXT_PUBLIC_SITE_URL` | Canónica. Por defecto `https://almavia.pe`. |
| `APIMART_API_KEY` | Solo `pnpm images`. |
| `SEEDREAM_MODEL` | Por defecto `seedream-5-0-pro`. |

## Mapa

| Ruta | Qué es |
|---|---|
| `app/page.tsx` | Header → Hero → Servicios → Nosotros → Contacto → Footer → WhatsApp flotante + JSON-LD `BeautySalon`. |
| `app/layout.tsx`, `app/globals.css` | Fuentes, metadata, paleta y animaciones del hero. |
| `lib/site.ts` | Nombre, tagline, dirección, horario, email, redes, WhatsApp y `navLinks`. |
| `lib/whatsapp.ts` | `buildWhatsAppUrl()` → `https://wa.me/…`. |
| `lib/socials.ts` | Orden fijo: WhatsApp, Facebook, Instagram. |
| `data/services.ts` | Tres servicios (faciales, corporales, bienestar). |
| `data/team.ts` | Equipo en Nosotros: retrato 4:5, alt y `name`/`role`/`bio` opcionales. Se pinta con `components/sections/TeamCard.tsx`. |
| `data/slides.ts` | Slides del hero. El primero es `kind: "video"`; el resto, imagen. |
| `components/header/` | Header sticky, TopBar, NavBar, menú móvil, Logo. |
| `components/hero/` | Slider automático y video de fondo. |
| `components/sections/` | About, Services, Contact, Footer. |
| `recursos_internos/equipo/` | Fotos originales del equipo; `public/images/equipo-*.webp` son sus recortes 4:5 (800×1000). |
| `public/brand/` | Salida de `pnpm brand`. No editar a mano. |
| `public/images/` | WebP de la landing. `video/public/images/` son los JPG para Remotion. |
| `public/video/` | `hero-{landscape,portrait}.{mp4,webm,jpg}`. |
| `recursos_internos/Logotipo_almavia.png` | Logo vertical fuente. No publicar tal cual. |
| `scripts/prepare-brand.mjs` | Recorta isotipo y wordmark. |
| `scripts/generate-images.mjs` | Seedream → webp + jpg. |

Anclas: `#inicio`, `#servicios`, `#nosotros`, `#contactanos`.

## Marca

Paleta en `@theme` de `app/globals.css` (nombres del brandbook):

- Esencia Serena `#EAE2D2` (`esencia`, `esencia-50`)
- Aura Cálida `#CAA992` (`aura`; texto sobre claro: `aura-profundo`)
- Brisa Natural `#CDCFBE` (`brisa`)
- Armonía Vital `#AFB694` (`armonia`)
- Raíz Serena `#717F68` (`raiz`; texto sobre claro: `raiz-profundo`)
- Tierra Íntima `#5B4739` (`tierra`, `tierra-900`)

Tipografías libres que sustituyen al brandbook: **Cormorant Garamond** (`font-serif`, en lugar de Angelle / Monterchi) y **Jost** (`font-sans`, en lugar de Cocomat Pro). Títulos en serif light; el énfasis va en `<em>` con `text-aura-profundo`. Etiquetas de sección: clase `.label`.

El logo del header es horizontal y se arma con dos recortes del PNG vertical (`isotipo` + `wordmark`). No deformarlo ni recolorarlo en CSS. Sobre Tierra Íntima o Raíz Serena se usa la variante `*-crema` (Esencia Serena). `pnpm brand` también genera `app/icon.png` y `app/apple-icon.png` (isotipo centrado sobre Esencia Serena).

Íconos de marca: `BrandIcon` en `components/icons.tsx` pinta el path de Simple Icons. Instagram usa un degradado definido **una sola vez** en `BrandGradients`, montado en el layout. El `<defs>` no puede ir dentro de `display: none`, porque el navegador no lo pinta.

## Hero

`HeroSlider` no tiene controles. Transición «cortina» de **1800 ms**, alineada con `--animate-hero-*` en `globals.css`. El video dura **10500 ms** (debe coincidir con el loop de Remotion en `video/src/Root.tsx`: 3 imágenes × `SLIDE_FRAMES` a 30 fps). Cada imagen dura **7000 ms**.

El autoplay se detiene si la pestaña está oculta, si hay foco de teclado dentro del hero o si `prefers-reduced-motion: reduce`. El video elige `hero-portrait` bajo `(max-width: 1023px) and (orientation: portrait)` y `hero-landscape` en el resto. El poster va en el HTML inicial (LCP); el `<video>` se monta al hidratar.

El header sticky mide su altura con `ResizeObserver` y la publica en `--header-offset`. El hero y el `scroll-padding` de las anclas dependen de esa variable.

Composiciones Remotion: `HeroLoop` 1920×1080 y `HeroLoopPortrait` 1080×1920. Fotogramas de entrada: `images/hero-esencia.jpg`, `images/hero-ritual.jpg`, `images/espacio.jpg` (no son los slides de imagen de la landing).

## Convenciones de código

- Copy y comentarios en español. Componentes de servidor por defecto; `"use client"` solo en header, menú, hero, video, WhatsApp flotante y `TeamCard`.
- Datos de negocio solo en `lib/site.ts`. Un tratamiento nuevo entra en `data/services.ts` (imagen, alt y `whatsappMessage` propios). Un slide nuevo entra en `data/slides.ts`.
- Enlaces de WhatsApp siempre por `buildWhatsAppUrl` o `WhatsAppButton`. El número no se imprime en la UI.
- Imágenes de contenido con `next/image`. Fondos del hero: el sujeto hacia la derecha y aire a la izquierda, para el texto.
- Accesibilidad ya resuelta y hay que conservarla: `:focus-visible`, `prefers-reduced-motion`, anclas con `scroll-padding`, rail de redes solo desde `xl`.
- `pnpm images` sin flags solo genera lo que falta; `--force` regenera; `--only=a,b` filtra. Hace falta `APIMART_API_KEY`.
- No commitear `.env.local` ni recrear `.env.example` salvo que Abraham lo pida. No reescribir a mano `public/brand/`.

## Contenido provisional

Hasta que Abraham pase los datos reales, no los trates como finales: horario lun–vie 9:00–20:00 y sáb 9:00–14:00; `hola@almavia.pe`. Facebook e Instagram ya son reales (el JSON-LD solo publica `sameAs` que empiecen por `http`). El mapa embebe `site.address.mapsQuery`.

## Despliegue en Hostinger

- Web App: `https://darkgray-shrew-645074.hostingersite.com` hasta conectar el dominio definitivo.
- Fuente: `abraham-development/almavia`, rama `main`, con despliegue automático.
- Hostinger compila con Node 24, npm, script `build:hostinger` (`next build --webpack`) y salida `.next`. El desarrollo local conserva pnpm 11.21.0 y el script `build` con Turbopack.
- Variables de producción: `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_SITE_URL`; sus valores se configuran en Hostinger y no se versionan.
- Se usa `next.config.mjs`: el entorno de Hostinger no puede cargar el binario SWC nativo de Next 16 por su versión de glibc y el fallback WebAssembly falla al compilar `next.config.ts`.

## Aprendizajes

- **2026-09-29** — Landing de una página montada: paleta y logo del brandbook, hero con video Remotion, imágenes Seedream, WhatsApp y redes. Servidor local con `pnpm dev` en el puerto 3000.
- **2026-09-29** — Dirección real: Calle Los Pinos 156, Oficina 205-B, Miraflores. `address.unit` guarda la oficina y `mapsQuery` la omite para que el pin de Google Maps caiga en el edificio. Contacto enlaza «Cómo llegar» (`maps/dir/?api=1`).
- **2026-09-29** — Redes reales en `lib/site.ts`: Instagram `almavia.clinic` y la URL canónica del perfil de Facebook (`people/Almavia-Almavia/61590138785982/`; el enlace `share/1FqgKF9S8h` que pasó Abraham redirige ahí). Se guardan sin parámetros de rastreo (`stkn`, `mibextid`, `rdid`).
- **2026-09-29** — Despliegue Web Apps conectado a GitHub. Hostinger usa npm solo en producción para evitar el conflicto de Corepack con pnpm, `next.config.mjs` evita compilar la configuración con SWC y `build:hostinger` usa Webpack porque el fallback SWC WebAssembly de su plataforma no admite Turbopack.
- **2026-10-01** — Se eliminó `.env.example`. Las claves (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`, `APIMART_API_KEY`, `SEEDREAM_MODEL`) viven en `.env.local` en local y, las dos públicas, en el panel de Hostinger. No hay que volver a versionar una plantilla ni copiar valores al repositorio.
- **2026-10-02** — Bloque del equipo al final de `#nosotros` (después de los pilares), con tres retratos recortados a 4:5 y la cara a una altura y escala parecidas. Nombre, cargo y biografía son opcionales en `data/team.ts`: el `figcaption` solo aparece cuando hay datos. Abraham todavía no pasó nombres ni biografías. No lleva etiqueta de sección: el título «Ellos son parte del equipo Almavia.» ya lo nombra.
- **2026-10-02** — Cards del equipo: retrato arriba y, debajo, cargo y biografía. Mientras falten datos se muestran «Equipo Almavia» y «Biografía próximamente.». El borde se ilumina con un `conic-gradient` dorado (3 capas: halo difuso, filete exterior de 3px y filete interior de 2px enmascarado sobre la foto; Abraham pidió que se notara más) (las clases `.team-glow` en `globals.css`) girado por `--glow-angle`, registrada con `@property`. La luz recorre el borde en loop (4,5 s por vuelta) mientras la card está activa; Abraham pidió que no siguiera al cursor. Con mouse se activa al pasar el cursor por encima. En pantallas `(hover: none)`, un `IntersectionObserver` enciende la card que cruza la franja central del viewport. Con `prefers-reduced-motion`, el borde se enciende entero y sin movimiento. Los tonos oscuros de Aura se leen como sombra sobre fondo crema: usar oro claro.
