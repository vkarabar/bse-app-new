import type { Translator } from '@/lib/i18n/get-dictionary';
import type { MotorVariant } from '@/lib/motori-porti-data';
import type { OrderProduct } from '@/lib/orders';

export type MotoriPortiVariantPricing = {
  motorEur: number;
  mountingEur: number;
  railPerMeterEur: number;
  includedRailMeters: number;
  packageIncludes?: string[];
};

const BASE_PRICING = {
  spanish: {
    motorEur: 350,
    mountingEur: 130,
    railPerMeterEur: 12,
    includedRailMeters: 0,
  },
  italian: {
    motorEur: 300,
    mountingEur: 130,
    railPerMeterEur: 12,
    includedRailMeters: 4,
  },
} as const;

const ITALIAN_PACKAGE_INCLUDE_KEYS = [
  'pricing.italianPackageIncludes.item1',
  'pricing.italianPackageIncludes.item2',
  'pricing.italianPackageIncludes.item3',
  'pricing.italianPackageIncludes.item4',
  'pricing.italianPackageIncludes.item5',
] as const;

export const PRODUCTS_WITH_FIXED_PRICE: OrderProduct[] = ['motori-porti'];

export function productHasFixedPrice(product: OrderProduct): boolean {
  return PRODUCTS_WITH_FIXED_PRICE.includes(product);
}

export function getMotoriPortiPricing(
  variant: MotorVariant,
  t?: Translator,
): MotoriPortiVariantPricing {
  const base = BASE_PRICING[variant];

  if (variant === 'italian' && t) {
    return {
      ...base,
      packageIncludes: ITALIAN_PACKAGE_INCLUDE_KEYS.map((key) => t(key)),
    };
  }

  return { ...base };
}

export function calculateMotoriPortiTotal(
  variant: MotorVariant,
  mounting: boolean,
  railMeters: number,
): number {
  const { motorEur, mountingEur, railPerMeterEur } = BASE_PRICING[variant];
  const billableRailMeters = Math.max(0, railMeters);

  return (
    motorEur +
    (mounting ? mountingEur : 0) +
    billableRailMeters * railPerMeterEur
  );
}

export function formatEur(amount: number): string {
  return `${amount.toLocaleString('mk-MK')} €`;
}
