import Image from 'next/image';
import { MobileSidebar } from './mobile-sidebar';
import { LocaleSwitcher } from './locale-switcher';
import { LocalizedLink } from './localized-link';

export const MobileHeader = () => {
  return (
    <nav className="md:hidden px-4 h-16 grid grid-cols-3 items-center bg-slate-800 fixed top-0 w-full z-50">
      <div className="justify-self-start">
        <LocaleSwitcher compact />
      </div>
      <LocalizedLink
        href="/"
        className="justify-self-center"
      >
        <Image
          src="/BSE_NEW.svg"
          width={56}
          height={56}
          alt="logo"
          className="mt-[2px]"
        />
      </LocalizedLink>
      <div className="justify-self-end mt-1.5">
        <MobileSidebar />
      </div>
    </nav>
  );
};
