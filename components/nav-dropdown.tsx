'use client';

import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-react';
import { PRODUCT_NAV_LINKS } from '@/lib/product-nav-links';
import { LocalizedLink } from '@/components/localized-link';
import { useTranslations } from '@/components/locale-provider';

export function NavDropdown() {
  const t = useTranslations();
  const [allProducts, ...productLinks] = PRODUCT_NAV_LINKS;

  return (
    <Dropdown
      theme={{ floating: { target: 'w-full' } }}
      label={t('nav.products')}
      dismissOnClick={true}
    >
      <LocalizedLink href={allProducts.href}>
        <DropdownItem>
          <span className="font-semibold">
            {t(`nav.${allProducts.key}`)}
          </span>
        </DropdownItem>
      </LocalizedLink>
      <div className="border-b-2 border-slate-200 my-1"></div>
      {productLinks.map((item, index) => (
        <div key={item.href}>
          <LocalizedLink href={item.href}>
            <DropdownItem>{t(`nav.${item.key}`)}</DropdownItem>
          </LocalizedLink>
          {index < productLinks.length - 1 && <DropdownDivider />}
        </div>
      ))}
    </Dropdown>
  );
}
