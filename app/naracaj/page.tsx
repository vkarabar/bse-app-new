import { Suspense } from 'react';
import { OrderPageHub } from '@/components/order-page-hub';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';

export default async function NaracajPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-6rem)] px-5 md:px-8 pt-8 md:pt-8 pb-10 md:pb-14">
      <div className="containerr md:px-8 max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
          {t('home.wizard.sectionLabel')}
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-bold text-slate-800">
          {t('naracajPage.title')}
        </h1>
        <p className="mt-3 text-slate-600">{t('naracajPage.subtitle')}</p>

        <div className="mt-8">
          <Suspense fallback={<div className="h-40" aria-hidden />}>
            <OrderPageHub />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
