import { ShieldCheck, Timer, Users, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

type Benefit = {
  title: string;
  text: string;
};

type Props = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  benefits: Benefit[];
  className?: string;
};

const icons = [Users, ShieldCheck, Timer, Wrench];

export function WhyBseSection({
  sectionLabel,
  title,
  subtitle,
  benefits,
  className,
}: Props) {
  return (
    <section className={cn('py-10 md:py-14', className)}>
      <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
        {sectionLabel}
      </p>
      <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-800">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4 md:gap-5">
        {benefits.map((benefit, index) => {
          const Icon = icons[index] ?? ShieldCheck;

          return (
            <article
              key={benefit.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-800">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {benefit.text}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
