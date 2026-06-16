import Link from 'next/link';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductCard from '../product-card';
import {
  MOTORI_PORTI_HUB,
  MOTOR_PAGE_LIST,
} from '@/lib/motori-porti-data';

const MotoriPortiHubPage = () => {
  return (
    <div className="md:my-14 max-w-[1056px] mx-auto px-4 pb-8">
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
            <BreadcrumbPage>{MOTORI_PORTI_HUB.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="section-title text-xl border-b-4 !mb-6">
        {MOTORI_PORTI_HUB.label}
      </h1>

      <p className="text-slate-700 mb-8 max-w-2xl">
        Изберете тип на мотор — шпански модел со Wi-Fi и италијански OXYGEN
        комплети, секој со свои карактеристики.
      </p>

      <div className="grid md:grid-cols-2 gap-y-3 md:gap-x-4 pt-2 max-w-2xl">
        {MOTOR_PAGE_LIST.map((motor) => (
          <Link
            key={motor.id}
            href={motor.href}
            className="min-w-fit"
          >
            <ProductCard
              iconSrc={motor.cardIcon}
              label={motor.navLabel}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MotoriPortiHubPage;
