'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useTransition,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  createTranslator,
  getDictionary,
  type Dictionary,
  type Translator,
} from '@/lib/i18n/get-dictionary';
import {
  localizedPath,
  stripLocalePrefix,
  type Locale,
} from '@/lib/i18n/locales';

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  t: Translator;
  switchLocale: (nextLocale: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export function LocaleProvider({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { locale, pathname: strippedPathname } = stripLocalePrefix(pathname);
  const dictionary = getDictionary(locale);
  const t = useMemo(() => createTranslator(dictionary), [dictionary]);

  const switchLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }

      startTransition(() => {
        router.replace(localizedPath(strippedPathname, nextLocale));
      });
    },
    [locale, router, strippedPathname],
  );

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    router.refresh();
  }, [locale, router]);

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      t,
      switchLocale,
      isPending,
    }),
    [dictionary, isPending, locale, switchLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}

export function useTranslations() {
  return useLocale().t;
}
