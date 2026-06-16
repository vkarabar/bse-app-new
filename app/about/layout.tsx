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

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'За компанијата | БСЕ Компани',
  description:
    'БСЕ Компани датира уште од 2013 година и од самиот почеток е ориентирана кон нудење на квалитетни услуги во индустријата задржувајќи ги ниските цени.',
};

const AboutLayout = ({ children }: Props) => {
  return (
    <div className="bg-slate-800 min-h-[calc(100dvh-450px)]">
      <div className="containerr px-4 mt-12 md:mt-0">
        <Breadcrumb className="pt-3 mb-4">
          <BreadcrumbList className="text-slate-400">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-slate-200">
                <Image
                  src="/homepage-white.svg"
                  alt="Почетна"
                  width={20}
                  height={20}
                />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-500 [&>svg]:text-slate-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-slate-200 font-medium">
                За компанијата
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
