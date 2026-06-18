'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { NavDropdown } from '@/components/nav-dropdown';
import { LocalizedLink } from '@/components/localized-link';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { useTranslations } from '@/components/locale-provider';

export const Header = () => {
  const t = useTranslations();

  return (
    <header className="hidden md:block h-20 w-full bg-slate-800 border-slate-600 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex h-full items-center justify-between">
        <div className="flex items-center pl-4">
          <LocalizedLink href="/">
            <Image
              src="/BSE_NEW.svg"
              height={64}
              width={64}
              alt="BSE Kompani Logo"
            />
          </LocalizedLink>
        </div>

        <div className="flex items-center gap-x-2">
          <LocalizedLink href="/">
            <Button className="text-slate-200" size="sm" variant="sidebar">
              {t('nav.home')}
            </Button>
          </LocalizedLink>
          <LocalizedLink href="/about">
            <Button className="text-slate-200" size="sm" variant="sidebar">
              {t('nav.about')}
            </Button>
          </LocalizedLink>
          <LocalizedLink href="/contact">
            <Button className="text-slate-200" size="sm" variant="sidebar">
              {t('nav.contact')}
            </Button>
          </LocalizedLink>
          <NavDropdown />
          <LocaleSwitcher className="ml-2" />
        </div>
      </div>
    </header>
  );
};
