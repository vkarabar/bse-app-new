import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

const VratiPage = () => {
  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        Wi-Fi управувачи
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center md:my-8">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden flex justify-center">
          <Image
            src="/wifi-kontroler.jpg"
            alt="Гаражна врата"
            height={150}
            width={250}
            className="rounded-2xl"
          />
        </div>

        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">
            <span className="font-semibold">Wi-Fi управувачите</span> се уреди
            кои се користат за далечинско управување на моторот на гаражни врати
            или лизгачки порти.
          </p>
          <p className="text-slate-900">
            За поврзување потребно е само да се воспостави конекција помеѓу
            управувачот и Вашиот мобилен уред, со што се овозможува далечинско
            управување.
          </p>
        </div>
        <div className="hidden md:block">
          <Image
            src="/wifi-kontroler.jpg"
            alt="Гаражна врата"
            height={130}
            width={230}
            className="rounded-2xl"
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
              src="/award.svg"
              width={32}
              height={32}
              alt="badge"
            />
            <h2 className="desc-title">Практични и лесни за употреба</h2>
          </div>

          <p className="desc">
            Подесувањето на управувачите е лесно и едноставно, и овозможува брза
            и едноставна употреба.
          </p>
        </div>
      </div>

      {/*  */}
      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8"></div>
      {/*  */}

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              Колкав домет има управувачот?
            </AccordionTrigger>
            <AccordionContent>
              Управувачите имаат антена со високофреквентни сигнали која опфаќа
              големи растојанија.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="h-[1px] w-full bg-slate-300 my-6"></div> */}
      </div>
    </div>
  );
};

export default VratiPage;
