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
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations();
  return {
    title: t('metadata.contact.title'),
    description: t('metadata.contact.description'),
  };
}

const ContactLayout = async ({ children }: Props) => {
  const { t } = await getServerTranslations();
  const locale = await getLocale();

  return (
    <div className="max-w-[1056px] mx-auto px-4 pb-12 md:pt-8">
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
            <BreadcrumbPage>{t('breadcrumb.contact')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {children}
    </div>
  );
};

export default ContactLayout;
