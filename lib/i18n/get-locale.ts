import { headers } from 'next/headers';
import { defaultLocale, isLocale, type Locale } from './locales';

export async function getLocale(): Promise<Locale> {
  const localeHeader = (await headers()).get('x-locale');
  if (localeHeader && isLocale(localeHeader)) {
    return localeHeader;
  }
  return defaultLocale;
}
