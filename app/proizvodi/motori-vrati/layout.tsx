import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Мотори за гаражни врати | БСЕ Компани',
  description:
    'БСЕ Компани датира уште од 2013 година и од самиот почеток е ориентирана кон нудење на квалитетни услуги во индустријата задржувајќи ги ниските цени.',
};

type Props = {
  children: React.ReactNode;
};

const ProductsLayout = ({ children }: Props) => {
  return (
    <div className="max-w-[1056px] mx-auto px-4">
      <div>
        <Breadcrumb className="mt-3 mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Image
                  src="/homepage-2.svg"
                  alt="Homepage icon"
                  width={20}
                  height={20}
                />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/proizvodi">Производи</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/proizvodi/motori-vrati">
                Мотори за гаражни врати
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
