import type { Locale } from './locales';
import mk from '@/messages/mk.json';
import en from '@/messages/en.json';

const dictionaries = { mk, en } as const;

export type Dictionary = typeof mk;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

type NestedValue = string | { [key: string]: NestedValue };

function resolveKey(source: NestedValue, key: string): string | undefined {
  const parts = key.split('.');
  let current: NestedValue | undefined = source;

  for (const part of parts) {
    if (typeof current !== 'object' || current === null) {
      return undefined;
    }
    current = current[part];
  }

  return typeof current === 'string' ? current : undefined;
}

export function createTranslator(dictionary: Dictionary) {
  return function t(
    key: string,
    params?: Record<string, string | number>,
  ): string {
    const value = resolveKey(dictionary as NestedValue, key) ?? key;

    if (!params) {
      return value;
    }

    return Object.entries(params).reduce(
      (result, [paramKey, paramValue]) =>
        result.replaceAll(`{${paramKey}}`, String(paramValue)),
      value,
    );
  };
}

export type Translator = ReturnType<typeof createTranslator>;
