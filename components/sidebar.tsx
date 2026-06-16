import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { HomeIcon, Loader } from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { MobileProductsNav } from './mobile-products-nav';

type Props = {
  className?: string;
  setOpen: any;
};

export const Sidebar = ({ className, setOpen }: Props) => {
  return (
    <div
      className={cn(
        'flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 flex-col bg-slate-800 text-slate-200',
        className
      )}
    >
      <Link
        href="/"
        onClick={() => setOpen(false)}
      >
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/BSE_NEW.svg"
            height={40}
            width={40}
            alt="Mascot"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          iconSrc="/home.svg"
          href="/"
          label="Почетна"
          onClick={() => setOpen(false)}
        />
        <SidebarItem
          iconSrc="/info.svg"
          href="/about"
          label="За компанијата"
          onClick={() => setOpen(false)}
        />
        <SidebarItem
          iconSrc="/contact.svg"
          href="/contact"
          label="Контакт"
          onClick={() => setOpen(false)}
        />
        <MobileProductsNav onNavigate={() => setOpen(false)} />
      </div>
      <div className="p-4"></div>
    </div>
  );
};
