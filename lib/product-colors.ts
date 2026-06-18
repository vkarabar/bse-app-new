export type ColorKey =
  | 'chocolate'
  | 'gray'
  | 'anthracite'
  | 'white'
  | 'oak'
  | 'red'
  | 'brown'
  | 'yellow'
  | 'blue';

export type ColorSwatchItem = {
  key: ColorKey;
  hex: string;
  wide?: boolean;
};

export const VRATI_COLORS: ColorSwatchItem[] = [
  { key: 'chocolate', hex: '#3D2914' },
  { key: 'gray', hex: '#D6D3D1' },
  { key: 'anthracite', hex: '#1E293B' },
  { key: 'white', hex: '#FFFFFF' },
  { key: 'oak', hex: '#78350F' },
];

export const PERGOLI_COLORS: ColorSwatchItem[] = [
  { key: 'white', hex: '#F5F5F4', wide: true },
  { key: 'anthracite', hex: '#1F2937', wide: true },
];

export const PERGOLI_DIMENSIONS = [
  { id: '3x3', label: '3 × 3 m' },
  { id: '4x3', label: '4 × 3 m' },
] as const;

export type PergolaDimensionId = (typeof PERGOLI_DIMENSIONS)[number]['id'];

export const ZAVESI_COLORS: ColorSwatchItem[] = [
  { key: 'white', hex: '#F5F5F4B3', wide: true },
  { key: 'red', hex: '#B91C1CBF', wide: true },
  { key: 'brown', hex: '#854D0EB3', wide: true },
  { key: 'yellow', hex: '#FDE047B3', wide: true },
  { key: 'blue', hex: '#2563EBB3', wide: true },
];

export function getColorKeys(colors: ColorSwatchItem[]): ColorKey[] {
  return colors.map((color) => color.key);
}
