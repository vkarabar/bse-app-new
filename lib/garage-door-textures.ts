/** Standard face height of aluminum roll-up garage door slats (~77 mm). */
export const GARAGE_DOOR_SLAT_HEIGHT_CM = 7.7;

export const GOLDEN_OAK_TEXTURE = {
  swatchSrc: '/colors/golden-oak-swatch.jpg',
  slatVariants: [
    '/colors/golden-oak-slat-a.png',
    '/colors/golden-oak-slat-b.png',
    '/colors/golden-oak-slat-c.png',
  ],
  tileWidth: 1536,
  tileHeight: 40,
  fallbackHex: '#8B5A2B',
} as const;

export function getGarageDoorSlatCount(doorHeightCm: number): number {
  return Math.max(3, Math.round(doorHeightCm / GARAGE_DOOR_SLAT_HEIGHT_CM));
}

export function getGoldenOakSlatVariantSrc(slatIndex: number): string {
  const variants = GOLDEN_OAK_TEXTURE.slatVariants;
  return variants[slatIndex % variants.length];
}

/** Small phase shift per row — kept modest so seams stay off-screen. */
export function getGoldenOakSlatOffsetPx(slatIndex: number): number {
  return -((slatIndex * 67 + 19) % 128);
}

export function getGoldenOakSlatLayerStyle(
  slatIndex: number,
): {
  backgroundImage: string;
  backgroundRepeat: 'repeat-x';
  backgroundSize: string;
  backgroundPosition: string;
} {
  return {
    backgroundImage: `url(${getGoldenOakSlatVariantSrc(slatIndex)})`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: `auto 100%`,
    backgroundPosition: `${getGoldenOakSlatOffsetPx(slatIndex)}px center`,
  };
}
