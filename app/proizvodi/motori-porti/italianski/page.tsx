import { MotoriPortiProductPage } from '@/components/motori-porti-product-page';
import { buildPageMetadata } from '@/lib/site-metadata';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { getMotorPageData } from '@/lib/motori-porti-data';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getServerTranslations();
  const data = getMotorPageData('italian', t);

  return buildPageMetadata({
    title: `${data.title} | ${t('metadata.siteName')}`,
    description: data.metaDescription,
    path: '/proizvodi/motori-porti/italianski',
    locale,
  });
}

const MotoriPortiItalianPage = async () => {
  const { t } = await getServerTranslations();
  const data = getMotorPageData('italian', t);

  return <MotoriPortiProductPage data={data} variant="italian" />;
};

export default MotoriPortiItalianPage;
