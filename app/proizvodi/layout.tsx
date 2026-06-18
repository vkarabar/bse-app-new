import { getPageMetadata } from '@/lib/get-page-metadata';
import type { Metadata } from 'next';
type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/proizvodi', 'metadata.products.title', 'metadata.products.description');
}

const ProductsLayout = ({ children }: Props) => {
  return (
    <div className="min-h-[calc(100dvh-450px)]">
      {children}
    </div>
  );
};

export default ProductsLayout;
