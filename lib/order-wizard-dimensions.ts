export const DEFAULT_WIDTH = 300;
export const DEFAULT_HEIGHT = 250;
export const DIMENSION_STEP = 10;
export const DIMENSION_ARROW_STEP = 1;
export const MIN_DIMENSION = 50;
export const MAX_DIMENSION = 2000;

export function parseDimensionInput(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === '') return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

export function getDimensionValidationError(
  width: string,
  height: string,
): 'empty' | 'range' | null {
  const parsedWidth = parseDimensionInput(width);
  const parsedHeight = parseDimensionInput(height);

  if (parsedWidth === null || parsedHeight === null) {
    return 'empty';
  }

  if (
    parsedWidth < MIN_DIMENSION ||
    parsedHeight < MIN_DIMENSION ||
    parsedWidth > MAX_DIMENSION ||
    parsedHeight > MAX_DIMENSION
  ) {
    return 'range';
  }

  return null;
}

export function areDimensionsValid(width: string, height: string): boolean {
  return getDimensionValidationError(width, height) === null;
}
