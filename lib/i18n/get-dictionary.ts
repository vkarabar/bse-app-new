import type { Locale } from './locales';
import mk from '@/messages/mk.json';
import en from '@/messages/en.json';

const dictionaries = { mk, en } as const;

export type Dictionary = typeof mk;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

function resolveKey(source: unknown, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = source;

  for (const part of parts) {
    if (
      typeof current !== 'object' ||
      current === null ||
      Array.isArray(current)
    ) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

export function createTranslator(dictionary: Dictionary) {
  return function t(
    key: string,
    params?: Record<string, string | number>,
  ): string {
    const value = resolveKey(dictionary, key) ?? key;

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
