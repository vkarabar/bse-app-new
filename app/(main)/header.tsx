import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { NavDropdown } from '@/components/nav-dropdown';

export const Header = () => {
  return (
    <header className="hidden md:block h-24 w-full bg-slate-800 border-slate-600 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Link href="/">
            <Image
              src="/BSE_NEW.svg"
              height={70}
              width={70}
              alt="BSE Kompani Logo"
            />
          </Link>
        </div>

        <div className="flex gap-x-2">
          <Link href="/">
            <Button
              className="text-slate-200"
              size="sm"
              variant="sidebar"
            >
              Почетна
            </Button>
          </Link>
          <Link href="/about">
            <Button
              className="text-slate-200"
              size="sm"
              variant="sidebar"
            >
              За компанијата
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              className="text-slate-200"
              size="sm"
              variant="sidebar"
            >
              Контакт
            </Button>
          </Link>
          {/* <Link href="/proizvodi">
            <Button
              className="text-slate-200"
              size="sm"
              variant="ghost"
            >
              Производи
            </Button>
          </Link> */}
          {/* <NavigationMenu className="z-[100]">
            <NavigationMenuList className="hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <NavigationMenuItem className="bg-transparent hover:bg-transparent">
                <Link href="/proizvodi">
                  <NavigationMenuTrigger className="font-semibold bg-transparent text-slate-200 hover:text-slate-100 hover:bg-transparent focus:text-slate-200 active:text-slate-200 active:bg-transparent focus:bg-transparent">
                    Производи
                  </NavigationMenuTrigger>
                </Link>
                <NavigationMenuContent className="flex text-nowrap flex-col flex-1 min-w-fit w-full bg-slate-50">
                  <Link href="/proizvodi/vrati">
                    <NavigationMenuLink className=" hover:text-slate-600 transition bg-slate-50 font-bold flex min-w-fit w-fit flex-1 flex-wrap py-2 px-6">
                      Врати
                    </NavigationMenuLink>
                    <p className="border-b"></p>
                  </Link>
                  <Link href="/proizvodi/motori">
                    <NavigationMenuLink className="hover:text-slate-600 transition bg-slate-50 font-bold flex min-w-fit w-fit flex-1 flex-wrap py-2 px-6">
                      Мотори за лизгачки порти
                    </NavigationMenuLink>
                    <p className="border-b"></p>
                  </Link>
                  <Link href="/proizvodi/zavesi">
                    <NavigationMenuLink className="hover:text-slate-600 transition bg-slate-50 font-bold flex min-w-fit w-fit flex-1 flex-wrap py-2 px-6">
                      PVC Магнетни завеси
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
          <NavDropdown />
        </div>
      </div>
    </header>
  );
};
