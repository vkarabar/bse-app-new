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
  title: 'Контакт | БСЕ Компани',
  description:
    'Контактирајте ја БСЕ Компани — телефон, email или контакт форма за понуди и прашања.',
};

type Props = {
  children: React.ReactNode;
};

const ContactLayout = ({ children }: Props) => {
  return (
    <div className="mt-[72px] md:mt-0 max-w-[1056px] mx-auto px-4 pb-12">
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
            <BreadcrumbPage>Контакт</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {children}
    </div>
  );
};

export default ContactLayout;
