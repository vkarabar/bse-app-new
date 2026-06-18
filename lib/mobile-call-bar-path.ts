import { stripLocalePrefix } from '@/lib/i18n/locales';

export function shouldHideMobileCallBar(pathname: string): boolean {
  const { pathname: path } = stripLocalePrefix(pathname);

  if (path === '/contact' || path.startsWith('/contact/')) {
    return true;
  }

  if (path === '/naracaj' || path.startsWith('/naracaj/')) {
    return true;
  }

  if (path === '/proizvodi' || path === '/proizvodi/motori-porti') {
    return false;
  }

  if (path.startsWith('/proizvodi/')) {
    return true;
  }

  return false;
}
