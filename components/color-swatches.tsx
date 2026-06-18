'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useTranslations } from '@/components/locale-provider';
import type { ColorSwatchItem } from '@/lib/product-colors';
import { getSwatchStyle } from '@/lib/product-colors';
import { cn } from '@/lib/utils';

export type { ColorSwatchItem };

function SwatchButton({
  color,
  label,
  selected,
  onSelect,
  className,
}: {
  color: ColorSwatchItem;
  label: string;
  selected: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'rounded-md ring-1 ring-slate-400 transition-all hover:ring-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        color.wide ? 'h-8 w-12' : 'h-8 w-11',
        selected && 'ring-2 ring-sky-500 ring-offset-2',
        className,
      )}
      style={getSwatchStyle(color)}
      aria-label={label}
      aria-pressed={selected}
    />
  );
}

export function ColorSwatches({ colors }: { colors: ColorSwatchItem[] }) {
  const t = useTranslations();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-w-0">
      <div className="flex gap-4 flex-wrap">
        {colors.map((color) => {
          const label = t(`colors.${color.key}`);

          return (
            <div key={color.key}>
              <div className="hidden md:block">
                <HoverCard openDelay={60} closeDelay={40}>
                  <HoverCardTrigger asChild>
                    <SwatchButton
                      color={color}
                      label={label}
                      selected={false}
                      onSelect={() => {}}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto px-3 py-2 text-sm">
                    {label}
                  </HoverCardContent>
                </HoverCard>
              </div>
              <SwatchButton
                color={color}
                label={label}
                selected={selected === color.key}
                onSelect={() => setSelected(color.key)}
                className="md:hidden"
              />
            </div>
          );
        })}
      </div>
      <p
        className={cn(
          'mt-3 text-sm md:hidden',
          selected ? 'font-semibold text-slate-800' : 'text-slate-500',
        )}
        aria-live="polite"
      >
        {selected ? t(`colors.${selected}`) : ''}
      </p>
    </div>
  );
}

export function ColorSwatchPicker({
  colors,
  value,
  onChange,
}: {
  colors: ColorSwatchItem[];
  value: string;
  onChange: (color: string) => void;
}) {
  const t = useTranslations();

  return (
    <div>
      <p className="block text-sm font-medium text-slate-700 mb-2">
        {t('forms.order.color')}
      </p>
      <div className="flex flex-wrap gap-3">
        {colors.map((item) => {
          const label = t(`colors.${item.key}`);

          return (
            <SwatchButton
              key={item.key}
              color={item}
              label={label}
              selected={value === item.key}
              onSelect={() => onChange(item.key)}
            />
          );
        })}
      </div>
      <p className="mt-2 text-sm text-slate-600 min-h-[1.25rem]">
        {value ? t(`colors.${value}`) : t('forms.order.selectColor')}
      </p>
    </div>
  );
}

export function ProductColorsSection({
  colors,
}: {
  colors: ColorSwatchItem[];
}) {
  const t = useTranslations();

  return (
    <div className="rounded-xl py-4 hover:cursor-default lg:px-8 lg:py-7 mt-4">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/swatchbook.svg" width={32} height={32} alt="" />
        <h2 className="desc-title">{t('productSections.colors.title')}</h2>
      </div>
      <div className="flex ml-3 mt-2">
        <Image
          src="/swatchbook.svg"
          width={32}
          height={32}
          alt=""
          className="opacity-0 shrink-0"
          aria-hidden
        />
        <ColorSwatches colors={colors} />
      </div>
    </div>
  );
}
