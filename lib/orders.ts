import type { Translator } from '@/lib/i18n/get-dictionary';
import {
  getColorKeys,
  PERGOLI_COLORS,
  PERGOLI_DIMENSIONS,
  VRATI_COLORS,
  ZAVESI_COLORS,
  type ColorKey,
  type PergolaDimensionId,
} from '@/lib/product-colors';
import { isMacedonianCity } from '@/lib/macedonian-cities';
import {
  calculateMotoriPortiTotal,
  formatEur,
  getMotoriPortiPricing,
} from '@/lib/order-pricing';
import {
  getGarageDoorMotorLabel,
  isGarageDoorMotorType,
  type GarageDoorMotorType,
} from '@/lib/garage-door-motors';
import {
  getMotorVariantLabel,
  type MotorVariant,
} from '@/lib/motori-porti-data';

import {
  calculateRackiTendiTotal,
  getRackiTendiLengthLabel,
  isRackiTendiLength,
  type RackiTendiLength,
} from '@/lib/racki-tendi-data';

export type OrderProduct =
  | 'vrati'
  | 'pergoli'
  | 'zavesi'
  | 'motori-porti'
  | 'racki-tendi';

export type OrderPayload = {
  product: OrderProduct;
  width?: number;
  height?: number;
  dimension?: PergolaDimensionId;
  color?: ColorKey;
  motorVariant?: MotorVariant;
  mounting?: boolean;
  railMeters?: number;
  motorRequested?: boolean;
  garageDoorMotor?: GarageDoorMotorType;
  mountingRequested?: boolean;
  installTimeline?: string;
  remoteCount?: number;
  rackiTendiLength?: RackiTendiLength;
  quantity?: number;
  name: string;
  phone: string;
  email: string;
  city?: string;
  notes?: string;
  website?: string;
};

const PRODUCTS_WITH_COLOR = ['vrati', 'pergoli', 'zavesi'] as const;
const PRODUCTS_WITH_DIMENSIONS = ['vrati', 'zavesi'] as const;
type ProductWithColor = (typeof PRODUCTS_WITH_COLOR)[number];
type ProductWithDimensions = (typeof PRODUCTS_WITH_DIMENSIONS)[number];

const ALLOWED_COLORS: Record<ProductWithColor, ColorKey[]> = {
  vrati: getColorKeys(VRATI_COLORS),
  pergoli: getColorKeys(PERGOLI_COLORS),
  zavesi: getColorKeys(ZAVESI_COLORS),
};

const ALLOWED_PERGOLA_DIMENSIONS = PERGOLI_DIMENSIONS.map((item) => item.id);

export function getPergolaDimensionLabel(id: PergolaDimensionId): string {
  return PERGOLI_DIMENSIONS.find((item) => item.id === id)?.label ?? id;
}

export function formatOrderDimensionLines(
  order: OrderPayload,
  t: Translator,
): string[] {
  if (order.product === 'pergoli' && order.dimension) {
    return [
      `${t('orders.reviewLabels.dimensions')}: ${getPergolaDimensionLabel(order.dimension)}`,
    ];
  }

  if (order.width && order.height) {
    return [
      `${t('orders.reviewLabels.width')}: ${order.width} cm`,
      `${t('orders.reviewLabels.height')}: ${order.height} cm`,
    ];
  }

  return [];
}

export function formatOrderDimensions(
  order: OrderPayload,
  t: Translator,
): string {
  const lines = formatOrderDimensionLines(order, t);
  if (lines.length === 0) return '—';
  return lines.join(', ');
}

export function getMotoriPortiTotal(order: OrderPayload): number | null {
  if (order.product !== 'motori-porti' || !order.motorVariant) return null;
  return calculateMotoriPortiTotal(
    order.motorVariant,
    !!order.mounting,
    order.railMeters ?? 0,
  );
}

export function getRackiTendiOrderTotal(order: OrderPayload): number | null {
  if (
    order.product !== 'racki-tendi' ||
    !order.rackiTendiLength ||
    order.quantity === undefined
  ) {
    return null;
  }

  return calculateRackiTendiTotal(order.rackiTendiLength, order.quantity);
}

export function getOrderTotal(order: OrderPayload): number | null {
  if (order.product === 'motori-porti') {
    return getMotoriPortiTotal(order);
  }

  if (order.product === 'racki-tendi') {
    return getRackiTendiOrderTotal(order);
  }

  return null;
}

export function formatRackiTendiSummary(
  order: OrderPayload,
  t: Translator,
): string {
  if (!order.rackiTendiLength || order.quantity === undefined) return '';

  const unitPrice = calculateRackiTendiTotal(order.rackiTendiLength, 1);
  const total = calculateRackiTendiTotal(order.rackiTendiLength, order.quantity);

  return [
    `${t('orders.reviewLabels.length')}: ${getRackiTendiLengthLabel(order.rackiTendiLength, t)}`,
    `${t('orders.reviewLabels.unitPrice')}: ${formatEur(unitPrice)}`,
    `${t('orders.reviewLabels.quantity')}: ${order.quantity}`,
    `${t('orders.reviewLabels.total')}: ${formatEur(total)}`,
  ].join('\n');
}

export function formatMotoriPortiSummary(
  order: OrderPayload,
  t: Translator,
): string {
  if (!order.motorVariant) return '';

  const pricing = getMotoriPortiPricing(order.motorVariant, t);
  const railMeters = order.railMeters ?? 0;
  const lines: string[] = [];

  lines.push(
    `${t('orders.reviewLabels.type')}: ${getMotorVariantLabel(order.motorVariant, t)}`,
  );

  if (pricing.packageIncludes?.length) {
    lines.push(
      `${t('orders.reviewLabels.package')}: ${formatEur(pricing.motorEur)}`,
    );
    lines.push(
      `${t('orders.reviewLabels.included')}: ${pricing.packageIncludes.join('; ')}`,
    );
  } else {
    lines.push(
      `${t('orders.reviewLabels.motor')}: ${formatEur(pricing.motorEur)}`,
    );
  }

  if (order.mounting) {
    lines.push(
      `${t('orders.reviewLabels.mounting')}: ${formatEur(pricing.mountingEur)}`,
    );
  }

  if (railMeters > 0) {
    const railLabel =
      pricing.includedRailMeters > 0
        ? t('orders.reviewLabels.extraRails', {
            meters: pricing.includedRailMeters,
          })
        : t('orders.reviewLabels.gateRails');

    lines.push(
      `${railLabel}: ${railMeters} m × ${formatEur(pricing.railPerMeterEur)}/m = ${formatEur(railMeters * pricing.railPerMeterEur)}`,
    );
  }

  const total = getMotoriPortiTotal(order);
  if (total !== null) {
    lines.push(`${t('orders.reviewLabels.total')}: ${formatEur(total)}`);
  }

  return lines.join('\n');
}

function parseContactFields(body: Record<string, unknown>, t: Translator) {
  const name = String(body.name ?? '').trim();
  if (name.length < 2) {
    return { ok: false as const, error: t('orders.validation.nameRequired') };
  }

  const phone = String(body.phone ?? '').trim();
  if (phone.length < 8) {
    return { ok: false as const, error: t('orders.validation.phoneRequired') };
  }

  const email = String(body.email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: t('orders.validation.emailRequired') };
  }

  const notes =
    typeof body.notes === 'string' && body.notes.trim()
      ? body.notes.trim()
      : undefined;

  const cityRaw = String(body.city ?? '').trim();
  const city = cityRaw || undefined;
  if (city && !isMacedonianCity(city)) {
    return { ok: false as const, error: t('orders.validation.cityRequired') };
  }

  return { ok: true as const, name, phone, email, city, notes };
}

function parseOptionalBoolean(value: unknown): boolean | undefined {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return undefined;
}

function parseInstallTimeline(value: unknown): string | undefined {
  const timeline = String(value ?? '').trim();
  if (
    timeline === 'asap' ||
    timeline === '30days' ||
    timeline === '2-3months' ||
    timeline === 'exploring'
  ) {
    return timeline;
  }
  return undefined;
}

function parseRemoteCount(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const count = Number(value);
  if (!Number.isInteger(count) || count < 2 || count > 99) return undefined;
  return count;
}

function parseQuantity(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const quantity = Number(value);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
    return undefined;
  }
  return quantity;
}

function parseDimensions(body: Record<string, unknown>, t: Translator) {
  const width = Number(body.width);
  const height = Number(body.height);

  if (!Number.isFinite(width) || width <= 0 || width > 2000) {
    return { ok: false as const, error: t('orders.validation.widthRequired') };
  }

  if (!Number.isFinite(height) || height <= 0 || height > 2000) {
    return { ok: false as const, error: t('orders.validation.heightRequired') };
  }

  return { ok: true as const, width, height };
}

export function validateOrderPayload(
  data: unknown,
  t: Translator,
): { ok: true; payload: OrderPayload } | { ok: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { ok: false, error: t('orders.validation.invalidData') };
  }

  const body = data as Record<string, unknown>;

  if (body.website) {
    return { ok: false, error: t('orders.validation.invalidOrder') };
  }

  const product = body.product;
  if (
    product !== 'vrati' &&
    product !== 'pergoli' &&
    product !== 'zavesi' &&
    product !== 'motori-porti' &&
    product !== 'racki-tendi'
  ) {
    return { ok: false, error: t('orders.validation.invalidProduct') };
  }

  const contact = parseContactFields(body, t);
  if (!contact.ok) return contact;

  const { name, phone, email, city, notes } = contact;

  if (product === 'racki-tendi') {
    const rackiTendiLength = String(body.rackiTendiLength ?? '').trim();
    const quantity = parseQuantity(body.quantity);

    if (!isRackiTendiLength(rackiTendiLength)) {
      return {
        ok: false,
        error: t('orders.validation.invalidRackiTendiLength'),
      };
    }

    if (quantity === undefined) {
      return { ok: false, error: t('orders.validation.invalidQuantity') };
    }

    return {
      ok: true,
      payload: {
        product: 'racki-tendi',
        rackiTendiLength,
        quantity,
        name,
        phone,
        email,
        city,
        notes,
      },
    };
  }

  if (PRODUCTS_WITH_COLOR.includes(product as ProductWithColor)) {
    const colorRaw = String(body.color ?? '').trim();
    if (!ALLOWED_COLORS[product as ProductWithColor].includes(colorRaw as ColorKey)) {
      return { ok: false, error: t('orders.validation.invalidColor') };
    }
    const color = colorRaw as ColorKey;

    if (product === 'pergoli') {
      const dimension = String(body.dimension ?? '').trim() as PergolaDimensionId;
      if (!ALLOWED_PERGOLA_DIMENSIONS.includes(dimension)) {
        return { ok: false, error: t('orders.validation.dimensionRequired') };
      }

      return {
        ok: true,
        payload: { product, dimension, color, name, phone, email, city, notes },
      };
    }

    if (PRODUCTS_WITH_DIMENSIONS.includes(product as ProductWithDimensions)) {
      const dimensions = parseDimensions(body, t);
      if (!dimensions.ok) return dimensions;

      const garageDoorMotorRaw = String(body.garageDoorMotor ?? '').trim();
      const garageDoorMotor = garageDoorMotorRaw as GarageDoorMotorType;
      if (
        product === 'vrati' &&
        !isGarageDoorMotorType(garageDoorMotorRaw)
      ) {
        return {
          ok: false,
          error: t('orders.validation.invalidGarageDoorMotor'),
        };
      }

      return {
        ok: true,
        payload: {
          product,
          width: dimensions.width,
          height: dimensions.height,
          color,
          motorRequested: parseOptionalBoolean(body.motorRequested),
          garageDoorMotor:
            product === 'vrati' ? garageDoorMotor : undefined,
          mountingRequested: parseOptionalBoolean(body.mountingRequested),
          installTimeline: parseInstallTimeline(body.installTimeline),
          remoteCount: parseRemoteCount(body.remoteCount),
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
    return { ok: false, error: t('orders.validation.invalidMotorVariant') };
  }

  const railMetersRaw = body.railMeters;
  const railMeters =
    railMetersRaw === undefined || railMetersRaw === null || railMetersRaw === ''
      ? 0
      : Number(railMetersRaw);

  if (!Number.isFinite(railMeters) || railMeters < 0 || railMeters > 100) {
    return { ok: false, error: t('orders.validation.invalidRailMeters') };
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
