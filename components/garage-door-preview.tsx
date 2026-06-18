'use client';

import { motion } from 'framer-motion';
import { Radio, Settings2, Wrench } from 'lucide-react';
import { VRATI_COLORS } from '@/lib/product-colors';
import type { ColorKey } from '@/lib/product-colors';
import { cn } from '@/lib/utils';

type Props = {
  width: number;
  height: number;
  color: ColorKey | '';
  colorLabel?: string;
  motorRequested?: boolean;
  mountingRequested?: boolean;
  remoteCount?: number;
  remotesLabel?: string;
  previewTitle: string;
  previewNote: string;
  motorLabel: string;
  mountingLabel: string;
  dimensionsLabel: string;
  className?: string;
  compact?: boolean;
};

function isLightColor(hex: string, key: ColorKey | '') {
  if (key === 'white' || key === 'gray') return true;
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return false;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

export function GarageDoorPreview({
  width,
  height,
  color,
  colorLabel,
  motorRequested,
  mountingRequested,
  remoteCount,
  remotesLabel,
  previewTitle,
  previewNote,
  motorLabel,
  mountingLabel,
  dimensionsLabel,
  className,
  compact = false,
}: Props) {
  const colorHex =
    VRATI_COLORS.find((item) => item.key === color)?.hex ?? '#94a3b8';
  const light = isLightColor(colorHex, color);
  const aspectRatio = Math.min(Math.max(width / height, 0.75), 2.4);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200/80',
        className,
      )}
    >
      <div className={cn('px-4 pt-4', compact ? 'pb-3' : 'pb-2')}>
        <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
          {previewTitle}
        </p>
      </div>

      <div
        className={cn(
          'relative flex items-end justify-center px-6',
          compact ? 'pb-4 pt-1' : 'pb-6 pt-2',
        )}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-300/50 to-transparent pointer-events-none"
          aria-hidden
        />

        <motion.div
          key={`${color}-${width}-${height}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-[320px]"
          style={{ aspectRatio: `${aspectRatio} / 1` }}
        >
          <div className="absolute inset-0 rounded-sm bg-[linear-gradient(135deg,#cbd5e1_0%,#94a3b8_100%)] shadow-inner" />

          <div className="absolute inset-[10%] rounded-[2px] bg-slate-700/20 ring-1 ring-black/10">
            <div className="absolute inset-x-[6%] -top-[7%] h-[9%] rounded-t-md bg-gradient-to-b from-slate-600 to-slate-700 shadow-md">
              <div className="absolute inset-x-[12%] top-1/2 h-[28%] -translate-y-1/2 rounded-full bg-slate-800/70" />
            </div>

            <div
              className={cn(
                'absolute inset-x-[6%] top-[4%] bottom-[6%] overflow-hidden rounded-[1px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.18)]',
                light && 'ring-1 ring-slate-300',
              )}
              style={{
                backgroundColor: colorHex,
                backgroundImage: `repeating-linear-gradient(
                  to bottom,
                  rgba(255,255,255,${light ? 0.08 : 0.06}) 0px,
                  rgba(255,255,255,${light ? 0.08 : 0.06}) 1px,
                  transparent 1px,
                  transparent 11px,
                  rgba(0,0,0,${light ? 0.1 : 0.16}) 11px,
                  rgba(0,0,0,${light ? 0.1 : 0.16}) 12px
                )`,
              }}
            >
              <div className="absolute inset-y-0 left-[18%] w-px bg-black/10" />
              <div className="absolute inset-y-0 right-[18%] w-px bg-black/10" />
              <div
                className="absolute inset-x-0 bottom-0 h-[10%]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.18), transparent)',
                }}
              />
            </div>

            <div className="absolute -bottom-[5%] left-[6%] right-[6%] h-[5%] rounded-b-sm bg-slate-800/85" />
          </div>

          <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
            <span className="rounded bg-slate-800/85 px-1.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
              {height} cm
            </span>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <span className="rounded bg-slate-800/85 px-1.5 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
              {width} cm
            </span>
          </div>
        </motion.div>
      </div>

      <div
        className={cn(
          'border-t border-slate-200/80 bg-white/70 px-4 py-3',
          compact && 'px-3 py-2.5',
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          {colorLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
              <span
                className={cn(
                  'h-3 w-3 rounded-full ring-1 ring-black/10',
                  light && 'ring-slate-300',
                )}
                style={{ backgroundColor: colorHex }}
              />
              {colorLabel}
            </span>
          )}
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
            {dimensionsLabel}: {width} × {height} cm
          </span>
          {motorRequested && (
            <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
              <Settings2 className="h-3 w-3" aria-hidden />
              {motorLabel}
            </span>
          )}
          {mountingRequested && (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
              <Wrench className="h-3 w-3" aria-hidden />
              {mountingLabel}
            </span>
          )}
          {motorRequested && remoteCount !== undefined && remoteCount > 0 && remotesLabel && (
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
              <Radio className="h-3 w-3" aria-hidden />
              {remotesLabel}: {remoteCount}
            </span>
          )}
        </div>
        {!compact && (
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            {previewNote}
          </p>
        )}
      </div>
    </div>
  );
}
