import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-5-2 bg-slate-50 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Image
          src="/BSE_NEW.svg"
          height={50}
          width={50}
          alt="Logo"
        />
      </div>
    </footer>
  );
};
