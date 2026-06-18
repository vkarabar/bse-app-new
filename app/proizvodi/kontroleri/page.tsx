import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import Image from 'next/image';

const KontroleriPage = async () => {
  const { t } = await getServerTranslations();

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.kontroleri.title')}
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center md:mt-0 md:mb-8">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden flex justify-center">
          <Image
            src="/wifi-kontroler.jpg"
            alt={t('productPages.kontroleri.title')}
            height={150}
            width={250}
            className="rounded-2xl"
          />
        </div>

        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">{t('productPages.kontroleri.intro.p1')}</p>
          <p className="text-slate-900">{t('productPages.kontroleri.intro.p2')}</p>
        </div>
        <div className="hidden md:block">
          <Image
            src="/wifi-kontroler.jpg"
            alt={t('productPages.kontroleri.title')}
            height={130}
            width={230}
            className="rounded-2xl"
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/award.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.kontroleri.benefits.easyToUse.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.kontroleri.benefits.easyToUse.text')}
          </p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t('productPages.kontroleri.faq.range.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.kontroleri.faq.range.answer')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default KontroleriPage;
