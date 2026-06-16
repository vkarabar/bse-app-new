import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Компоненти | БСЕ Компани',
  description:
    'БСЕ Компани датира уште од 2013 година и од самиот почеток е ориентирана кон нудење на квалитетни услуги во индустријата задржувајќи ги ниските цени.',
};

const ProductsLayout = ({ children }: Props) => {
  return (
    <div className="max-w-[1056px] mx-auto px-4 md:my-24">
      <div>
        <Breadcrumb className="mt-3 mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Дома</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/proizvodi">Производи</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/proizvodi/zavesi">
                Компоненти
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
};

export default ProductsLayout;
