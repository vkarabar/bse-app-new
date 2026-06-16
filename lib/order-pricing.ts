import type { MotorVariant } from '@/lib/motori-porti-data';
import type { OrderProduct } from '@/lib/orders';

export type MotoriPortiVariantPricing = {
  motorEur: number;
  mountingEur: number;
  railPerMeterEur: number;
  includedRailMeters: number;
  packageIncludes?: string[];
};

export const MOTORI_PORTI_PRICING_BY_VARIANT: Record<
  MotorVariant,
  MotoriPortiVariantPricing
> = {
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
    packageIncludes: [
      '1 мотор + контролна табла',
      '2 далечински управувачи',
      '2 фото-ќелии',
      '1 трепкачко светло',
      '4 метри шини',
    ],
  },
};

/** @deprecated Use getMotoriPortiPricing('spanish') */
export const MOTORI_PORTI_PRICING = MOTORI_PORTI_PRICING_BY_VARIANT.spanish;

export const PRODUCTS_WITH_FIXED_PRICE: OrderProduct[] = ['motori-porti'];

export function productHasFixedPrice(product: OrderProduct): boolean {
  return PRODUCTS_WITH_FIXED_PRICE.includes(product);
}

export function getMotoriPortiPricing(variant: MotorVariant) {
  return MOTORI_PORTI_PRICING_BY_VARIANT[variant];
}

export function calculateMotoriPortiTotal(
  variant: MotorVariant,
  mounting: boolean,
  railMeters: number,
): number {
  const { motorEur, mountingEur, railPerMeterEur } =
    getMotoriPortiPricing(variant);

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
