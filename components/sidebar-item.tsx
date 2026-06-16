'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  href: string;
  iconSrc: string;
  onClick: any;
};

export const SidebarItem = ({ label, href, iconSrc, onClick }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className="justify-start h-[52px]"
      asChild
      onClick={onClick}
    >
      <Link href={href}>
        <div className="flex items-center gap-2">
          <Image
            className={cn(
              'fill-slate-50 text-slate-50 outline-slate-50 stroke-slate-50',
              active &&
                'fill-sky-400 text-sky-400 outline-sky-400 stroke-sky-400'
            )}
            src={iconSrc}
            width={30}
            height={30}
            alt={label}
          />
          <p>{label}</p>
        </div>
      </Link>
    </Button>
  );
};
