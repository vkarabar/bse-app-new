'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { shouldHideMobileCallBar } from '@/lib/mobile-call-bar-path';
import { LocalizedLink } from '@/components/localized-link';
import { useTranslations } from '@/components/locale-provider';

const TOP_HIDE_THRESHOLD_PX = 40;
const MIN_PAGE_SCROLL_PX = 360;
const SCROLL_DOWN_BEFORE_SHOW_PX = 140;

export function MobileCallBar() {
  const pathname = usePathname();
  const t = useTranslations();
  const hiddenByRoute = shouldHideMobileCallBar(pathname);
  const [visible, setVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const downScrollAccumRef = useRef(0);

  useEffect(() => {
    if (hiddenByRoute) {
      setVisible(false);
      return;
    }

    lastScrollYRef.current = window.scrollY;

    function updateVisibility() {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;

      if (scrollY < TOP_HIDE_THRESHOLD_PX) {
        downScrollAccumRef.current = 0;
        setVisible(false);
        lastScrollYRef.current = scrollY;
        return;
      }

      if (delta > 0) {
        downScrollAccumRef.current += delta;

        if (
          scrollY >= MIN_PAGE_SCROLL_PX &&
          downScrollAccumRef.current >= SCROLL_DOWN_BEFORE_SHOW_PX
        ) {
          setVisible(true);
        }
      } else if (delta < 0) {
        downScrollAccumRef.current = 0;
        setVisible(false);
      }

      lastScrollYRef.current = scrollY;
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, [hiddenByRoute]);

  useEffect(() => {
    if (hiddenByRoute) {
      document.body.style.paddingBottom = '0px';
      return;
    }

    document.body.style.paddingBottom = visible ? '4rem' : '0px';

    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [hiddenByRoute, visible]);

  if (hiddenByRoute) {
    return null;
  }

  return (
    <div
      className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 bg-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none',
      )}
      aria-hidden={!visible}
    >
      <LocalizedLink
        href="/naracaj"
        className="flex items-center justify-center gap-2 py-3.5 w-full text-white font-semibold bg-sky-500 active:bg-sky-600 transition-colors"
        tabIndex={visible ? 0 : -1}
      >
        <FileText className="h-4 w-4" />
        {t('callBar.requestQuote')}
      </LocalizedLink>
    </div>
  );
}
