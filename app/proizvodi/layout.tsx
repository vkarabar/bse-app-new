import { ProductBreadcrumb } from '@/components/product-breadcrumb';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t('metadata.products.title'),
    description: t('metadata.products.description'),
  };
}

const ProductsLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100dvh-450px)]">
      {children}
    </div>
  );
};

export default ProductsLayout;
