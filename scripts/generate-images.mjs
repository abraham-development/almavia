// Genera las imágenes de la landing con APIMart (Seedream) y las deja listas para
// Next.js (public/images/*.webp) y para Remotion (video/public/images/*.jpg).
//
//   node scripts/generate-images.mjs                 # genera las que faltan
//   node scripts/generate-images.mjs --force         # regenera todas
//   node scripts/generate-images.mjs --only=hero-facial,servicio-facial
//
// Docs: https://docs.apimart.ai/en/api-reference/images/seedream-5-0-pro/generation
//       https://docs.apimart.ai/en/api-reference/tasks/status
import { config as loadEnv } from "dotenv";
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

loadEnv({ path: ".env.local", override: true });

const API = "https://api.apimart.ai/v1";
const KEY = process.env.APIMART_API_KEY;
const MODEL = process.env.SEEDREAM_MODEL ?? "seedream-5-0-pro";
const WEB_DIR = "public/images";
const VIDEO_DIR = "video/public/images";

if (!KEY) {
  console.error("Falta APIMART_API_KEY en .env.local");
  process.exit(1);
}

// Dirección de arte común, derivada del brandbook (paleta Esencia Serena, Aura Cálida,
// Brisa Natural, Armonía Vital, Raíz Serena y Tierra Íntima).
const STYLE = [
  "editorial fine-art beauty photography for a luxury holistic aesthetics clinic",
  "soft warm natural window light, gentle shadows, calm and serene mood",
  "muted earthy palette of warm cream (#EAE2D2), dusty rose nude (#CAA992), pale sage (#CDCFBE), sage green (#AFB694), deep olive green (#717F68) and warm cocoa brown (#5B4739)",
  "natural linen textures, eucalyptus and olive leaves, minimal elegant composition",
  "realistic skin texture, shallow depth of field, subtle film grain, shot on medium format camera",
  "no text, no letters, no logos, no watermark",
].join(", ");

const IMAGES = [
  // Hero: sujeto hacia la derecha para dejar aire al texto a la izquierda.
  {
    name: "hero-esencia",
    size: "16:9",
    width: 2400,
    prompt:
      "Serene Latina woman in her thirties in soft profile with eyes closed, luminous glowing skin, one hand gently touching her neck, hair tied back, bare shoulders, placed on the right third of the frame, wide empty warm cream wall on the left, a sprig of eucalyptus in soft focus",
  },
  {
    name: "hero-facial",
    size: "16:9",
    width: 2400,
    prompt:
      "Relaxed woman lying on a treatment bed with a soft sage green headband and linen towel, an aesthetician's gentle hands applying a facial serum with a soft brush, placed on the right half of the frame, calm spa treatment room with cream walls on the left",
  },
  {
    name: "hero-corporal",
    size: "16:9",
    width: 2400,
    prompt:
      "Close-up of a woman's bare back and shoulder receiving a gentle body treatment with warm botanical oil, therapist hands, draped linen towel in dusty rose tones, subject on the right side of the frame, soft creamy negative space on the left",
  },
  {
    name: "hero-bienestar",
    size: "16:9",
    width: 2400,
    prompt:
      "Radiant Latina woman in her thirties with natural glowing skin and a soft genuine smile, wrapped in a plush cream spa robe, hair in a loose low bun, looking gently over her shoulder toward the camera, golden hour sunlight streaming through a large window creating warm glow on her face, blurred olive branches and sage linen curtains in the background, placed on the right third of the frame, soft creamy negative space on the left, confident and serene, luxury wellness campaign",
  },
  {
    name: "hero-ritual",
    size: "16:9",
    width: 2400,
    prompt:
      "Spa still life on a linen covered table: smooth river stones, a round wooden jar, amber glass dropper bottles, a ceramic bowl with botanical oil, dried eucalyptus branches, soft leaf shadows on a cream wall, composition weighted to the right",
  },
  {
    name: "espacio",
    size: "16:9",
    width: 2400,
    prompt:
      "Interior of a calm boutique aesthetics clinic reception: arched doorway, limewashed cream walls, sage green velvet armchair, light oak wood counter, dried pampas and olive branches in a ceramic vase, warm afternoon sunlight",
  },
  // Nosotros: detalle de clavícula como en el brandbook (p. 26).
  {
    name: "nosotros-hombro",
    size: "3:4",
    width: 1400,
    prompt:
      "Intimate close-up of a woman's neck, collarbone and bare shoulder, glowing healthy skin, warm cocoa brown background, sculptural soft light, elegant and sensual but modest",
  },
  // Tarjetas de servicios (vertical).
  {
    name: "servicio-facial",
    size: "3:4",
    width: 1400,
    prompt:
      "Woman with eyes closed receiving a gentle facial treatment, gloved aesthetician hands with a jade gua sha stone, sage green towel, dusty rose backdrop, portrait orientation",
  },
  {
    name: "servicio-corporal",
    size: "3:4",
    width: 1400,
    prompt:
      "Woman's waist and hip draped in cream linen towel during a body contouring and lymphatic drainage treatment, therapist hands, warm dusty rose light, portrait orientation",
  },
  {
    name: "servicio-bienestar",
    size: "3:4",
    width: 1400,
    prompt:
      "Hands of a woman holding a ceramic cup of herbal tea next to fresh herbs and a small notebook, wrapped in a soft sage knit blanket, holistic wellness and nutrition consultation, portrait orientation",
  },
];

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    throw new Error(`${res.status} ${json.error?.message ?? JSON.stringify(json)}`);
  }
  return json;
}

async function submit({ prompt, size }) {
  const json = await api("/images/generations", {
    method: "POST",
    body: JSON.stringify({ model: MODEL, prompt: `${prompt}. ${STYLE}`, size, resolution: "2K", n: 1 }),
  });
  const taskId = json.data?.[0]?.task_id;
  if (!taskId) throw new Error(`Respuesta sin task_id: ${JSON.stringify(json)}`);
  return taskId;
}

async function waitFor(taskId, label) {
  const started = Date.now();
  while (Date.now() - started < 10 * 60_000) {
    const { data } = await api(`/tasks/${taskId}?language=es`);
    if (data.status === "completed") {
      const url = data.result?.images?.[0]?.url?.[0];
      if (!url) throw new Error(`Tarea sin URL de imagen: ${JSON.stringify(data)}`);
      return url;
    }
    if (["failed", "cancelled", "error"].includes(data.status)) {
      throw new Error(`Tarea ${data.status}: ${data.error?.message ?? JSON.stringify(data)}`);
    }
    process.stdout.write(`  … ${label}: ${data.status} ${data.progress ?? 0}%\r`);
    await sleep(4000);
  }
  throw new Error("Tiempo de espera agotado");
}

async function generate(img) {
  const webPath = `${WEB_DIR}/${img.name}.webp`;
  if (!force && existsSync(webPath)) {
    console.log(`• ${img.name} ya existe (usa --force para regenerar)`);
    return;
  }
  console.log(`→ ${img.name} (${img.size})`);
  const taskId = await submit(img);
  const url = await waitFor(taskId, img.name);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());

  await sharp(buf).jpeg({ quality: 92, mozjpeg: true }).toFile(`${VIDEO_DIR}/${img.name}.jpg`);
  await sharp(buf)
    .resize({ width: img.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(webPath);
  const { width, height } = await sharp(webPath).metadata();
  console.log(`✓ ${img.name} ${width}×${height}`);
}

await mkdir(WEB_DIR, { recursive: true });
await mkdir(VIDEO_DIR, { recursive: true });

const queue = IMAGES.filter((img) => !only || only.includes(img.name));
const failures = [];
// Pocas en paralelo para no chocar con el rate limit.
for (let i = 0; i < queue.length; i += 3) {
  const results = await Promise.allSettled(queue.slice(i, i + 3).map(generate));
  results.forEach((r, j) => {
    if (r.status === "rejected") {
      const name = queue[i + j].name;
      console.error(`✗ ${name}: ${r.reason.message}`);
      failures.push(name);
    }
  });
}

if (failures.length) {
  console.error(`\nFallaron: ${failures.join(", ")}. Reintenta con --only=${failures.join(",")}`);
  process.exit(1);
}
