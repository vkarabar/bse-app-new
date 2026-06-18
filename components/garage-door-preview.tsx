'use client';

import { motion } from 'framer-motion';
import { Radio, Settings2, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { VRATI_COLORS, getSwatchStyle } from '@/lib/product-colors';
import type { ColorKey } from '@/lib/product-colors';
import {
  getGarageDoorSlatCount,
  getGoldenOakSlatLayerStyle,
} from '@/lib/garage-door-textures';
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

function buildSlatPattern(
  slatHeightPx: number,
  light: boolean,
): string {
  const slatHighlight = light ? 0.07 : 0.05;
  const slatGroove = light ? 0.12 : 0.2;

  return `repeating-linear-gradient(
    to bottom,
    rgba(255,255,255,${slatHighlight}) 0px,
    rgba(255,255,255,${slatHighlight}) 0.5px,
    transparent 0.5px,
    transparent ${slatHeightPx - 1}px,
    rgba(0,0,0,${slatGroove * 0.45}) ${slatHeightPx - 1}px,
    rgba(0,0,0,${slatGroove}) ${slatHeightPx - 0.5}px,
    rgba(0,0,0,${slatGroove * 0.55}) ${slatHeightPx}px
  )`;
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });

  const colorConfig = VRATI_COLORS.find((item) => item.key === color);
  const colorHex = colorConfig?.hex ?? '#94a3b8';
  const hasWoodTexture = Boolean(colorConfig?.texture);
  const light = isLightColor(colorHex, color);
  const aspectRatio = Math.min(Math.max(width / height, 0.75), 2.4);
  const slatCount = getGarageDoorSlatCount(height);
  const slatHeightPx =
    panelSize.height > 0
      ? panelSize.height / slatCount
      : compact
        ? 4.5
        : 5;

  const slatPattern = buildSlatPattern(slatHeightPx, light);
  const slatIndexes = Array.from({ length: slatCount }, (_, index) => index);

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setPanelSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [width, height, color, compact]);

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
              ref={panelRef}
              className={cn(
                'absolute inset-x-[6%] top-[4%] bottom-[6%] overflow-hidden rounded-[1px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.12)]',
                light && 'ring-1 ring-slate-300',
              )}
              style={{ backgroundColor: colorHex }}
            >
              {hasWoodTexture ? (
                <div className="flex h-full flex-col">
                  {slatIndexes.map((slatIndex) => (
                    <div
                      key={slatIndex}
                      className="relative min-h-0 flex-1 overflow-hidden"
                    >
                      <div
                        className="absolute inset-0"
                        style={
                          panelSize.width > 0
                            ? getGoldenOakSlatLayerStyle(slatIndex)
                            : { backgroundColor: colorHex }
                        }
                      />
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25"
                        aria-hidden
                      />
                      {slatIndex < slatCount - 1 && (
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black/25"
                          aria-hidden
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: slatPattern }}
                />
              )}
              {!hasWoodTexture && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-35"
                  style={{ backgroundImage: slatPattern }}
                  aria-hidden
                />
              )}
              <div className="absolute inset-y-0 left-[18%] w-px bg-black/8" />
              <div className="absolute inset-y-0 right-[18%] w-px bg-black/8" />
              <div
                className="absolute inset-x-0 bottom-0 h-[6%]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.12), transparent)',
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
                style={
                  colorConfig
                    ? getSwatchStyle(colorConfig)
                    : { backgroundColor: colorHex }
                }
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
