export const locales = ['mk', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'mk';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized === '' ? '/' : normalized;
  }
  if (normalized === '/') {
    return '/en';
  }
  return `/en${normalized}`;
}

export function stripLocalePrefix(pathname: string): {
  locale: Locale;
  pathname: string;
} {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped =
      pathname === '/en' ? '/' : pathname.replace(/^\/en/, '') || '/';
    return { locale: 'en', pathname: stripped };
  }
  return { locale: defaultLocale, pathname };
}
