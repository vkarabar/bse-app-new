import type { OrderProduct, OrderPayload } from '@/lib/orders';
import type { MotorVariant } from '@/lib/motori-porti-data';
import {
  formatMotoriPortiSummary,
  getMotoriPortiTotal,
  getPergolaDimensionLabel,
  ORDER_PRODUCT_LABELS,
} from '@/lib/orders';
import type { PergolaDimensionId } from '@/lib/product-colors';

export type OrderReviewRow = {
  label: string;
  value: string;
};

export function buildOrderReviewRows(
  payload: Record<string, unknown>,
): OrderReviewRow[] {
  const product = payload.product as OrderProduct;
  const rows: OrderReviewRow[] = [
    { label: 'Производ', value: ORDER_PRODUCT_LABELS[product] },
  ];

  if (product === 'motori-porti') {
    const preview: OrderPayload = {
      product: 'motori-porti',
      motorVariant: payload.motorVariant as MotorVariant,
      mounting: payload.mounting === true,
      railMeters: Number(payload.railMeters ?? 0),
      name: String(payload.name ?? ''),
      phone: String(payload.phone ?? ''),
      email: String(payload.email ?? ''),
    };

    formatMotoriPortiSummary(preview)
      .split('\n')
      .forEach((line) => {
        const colon = line.indexOf(':');
        if (colon === -1) return;
        rows.push({
          label: line.slice(0, colon).trim(),
          value: line.slice(colon + 1).trim(),
        });
      });

    rows.push(
      { label: 'Име', value: String(payload.name ?? '') },
      { label: 'Телефон', value: String(payload.phone ?? '') },
      { label: 'Email', value: String(payload.email ?? '') },
    );

    if (payload.city) {
      rows.push({ label: 'Град', value: String(payload.city) });
    }

    if (payload.notes) {
      rows.push({ label: 'Забелешка', value: String(payload.notes) });
    }

    return rows;
  }

  if (product === 'pergoli') {
    rows.push({
      label: 'Димензии',
      value: getPergolaDimensionLabel(String(payload.dimension) as PergolaDimensionId),
    });
  } else if (payload.width && payload.height) {
    rows.push({
      label: 'Димензии',
      value: `${payload.width} × ${payload.height} см`,
    });
  }

  if (payload.color) {
    rows.push({ label: 'Боја', value: String(payload.color) });
  }

  rows.push(
    { label: 'Име', value: String(payload.name ?? '') },
    { label: 'Телефон', value: String(payload.phone ?? '') },
    { label: 'Email', value: String(payload.email ?? '') },
  );

  if (payload.city) {
    rows.push({ label: 'Град', value: String(payload.city) });
  }

  if (payload.notes) {
    rows.push({ label: 'Забелешка', value: String(payload.notes) });
  }

  return rows;
}

export function getOrderReviewTotal(
  payload: Record<string, unknown>,
): number | null {
  if (payload.product !== 'motori-porti') return null;

  return getMotoriPortiTotal({
    product: 'motori-porti',
    motorVariant: payload.motorVariant as MotorVariant,
    mounting: payload.mounting === true,
    railMeters: Number(payload.railMeters ?? 0),
    name: '',
    phone: '',
    email: '',
  });
}
