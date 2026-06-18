import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductColorsSection } from '@/components/color-swatches';
import { QuoteProductWizard } from '@/components/quote-product-wizard';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { ZAVESI_COLORS } from '@/lib/product-colors';
import Image from 'next/image';

const ZavesiPage = async () => {
  const { t } = await getServerTranslations();

  const slikiZavesi = [1, 2].map((id) => ({
    id,
    title: `${t('home.slider.pvcMagneticCurtains')} ${id}`,
    imageSrc: `/zavesi/mz${id}.jpg`,
  }));

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.zavesi.title')}
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/zavesi/mz1.jpg"
            alt={t('home.slider.pvcMagneticCurtains')}
            height={230}
            width={500}
            className="rounded-2xl"
          />
        </div>
        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">{t('productPages.zavesi.intro.p1')}</p>
          <p className="text-slate-900">{t('productPages.zavesi.intro.p2')}</p>
          <p className="text-slate-900">{t('productPages.zavesi.intro.p3')}</p>
        </div>
        <div className="hidden md:block">
          <Slajder sliki={slikiZavesi} time={3000} />
        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5" />

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/wind.svg" width={32} height={32} alt="" />
            <h2 className="desc-title col-span-2">
              {t('productPages.zavesi.benefits.windDustProtection.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.zavesi.benefits.windDustProtection.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/insect.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.zavesi.benefits.insectProtection.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.zavesi.benefits.insectProtection.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/anytime-protection.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.zavesi.benefits.anytimeProtection.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.zavesi.benefits.anytimeProtection.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/swatchbook.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.zavesi.benefits.colors.title')}
            </h2>
          </div>
          <p className="desc">{t('productPages.zavesi.benefits.colors.text')}</p>
        </div>
      </div>
      <h2 className="h-[1px] bg-slate-300 my-4" />
      <div className="md:hidden">
        <Slajder sliki={slikiZavesi} time={3000} />
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5" />

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <ProductColorsSection colors={ZAVESI_COLORS} />
        <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5 md:hidden" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t('productPages.zavesi.faq.thermalInsulation.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.zavesi.faq.thermalInsulation.answer')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              {t('productPages.zavesi.faq.extremeTemperatures.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.zavesi.faq.extremeTemperatures.answer')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              {t('common.faq.installationWait.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('common.faq.installationWait.answer')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <QuoteProductWizard product="zavesi" colors={ZAVESI_COLORS} />
    </div>
  );
};

export default ZavesiPage;
