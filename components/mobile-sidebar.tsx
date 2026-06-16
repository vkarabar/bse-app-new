'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import { Menu } from 'lucide-react';

export const MobileSidebar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={setSheetOpen}
    >
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent
        className="p-0 z-[100]"
        side="left"
      >
        <Sidebar setOpen={setSheetOpen} />
      </SheetContent>
    </Sheet>
  );
};
