import type { ColorSwatchItem } from '@/components/color-swatches';

export const VRATI_COLORS: ColorSwatchItem[] = [
  { name: 'Чоколадо', hex: '#3D2914' },
  { name: 'Сива', hex: '#D6D3D1' },
  { name: 'Антрацит', hex: '#1E293B' },
  { name: 'Бела', hex: '#FFFFFF' },
  { name: 'Даб', hex: '#78350F' },
];

export const PERGOLI_COLORS: ColorSwatchItem[] = [
  { name: 'Бела', hex: '#F5F5F4', wide: true },
  { name: 'Антрацит', hex: '#1F2937', wide: true },
];

export const PERGOLI_DIMENSIONS = [
  { id: '3x3', label: '3 × 3 m' },
  { id: '4x3', label: '4 × 3 m' },
] as const;

export type PergolaDimensionId = (typeof PERGOLI_DIMENSIONS)[number]['id'];

export const ZAVESI_COLORS: ColorSwatchItem[] = [
  { name: 'Бела', hex: '#F5F5F4B3', wide: true },
  { name: 'Црвена', hex: '#B91C1CBF', wide: true },
  { name: 'Кафена', hex: '#854D0EB3', wide: true },
  { name: 'Жолта', hex: '#FDE047B3', wide: true },
  { name: 'Сина', hex: '#2563EBB3', wide: true },
];
