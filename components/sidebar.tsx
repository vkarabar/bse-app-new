'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MessageCircle, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './sidebar-item';
import { MobileProductsNav } from './mobile-products-nav';
import { LocalizedLink } from './localized-link';
import { useTranslations } from '@/components/locale-provider';
import {
  COMPANY_PHONE_PRIMARY,
  getWhatsAppPrefillMessage,
  getWhatsAppUrl,
} from '@/lib/company-contact';

type Props = {
  className?: string;
  setOpen: (open: boolean) => void;
};

export const Sidebar = ({ className, setOpen }: Props) => {
  const t = useTranslations();
  const pathname = usePathname();
  const whatsAppUrl = getWhatsAppUrl(getWhatsAppPrefillMessage(t, pathname));

  return (
    <div
      className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 flex-col bg-slate-800 text-slate-200',
        className,
      )}
    >
      <LocalizedLink
        href="/"
        onClick={() => setOpen(false)}
      >
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/BSE_NEW.svg"
            height={50}
            width={50}
            alt="Mascot"
          />
        </div>
      </LocalizedLink>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          iconSrc="/home.svg"
          href="/"
          label={t('nav.home')}
          onClick={() => setOpen(false)}
        />
        <SidebarItem
          iconSrc="/info.svg"
          href="/about"
          label={t('nav.about')}
          onClick={() => setOpen(false)}
        />
        <SidebarItem
          iconSrc="/contact.svg"
          href="/contact"
          label={t('nav.contact')}
          onClick={() => setOpen(false)}
        />
        <MobileProductsNav onNavigate={() => setOpen(false)} />
      </div>
      <div className="mt-auto border-t border-slate-700 p-4 pb-8 space-y-2">
        <a
          href={`tel:${COMPANY_PHONE_PRIMARY}`}
          className="flex items-center justify-center gap-2 w-full rounded-lg bg-sky-500 py-3 font-semibold text-white transition-colors hover:bg-sky-600 active:bg-sky-700"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {t('contact.callUs')}
        </a>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366] py-3 font-semibold text-white transition-colors hover:bg-[#20bd5a] active:bg-[#1da851]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {t('contact.whatsapp')}
        </a>
      </div>
    </div>
  );
};
