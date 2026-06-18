import { ProductBreadcrumb } from '@/components/product-breadcrumb';
import { getPageMetadata } from '@/lib/get-page-metadata';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    '/proizvodi/motori-porti',
    'metadata.motoriPorti.title',
    'metadata.motoriPorti.description',
  );
}

const MotoriPortiLayout = async ({ children }: Props) => {
  return (
    <div className="max-w-[1056px] mx-auto px-4 md:pt-8">
      <ProductBreadcrumb productKey="motoriPorti" />
      {children}
    </div>
  );
};

export default MotoriPortiLayout;
