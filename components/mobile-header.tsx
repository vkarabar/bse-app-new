import Image from 'next/image';
import { MobileSidebar } from './mobile-sidebar';
import Link from 'next/link';

export const MobileHeader = () => {
  return (
    <nav className="md:hidden px-6 h-[60px] flex items-center justify-between bg-slate-800 fixed top-0 w-full z-50">
      <Link href="/">
        <Image
          src="/BSE_NEW.svg"
          width={50}
          height={50}
          alt="logo"
        />
      </Link>
      <MobileSidebar />
    </nav>
  );
};
