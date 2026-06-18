import Slajder from '@/components/slajder';
import { LocalizedLink } from '@/components/localized-link';
import { LandingProductCard } from '@/components/landing-product-card';
import { PromoMarquee } from '@/components/promo-marquee';
import { StatsStrip } from '@/components/stats-strip';
import { WhyBseSection } from '@/components/why-bse-section';
import { ProcessStepsSection } from '@/components/process-steps-section';
import { HomeFaqSection } from '@/components/home-faq-section';
import { HomeFinalCta } from '@/components/home-final-cta';
import { HomeGallerySection } from '@/components/home-gallery-section';
import { HomeGarageDoorWizard } from '@/components/home-garage-door-wizard';
import { getPageMetadata } from '@/lib/get-page-metadata';
import { getServerTranslations } from '@/lib/i18n/get-server-translations';
import {
  HOME_GARAGE_GALLERY_IDS,
  HOME_HERO_DOOR_IDS,
  HOME_VRATI_SLIDER_IDS,
  garageDoorImageSrc,
  toGarageDoorSliderItems,
  toPergolaSliderItems,
} from '@/lib/product-gallery-images';
import type { Metadata } from 'next';

const iskustvo = new Date().getFullYear() - 2013;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    '/',
    'metadata.home.title',
    'metadata.home.description',
  );
}

export default async function Home() {
  const { t, dictionary } = await getServerTranslations();
  const marqueeItems = dictionary.home.promoMarquee.items;

  const stats = [
    {
      value: t('home.stats.experience.value', { years: iskustvo }),
      label: t('home.stats.experience.label'),
    },
    {
      value: t('home.stats.install.value'),
      label: t('home.stats.install.label'),
    },
    {
      value: t('home.stats.warranty.value'),
      label: t('home.stats.warranty.label'),
    },
    {
      value: t('home.stats.coverage.value'),
      label: t('home.stats.coverage.label'),
    },
  ];

  const slikiHeader = toGarageDoorSliderItems(HOME_HERO_DOOR_IDS, () =>
    t('home.slider.garageDoor'),
  );

  const slikiVrati = toGarageDoorSliderItems(HOME_VRATI_SLIDER_IDS, (number) =>
    t('home.slider.garageDoorNumbered', { number }),
  );

  const slikiMotori = [
    {
      id: 1,
      title: t('home.slider.spanishGateMotor'),
      imageSrc: '/motori/motor1.png',
    },
    {
      id: 2,
      title: t('home.slider.italianGateMotor'),
      imageSrc: '/motori/motori-it.jpg',
    },
  ];

  const slikiZavesi = [1, 2].map((num, index) => ({
    id: index + 1,
    title: t('home.slider.pvcMagneticCurtains'),
    imageSrc: `/zavesi/mz${num}.jpg`,
  }));

  const slikiPergoli = toPergolaSliderItems((number) =>
    t('home.slider.pergolaNumbered', { number }),
  );

  const homeProducts = [
    {
      href: '/proizvodi/vrati',
      iconSrc: '/vrataIcon.svg',
      labelKey: 'nav.garageDoors' as const,
      descriptionKey: 'home.offerings.vrati.description' as const,
    },
    {
      href: '/proizvodi/motori-porti',
      iconSrc: '/motor2.png',
      labelKey: 'nav.slidingGateMotors' as const,
      descriptionKey: 'home.offerings.motoriPorti.description' as const,
    },
    {
      href: '/proizvodi/zavesi',
      iconSrc: '/zavesi.png',
      labelKey: 'nav.pvcCurtains' as const,
      descriptionKey: 'home.offerings.zavesi.description' as const,
      isNew: true,
    },
    {
      href: '/proizvodi/pergoli',
      iconSrc: '/pergoli.png',
      labelKey: 'nav.pergolas' as const,
      descriptionKey: 'home.offerings.pergoli.description' as const,
      isNew: true,
    },
    {
      href: '/proizvodi/motori-vrati',
      iconSrc: '/motor1.png',
      labelKey: 'nav.garageDoorMotors' as const,
      descriptionKey: 'home.productGrid.motoriVrati.description' as const,
    },
    {
      href: '/proizvodi/kontroleri',
      iconSrc: '/remote.svg',
      labelKey: 'nav.wifiControllers' as const,
      descriptionKey: 'home.productGrid.kontroleri.description' as const,
    },
  ] as const;

  const whyBseBenefits = [
    {
      title: t('about.whyUs.professionalTeam.title'),
      text: t('about.whyUs.professionalTeam.text'),
    },
    {
      title: t('about.whyUs.qualityPriority.title'),
      text: t('about.whyUs.qualityPriority.text'),
    },
    {
      title: t('about.whyUs.fastService.title'),
      text: t('about.whyUs.fastService.text'),
    },
    {
      title: t('home.whyBse.warrantySupport.title'),
      text: t('home.whyBse.warrantySupport.text'),
    },
  ];

  const processSteps = [
    {
      number: t('home.process.steps.quote.number'),
      duration: t('home.process.steps.quote.duration'),
      title: t('home.process.steps.quote.title'),
      description: t('home.process.steps.quote.description'),
      note: t('home.process.steps.quote.note'),
    },
    {
      number: t('home.process.steps.consultation.number'),
      duration: t('home.process.steps.consultation.duration'),
      title: t('home.process.steps.consultation.title'),
      description: t('home.process.steps.consultation.description'),
      note: t('home.process.steps.consultation.note'),
    },
    {
      number: t('home.process.steps.offer.number'),
      duration: t('home.process.steps.offer.duration'),
      title: t('home.process.steps.offer.title'),
      description: t('home.process.steps.offer.description'),
      note: t('home.process.steps.offer.note'),
    },
    {
      number: t('home.process.steps.install.number'),
      duration: t('home.process.steps.install.duration'),
      title: t('home.process.steps.install.title'),
      description: t('home.process.steps.install.description'),
      note: t('home.process.steps.install.note'),
    },
  ];

  const faqItems = [
    {
      id: 'install-time',
      question: t('home.faq.installTime.question'),
      answer: t('home.faq.installTime.answer'),
    },
    {
      id: 'warranty',
      question: t('home.faq.warranty.question'),
      answer: t('home.faq.warranty.answer'),
    },
    {
      id: 'materials',
      question: t('home.faq.materials.question'),
      answer: t('home.faq.materials.answer'),
    },
    {
      id: 'coverage',
      question: t('home.faq.coverage.question'),
      answer: t('home.faq.coverage.answer'),
    },
  ];

  const finalCtaBullets = dictionary.home.finalCta.bullets;

  const galleryImages = HOME_GARAGE_GALLERY_IDS.map((num, index) => ({
    src: garageDoorImageSrc(num),
    alt: t('home.slider.garageDoorNumbered', { number: index + 1 }),
    caption: t('home.slider.garageDoorNumbered', { number: index + 1 }),
  }));

  return (
    <div className="mx-auto bg-slate-800 md:-mt-[var(--site-header-offset)] md:pt-[var(--site-header-offset)]">
      <PromoMarquee items={marqueeItems} />

      <div className="containerr text-slate-200 px-5 md:px-8 pt-10 md:pt-0 pb-6 md:pb-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center md:pt-8">
          <div className="md:pt-6 mt-4 md:mt-0 flex flex-col items-center md:items-start">
            <span className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-sky-300">
              {t('home.hero.badge')}
            </span>

            <h1 className="hero-fade-up hero-fade-up-delay-1 mt-5 md:mt-6 text-slate-100 font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-tighter md:leading-[45px] text-center md:text-left uppercase tracking-tight">
              {t('home.hero.title')}
            </h1>

            <p className="hero-fade-up hero-fade-up-delay-2 mt-5 md:mt-6 md:text-lg md:leading-relaxed text-slate-300 text-center md:text-left max-w-xl">
              {t('home.hero.subtitle', { years: iskustvo })}
            </p>

            <div className="hero-fade-up hero-fade-up-delay-3 mt-8 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3">
              <LocalizedLink
                href="/naracaj"
                className="btn-main-inv w-full sm:w-auto text-center md:px-7 md:py-1.5 md:text-base text-zinc-950"
              >
                {t('home.hero.ctaQuote')}
              </LocalizedLink>
              <LocalizedLink
                href="/proizvodi"
                className="btn-main w-full sm:w-auto text-center md:px-7 md:py-1.5 md:text-base"
              >
                {t('home.hero.ctaProducts')}
              </LocalizedLink>
            </div>
          </div>

          <div className="hero-fade-up hero-fade-up-delay-2">
            <Slajder
              className="px-4 md:px-8"
              sliki={slikiHeader}
            />
          </div>
        </div>

        <StatsStrip stats={stats} />
      </div>

      <div className="bg-slate-50 col-span-2 px-5 md:px-8">
        <div className="containerr md:px-8 pb-4">
          <div className="pt-10 pb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
              {t('home.productGrid.sectionLabel')}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-800">
              {t('home.productGrid.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              {t('home.productGrid.subtitle')}
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {homeProducts.map((product, index) => (
                <LocalizedLink
                  key={product.href}
                  href={product.href}
                  className="block h-full"
                >
                  <LandingProductCard
                    index={`${String(index + 1).padStart(2, '0')} / ${String(homeProducts.length).padStart(2, '0')}`}
                    iconSrc={product.iconSrc}
                    label={t(product.labelKey)}
                    description={t(product.descriptionKey)}
                    cta={t('common.cta.viewOffer')}
                    isNew={'isNew' in product ? product.isNew : undefined}
                    newLabel={t('common.new')}
                  />
                </LocalizedLink>
              ))}
            </div>
          </div>

          <WhyBseSection
            sectionLabel={t('home.whyBse.sectionLabel')}
            title={t('home.whyBse.title')}
            subtitle={t('home.whyBse.subtitle')}
            benefits={whyBseBenefits}
          />

          <p className="text-xs font-bold uppercase tracking-widest text-sky-500 pt-2">
            {t('home.offerings.sectionLabel')}
          </p>
          <h2 className="section-title pt-2 !text-left text-sky-500 !mb-6">
            {t('home.offerings.title')}
          </h2>

          <div className="mb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="lg:px-10">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                {t('home.offerings.vrati.title')}
              </h3>
              <p className="text-slate-800">
                {t('home.offerings.vrati.description')}
              </p>
              <LocalizedLink
                className="hidden md:block"
                href="/proizvodi/vrati"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  {t('common.cta.viewOffer')}
                </button>
              </LocalizedLink>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder
                sliki={slikiVrati}
                time={3000}
              />
            </div>
            <div className="flex items-center flex-col mt-2">
              <LocalizedLink
                className="md:hidden"
                href="/proizvodi/vrati"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  {t('common.cta.viewOffer')}
                </button>
              </LocalizedLink>
              <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>
            </div>
          </div>
          <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>

          <div className="mb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="md:col-start-2 md:row-start-1 lg:px-12">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                {t('home.offerings.motoriPorti.title')}
              </h3>
              <p className="text-slate-800">
                {t('home.offerings.motoriPorti.description')}
              </p>
              <LocalizedLink
                className="hidden md:block"
                href="/proizvodi/motori-porti"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  {t('common.cta.moreDetails')}
                </button>
              </LocalizedLink>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder sliki={slikiMotori} />
            </div>
            <div className="flex items-center flex-col mt-2">
              <LocalizedLink
                className="md:hidden"
                href="/proizvodi/motori-porti"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  {t('common.cta.moreDetails')}
                </button>
              </LocalizedLink>
              <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>
            </div>
          </div>
          <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>

          <div className="pb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="lg:px-12">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                {t('home.offerings.zavesi.title')}
              </h3>
              <p className="text-slate-800">
                {t('home.offerings.zavesi.description')}
              </p>
              <LocalizedLink
                className="hidden md:block"
                href="/proizvodi/zavesi"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  {t('common.cta.viewOffer')}
                </button>
              </LocalizedLink>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder
                sliki={slikiZavesi}
                time={3000}
              />
            </div>
            <div className="flex items-center flex-col mt-2">
              <LocalizedLink
                className="md:hidden"
                href="/proizvodi/zavesi"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  {t('common.cta.viewOffer')}
                </button>
              </LocalizedLink>
              <div className="md:hidden h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>
            </div>
          </div>
          <div className="hidden md:block h-[1px] w-full bg-slate-300 mt-5 mb-1"></div>

          <div className="pb-6 grid md:grid-cols-2 md:gap-12 items-center">
            <div className="md:col-start-2 md:row-start-1 lg:px-12">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                {t('home.offerings.pergoli.title')}
              </h3>
              <p className="text-slate-800">
                {t('home.offerings.pergoli.description')}
              </p>
              <LocalizedLink
                className="hidden md:block"
                href="/proizvodi/pergoli"
              >
                <button className="hidden md:block mt-4 btn-main-dark mb-4">
                  {t('common.cta.viewOffer')}
                </button>
              </LocalizedLink>
            </div>
            <div className="mt-8 mb-6 flex items-center justify-center md:justify-start">
              <Slajder sliki={slikiPergoli} />
            </div>
            <div className="flex items-center flex-col mt-2">
              <LocalizedLink
                className="md:hidden"
                href="/proizvodi/pergoli"
              >
                <button className="md:hidden btn-main-dark mb-4">
                  {t('common.cta.viewOffer')}
                </button>
              </LocalizedLink>
            </div>
          </div>

          <ProcessStepsSection
            sectionLabel={t('home.process.sectionLabel')}
            title={t('home.process.title')}
            subtitle={t('home.process.subtitle')}
            steps={processSteps}
          />

          <section className="py-10 md:py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-sky-500">
              {t('home.wizard.sectionLabel')}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-800">
              {t('home.wizard.title')}
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              {t('home.wizard.subtitle')}
            </p>
            <div className="mt-8">
              <HomeGarageDoorWizard />
            </div>
          </section>

          <HomeFaqSection
            sectionLabel={t('home.faq.sectionLabel')}
            title={t('home.faq.title')}
            subtitle={t('home.faq.subtitle')}
            items={faqItems}
          />

          <HomeGallerySection
            sectionLabel={t('home.gallery.sectionLabel')}
            title={t('home.gallery.title')}
            subtitle={t('home.gallery.subtitle')}
            images={galleryImages}
          />
        </div>
      </div>

      <HomeFinalCta
        title={t('home.finalCta.title')}
        subtitle={t('home.finalCta.subtitle')}
        bullets={finalCtaBullets}
        ctaQuote={t('home.finalCta.ctaQuote')}
        ctaCall={t('home.finalCta.ctaCall')}
        phone="+38970264159"
      />
    </div>
  );
}
