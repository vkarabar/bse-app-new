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
import { VRATI_COLORS } from '@/lib/product-colors';

const slikiVrati = [
  {
    id: 1,
    title: 'Гаражна врата 1',
    imageSrc: '/vrati/vrata4.jpg',
  },
  {
    id: 2,
    title: 'Гаражна врата 2',
    imageSrc: '/vrati/vrata3.jpg',
  },
  {
    id: 3,
    title: 'Гаражна врата 3',
    imageSrc: '/vrati/vrata2.jpg',
  },
  {
    id: 4,
    title: 'Гаражна врата 4',
    imageSrc: '/vrati/vrata1.jpg',
  },
  {
    id: 5,
    title: 'Гаражна врата 5',
    imageSrc: '/vrati/vrata5.jpg',
  },
];

const VratiPage = () => {
  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        Роло Гаражни врати
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center px-1 my-6 md:my-8">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/vrati/vrata1.jpg"
            alt="Гаражна врата"
            width={500}
            height={290}
            className="rounded-2xl"
          />
        </div>
        <div className="hidden md:block">
          <Slajder
            sliki={slikiVrati}
            time={3000}
          />
        </div>
        <div className="md:mr-12 space-y-4 md:row-start-1">
          <p className="text-slate-900">
            <span className="font-semibold">Роло гаражните врати</span> се
            системи кои имаат можност лесно да се отвораат и затвораат со
            далечински управувач или преку телефон.
          </p>
          <p className="text-slate-900">
            Овозможуваат <span className="font-semibold">висока заштита</span>{' '}
            од неповолни надворешни влијанија, отпорни се корозија, силен ветер
            и на сите лоши временски услови.
          </p>
          <p className="text-slate-900">
            Целосно се произведени од{' '}
            <span className="font-semibold">висококвалитетни материјали</span>{' '}
            со што Ви гарантираме долготрајност.
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-6 mb-5 md:my-8"></div>

      {/* DEL 1 */}

      <h2 className="uppercase text-sky-500 font-semibold text-center mb-2">
        Предности
      </h2>

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/badge.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title col-span-2">Удобност и безбедност</h2>
          </div>
          <p className="desc">
            Современо решение за секоја гаража се роло гаражни врати. Нудат
            заштита на вашата гаража/објект или дом од неповолни временски
            услови
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
            <h2 className="desc-title">Kвалитет и издржливост</h2>
          </div>

          <p className="desc">
            Отпорни на врнежи, високи температурни разлики и корозија,
            благодарение на висококвалитетните алуминиумски ламели.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/checkplus.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Мала просторна зафатеност</h2>
          </div>

          <p className="desc">
            Роло гаражните врати се идеални за места каде што е потребна
            ефективна искористеност на таванот.
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
            <h2 className="desc-title">Широк спектар на бои</h2>
          </div>
          <p className="desc">
            Голем избор на бои од кои може да изберете во зависност од вашите
            потреби.
          </p>
        </div>
      </div>

      <h2 className="md:hidden h-[1px] bg-slate-200 mt-8 mb-6"></h2>

      {/* DEL 2 */}

      <h2 className="md:hidden uppercase text-sky-500 font-semibold text-center mb-3">
        Галерија
      </h2>

      <div className="md:hidden">
        <Slajder
          sliki={slikiVrati}
          time={3000}
        />
      </div>

      {/*  */}

      <div className="h-[1px] w-full bg-slate-200 mt-10 md:my-8"></div>

      <div className="mt-4 mb-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <ProductColorsSection colors={VRATI_COLORS} />

        {/*  */}

        <div className="h-[1px] w-full bg-slate-200 mt-8 mb-5 md:my-5 md:hidden"></div>

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
              Гаражните врати и компонентите имаат гаранција со времетраење од 3
              години.
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
        {/* <div className="h-[1px] w-full bg-slate-300 my-6 md:hidden"></div> */}
      </div>

      <ProductOrderSection product="vrati" colors={VRATI_COLORS} />
    </div>
  );
};

export default VratiPage;
