// Recorta el logotipo vertical oficial en isotipo y wordmark para armar la
// versión horizontal del header, y genera la variante crema (permitida por el
// brandbook sobre fondos Tierra Íntima / Raíz Serena) y los íconos de la app.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "recursos_internos/Logotipo_almavia.png";
const OUT = "public/brand";
const CREAM = { r: 0xea, g: 0xe2, b: 0xd2 };
const ESENCIA = "#EAE2D2";

// Bandas verticales medidas sobre el canal alfa del PNG (1122×1402).
const BANDS = {
  isotipo: { top: 64, bottom: 1080 },
  wordmark: { top: 1095, bottom: 1352 }, // ALMAVIA® + "ESTÉTICA Y SALUD INTEGRAL"
};

await mkdir(OUT, { recursive: true });
const { width } = await sharp(SRC).metadata();

async function band({ top, bottom }) {
  // sharp aplica trim antes que extract dentro de un mismo pipeline, por eso van separados.
  const slice = await sharp(SRC)
    .extract({ left: 0, top, width, height: bottom - top + 1 })
    .png()
    .toBuffer();
  return sharp(slice).trim({ threshold: 1 }).png().toBuffer();
}

async function toCream(buf) {
  // Conserva el alfa (trazo) y reemplaza el color por Esencia Serena.
  const { width: w, height: h } = await sharp(buf).metadata();
  const alpha = await sharp(buf).extractChannel("alpha").toBuffer();
  return sharp({ create: { width: w, height: h, channels: 3, background: CREAM } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

async function write(buf, name, targetWidth) {
  const img = sharp(buf).resize({ width: targetWidth, withoutEnlargement: true });
  await img.clone().png({ compressionLevel: 9 }).toFile(`${OUT}/${name}.png`);
  await img.clone().webp({ quality: 92 }).toFile(`${OUT}/${name}.webp`);
  const meta = await sharp(`${OUT}/${name}.png`).metadata();
  console.log(`✓ ${name} ${meta.width}×${meta.height}`);
}

const isotipo = await band(BANDS.isotipo);
const wordmark = await band(BANDS.wordmark);

await write(isotipo, "isotipo", 480);
await write(wordmark, "wordmark", 900);
await write(await toCream(isotipo), "isotipo-crema", 480);
await write(await toCream(wordmark), "wordmark-crema", 900);
await write(await sharp(SRC).trim({ threshold: 1 }).png().toBuffer(), "logo-vertical", 800);

// Íconos: isotipo centrado sobre Esencia Serena.
async function icon(path, size) {
  const inner = Math.round(size * 0.78);
  const iso = await sharp(isotipo).resize({ height: inner, width: inner, fit: "inside" }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: ESENCIA } })
    .composite([{ input: iso, gravity: "center" }])
    .png()
    .toFile(path);
  console.log(`✓ ${path}`);
}
await icon("app/icon.png", 512);
await icon("app/apple-icon.png", 180);
