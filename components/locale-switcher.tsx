'use client';

import { cn } from '@/lib/utils';
import { useLocale } from '@/components/locale-provider';
import type { Locale } from '@/lib/i18n/locales';

type Props = {
  compact?: boolean;
  className?: string;
};

const options: { locale: Locale; label: string }[] = [
  { locale: 'mk', label: 'MK' },
  { locale: 'en', label: 'EN' },
];

export function LocaleSwitcher({ compact = false, className }: Props) {
  const { locale, switchLocale, isPending } = useLocale();

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border border-slate-600 bg-slate-700/60 p-0.5',
        compact && 'text-xs',
        isPending && 'opacity-70',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {options.map((option) => {
        const active = locale === option.locale;

        return (
          <button
            key={option.locale}
            type="button"
            onClick={() => switchLocale(option.locale)}
            className={cn(
              'min-w-[2.25rem] rounded-md px-2 py-1 font-semibold transition-colors',
              compact ? 'text-[11px] leading-none' : 'text-xs',
              active
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-600/80',
            )}
            aria-pressed={active}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
