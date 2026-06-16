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
import { PERGOLI_COLORS } from '@/lib/product-colors';

const slikiVrati = [
  {
    id: 1,
    title: 'Пергола 1',
    imageSrc: '/pergoli/pg1.jpg',
  },
  {
    id: 2,
    title: 'Пергола 2',
    imageSrc: '/pergoli/pg2.jpg',
  },
];

const VratiPage = () => {
  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        Алуминиумски Перголи
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center md:my-8">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/pergoli/pg1.jpg"
            alt="Алуминиумска пергола"
            height={230}
            width={500}
            className="rounded-2xl"
          />
        </div>

        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">
            <span className="font-semibold">Алуминиумските перголи</span> се
            одлично решение за да се ослободите од затворениот простор и да
            уживате во отворен простор извршувајќи ги вашите секојдневни
            активности.
          </p>
          <p className="text-slate-900">
            Перголата можете во секое време да ја{' '}
            <span className="font-semibold">отворите</span>, доколку сакате
            поголем пропуст на светлина и воздух, или да ја{' '}
            <span className="font-semibold">затворите</span> за да ги спречите
            надворешните влијанија.
          </p>
          <p className="text-slate-900">
            Тие се изработени{' '}
            <span className="font-semibold">висококвалитетни материјали</span>{' '}
            што ќе обезбедат беспрекорен изглед и висока издржливост.
          </p>
        </div>
        <div className="hidden md:block">
          <Slajder
            sliki={slikiVrati}
            time={3000}
          />
        </div>
      </div>

      {/*  */}
      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8"></div>
      {/* DEL 1 */}

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/protection.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title col-span-2">Заштита од врнежи и ветер</h2>
          </div>
          <p className="desc">
            Сега можете секојдневно во комфор да уживате не грижејќи се за
            неповолни временски услови.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/award.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Квалитет и издржливост</h2>
          </div>

          <p className="desc">
            Отпорни на врнежи, високи температурни разлики и корозија,
            благодарение на висококвалитетните материјали.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/comfortable.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Идеален простор за вас</h2>
          </div>

          <p className="desc">
            Направете го просторот Вашето омилено катче за поминување на
            времето.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/bulb-shine.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Амбиентално осветлување</h2>
          </div>
          <p className="desc">
            Обезбедете си одличен амбиент со подесување на амбиенталното
            осветлување во зависност од вашите потреби.
          </p>
        </div>
      </div>

      {/*  */}
      <div className="md:hidden h-[1px] w-full bg-slate-300 my-6 md:my-8"></div>

      {/*  */}
      <div className="md:hidden">
        <Slajder
          sliki={slikiVrati}
          time={3000}
        />
      </div>

      {/*  */}
      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8"></div>
      {/*  */}

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <ProductColorsSection colors={PERGOLI_COLORS} />

        {/*  */}
        <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5 md:hidden"></div>
        {/*  */}

        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              Колку време трае гаранцијата?
            </AccordionTrigger>
            <AccordionContent>
              Гаранцијата за перголите е со времетраење од 3 години од времето
              на монтажа.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Дали материјалите се отпорни на корозија?
            </AccordionTrigger>
            <AccordionContent>
              Сите компоненти се изработени од висококвалитетни материјали
              отпорни на корозија.
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

      <ProductOrderSection product="pergoli" colors={PERGOLI_COLORS} />
    </div>
  );
};

export default VratiPage;
