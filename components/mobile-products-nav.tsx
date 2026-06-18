'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PRODUCT_NAV_LINKS } from '@/lib/product-nav-links';
import { LocalizedLink } from '@/components/localized-link';
import { useTranslations } from '@/components/locale-provider';
import { cn } from '@/lib/utils';
import { stripLocalePrefix } from '@/lib/i18n/locales';

type Props = {
  onNavigate: () => void;
};

export function MobileProductsNav({ onNavigate }: Props) {
  const t = useTranslations();
  const pathname = usePathname();
  const { pathname: strippedPathname } = stripLocalePrefix(pathname);
  const isProductsActive = strippedPathname.startsWith('/proizvodi');

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={isProductsActive ? 'products' : undefined}
    >
      <AccordionItem value="products" className="border-0">
        <AccordionTrigger
          className={cn(
            'h-[52px] rounded-xl px-4 py-2 hover:no-underline hover:bg-slate-700 text-slate-200 font-bold text-sm tracking-wide',
            isProductsActive && 'bg-slate-600/15',
          )}
        >
          <div className="flex items-center gap-2">
            <Image src="/label.svg" width={30} height={30} alt="" />
            <span>{t('nav.products')}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-1 pt-0">
          <ul className="ml-3 flex flex-col gap-0.5 border-l border-slate-600 pl-3">
            {PRODUCT_NAV_LINKS.map((item) => {
              const active = strippedPathname === item.href;

              return (
                <li key={item.href}>
                  <LocalizedLink
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors',
                      item.bold && 'font-semibold text-slate-200',
                      active && 'bg-slate-700 text-white font-medium',
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>
                </li>
              );
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
