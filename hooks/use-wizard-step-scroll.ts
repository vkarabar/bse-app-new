'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { scrollWizardIntoView } from '@/lib/scroll-wizard-into-view';

export function useWizardStepScroll(
  stepIndex: number,
  containerRef: RefObject<HTMLElement | null>,
) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    requestAnimationFrame(() => {
      scrollWizardIntoView(containerRef.current);
    });
  }, [stepIndex, containerRef]);
}
