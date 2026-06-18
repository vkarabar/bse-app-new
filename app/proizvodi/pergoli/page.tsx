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
import { PERGOLI_COLORS } from '@/lib/product-colors';
import Image from 'next/image';

const PergoliPage = async () => {
  const { t } = await getServerTranslations();

  const slikiPergoli = [1, 2].map((id) => ({
    id,
    title: t('home.slider.pergolaNumbered', { number: id }),
    imageSrc: `/pergoli/pg${id}.jpg`,
  }));

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.pergoli.title')}
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center md:mt-0 md:mb-8">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src="/pergoli/pg1.jpg"
            alt={t('common.images.aluminumPergola')}
            height={230}
            width={500}
            className="rounded-2xl"
          />
        </div>

        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">{t('productPages.pergoli.intro.p1')}</p>
          <p className="text-slate-900">{t('productPages.pergoli.intro.p2')}</p>
          <p className="text-slate-900">{t('productPages.pergoli.intro.p3')}</p>
        </div>
        <div className="hidden md:block">
          <Slajder sliki={slikiPergoli} time={3000} />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/protection.svg" width={32} height={32} alt="" />
            <h2 className="desc-title col-span-2">
              {t('productPages.pergoli.benefits.rainWindProtection.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.pergoli.benefits.rainWindProtection.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/award.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('common.faq.qualityAndDurability.title')}
            </h2>
          </div>
          <p className="desc">{t('productPages.pergoli.benefits.quality.text')}</p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/comfortable.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.pergoli.benefits.idealSpace.title')}
            </h2>
          </div>
          <p className="desc">{t('productPages.pergoli.benefits.idealSpace.text')}</p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/bulb-shine.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.pergoli.benefits.ambientLighting.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.pergoli.benefits.ambientLighting.text')}
          </p>
        </div>
      </div>

      <div className="md:hidden h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="md:hidden">
        <Slajder sliki={slikiPergoli} time={3000} />
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <ProductColorsSection colors={PERGOLI_COLORS} />
        <div className="h-[1px] w-full bg-slate-300 my-6 md:my-5 md:hidden" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t('common.faq.warrantyDuration.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.pergoli.faq.warranty.answer')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              {t('common.faq.corrosionResistance.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('common.faq.corrosionResistance.answer')}
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

      <QuoteProductWizard product="pergoli" colors={PERGOLI_COLORS} />
    </div>
  );
};

export default PergoliPage;
