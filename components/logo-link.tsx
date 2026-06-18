'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LocalizedLink } from '@/components/localized-link';
import { stripLocalePrefix } from '@/lib/i18n/locales';

function isHomePath(pathname: string) {
  return stripLocalePrefix(pathname).pathname === '/';
}

export function LogoLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const onHome = isHomePath(pathname);

  if (onHome) {
    return (
      <button
        type="button"
        className={className}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {children}
      </button>
    );
  }

  return (
    <LocalizedLink href="/" className={className}>
      {children}
    </LocalizedLink>
  );
}
