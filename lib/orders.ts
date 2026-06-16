import type { ColorSwatchItem } from '@/components/color-swatches';
import {
  PERGOLI_COLORS,
  PERGOLI_DIMENSIONS,
  VRATI_COLORS,
  ZAVESI_COLORS,
  type PergolaDimensionId,
} from '@/lib/product-colors';
import { isMacedonianCity } from '@/lib/macedonian-cities';
import {
  calculateMotoriPortiTotal,
  formatEur,
  getMotoriPortiPricing,
} from '@/lib/order-pricing';
import {
  getMotorVariantLabel,
  type MotorVariant,
} from '@/lib/motori-porti-data';

export type OrderProduct = 'vrati' | 'pergoli' | 'zavesi' | 'motori-porti';

export type OrderPayload = {
  product: OrderProduct;
  width?: number;
  height?: number;
  dimension?: PergolaDimensionId;
  color?: string;
  motorVariant?: MotorVariant;
  mounting?: boolean;
  railMeters?: number;
  name: string;
  phone: string;
  email: string;
  city?: string;
  notes?: string;
  website?: string;
};

export const ORDER_PRODUCT_LABELS: Record<OrderProduct, string> = {
  vrati: 'Роло гаражна врата',
  pergoli: 'Алуминиумска пергола',
  zavesi: 'PVC магнетна завеса',
  'motori-porti': 'Мотор за лизгачка порта',
};

const PRODUCTS_WITH_COLOR = ['vrati', 'pergoli', 'zavesi'] as const;
const PRODUCTS_WITH_DIMENSIONS = ['vrati', 'zavesi'] as const;
type ProductWithColor = (typeof PRODUCTS_WITH_COLOR)[number];
type ProductWithDimensions = (typeof PRODUCTS_WITH_DIMENSIONS)[number];

const ALLOWED_COLORS: Record<ProductWithColor, string[]> = {
  vrati: VRATI_COLORS.map((c) => c.name),
  pergoli: PERGOLI_COLORS.map((c) => c.name),
  zavesi: ZAVESI_COLORS.map((c) => c.name),
};

const ALLOWED_PERGOLA_DIMENSIONS = PERGOLI_DIMENSIONS.map((item) => item.id);

export function getColorNames(colors: ColorSwatchItem[]): string[] {
  return colors.map((color) => color.name);
}

export function getPergolaDimensionLabel(id: PergolaDimensionId): string {
  return PERGOLI_DIMENSIONS.find((item) => item.id === id)?.label ?? id;
}

export function getMotoriPortiTotal(order: OrderPayload): number | null {
  if (order.product !== 'motori-porti' || !order.motorVariant) return null;
  return calculateMotoriPortiTotal(
    order.motorVariant,
    !!order.mounting,
    order.railMeters ?? 0,
  );
}

export function formatMotoriPortiSummary(order: OrderPayload): string {
  if (!order.motorVariant) return '';

  const pricing = getMotoriPortiPricing(order.motorVariant);
  const railMeters = order.railMeters ?? 0;
  const lines: string[] = [];

  lines.push(`Тип: ${getMotorVariantLabel(order.motorVariant)}`);

  if (pricing.packageIncludes?.length) {
    lines.push(`Комплет: ${formatEur(pricing.motorEur)}`);
    lines.push(`Вклучено: ${pricing.packageIncludes.join('; ')}`);
  } else {
    lines.push(`Мотор: ${formatEur(pricing.motorEur)}`);
  }

  if (order.mounting) {
    lines.push(`Монтажа: ${formatEur(pricing.mountingEur)}`);
  }

  if (railMeters > 0) {
    const railLabel =
      pricing.includedRailMeters > 0
        ? `Дополнителни шини (${pricing.includedRailMeters} m вклучени)`
        : 'Шини за порта';

    lines.push(
      `${railLabel}: ${railMeters} m × ${formatEur(pricing.railPerMeterEur)}/m = ${formatEur(railMeters * pricing.railPerMeterEur)}`,
    );
  }

  const total = getMotoriPortiTotal(order);
  if (total !== null) {
    lines.push(`Вкупно: ${formatEur(total)}`);
  }

  return lines.join('\n');
}

function parseContactFields(body: Record<string, unknown>) {
  const name = String(body.name ?? '').trim();
  if (name.length < 2) {
    return { ok: false as const, error: 'Внесете име и презиме.' };
  }

  const phone = String(body.phone ?? '').trim();
  if (phone.length < 8) {
    return { ok: false as const, error: 'Внесете валиден телефон.' };
  }

  const email = String(body.email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: 'Внесете валидна email адреса.' };
  }

  const notes =
    typeof body.notes === 'string' && body.notes.trim()
      ? body.notes.trim()
      : undefined;

  const cityRaw = String(body.city ?? '').trim();
  const city = cityRaw || undefined;
  if (city && !isMacedonianCity(city)) {
    return { ok: false as const, error: 'Изберете валиден град.' };
  }

  return { ok: true as const, name, phone, email, city, notes };
}

function parseDimensions(body: Record<string, unknown>) {
  const width = Number(body.width);
  const height = Number(body.height);

  if (!Number.isFinite(width) || width <= 0 || width > 2000) {
    return { ok: false as const, error: 'Внесете валидна ширина (1–2000 см).' };
  }

  if (!Number.isFinite(height) || height <= 0 || height > 2000) {
    return { ok: false as const, error: 'Внесете валидна висина (1–2000 см).' };
  }

  return { ok: true as const, width, height };
}

export function validateOrderPayload(data: unknown): {
  ok: true;
  payload: OrderPayload;
} | { ok: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: 'Невалидни податоци.' };
  }

  const body = data as Record<string, unknown>;

  if (body.website) {
    return { ok: false, error: 'Невалидна нарачка.' };
  }

  const product = body.product;
  if (
    product !== 'vrati' &&
    product !== 'pergoli' &&
    product !== 'zavesi' &&
    product !== 'motori-porti'
  ) {
    return { ok: false, error: 'Невалиден производ.' };
  }

  const contact = parseContactFields(body);
  if (!contact.ok) return contact;

  const { name, phone, email, city, notes } = contact;

  if (PRODUCTS_WITH_COLOR.includes(product as ProductWithColor)) {
    const color = String(body.color ?? '').trim();
    if (!ALLOWED_COLORS[product as ProductWithColor].includes(color)) {
      return { ok: false, error: 'Изберете валидна боја.' };
    }

    if (product === 'pergoli') {
      const dimension = String(body.dimension ?? '').trim() as PergolaDimensionId;
      if (!ALLOWED_PERGOLA_DIMENSIONS.includes(dimension)) {
        return {
          ok: false,
          error: 'Изберете димензии (3 × 3 m или 4 × 3 m).',
        };
      }

      return {
        ok: true,
        payload: { product, dimension, color, name, phone, email, city, notes },
      };
    }

    if (PRODUCTS_WITH_DIMENSIONS.includes(product as ProductWithDimensions)) {
      const dimensions = parseDimensions(body);
      if (!dimensions.ok) return dimensions;

      return {
        ok: true,
        payload: {
          product,
          width: dimensions.width,
          height: dimensions.height,
          color,
          name,
          phone,
          email,
          city,
          notes,
        },
      };
    }
  }

  const mounting = body.mounting === true || body.mounting === 'true';
  const motorVariant = String(body.motorVariant ?? '').trim() as MotorVariant;

  if (motorVariant !== 'spanish' && motorVariant !== 'italian') {
    return { ok: false, error: 'Невалиден тип на мотор.' };
  }

  const railMetersRaw = body.railMeters;
  const railMeters =
    railMetersRaw === undefined || railMetersRaw === null || railMetersRaw === ''
      ? 0
      : Number(railMetersRaw);

  if (!Number.isFinite(railMeters) || railMeters < 0 || railMeters > 100) {
    return {
      ok: false,
      error: 'Внесете валидна должина за шини (0–100 m).',
    };
  }

  return {
    ok: true,
    payload: {
      product: 'motori-porti',
      motorVariant,
      mounting,
      railMeters,
      name,
      phone,
      email,
      city,
      notes,
    },
  };
}
