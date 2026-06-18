import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';
import { getLocale } from '@/lib/i18n/get-locale';
import { buildPageMetadata } from '@/lib/site-metadata';

export async function getPageMetadata(
  path: string,
  titleKey: string,
  descriptionKey: string,
) {
  const locale = await getLocale();
  const t = createTranslator(getDictionary(locale));

  return buildPageMetadata({
    title: t(titleKey),
    description: t(descriptionKey),
    path,
    locale,
  });
}
