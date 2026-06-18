'use client';

import NextLink from 'next/link';
import { useLocale } from '@/components/locale-provider';
import { localizedPath } from '@/lib/i18n/locales';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  href: string;
};

export function LocalizedLink({ href, ...props }: Props) {
  const { locale } = useLocale();

  return <NextLink href={localizedPath(href, locale)} {...props} />;
}
