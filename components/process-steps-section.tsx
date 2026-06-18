import { cn } from '@/lib/utils';

type Step = {
  number: string;
  duration: string;
  title: string;
  description: string;
  note: string;
};

type Props = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  steps: Step[];
  className?: string;
};

export function ProcessStepsSection({
  sectionLabel,
  title,
  subtitle,
  steps,
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

      <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.number}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-md"
          >
            <span className="text-3xl font-bold text-sky-500/30 tabular-nums">
              {step.number}
            </span>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-sky-600">
              {step.duration}
            </p>
            <h3 className="mt-2 text-lg font-bold text-slate-800">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {step.description}
            </p>
            <p className="mt-4 text-xs font-medium text-slate-500">{step.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
