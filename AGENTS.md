<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Almavia — memoria del proyecto

Landing de **Almavia, estética y salud integral** (Lima). Una sola página en español (`lang="es"`, Open Graph `es_PE`). Abraham itera en código. La dirección, las redes y el equipo ya son reales. El horario y el email siguen provisionales hasta que él los reemplace.

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
| `NEXT_PUBLIC_SITE_URL` | Canónica. Por defecto `https://almavia.life`. |
| `APIMART_API_KEY` | Solo `pnpm images`. |
| `SEEDREAM_MODEL` | Por defecto `seedream-5-0-pro`. |

## Mapa

| Ruta | Qué es |
|---|---|
| `app/page.tsx` | Header → Hero → Servicios → Nosotros → Contacto → Footer → WhatsApp flotante + JSON-LD `MedicalClinic` (con `slogan`). |
| `app/layout.tsx`, `app/globals.css` | Fuentes, metadata, paleta y animaciones del hero. |
| `lib/site.ts` | Nombre, tagline, dirección, horario, email, redes, WhatsApp y `navLinks`. |
| `lib/whatsapp.ts` | `buildWhatsAppUrl()` → `https://wa.me/…`. |
| `lib/socials.ts` | Orden fijo: WhatsApp, Facebook, Instagram. |
| `data/services.ts` | Cinco áreas (medicina estética, regenerativa y bienestar, estética corporal, psicología, salud digestiva y metabólica), cada una con sus tratamientos (`name`, `tagline`, `description`). Texto redactado por Almavia. |
| `data/team.ts` | Equipo de `#nosotros`: cuatro fichas, en el orden del array. Campos opcionales y grilla en la sección Equipo. |
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

Composiciones Remotion: `HeroLoop` 1920×1080 y `HeroLoopPortrait` 1080×1920. Fotogramas de entrada: `images/hero-esencia.jpg`, `images/hero-sueroterapia.jpg`, `images/hero-diagnostico.jpg` (no son los slides de imagen de la landing). `imageFocus` (opcional) fija un recorte propio por imagen; en vertical, sueroterapia y diagnóstico usan `82% center`. Tras cada render, subir `VIDEO_VERSION` en `components/hero/HeroVideo.tsx` (el nombre del archivo no cambia y el navegador sirve el video viejo de caché).

## Equipo

Cuatro fichas en `data/team.ts`. El orden visual es el del array; los `id` no coinciden con la posición:

1. Dra. Etephany Caro Rivera (`integrante-2`, `equipo-2.webp`, traje blanco). Gerenta General | Anestesióloga | Medicina Estética. Biografía breve, en primera persona.
2. Dr. Richard Jhonatan Navarro (`integrante-3`, `equipo-3.webp`, bata blanca). Director Médico | Cirujano General | Médico Estético. Biografía breve, en primera persona.
3. Lic. Paola B. Gambarini Kristen (`integrante-1`, `equipo-1.webp`, recepción). Psicóloga Clínica y Organizacional. `focus`: Bienestar emocional, Crecimiento personal, Desarrollo organizacional.
4. Dra. Rocío M. Parrales (`integrante-4`, `equipo-4.webp`). Gastroenterología | Salud Digestiva y Bienestar Metabólico. Biografía en tercera persona, como la pasó Abraham.

Si faltan `role` o `bio`, la tarjeta muestra «Equipo Almavia» y «Biografía próximamente.». La biografía se parte en párrafos con una línea en blanco. `focus` se lista debajo, con un punto de Aura. La grilla es una columna en móvil, 2×2 desde `md` y una sola fila desde `xl` (`xl:grid-cols-4`, contenedor `max-w-7xl`). El borde dorado se ilumina en loop mientras la card está activa y no sigue al cursor (detalle en Aprendizajes, 2026-10-02).

## Convenciones de código

- Copy y comentarios en español. Componentes de servidor por defecto; `"use client"` solo en header, menú, hero, video, WhatsApp flotante y `TeamCard`.
- Datos de negocio solo en `lib/site.ts`. Un tratamiento nuevo entra en su área de `data/services.ts`; un área nueva lleva `whatsappMessage` propio y, si hay foto, `image` + `imageAlt`. Un slide nuevo entra en `data/slides.ts`.
- Enlaces de WhatsApp siempre por `buildWhatsAppUrl` o `WhatsAppButton`. El número no se imprime en la UI.
- Imágenes de contenido con `next/image`. Fondos del hero: el sujeto hacia la derecha y aire a la izquierda, para el texto.
- Accesibilidad ya resuelta y hay que conservarla: `:focus-visible`, `prefers-reduced-motion`, anclas con `scroll-padding`, rail de redes solo desde `xl`.
- `pnpm images` sin flags solo genera lo que falta; `--force` regenera; `--only=a,b` filtra. Hace falta `APIMART_API_KEY`.
- No commitear `.env.local` ni recrear `.env.example` salvo que Abraham lo pida. No reescribir a mano `public/brand/`.

## Contenido provisional

Hasta que Abraham pase los datos reales, no los trates como finales: horario lun–vie 9:00–20:00 y sáb 9:00–14:00; `hola@almavia.pe`. El equipo ya es real (sección Equipo). Facebook e Instagram ya son reales (el JSON-LD solo publica `sameAs` que empiecen por `http`). El mapa embebe `site.address.mapsQuery`.

## Despliegue en Hostinger

- Web App en producción: `https://almavia.life`. El DNS público ya resuelve, el certificado de Hostinger está activo y la redirección HTTP→HTTPS está encendida. El temporal `darkgray-shrew-645074.hostingersite.com` ya no es la canónica.
- No hay base de datos en la cuenta. El aviso de hPanel al cambiar el dominio («actualizar el dominio en la base de datos») no aplica: la URL vive en `NEXT_PUBLIC_SITE_URL`.
- `NEXT_PUBLIC_*` se incrusta en el build. Cambiar la canónica exige reemplazar el set completo de variables en Hostinger (sin borrar `NEXT_PUBLIC_WHATSAPP_NUMBER`) y lanzar un build nuevo. El valor de producción es `https://almavia.life`. El fallback del código, en `lib/site.ts`, es el mismo.
- El build de producción del 2026-10-14 salió de `main` (`alama1.4`, `642cede`) y solo incorporó esa canónica. El equipo de cuatro, la grilla 2×2, `equipo-4.webp` y el fallback de `lib/site.ts` siguen en el working tree: no se publican hasta que Abraham lo pida.
- Fuente: `abraham-development/almavia`, rama `main`, con despliegue automático. Usuario de hosting `u574572243`.
- Hostinger compila con Node 24, npm, script `build:hostinger` (`next build --webpack`) y salida `.next`. El desarrollo local conserva pnpm 11.21.0 y el script `build` con Turbopack.
- Variables de producción: `NEXT_PUBLIC_WHATSAPP_NUMBER` y `NEXT_PUBLIC_SITE_URL`; sus valores se configuran en Hostinger y no se versionan.
- Se usa `next.config.mjs`: el entorno de Hostinger no puede cargar el binario SWC nativo de Next 16 por su versión de glibc y el fallback WebAssembly falla al compilar `next.config.ts`.

## Aprendizajes

- **2026-09-29** — Landing de una página montada: paleta y logo del brandbook, hero con video Remotion, imágenes Seedream, WhatsApp y redes. Servidor local con `pnpm dev` en el puerto 3000.
- **2026-09-29** — Dirección real: Calle Los Pinos 156, Oficina 205-B, Miraflores. `address.unit` guarda la oficina y `mapsQuery` la omite para que el pin de Google Maps caiga en el edificio. Contacto enlaza «Cómo llegar» (`maps/dir/?api=1`).
- **2026-09-29** — Redes reales en `lib/site.ts`: Instagram `almavia.clinic` y la URL canónica del perfil de Facebook (`people/Almavia-Almavia/61590138785982/`; el enlace `share/1FqgKF9S8h` que pasó Abraham redirige ahí). Se guardan sin parámetros de rastreo (`stkn`, `mibextid`, `rdid`).
- **2026-09-29** — Despliegue Web Apps conectado a GitHub. Hostinger usa npm solo en producción para evitar el conflicto de Corepack con pnpm, `next.config.mjs` evita compilar la configuración con SWC y `build:hostinger` usa Webpack porque el fallback SWC WebAssembly de su plataforma no admite Turbopack.
- **2026-10-01** — Se eliminó `.env.example`. Las claves (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`, `APIMART_API_KEY`, `SEEDREAM_MODEL`) viven en `.env.local` en local y, las dos públicas, en el panel de Hostinger. No hay que volver a versionar una plantilla ni copiar valores al repositorio.
- **2026-10-02** — Bloque del equipo al final de `#nosotros` (después de los pilares), con retratos recortados a 4:5 y la cara a una altura y escala parecidas. Nombre, cargo, biografía y `focus` son opcionales en `data/team.ts`: la tarjeta solo muestra lo que exista. No lleva etiqueta de sección: el título «Ellos son parte del equipo Almavia.» ya lo nombra.
- **2026-10-02** — Cards del equipo: retrato arriba y, debajo, cargo y biografía. Mientras falten datos se muestran «Equipo Almavia» y «Biografía próximamente.». El borde se ilumina con un `conic-gradient` dorado (3 capas: halo difuso, filete exterior de 3px y filete interior de 2px enmascarado sobre la foto; Abraham pidió que se notara más) (las clases `.team-glow` en `globals.css`) girado por `--glow-angle`, registrada con `@property`. La luz recorre el borde en loop (4,5 s por vuelta) mientras la card está activa; Abraham pidió que no siguiera al cursor. Con mouse se activa al pasar el cursor por encima. En pantallas `(hover: none)`, un `IntersectionObserver` enciende la card que cruza la franja central del viewport. Con `prefers-reduced-motion`, el borde se enciende entero y sin movimiento. Los tonos oscuros de Aura se leen como sombra sobre fondo crema: usar oro claro.
- **2026-10-14** — Dominio definitivo `almavia.life`, ya con DNS público, certificado activo y redirección a HTTPS. No hay base de datos: el aviso de Hostinger al cambiar el dominio no aplica. La canónica es `NEXT_PUBLIC_SITE_URL` y Next la incrusta en el build. El correo sigue siendo `hola@almavia.pe`. El build publicado ese día es `alama1.4`; el equipo nuevo no iba en ese commit.
- **2026-10-14** — El `<body>` del layout lleva `suppressHydrationWarning`. La clase `expansion-alids-init` no es de Almavia: la inyecta el navegador o una extensión antes de hidratar y React la reportaba como mismatch. El aviso solo se silencia en esa etiqueta, no en los hijos.
- **2026-10-14** — Equipo completo, en este orden: Dra. Etephany Caro Rivera, Dr. Richard Jhonatan Navarro, Lic. Paola B. Gambarini Kristen (con `focus`) y Dra. Rocío M. Parrales (biografía en tercera persona). Grilla 2×2 desde `md`. El estado vigente está en la sección Equipo.
- **2026-10-14** — Almavia es un **centro médico estético integral** (médicos y psicología), no un spa: nada de masajes ni lenguaje de spa. Frase de marca: «Equilibramos tu bienestar. Realzamos tu esencia.» (`site.slogan`), título del primer slide y del Open Graph. Servicios rehechos en cinco áreas con el texto que pasó Abraham: cada área tiene presentación fija a la izquierda y tratamientos en `<details>` a la derecha, con ancla propia (`#medicina-estetica`, etc.) y chips de acceso bajo el título. La foto de cada área es opcional.
- **2026-10-14** — Fotos médicas generadas con Seedream (`hero-estetica`, `hero-metabolica`, `hero-emocional`, `servicio-{estetica,regenerativa,estetica-corporal,psicologia,digestiva}`); se borraron las de spa (`hero-facial`, `hero-corporal`, `hero-bienestar`, `servicio-facial`, `servicio-corporal`, `servicio-bienestar`; el corporal médico lleva otro nombre para no heredar la caché de `/_next/image`). Slides de imagen: medicina estética, salud digestiva y metabólica, bienestar emocional. En los prompts del hero hizo falta pedir «personas en el 40 % derecho, 60 % izquierdo pared crema vacía»: con «right half» Seedream invade el lado del texto. Open Graph y JSON-LD usan `hero-estetica`.
- **2026-10-14** — Equipo en `#nosotros`: los cuatro en una sola fila desde `xl` (contenedor `max-w-7xl`, nombre en `text-2xl`); en `md`–`lg`, 2×2; en móvil, una columna.
- **2026-10-14** — La intro de `#servicios` habla de un equipo multidisciplinario de medicina que trabaja en conjunto y abarca todas las áreas de la salud integral. No lista especialidades sueltas.
- **2026-10-14** — En `#psicologia`, además de terapia individual, acompañamiento emocional y autoestima, está el ítem Desarrollo organizacional.
- **2026-10-14** — `#medicina-regenerativa` tiene pocos tratamientos y en escritorio la columna derecha queda corta. `desktopImage` (`servicio-sueroterapia.webp`) llena ese hueco solo desde `lg`: paciente con suero de vitaminas y viales. En móvil no se muestra.
- **2026-10-14** — Las biografías de la Dra. Etephany y del Dr. Richard son un resumen de dos párrafos, para que no pesen más que las de Paola y Rocío. No restaurar el texto largo original.
- **2026-10-14** — Énfasis del hero en `text-aura-claro` (`#f2dcc6`, token nuevo): Aura Cálida se perdía sobre las paredes crema de las fotos (≈1,5:1). Degradado del hero más denso (`tierra-900` 85 % → 60 %) y sombra suave en el título: el peor punto del énfasis queda ≥3,2:1 en los tres slides de imagen. Aura sigue para detalles; sobre foto, `aura-claro`.
- **2026-10-14** — En el video del hero, `hero-ritual` (piedras, frascos y bol: se leía como spa) se cambió por `hero-sueroterapia` (paciente recibiendo sueroterapia y enfermera ajustando el gotero). Para cambiar un fotograma: generar la imagen (`pnpm images --only=…`), editar `video/src/Root.tsx` y correr `pnpm video:render` (≈1,5 min, regenera mp4/webm/jpg de las dos orientaciones). Revisar el recorte vertical: el zoom del loop recorta más de lo que sugiere `object-position`.
- **2026-10-14** — Video del hero sin imágenes de spa: se quitaron `hero-ritual` (piedras y bol, «las ollas») y `espacio` (recepción con sillón y jarrón). Loop actual: `hero-esencia` → `hero-sueroterapia` → `hero-diagnostico` (médica analizando la piel con un escáner y monitor). Abraham seguía viendo el video viejo por caché: de ahí `VIDEO_VERSION` como `?v=` en las fuentes del `<video>`.
