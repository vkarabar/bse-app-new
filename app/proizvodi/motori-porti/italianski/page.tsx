import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MotoriPortiProductPage } from '@/components/motori-porti-product-page';
import { Metadata } from 'next';
import Image from 'next/image';
import {
  MOTORI_PORTI_HUB,
  getMotorPageData,
} from '@/lib/motori-porti-data';

const data = getMotorPageData('italian');

export const metadata: Metadata = {
  title: `${data.title} | БСЕ Компани`,
  description: data.metaDescription,
};

const MotoriPortiItalianPage = () => {
  return (
    <div className="max-w-[1056px] mx-auto px-4 pb-8">
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
            <BreadcrumbLink href={MOTORI_PORTI_HUB.href}>
              {MOTORI_PORTI_HUB.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <MotoriPortiProductPage data={data} />
    </div>
  );
};

export default MotoriPortiItalianPage;
