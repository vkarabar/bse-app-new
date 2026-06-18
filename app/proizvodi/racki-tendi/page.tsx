import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RackiTendiOrderForm } from '@/components/racki-tendi-order-form';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import {
  RACKI_TENDI_IMAGE,
  RACKI_TENDI_PRICE_TIERS,
} from '@/lib/racki-tendi-data';
import { formatEur } from '@/lib/order-pricing';
import Image from 'next/image';

const RackiTendiPage = async () => {
  const { t } = await getServerTranslations();

  const benefits = [
    {
      title: t('productPages.rackiTendi.benefits.durable.title'),
      text: t('productPages.rackiTendi.benefits.durable.text'),
    },
    {
      title: t('productPages.rackiTendi.benefits.smooth.title'),
      text: t('productPages.rackiTendi.benefits.smooth.text'),
    },
  ];

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.rackiTendi.title')}
      </h1>

      <div className="mb-3 md:grid md:grid-cols-2 items-center md:mt-0 md:mb-8">
        <div className="mb-6 md:hidden">
          <Image
            src={RACKI_TENDI_IMAGE}
            alt={t('productPages.rackiTendi.title')}
            width={800}
            height={500}
            priority
            className="h-auto w-full rounded-2xl object-cover"
          />
        </div>

        <div className="md:mr-12 space-y-4">
          <p className="text-slate-900">{t('productPages.rackiTendi.intro.p1')}</p>
          <p className="text-slate-900">{t('productPages.rackiTendi.intro.p2')}</p>
        </div>

        <div className="hidden md:block">
          <Image
            src={RACKI_TENDI_IMAGE}
            alt={t('productPages.rackiTendi.title')}
            height={260}
            width={360}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="rounded-xl border border-slate-300 px-5 py-4 lg:px-8 lg:py-7">
        <h2 className="desc-title mb-3">{t('productPages.rackiTendi.pricing.title')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-800">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-2 pr-4 font-semibold">
                  {t('productPages.rackiTendi.pricing.lengthColumn')}
                </th>
                <th className="py-2 font-semibold">
                  {t('productPages.rackiTendi.pricing.priceColumn')}
                </th>
              </tr>
            </thead>
            <tbody>
              {RACKI_TENDI_PRICE_TIERS.map((tier) => (
                <tr
                  key={tier.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-2.5 pr-4">{t(tier.labelKey)}</td>
                  <td className="py-2.5 font-medium text-sky-700">
                    {formatEur(tier.priceEur)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <h2 className="uppercase text-sky-500 font-semibold text-center mb-2">
        {t('common.benefits')}
      </h2>

      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default lg:px-8 lg:py-7"
          >
            <div className="flex items-center gap-3 mb-1">
              <Image
                src="/badge.svg"
                width={32}
                height={32}
                alt=""
              />
              <h2 className="desc-title">{benefit.title}</h2>
            </div>
            <p className="desc">{benefit.text}</p>
          </div>
        ))}
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="rounded-xl border border-slate-300 bg-white px-5 py-5 lg:px-8 lg:py-8">
        <h2 className="desc-title mb-1">{t('forms.order.titleOrder')}</h2>
        <p className="desc mb-5">{t('forms.order.descriptionRackiTendi')}</p>
        <RackiTendiOrderForm />
      </div>

      <div className="h-[1px] w-full bg-slate-300 my-6 md:my-8" />

      <div className="my-6 space-y-4 md:grid md:grid-cols-2 gap-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {t('productPages.rackiTendi.faq.compatibility.question')}
            </AccordionTrigger>
            <AccordionContent>
              {t('productPages.rackiTendi.faq.compatibility.answer')}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default RackiTendiPage;
