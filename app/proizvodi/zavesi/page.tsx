import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { ProductColorsSection } from '@/components/color-swatches';
import { ProductOrderSection } from '@/components/product-order-form';
import { ZAVESI_COLORS } from '@/lib/product-colors';

const slikiZavesi = [
  {
    id: 1,
    title: 'ПВЦ Завеси 1',
    imageSrc: '/zavesi/mz1.jpg',
  },
  {
    id: 2,
    title: 'ПВЦ Завеси 2',
    imageSrc: '/zavesi/mz2.jpg',
  },
];

const VratiPage = () => {
  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        PVC Магнетни завеси
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/zavesi/mz1.jpg"
            alt="Гаражна врата"
            height={230}
            width={500}
            className="rounded-2xl"
          />
        </div>
        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">
            <span className="font-semibold">PVC магнетните завеси</span> се
            одлично решение доколку сакате да се ослободите од прашина, инсекти,
            ветер и други надворешни влијанија. Исто така нудат одлична{' '}
            <span className="font-semibold">термичка и звучна изолација.</span>
          </p>
          <p className="text-slate-900">
            Одлично се вклопуваат на места каде што има зголемена потреба од
            заштита од
            <span className="font-semibold"> прашина, инсекти и ветер.</span>
          </p>
          <p className="text-slate-900">
            Тие се изработени{' '}
            <span className="font-semibold">висококвалитетни материјали</span>{' '}
            што гарантира за целосна заштита и висока издржливост.
          </p>
        </div>
        <div className="hidden md:block">
          <Slajder
            sliki={slikiZavesi}
            time={3000}
          />
        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5"></div>
      {/* DEL 1 */}

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/wind.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title col-span-2">
              Заштита од ветер и прашина
            </h2>
          </div>
          <p className="desc">
            Повеќе нема да го чувствувате непријатниот ветер и прашината што ја
            носи со себе. Магнетните завеси нудат целосна заштита од ветер и
            прашина.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/insect.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Заштита од инсекти</h2>
          </div>

          <p className="desc">
            Инсектите се непријатни и можат да бидат многу штетни, посебно на
            места каде што се чува храна. Повеќе нема да се грижите за тој
            проблем.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/anytime-protection.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Заштита во било кое време</h2>
          </div>

          <p className="desc">
            Завесите се изработени од квалитетен материјал со што се обезбедува
            заштита при сите лоши надворешни услови во секое време.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/swatchbook.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Различни бои</h2>
          </div>
          <p className="desc">
            Достапни се во неколку различни бои од кои може да изберете во
            зависност од вашите потреби.
          </p>
        </div>
      </div>
      <h2 className="h-[1px] bg-slate-300 my-4"></h2>
      <div className="md:hidden">
        <Slajder
          sliki={slikiZavesi}
          time={3000}
        />
      </div>

      {/*  */}
      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5"></div>
      {/*  */}

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <ProductColorsSection colors={ZAVESI_COLORS} />

        {/*  */}
        <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5 md:hidden"></div>
        {/*  */}

        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              Дали завесите нудат термичка изолација?
            </AccordionTrigger>
            <AccordionContent>
              Магнетните завеси го ограничуваат протокот на воздух и нудат
              одлична термичка изолација.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Дали се отпорни на екстремни температури?
            </AccordionTrigger>
            <AccordionContent>
              Завесите се изработени од висококвалитетни материјали отпорни на
              екстремни температури.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Колку се чека за монтажа по нарачка?
            </AccordionTrigger>
            <AccordionContent>
              Во просек по извршена нарачка монтажата се врши за 2-3 работни
              дена.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="h-[1px] w-full bg-slate-300 my-6"></div> */}
      </div>

      <ProductOrderSection product="zavesi" colors={ZAVESI_COLORS} />
    </div>
  );
};

export default VratiPage;
