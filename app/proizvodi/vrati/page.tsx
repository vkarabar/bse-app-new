import Slajder from '@/components/slajder';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductColorsSection } from '@/components/color-swatches';
import { GarageDoorOrderWizard } from '@/components/garage-door-order-wizard';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { VRATI_COLORS } from '@/lib/product-colors';
import {
  garageDoorImageSrc,
  toGarageDoorSliderItems,
  VRATI_PAGE_SLIDER_IDS,
} from '@/lib/product-gallery-images';
import Image from 'next/image';

function BoldParagraph({
  beforeBold,
  bold,
  afterBold,
}: {
  beforeBold?: string;
  bold: string;
  afterBold?: string;
}) {
  return (
    <p className="text-slate-900">
      {beforeBold}
      <span className="font-semibold">{bold}</span>
      {afterBold}
    </p>
  );
}

function PlaceholderParagraph({
  text,
  bold,
}: {
  text: string;
  bold: string;
}) {
  const [before = '', after = ''] = text.split('{bold}');
  return (
    <p className="text-slate-900">
      {before}
      <span className="font-semibold">{bold}</span>
      {after}
    </p>
  );
}

const VratiPage = async () => {
  const { t } = await getServerTranslations();

  const slikiVrati = toGarageDoorSliderItems(VRATI_PAGE_SLIDER_IDS, (number) =>
    t('home.slider.garageDoorNumbered', { number }),
  );

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.vrati.title')}
      </h1>
      <div className="mb-3 md:grid md:grid-cols-2 items-center px-1 my-6 md:mt-0 md:mb-8">
        <div className="md:mr-12 mb-6 md:col-start-2 md:hidden">
          <Image
            src={garageDoorImageSrc(1)}
            alt={t('common.images.garageDoor')}
            width={500}
            height={290}
            className="rounded-2xl"
          />
        </div>
        <div className="hidden md:block">
          <Slajder sliki={slikiVrati} time={3000} />
        </div>
        <div className="md:mr-12 space-y-4 md:row-start-1">
          <BoldParagraph
            bold={t('productPages.vrati.intro.p1bold')}
            afterBold={` ${t('productPages.vrati.intro.p1')}`}
          />
          <PlaceholderParagraph
            text={t('productPages.vrati.intro.p2')}
            bold={t('productPages.vrati.intro.p2bold')}
          />
          <PlaceholderParagraph
            text={t('productPages.vrati.intro.p3')}
            bold={t('productPages.vrati.intro.p3bold')}
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-6 mb-5 md:my-8" />

      <h2 className="uppercase text-sky-500 font-semibold text-center mb-2">
        {t('common.benefits')}
      </h2>

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/badge.svg" width={32} height={32} alt="" />
            <h2 className="desc-title col-span-2">
              {t('productPages.vrati.benefits.comfortSafety.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.vrati.benefits.comfortSafety.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/award.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.vrati.benefits.quality.title')}
            </h2>
          </div>
          <p className="desc">{t('productPages.vrati.benefits.quality.text')}</p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/checkplus.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.vrati.benefits.spaceEfficiency.title')}
            </h2>
          </div>
          <p className="desc">
            {t('productPages.vrati.benefits.spaceEfficiency.text')}
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7">
          <div className="flex items-center gap-3 mb-1">
            <Image src="/swatchbook.svg" width={32} height={32} alt="" />
            <h2 className="desc-title">
              {t('productPages.vrati.benefits.colorRange.title')}
            </h2>
          </div>
          <p className="desc">{t('productPages.vrati.benefits.colorRange.text')}</p>
        </div>
      </div>

      <h2 className="md:hidden h-[1px] bg-slate-200 mt-8 mb-6" />

      <h2 className="md:hidden uppercase text-sky-500 font-semibold text-center mb-3">
        {t('common.gallery')}
      </h2>

      <div className="md:hidden">
        <Slajder sliki={slikiVrati} time={3000} />
      </div>

      <div className="h-[1px] w-full bg-slate-200 mt-10 md:my-8" />

      <div className="mt-4 mb-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <ProductColorsSection colors={VRATI_COLORS} />
        <div className="h-[1px] w-full bg-slate-200 mt-8 mb-5 md:my-5 md:hidden" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t('common.faq.warrantyDuration.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.vrati.faq.warranty.answer')}
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

      <section className="mt-8 mb-6">
        <GarageDoorOrderWizard />
      </section>
    </div>
  );
};

export default VratiPage;
