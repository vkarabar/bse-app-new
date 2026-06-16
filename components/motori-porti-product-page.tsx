import Image from 'next/image';
import Link from 'next/link';
import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductOrderSection } from '@/components/product-order-form';
import type { MotorPageData } from '@/lib/motori-porti-data';

type Props = {
  data: MotorPageData;
};

function FeatureGrid({
  title,
  items,
  tone,
}: {
  title: string;
  items: MotorPageData['pros'];
  tone: 'pro' | 'con';
}) {
  const borderClass =
    tone === 'pro'
      ? 'border-emerald-200 hover:bg-emerald-50/50'
      : 'border-amber-200 hover:bg-amber-50/50';
  const titleClass = tone === 'pro' ? 'text-emerald-800' : 'text-amber-800';

  return (
    <>
      <h2 className={`uppercase font-semibold text-center mb-4 ${titleClass}`}>
        {title}
      </h2>
      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6 mb-10">
        {items?.map((item) => (
          <div
            key={item.title}
            className={`border rounded-xl px-5 py-4 hover:cursor-default lg:px-8 lg:py-7 ${borderClass}`}
          >
            <div className="flex items-center gap-3 mb-1">
              <Image
                src={item.icon}
                width={32}
                height={32}
                alt=""
              />
              <h3 className="desc-title">{item.title}</h3>
            </div>
            <p className="desc">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function MotoriPortiProductPage({ data }: Props) {
  const heroImage = data.images[0];

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {data.title}
      </h1>

      <p className="text-sm text-slate-600 mb-6">
        Погледнете и{' '}
        <Link
          href={data.otherLink.href}
          className="font-medium text-sky-600 hover:text-sky-700 underline-offset-2 hover:underline"
        >
          {data.otherLink.label}
        </Link>
        .
      </p>

      <div className="mb-3 md:grid md:grid-cols-2 items-center px-1 my-6">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          {heroImage && (
            <Image
              src={heroImage.imageSrc}
              alt={heroImage.title}
              width={500}
              height={290}
              className="rounded-2xl"
            />
          )}
        </div>
        <div className="hidden md:block">
          <Slajder
            sliki={data.images}
            time={3000}
          />
        </div>
        <div className="md:mr-12 space-y-2 md:row-start-1">
          {data.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-slate-900"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {data.models && (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 lg:px-8 lg:py-6 mb-8">
          <h2 className="desc-title mb-3">{data.models.title}</h2>
          <div className="flex flex-col gap-2">
            {data.models.items.map((item) => (
              <p
                key={item}
                className="text-slate-800"
              >
                - {item}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="h-[1px] w-full bg-slate-200 my-8" />

      <FeatureGrid
        title={data.prosTitle}
        items={data.pros}
        tone="pro"
      />

      {/* <div className="h-[1px] w-full bg-slate-200 my-8" /> */}

      <div className="h-[1px] w-full bg-slate-200 my-8" />

      <Accordion
        type="single"
        collapsible
        className="mb-8"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Колку време трае гаранцијата?
          </AccordionTrigger>
          <AccordionContent>
            Моторите имаат гаранција со времетраење од 1 година.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            Дали се отпорни на дожд?
          </AccordionTrigger>
          <AccordionContent>
            Моторите се сертифицирани за отпорност на дожд по стандард IP.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            Колку се чека за монтажа по нарачка?
          </AccordionTrigger>
          <AccordionContent>
            Во просек по извршена нарачка монтажата се врши за 2–3 работни дена.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ProductOrderSection
        product="motori-porti"
        motorVariant={data.id}
      />
    </div>
  );
}
