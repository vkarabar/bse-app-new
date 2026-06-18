import { LocalizedLink } from '@/components/localized-link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { getLocale } from '@/lib/i18n/get-locale';
import { localizedPath } from '@/lib/i18n/locales';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from './product-card';

const PRODUCTS = [
  { href: '/proizvodi/vrati', iconSrc: '/vrataIcon.svg', labelKey: 'nav.garageDoors' as const },
  {
    href: '/proizvodi/motori-porti',
    iconSrc: '/motor2.png',
    labelKey: 'nav.slidingGateMotors' as const,
  },
  {
    href: '/proizvodi/pergoli',
    iconSrc: '/pergoli.png',
    labelKey: 'nav.pergolas' as const,
    isNew: true,
  },
  {
    href: '/proizvodi/zavesi',
    iconSrc: '/zavesi.png',
    labelKey: 'nav.pvcCurtains' as const,
    isNew: true,
  },
  {
    href: '/proizvodi/kontroleri',
    iconSrc: '/remote.svg',
    labelKey: 'nav.wifiControllers' as const,
  },
  {
    href: '/proizvodi/motori-vrati',
    iconSrc: '/motor1.png',
    labelKey: 'nav.garageDoorMotors' as const,
  },
  {
    href: '/proizvodi/komponenti',
    iconSrc: '/komponenti.png',
    labelKey: 'nav.components' as const,
  },
];

const ProductsPage = async () => {
  const { t } = await getServerTranslations();
  const locale = await getLocale();

  return (
    <div className="md:pt-8 md:mb-6 max-w-[1056px] mx-auto px-4 pb-8">
      <Breadcrumb className="mt-3 md:mt-0 mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={localizedPath('/', locale)}>
                <Image
                  src="/homepage-2.svg"
                  alt={t('breadcrumb.home')}
                  width={20}
                  height={20}
                />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={localizedPath('/proizvodi', locale)}>
                {t('breadcrumb.products')}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 md:gap-x-4 pt-2">
        {PRODUCTS.map((item) => (
          <LocalizedLink key={item.href} href={item.href} className="min-w-fit">
            <ProductCard
              iconSrc={item.iconSrc}
              label={t(item.labelKey)}
              isNew={item.isNew}
              newLabel={t('common.new')}
            />
          </LocalizedLink>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
