import { ProductBreadcrumb } from '@/components/product-breadcrumb';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t('metadata.komponenti.title'),
    description: t('metadata.komponenti.description'),
  };
}

const KomponentiLayout = async ({ children }: Props) => {
  return (
    <div className="max-w-[1056px] mx-auto px-4 md:pt-8">
      <ProductBreadcrumb productKey="komponenti" />
      {children}
    </div>
  );
};

export default KomponentiLayout;
