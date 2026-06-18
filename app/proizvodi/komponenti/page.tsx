import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import Image from 'next/image';

const KomponentiPage = async () => {
  const { t } = await getServerTranslations();

  const items = [
    {
      title: t('productPages.komponenti.items.motors.title'),
      text: t('productPages.komponenti.items.motors.text'),
    },
    {
      title: t('productPages.komponenti.items.axles.title'),
      text: t('productPages.komponenti.items.axles.text'),
    },
    {
      title: t('productPages.komponenti.items.slats.title'),
      text: t('productPages.komponenti.items.slats.text'),
    },
    {
      title: t('productPages.komponenti.items.otherParts.title'),
      text: t('productPages.komponenti.items.otherParts.text'),
    },
  ];

  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        {t('productPages.komponenti.title')}
      </h1>
      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6 mb-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default"
          >
            <div className="flex items-center gap-3">
              <h2 className="desc-title col-span-2">{item.title}</h2>
              <Image src="/badge.svg" width={32} height={32} alt="" />
            </div>
            <p className="desc">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KomponentiPage;
