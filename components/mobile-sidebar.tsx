'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

export const MobileSidebar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger aria-label="Open menu">
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent
        className="p-0 z-[100] border-l border-slate-700 bg-slate-800"
        side="right"
      >
        <Sidebar setOpen={setSheetOpen} />
      </SheetContent>
    </Sheet>
  );
};
