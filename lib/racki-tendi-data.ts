import type { Translator } from '@/lib/i18n/get-dictionary';

export const RACKI_TENDI_LENGTHS = [
  '1m',
  '1.2m',
  '1.5m',
  '1.8m',
  '2m',
] as const;

export type RackiTendiLength = (typeof RACKI_TENDI_LENGTHS)[number];

const LENGTH_PRICES_EUR: Record<RackiTendiLength, number> = {
  '1m': 3.8,
  '1.2m': 3.8,
  '1.5m': 3.8,
  '1.8m': 4,
  '2m': 4,
};

export const RACKI_TENDI_IMAGE = '/racki-tendi/racki-tendi.jpg';

export function isRackiTendiLength(value: string): value is RackiTendiLength {
  return RACKI_TENDI_LENGTHS.includes(value as RackiTendiLength);
}

export function getRackiTendiUnitPrice(length: RackiTendiLength): number {
  return LENGTH_PRICES_EUR[length];
}

export function getRackiTendiLengthLabel(
  length: RackiTendiLength,
  t: Translator,
): string {
  return t(`productPages.rackiTendi.lengths.${length}`);
}

export function calculateRackiTendiTotal(
  length: RackiTendiLength,
  quantity: number,
): number {
  return getRackiTendiUnitPrice(length) * quantity;
}

export const RACKI_TENDI_LENGTH_OPTIONS = RACKI_TENDI_LENGTHS.map((length) => ({
  id: length,
  priceEur: LENGTH_PRICES_EUR[length],
  labelKey: `productPages.rackiTendi.lengths.${length}` as const,
}));

export const RACKI_TENDI_PRICE_TIERS = [
  {
    id: 'short',
    priceEur: 3.8,
    labelKey: 'productPages.rackiTendi.pricing.tierShort',
  },
  {
    id: 'long',
    priceEur: 4,
    labelKey: 'productPages.rackiTendi.pricing.tierLong',
  },
] as const;
