'use client';

import { useEffect, type RefObject } from 'react';
import { scrollIntoViewIfNeeded } from '@/lib/scroll-wizard-into-view';

export function useScrollIntoViewWhen(
  active: boolean,
  targetRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;

    requestAnimationFrame(() => {
      scrollIntoViewIfNeeded(targetRef.current);
    });
  }, [active, targetRef]);
}
