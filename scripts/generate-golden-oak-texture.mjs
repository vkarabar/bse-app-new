import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourcePath = join(root, 'public/colors/golden-oak-source.jpg');
const outputDir = join(root, 'public/colors');

/** Pure wood band from the reference slat face (1024×996). */
const CORE_CROP = { left: 300, top: 350, width: 360, height: 78 };
const SEGMENT_WIDTH = 384;
const STRIP_SEGMENTS = 4;
const STRIP_WIDTH = SEGMENT_WIDTH * STRIP_SEGMENTS;
const STRIP_HEIGHT = 40;

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function loadCoreGrain(source) {
  return sharp(source)
    .extract(CORE_CROP)
    .modulate({ saturation: 1.04, brightness: 1.01 })
    .resize(SEGMENT_WIDTH, STRIP_HEIGHT, { fit: 'fill' })
    .blur(0.35)
    .toBuffer();
}

/** Mirror-paired segments tile more naturally than edge-blended seams. */
async function buildMirrorStrip(core, phase = 0) {
  const flipped = await sharp(core).flop().toBuffer();
  const order =
    phase === 1
      ? [flipped, core, flipped, core]
      : phase === 2
        ? [core, core, flipped, flipped]
        : [core, flipped, core, flipped];

  const composites = order.map((input, index) => ({
    input,
    left: index * SEGMENT_WIDTH,
    top: 0,
  }));

  return sharp({
    create: {
      width: STRIP_WIDTH,
      height: STRIP_HEIGHT,
      channels: 3,
      background: '#8B5A2B',
    },
  }).composite(composites);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const legacySource = join(outputDir, 'golden-oak.png');
  const resolvedSource = (await fileExists(sourcePath))
    ? sourcePath
    : legacySource;

  if (!(await fileExists(resolvedSource))) {
    throw new Error(
      `Missing source image. Place the reference photo at ${sourcePath}`,
    );
  }

  const core = await loadCoreGrain(resolvedSource);

  for (let phase = 0; phase < 3; phase += 1) {
    const suffix = String.fromCharCode(97 + phase);
    const variantPath = join(outputDir, `golden-oak-slat-${suffix}.png`);
    const strip = await buildMirrorStrip(core, phase);
    await strip.png({ compressionLevel: 9 }).toFile(variantPath);
    console.log(' -', variantPath);
  }

  const swatchPath = join(outputDir, 'golden-oak-swatch.jpg');
  await sharp(core)
    .resize(128, 96, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(swatchPath);

  console.log(' -', swatchPath);
  console.log('Strip size:', { width: STRIP_WIDTH, height: STRIP_HEIGHT });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
