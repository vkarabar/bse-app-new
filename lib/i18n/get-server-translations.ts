import { getLocale } from '@/lib/i18n/get-locale';
import { getDictionary, createTranslator } from '@/lib/i18n/get-dictionary';

export async function getServerTranslations() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  return {
    locale,
    dictionary,
    t: createTranslator(dictionary),
  };
}
