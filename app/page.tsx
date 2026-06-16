import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import Link from 'next/link';

const then = new Date('2013-03-25');
const now = new Date();

const thenYear = then.getFullYear();
const nowYear = now.getFullYear();
const iskustvo = nowYear - thenYear;

const slikiHeader = [
  {
    id: 1,
    title: 'Гаражна врата',
    imageSrc: '/vrati/vrata1.jpg',
  },
  {
    id: 3,
    title: 'Гаражна врата',
    imageSrc: '/vrati/vrata4.jpg',
  },
  {
    id: 4,
    title: 'Гаражна врата',
    imageSrc: '/vrati/vrata7.jpg',
  },
  {
    id: 5,
    title: 'Гаражна врата',
    imageSrc: '/vrati/vrata8.jpg',
  },
  {
    id: 5,
    title: 'Гаражна врата',
    imageSrc: '/vrati/vrata10.jpg',
  },
];

const slikiVrati = [
  {
    id: 1,
    title: 'Гаражна врата 1',
    imageSrc: '/vrati/vrata8.jpg',
  },
  {
    id: 2,
    title: 'Гаражна врата 2',
    imageSrc: '/vrati/vrata7.jpg',
  },
  {
    id: 3,
    title: 'Гаражна врата 3',
    imageSrc: '/vrati/vrata3.jpg',
  },
  {
    id: 4,
    title: 'Гаражна врата 4',
    imageSrc: '/vrati/vrata4.jpg',
  },
  {
    id: 5,
    title: 'Гаражна врата 5',
    imageSrc: '/vrati/vrata5.jpg',
  },
  {
    id: 6,
    title: 'Гаражна врата 6',
    imageSrc: '/vrati/vrata10.jpg',
  },
  {
    id: 7,
    title: 'Гаражна врата 7',
    imageSrc: '/vrati/vrata1.jpg',
  },
];

const slikiMotori = [
  {
    id: 1,
    title: 'Шпански мотор за лизгачка порта',
    imageSrc: '/motori/motor1.png',
  },
  {
    id: 2,
    title: 'Италијански мотор за лизгачка порта',
    imageSrc: '/motori/motori-it.jpg',
  },
];

const slikiZavesi = [
  {
    id: 1,
    title: 'ПВЦ магнетни завеси',
    imageSrc: '/zavesi/mz1.jpg',
  },
  {
    id: 2,
    title: 'ПВЦ магнетни завеси',
    imageSrc: '/zavesi/mz2.jpg',
  },
];

const slikiPergoli = [
  {
    id: 1,
    title: 'Пергола 1',
    imageSrc: '/pergoli/pg1.jpg',
  },
  {
    id: 2,
    title: 'Пергола 1',
    imageSrc: '/pergoli/pg2.jpg',
  },
];

export default function Home() {
  return (
    <div className="mx-auto bg-slate-800">
      <div className="containerr text-slate-200 px-5 md:px-8 grid md:grid-cols-2 gap-8 lg:gap-16 pt-16 pb-4 lg:mb-6">
        <div className="mt-8 md:mt-2">
          <h1 className="text-slate-200 font-bold text-3xl lg:text-4xl text-center md:text-left">
            Симбол за квалитет, безбедност, функционалност.
          </h1>
          <h2 className="section-title mt-4 md:mt-6">Кои сме ние?</h2>
          <p className="md:text-lg text-center md:text-left text-slate-200">
            <span className="font-semibold sm">{iskustvo} години </span>
            на пазарот носиме врвен квалитет, најдобра и најбрза услуга и
            најниски цени.
          </p>
          <div className="text-center md:text-left">
            <button className="hidden md:block mt-2 btn-main-inv md:mt-6">
              <Link href="/about">Дознајте повеќе</Link>
            </button>
          </div>
        </div>
        <div>
          <Slajder
            className="px-8"
            sliki={slikiHeader}
          />
        </div>
        <div className="text-center md:text-left">
          <button className="md:hidden btn-main-inv mt-4 mb-8">
            <Link href="/about">Дознајте повеќе</Link>
          </button>
        </div>
      </div>
      <div className="bg-slate-50 col-span-2 px-5 md:px-8">
        <div className="containerr md:px-8">
          <h2 className="section-title pt-10 !text-left text-sky-500">
            Што нудиме?
          </h2>

          {/* VRATI */}
          <div className="mb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="lg:px-10">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                Роло гаражни врати
              </h3>
              <p className="text-slate-800">
                Зголемете ја безбедноста на вашата гаража со алуминиумска роло
                гаражна врата.
              </p>
              <Link
                className="hidden md:block"
                href="/proizvodi/vrati"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  Разгледај понуда &rarr;
                </button>
              </Link>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder
                sliki={slikiVrati}
                time={3000}
              />
            </div>
            <div className="flex items-center flex-col mt-2">
              <Link
                className="md:hidden"
                href="/proizvodi/vrati"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  Разгледај понуда &rarr;
                </button>
              </Link>
              <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>
            </div>
          </div>
          <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>

          {/* MOTORI */}

          <div className="mb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="md:col-start-2 md:row-start-1 lg:px-12">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                Мотори за лизгачки порти
              </h3>
              <p className="text-slate-800">
                Шпански и италијански модели — секој со свои карактеристики и
                комплети.
              </p>
              <Link
                className="hidden md:block"
                href="/proizvodi/motori-porti"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  Повеќе детали &rarr;
                </button>
              </Link>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder sliki={slikiMotori} />
            </div>
            <div className="flex items-center flex-col mt-2">
              <Link
                className="md:hidden"
                href="/proizvodi/motori-porti"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  Повеќе детали &rarr;
                </button>
              </Link>
              <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>
            </div>
          </div>
          <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>

          {/* PVC ZAVESI */}

          <div className="pb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="lg:px-12">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                PVC магнетни завеси
              </h3>
              <p className="text-slate-800">
                Магнетни завеси изработени од високо-квалитетен PVC материјал
                кои нудат одлична термичка изолација и заштита.
              </p>
              <Link
                className="hidden md:block"
                href="/proizvodi/zavesi"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  Разгледај понуда &rarr;
                </button>
              </Link>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder
                sliki={slikiZavesi}
                time={3000}
              />
            </div>
            <div className="flex items-center flex-col mt-2">
              <Link
                className="md:hidden"
                href="/proizvodi/zavesi"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  Разгледај понуда &rarr;
                </button>
              </Link>
              <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>
            </div>
          </div>
          <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>

          {/* PERGOLI */}

          <div className="pb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="md:col-start-2 md:row-start-1 lg:px-12">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                Алуминиумски перголи
              </h3>
              <p className="text-slate-800">
                Алуминиумски перголи погодни за многу употреби кои нудат одлична
                заштита од надворешни влијанија.
              </p>
              <Link
                className="hidden md:block"
                href="/proizvodi/pergoli"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  Разгледај понуда &rarr;
                </button>
              </Link>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder sliki={slikiPergoli} />
            </div>
            <div className="flex items-center flex-col mt-2">
              <Link
                className="md:hidden"
                href="/proizvodi/pergoli"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  Разгледај понуда &rarr;
                </button>
              </Link>
              {/* <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div> */}
            </div>
          </div>
          {/* <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div> */}
          {/* KRAJ */}

          {/* <Accordion
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Гаранција 3 години</AccordionTrigger>
              <AccordionContent>
                Гаражните врати и компонентите имаат гаранција со времетраење од
                3 години.
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
      </div>
    </div>
  );
}
