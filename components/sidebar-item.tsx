'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { LocalizedLink } from './localized-link';
import { stripLocalePrefix } from '@/lib/i18n/locales';

type Props = {
  label: string;
  href: string;
  iconSrc: string;
  onClick: () => void;
};

export const SidebarItem = ({ label, href, iconSrc, onClick }: Props) => {
  const pathname = usePathname();
  const { pathname: strippedPathname } = stripLocalePrefix(pathname);
  const active = strippedPathname === href;

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="justify-start h-[52px]"
      asChild
      onClick={onClick}
    >
      <LocalizedLink href={href}>
        <div className="flex items-center gap-2">
          <Image
            className={cn(
              'fill-slate-50 text-slate-50 outline-slate-50 stroke-slate-50',
              active &&
                'fill-sky-400 text-sky-400 outline-sky-400 stroke-sky-400',
            )}
            src={iconSrc}
            width={30}
            height={30}
            alt={label}
          />
          <p>{label}</p>
        </div>
      </LocalizedLink>
    </Button>
  );
};
