import Image from 'next/image';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';

const iskustvo = new Date().getFullYear() - 2013;

const AboutPage = async () => {
  const { t } = await getServerTranslations();

  const highlights = [
    {
      icon: '/professional.svg',
      title: t('about.whyUs.professionalTeam.title'),
      text: t('about.whyUs.professionalTeam.text'),
    },
    {
      icon: '/quality.svg',
      title: t('about.whyUs.qualityPriority.title'),
      text: t('about.whyUs.qualityPriority.text'),
    },
    {
      icon: '/speed.svg',
      title: t('about.whyUs.fastService.title'),
      text: t('about.whyUs.fastService.text'),
    },
  ];

  const stats = [
    { value: '4.000+', label: t('about.stats.satisfiedClients') },
    { value: '7.000+', label: t('about.stats.installedDoors') },
    { value: `${iskustvo}+`, label: t('about.stats.yearsExperience') },
  ];

  return (
    <div className="text-slate-200 pb-10 md:pb-14">
      <div className="containerr px-4 md:px-6 max-w-3xl">
        <section className="mb-10 md:mb-14">
          <h1 className="section-title mt-8 md:mt-0">{t('about.whoWeAre.title')}</h1>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              <span className="font-bold text-slate-100">{t('metadata.siteName')} </span>
              {t('about.whoWeAre.paragraph1')}
            </p>
            <p>
              <span className="text-sky-400 font-bold">
                {t('about.whoWeAre.paragraph2Goal')}{' '}
              </span>
              {t('about.whoWeAre.paragraph2')}
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-600/80" />

        <section className="py-10 md:py-14">
          <h2 className="section-title">{t('about.whyUs.title')}</h2>
          <div className="mt-6 space-y-4">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-5 md:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-700/80 mx-auto sm:mx-0">
                    <Image src={item.icon} alt="" width={28} height={28} aria-hidden />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-lg text-slate-100">{item.title}</h3>
                    <p className="mt-2 text-slate-400 text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-600/80" />

        <section className="py-10 md:py-14">
          <h2 className="section-title">{t('about.stats.title')}</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-5 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-sky-400">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400 capitalize">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-slate-700 bg-slate-800/40 px-5 py-6 text-center sm:text-left">
          <p className="text-slate-300 text-sm md:text-base">{t('about.contact.prompt')}</p>
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-sm md:text-base">
            <a href="tel:+38970264159" className="font-semibold text-sky-400 hover:text-sky-300 transition-colors">
              070/264-159
            </a>
            <a href="tel:+38978264668" className="font-semibold text-sky-400 hover:text-sky-300 transition-colors">
              078/264-668
            </a>
            <a href="mailto:contact@bsekompani.mk" className="font-semibold text-sky-400 hover:text-sky-300 transition-colors">
              contact@bsekompani.mk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
