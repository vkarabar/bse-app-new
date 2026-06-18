import type { Metadata } from 'next';
import { COMPANY_WEBSITE_URL } from '@/lib/company-contact';
import { localizedPath, type Locale } from '@/lib/i18n/locales';

export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY_WEBSITE_URL;
  return new URL(raw.endsWith('/') ? raw : `${raw}/`);
}

export function buildRootMetadata(
  t: (key: string) => string,
  locale: Locale,
): Metadata {
  const siteName = t('metadata.siteName');

  return {
    metadataBase: getMetadataBase(),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: t('metadata.home.description'),
    openGraph: {
      siteName,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'mk_MK',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export function buildPageMetadata({
  title,
  description,
  path = '/',
  locale,
}: {
  title: string;
  description: string;
  path?: string;
  locale: Locale;
}): Metadata {
  const pathname = localizedPath(path, locale);
  const url = new URL(pathname, getMetadataBase());

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'mk_MK',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
