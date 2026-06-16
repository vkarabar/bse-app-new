import Link from 'next/link';

import { Button } from '@/components/ui/button';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductCard from './product-card';
import Image from 'next/image';

const ProductsPage = () => {
  return (
    <div className="md:my-14 max-w-[1056px] mx-auto px-4 pb-8">
      <div>
        <Breadcrumb className="mt-3 mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <BreadcrumbLink href="/">
                  <Image
                    src="/homepage-2.svg"
                    alt="Homepage icon"
                    width={20}
                    height={20}
                  />
                </BreadcrumbLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/proizvodi">Производи</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 md:gap-x-4 pt-2">
        <Link
          href="/proizvodi/vrati"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/vrataIcon.svg"
            label="Гаражни врати"
          />
        </Link>
        <Link
          href="/proizvodi/motori-porti"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/motor2.png"
            label="Мотори за лизгачки порти"
          />
        </Link>
        <Link
          href="/proizvodi/pergoli"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/pergoli.png"
            label="Алуминиумски перголи"
            isNew
          />
        </Link>

        <Link
          href="/proizvodi/zavesi"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/zavesi.png"
            label="PVC магнетни завеси"
            isNew
          />
        </Link>

        <Link
          href="/proizvodi/kontroleri"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/remote.svg"
            label="Wi-Fi управувачи"
          />
        </Link>

        <Link
          href="/proizvodi/motori-vrati"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/motor1.png"
            label="Мотори за гаражни врати"
          />
        </Link>

        <Link
          href="/proizvodi/komponenti"
          className="min-w-fit"
        >
          <ProductCard
            iconSrc="/komponenti.png"
            label="Компоненти"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductsPage;
