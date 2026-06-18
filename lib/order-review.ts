import type { Translator } from '@/lib/i18n/get-dictionary';
import { getMotorVariantLabel } from '@/lib/motori-porti-data';
import type { OrderProduct } from '@/lib/orders';
import {
  calculateMotoriPortiTotal,
  formatEur,
  getMotoriPortiPricing,
} from '@/lib/order-pricing';
import type { MotorVariant } from '@/lib/motori-porti-data';

export type OrderReviewRow = {
  label: string;
  value: string;
};

export function buildOrderReviewRows(
  payload: Record<string, unknown>,
  t: Translator,
): OrderReviewRow[] {
  const product = payload.product as OrderProduct;
  const rows: OrderReviewRow[] = [
    {
      label: t('orders.reviewLabels.product'),
      value: t(`orders.productLabels.${product}`),
    },
  ];

  if (product === 'motori-porti') {
    const variant = payload.motorVariant as MotorVariant;
    const pricing = getMotoriPortiPricing(variant, t);
    const railMeters = Number(payload.railMeters ?? 0);

    rows.push({
      label: t('orders.reviewLabels.type'),
      value: getMotorVariantLabel(variant, t),
    });

    if (pricing.packageIncludes?.length) {
      rows.push({
        label: t('orders.reviewLabels.package'),
        value: formatEur(pricing.motorEur),
      });
      rows.push({
        label: t('orders.reviewLabels.included'),
        value: pricing.packageIncludes.join('; '),
      });
    } else {
      rows.push({
        label: t('orders.reviewLabels.motor'),
        value: formatEur(pricing.motorEur),
      });
    }

    if (payload.mounting === true) {
      rows.push({
        label: t('orders.reviewLabels.mounting'),
        value: formatEur(pricing.mountingEur),
      });
    }

    if (railMeters > 0) {
      rows.push({
        label:
          pricing.includedRailMeters > 0
            ? t('orders.reviewLabels.extraRails', {
                meters: pricing.includedRailMeters,
              })
            : t('orders.reviewLabels.gateRails'),
        value: `${railMeters} m × ${formatEur(pricing.railPerMeterEur)}/m = ${formatEur(railMeters * pricing.railPerMeterEur)}`,
      });
    }
  } else if (product === 'pergoli') {
    rows.push({
      label: t('orders.reviewLabels.dimensions'),
      value: String(payload.dimension ?? ''),
    });
  } else if (payload.width && payload.height) {
    rows.push({
      label: t('orders.reviewLabels.dimensions'),
      value: `${t('orders.reviewLabels.width')}: ${payload.width} cm, ${t('orders.reviewLabels.height')}: ${payload.height} cm`,
    });
  }

  if (payload.color) {
    rows.push({
      label: t('orders.reviewLabels.color'),
      value: t(`colors.${String(payload.color)}`),
    });
  }

  if (payload.motorRequested !== undefined) {
    rows.push({
      label: t('orders.reviewLabels.motorRequested'),
      value: payload.motorRequested
        ? t('wizard.garageDoor.summary.included')
        : t('wizard.garageDoor.summary.no'),
    });
  }

  if (payload.mountingRequested !== undefined) {
    rows.push({
      label: t('orders.reviewLabels.mountingRequested'),
      value: payload.mountingRequested
        ? t('wizard.garageDoor.summary.yes')
        : t('wizard.garageDoor.summary.no'),
    });
  }

  if (payload.installTimeline) {
    rows.push({
      label: t('orders.reviewLabels.installTimeline'),
      value: t(
        `wizard.garageDoor.contact.timeline.${String(payload.installTimeline)}`,
      ),
    });
  }

  if (
    payload.remoteCount !== undefined &&
    payload.remoteCount !== null &&
    payload.motorRequested !== false
  ) {
    rows.push({
      label: t('orders.reviewLabels.remoteCount'),
      value: String(payload.remoteCount),
    });
  }

  rows.push(
    { label: t('orders.reviewLabels.name'), value: String(payload.name ?? '') },
    { label: t('orders.reviewLabels.phone'), value: String(payload.phone ?? '') },
    { label: t('orders.reviewLabels.email'), value: String(payload.email ?? '') },
  );

  if (payload.city) {
    rows.push({
      label: t('orders.reviewLabels.city'),
      value: String(payload.city),
    });
  }

  if (payload.notes) {
    rows.push({
      label: t('orders.reviewLabels.notes'),
      value: String(payload.notes),
    });
  }

  return rows;
}

export function getOrderReviewTotal(
  payload: Record<string, unknown>,
): number | null {
  if (payload.product !== 'motori-porti') return null;

  return calculateMotoriPortiTotal(
    payload.motorVariant as MotorVariant,
    payload.mounting === true,
    Number(payload.railMeters ?? 0),
  );
}
