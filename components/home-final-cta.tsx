import { LocalizedLink } from '@/components/localized-link';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  ctaQuote: string;
  ctaCall: string;
  phone: string;
  className?: string;
};

export function HomeFinalCta({
  title,
  subtitle,
  bullets,
  ctaQuote,
  ctaCall,
  phone,
  className,
}: Props) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-slate-800 px-5 md:px-8 py-14 md:py-20',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_50%)]" />

      <div className="containerr relative md:px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-100 uppercase tracking-tight">
          {title}
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-slate-300 md:text-lg">
          {subtitle}
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2"
            >
              <Check
                className="h-4 w-4 text-sky-400 shrink-0"
                aria-hidden
              />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <LocalizedLink
            href="/naracaj"
            className="btn-main-inv w-full sm:w-auto"
          >
            {ctaQuote}
          </LocalizedLink>
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="btn-main w-full sm:w-auto text-white"
          >
            {ctaCall}
          </a>
        </div>
      </div>
    </section>
  );
}
