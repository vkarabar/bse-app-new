import { LocalizedLink } from '@/components/localized-link';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import Image from 'next/image';

const NotFound = async () => {
  const { t } = await getServerTranslations();

  return (
    <div className="flex flex-col items-center gap-4 pt-24 pb-72 md:pt-32 md:pb-72 bg-slate-800">
      <Image src="/notfound.svg" alt="" width={60} height={60} />
      <h3 className="text-lg md:text-xl text-center px-8 text-slate-100">
        {t('notFound.message')}
      </h3>
      <LocalizedLink href="/">
        <button className="btn-main-inv text-slate-50">{t('notFound.backHome')}</button>
      </LocalizedLink>
    </div>
  );
};

export default NotFound;
