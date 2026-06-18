'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type HomeWizardProgressContextValue = {
  isWizardInProgress: boolean;
  setWizardInProgress: (inProgress: boolean) => void;
};

const HomeWizardProgressContext =
  createContext<HomeWizardProgressContextValue | null>(null);

export function HomeWizardProgressProvider({ children }: { children: ReactNode }) {
  const [isWizardInProgress, setWizardInProgress] = useState(false);

  const value = useMemo(
    () => ({ isWizardInProgress, setWizardInProgress }),
    [isWizardInProgress],
  );

  return (
    <HomeWizardProgressContext.Provider value={value}>
      {children}
    </HomeWizardProgressContext.Provider>
  );
}

export function useHomeWizardProgress() {
  return useContext(HomeWizardProgressContext);
}
