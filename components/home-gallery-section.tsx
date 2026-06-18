'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  images: GalleryImage[];
  className?: string;
};

export function HomeGallerySection({
  sectionLabel,
  title,
  subtitle,
  images,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  function goPrev() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  if (!current) return null;

  return (
    <section className={cn('py-10 md:py-14', className)}>
      <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
        {sectionLabel}
      </p>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-800">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
        <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-slate-100">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 900px"
            priority={index === 0}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-center min-w-0 flex-1">
            {current.caption && (
              <p className="text-sm font-medium text-slate-800 truncate">
                {current.caption}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              {index + 1} / {images.length}
            </p>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-700 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, imageIndex) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(imageIndex)}
              className={cn(
                'relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                imageIndex === index
                  ? 'border-sky-500 ring-2 ring-sky-200'
                  : 'border-slate-200 opacity-70 hover:opacity-100',
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
