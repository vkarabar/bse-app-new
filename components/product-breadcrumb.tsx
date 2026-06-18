import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { getLocale } from '@/lib/i18n/get-locale';
import { localizedPath } from '@/lib/i18n/locales';
import Image from 'next/image';
import Link from 'next/link';

type ProductBreadcrumbKey =
  | 'vrati'
  | 'pergoli'
  | 'zavesi'
  | 'kontroleri'
  | 'motoriVrati'
  | 'motoriPorti'
  | 'komponenti'
  | 'rackiTendi';

type Props = {
  productKey: ProductBreadcrumbKey;
};

export async function ProductBreadcrumb({ productKey }: Props) {
  const { t } = await getServerTranslations();
  const locale = await getLocale();

  return (
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
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{t(`breadcrumb.${productKey}`)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
