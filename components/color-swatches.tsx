'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type ColorSwatchItem = {
  name: string;
  hex: string;
  wide?: boolean;
};

function SwatchButton({
  color,
  selected,
  onSelect,
  className,
}: {
  color: ColorSwatchItem;
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
      style={{ backgroundColor: color.hex }}
      aria-label={color.name}
      aria-pressed={selected}
    />
  );
}

function SwatchWithHoverLabel({
  color,
  selected,
  onSelect,
  className,
}: {
  color: ColorSwatchItem;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('relative group', className)}>
      <SwatchButton color={color} selected={!!selected} onSelect={onSelect} />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:block"
      >
        {color.name}
      </span>
    </div>
  );
}

export function ColorSwatches({ colors }: { colors: ColorSwatchItem[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-w-0">
      <div className="flex gap-4 flex-wrap">
        {colors.map((color) => (
          <div key={color.name}>
            <SwatchWithHoverLabel color={color} className="hidden md:block" />
            <SwatchButton
              color={color}
              selected={selected === color.name}
              onSelect={() => setSelected(color.name)}
              className="md:hidden"
            />
          </div>
        ))}
      </div>
      <p
        className={cn(
          'mt-3 text-sm md:hidden',
          selected ? 'font-semibold text-slate-800' : 'text-slate-500',
        )}
        aria-live="polite"
      >
        {selected ?? ''}
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
  return (
    <div>
      <p className="block text-sm font-medium text-slate-700 mb-2">Боја</p>
      <div className="flex flex-wrap gap-3">
        {colors.map((item) => (
          <SwatchWithHoverLabel
            key={item.name}
            color={item}
            selected={value === item.name}
            onSelect={() => onChange(item.name)}
          />
        ))}
      </div>
      <p className="mt-2 text-sm text-slate-600 min-h-[1.25rem]">
        {value || 'Изберете боја'}
      </p>
    </div>
  );
}

export function ProductColorsSection({
  colors,
}: {
  colors: ColorSwatchItem[];
}) {
  return (
    <div className="rounded-xl py-4 hover:cursor-default lg:px-8 lg:py-7 mt-4">
      <div className="flex items-center gap-3 mb-1">
        <Image src="/swatchbook.svg" width={32} height={32} alt="" />
        <h2 className="desc-title">Достапни се следните бои:</h2>
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
