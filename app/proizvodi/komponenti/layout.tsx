import { ProductBreadcrumb } from '@/components/product-breadcrumb';
import { getPageMetadata } from '@/lib/get-page-metadata';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    '/proizvodi/komponenti',
    'metadata.komponenti.title',
    'metadata.komponenti.description',
  );
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
