import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  iconSrc: string;
  label: string;
  description: string;
  cta: string;
  isNew?: boolean;
  newLabel?: string;
  index: string;
  className?: string;
};

export function LandingProductCard({
  iconSrc,
  label,
  description,
  cta,
  isNew,
  newLabel = 'New',
  index,
  className,
}: Props) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-lg',
        className,
      )}
    >
      {isNew && (
        <span className="absolute right-4 top-4 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
          {newLabel}
        </span>
      )}

      <span className="text-xs font-bold uppercase tracking-widest text-sky-500">
        {index}
      </span>

      <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 transition-colors group-hover:bg-sky-50">
        <Image src={iconSrc} alt="" width={40} height={40} aria-hidden />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-800">{label}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <p className="mt-5 text-sm font-semibold text-sky-600 transition-colors group-hover:text-sky-700">
        {cta}
      </p>
    </article>
  );
}
