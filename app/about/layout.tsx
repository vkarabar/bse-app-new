import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getPageMetadata } from '@/lib/get-page-metadata';
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
  return getPageMetadata('/about', 'metadata.about.title', 'metadata.about.description');
}

const AboutLayout = async ({ children }: Props) => {
  const { t } = await getServerTranslations();
  const locale = await getLocale();

  return (
    <div className="bg-slate-800 min-h-[calc(100dvh-450px)] md:pt-8">
      <div className="containerr px-4">
        <Breadcrumb className="pt-3 md:pt-0 mb-4">
          <BreadcrumbList className="text-slate-400">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={localizedPath('/', locale)} className="hover:text-slate-200">
                  <Image
                    src="/homepage-white.svg"
                    alt={t('breadcrumb.home')}
                    width={20}
                    height={20}
                  />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-500 [&>svg]:text-slate-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-200 font-medium">
                {t('breadcrumb.about')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </div>
  );
};

export default AboutLayout;
