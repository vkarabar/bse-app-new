import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import Image from 'next/image';

const MotoriVratiPage = async () => {
  const { t } = await getServerTranslations();

  const slikiMotori = [
    {
      id: 1,
      title: t('productPages.motoriVrati.title'),
      imageSrc: '/motori/motor-vrata.jpg',
    },
  ];

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.motoriVrati.title')}
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center px-1 my-6">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/motori/motor-vrata.jpg"
            alt={t('productPages.motoriVrati.title')}
            width={500}
            height={290}
            className="rounded-2xl"
          />
        </div>
        <div className="hidden md:block">
          <Slajder sliki={slikiMotori} time={3000} />
        </div>
        <div className="md:mr-12 space-y-2 md:row-start-1">
          <p className="text-slate-900">{t('productPages.motoriVrati.intro.p1')}</p>
          <p className="text-slate-900">{t('productPages.motoriVrati.intro.p2')}</p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-6 mb-5 md:my-5" />

      <div className="px-2 rounded-xl py-4 hover:cursor-default lg:px-8 lg:py-7 mt-4">
        <div className="flex items-center gap-3 mb-1 text-slate-800">
          <h2 className="desc-title">{t('common.faq.modelsAvailable')}</h2>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-slate-800">
            - {t('productPages.motoriVrati.models.standard')}
          </p>
          <p className="text-slate-800">
            - {t('productPages.motoriVrati.models.highPerformance')}
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-6 mb-5 md:my-5" />

      <h2 className="uppercase text-sky-500 font-semibold text-center mb-2">
        {t('common.benefits')}
      </h2>

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/badge.svg" width={32} height={32} alt="" />
            <h2 className="desc-title col-span-2">
              {t('productPages.motoriVrati.benefits.highStandard.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.motoriVrati.benefits.highStandard.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/award.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.motoriVrati.benefits.safetySensors.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.motoriVrati.benefits.safetySensors.text')}
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-10 md:my-5" />

      <div className="mt-4 mb-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t('common.faq.warrantyDuration.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.motoriVrati.faq.warranty.answer')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default MotoriVratiPage;
