// import Image from 'next/image';

// const MotoriPage = () => {
//   return (
//     <div>
//       <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
//         Мотори за лизгачки порти
//       </h1>
//       <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
//         <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default">
//           <div className="flex items-center gap-3">
//             <h2 className="desc-title col-span-2">Ултра брзи мотори</h2>
//             <Image
//               src="/badge.svg"
//               width={32}
//               height={32}
//               alt="badge"
//             />
//           </div>
//           <p className="desc">
//             Мотори со висока брзина кои за експресно време ја отвараат вашата
//             врата.
//           </p>
//         </div>
//         <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default">
//           <div className="flex items-center gap-3">
//             <h2 className="desc-title col-span-2">Ултра брзи мотори</h2>
//             <Image
//               src="/badge.svg"
//               width={32}
//               height={32}
//               alt="badge"
//             />
//           </div>
//           <p className="desc">
//             Мотори со висока брзина кои за експресно време ја отвараат вашата
//             врата.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MotoriPage;

import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

const slikiMotori = [
  {
    id: 1,
    title: 'Мотор за лизгачка порта 1',
    imageSrc: '/motori/motor-vrata.jpg',
  },
  {
    id: 1,
    title: 'Мотор за лизгачка порта 1',
    imageSrc: '/motori/motor-vrata.jpg',
  },
];

const VratiPage = () => {
  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        Мотори за гаражни врати
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center px-1 my-6">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/motori/motor-vrata.jpg"
            alt="Гаражна врата"
            width={500}
            height={290}
            className="rounded-2xl"
          />
        </div>
        <div className="hidden md:block">
          <Slajder
            sliki={slikiMotori}
            time={3000}
          />
        </div>
        <div className="md:mr-12 space-y-2 md:row-start-1">
          <p className="text-slate-900">
            Моторите се изработени од{' '}
            <span className="font-semibold">висококвалитетни материјали</span> и
            по највисоки стандарди.
          </p>

          <p>
            <span className="font-semibold">
              Моторите со високи перформанси
            </span>{' '}
            имаат многу голема брзина и се со вградени безбедносни сензори.
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-6 mb-5 md:my-5"></div>

      {/* DEL 1 */}

      <div className="px-2 rounded-xl py-4 hover:cursor-default lg:px-8 lg:py-7 mt-4">
        <div className="flex items-center gap-3 mb-1 text-slate-800">
          <h2 className="desc-title">Достапи се 2 модели:</h2>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-slate-800">- Стандардни мотори</p>
          <p className="text-slate-800">- Мотори со високи перформанси</p>
        </div>
      </div>

      {/*  */}

      <div className="h-[1px] w-full bg-slate-200 mt-6 mb-5 md:my-5"></div>

      {/*  */}

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
            <h2 className="desc-title col-span-2">Висок стандард</h2>
          </div>
          <p className="desc">
            Моторите за гаражни врати се изработени во согласност со високи
            стандарди.
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
            <h2 className="desc-title">Сензори за заштита</h2>
          </div>

          <p className="desc">
            Моторите содржат сензори за заштита при детекција на отпор.
          </p>
        </div>
      </div>

      {/*  */}

      <div className="h-[1px] w-full bg-slate-200 mt-10 md:my-5"></div>

      <div className="mt-4 mb-6 space-y-4 md:grid md:grid-cols-2 gap-6">
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
              Гаранцијата на моторите е во времетраење од 3 години.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="h-[1px] w-full bg-slate-300 my-6 md:hidden"></div> */}
      </div>
    </div>
  );
};

export default VratiPage;
