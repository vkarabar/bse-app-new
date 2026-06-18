import { LocalizedLink } from '@/components/localized-link';
import ProductCard from '../product-card';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import { getMotorPageList } from '@/lib/motori-porti-data';

const MotoriPortiHubPage = async () => {
  const { t } = await getServerTranslations();
  const motors = getMotorPageList(t);

  return (
    <div className="md:mt-0 md:mb-6 pb-8">
      <h1 className="section-title text-xl border-b-4 !mb-6">
        {t('productPages.motoriPortiHub.title')}
      </h1>

      <p className="text-slate-700 mb-8 max-w-2xl">
        {t('productPages.motoriPortiHub.intro')}
      </p>

      <div className="grid md:grid-cols-2 gap-y-3 md:gap-x-4 pt-2 max-w-2xl">
        {motors.map((motor) => (
          <LocalizedLink key={motor.id} href={motor.href} className="min-w-fit">
            <ProductCard iconSrc={motor.cardIcon} label={motor.navLabel} />
          </LocalizedLink>
        ))}
      </div>
    </div>
  );
};

export default MotoriPortiHubPage;
