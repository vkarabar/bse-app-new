import { MotoriPortiProductPage } from '@/components/motori-porti-product-page';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { getMotorPageData } from '@/lib/motori-porti-data';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  const data = getMotorPageData('spanish', t);

  return {
    title: `${data.title} | ${t('metadata.siteName')}`,
    description: data.metaDescription,
  };
}

const MotoriPortiSpanishPage = async () => {
  const { t } = await getServerTranslations();
  const data = getMotorPageData('spanish', t);

  return <MotoriPortiProductPage data={data} variant="spanish" />;
};

export default MotoriPortiSpanishPage;
