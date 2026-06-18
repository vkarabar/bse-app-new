import type { Metadata } from 'next';
import { getLocale } from '@/lib/i18n/get-locale';
import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = createTranslator(getDictionary(locale));

  return {
    title: t('metadata.naracaj.title'),
    description: t('metadata.naracaj.description'),
  };
}

export default function NaracajLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
