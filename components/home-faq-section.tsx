'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  sectionLabel: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
  className?: string;
};

export function HomeFaqSection({
  sectionLabel,
  title,
  subtitle,
  items,
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

      <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-slate-200 bg-white px-4 md:px-6">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-slate-800 hover:no-underline hover:text-sky-600">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
