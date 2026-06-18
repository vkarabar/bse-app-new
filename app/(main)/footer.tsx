'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/components/locale-provider';
import {
  COMPANY_PHONE_PRIMARY,
  COMPANY_PHONE_PRIMARY_DISPLAY,
  COMPANY_PHONE_SECONDARY,
  COMPANY_PHONE_SECONDARY_DISPLAY,
  getWhatsAppPrefillMessage,
  getWhatsAppUrl,
} from '@/lib/company-contact';

export const Footer = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const nowYear = new Date().getFullYear();
  const whatsAppUrl = getWhatsAppUrl(getWhatsAppPrefillMessage(t, pathname));

  return (
    <div className="bg-slate-800 text-slate-50 pt-2 pb-2">
      <div className="containerr">
        <div className="pt-12 mb-20 flex flex-col items-center">
          <div className="h-[60px] w-[60px]">
            <Image
              src="/BSE_NEW.svg"
              alt="Footer logo"
              width={60}
              height={60}
            />
          </div>
          <p className="text-center mb-3">
            {t('footer.copyright', { year: nowYear })}
          </p>
          <div className="flex flex-col items-center">
            <p className="mb-2 mt-6">{t('footer.contactLabel')}</p>
            <p className="mb-2 text-lg">
              <a href={`tel:${COMPANY_PHONE_PRIMARY}`}>&#9900; {COMPANY_PHONE_PRIMARY_DISPLAY}</a>
            </p>
            <p className="mb-2 text-lg ">
              <a href={`tel:${COMPANY_PHONE_SECONDARY}`}>&#9900; {COMPANY_PHONE_SECONDARY_DISPLAY}</a>
            </p>
            <p className="mb-2 text-lg">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                WhatsApp
              </a>
            </p>
          </div>
          <a
            href="mailto:contact@bsekompani.mk"
            className="text-sky-500"
          >
            contact@bsekompani.mk
          </a>
        </div>
      </div>
    </div>
  );
};
