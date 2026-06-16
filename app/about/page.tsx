import Image from 'next/image';

const iskustvo = new Date().getFullYear() - 2013;

const highlights = [
  {
    icon: '/professional.svg',
    title: 'Професионален тим на вработени',
    text: 'Нашиот тим е специјализиран за изработка и монтажа и ќе се погрижи целосно сите процеси да бидат извршени според највисоки стандарди!',
  },
  {
    icon: '/quality.svg',
    title: 'Квалитетот е наш приоритет',
    text: 'Сите материјали и компоненти кои се користат за изработка на гаражните врати се од врвен квалитет.',
  },
  {
    icon: '/speed.svg',
    title: 'Брза и квалитетна услуга',
    text: 'Секогаш нудиме експресно брза услуга и квалитет при процесите на изработка и монтажа на гаражни врати.',
  },
];

const stats = [
  { value: '4.000+', label: 'задоволни клиенти' },
  { value: '7.000+', label: 'монтирани врати' },
  { value: `${iskustvo}+`, label: 'години искуство' },
];

const AboutPage = () => {
  return (
    <div className="text-slate-200 pb-10 md:pb-14">
      <div className="containerr px-4 md:px-6 max-w-3xl">
        <section className="mb-10 md:mb-14">
          <h1 className="section-title mt-8 md:mt-4">Кои сме ние?</h1>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              <span className="font-bold text-slate-100">БСЕ Компани </span>
              датира уште од 2013 година и од самиот почеток е ориентирана кон
              нудење на квалитетни услуги во индустријата задржувајќи ги
              ниските цени.
            </p>
            <p>
              <span className="text-sky-400 font-bold">Наша цел </span>
              е да овозможиме на секого да си обезбеди сигурност на својот дом
              или објект со најквалитетни материјали и современа технологија.
            </p>
          </div>
        </section>

        <div className="h-px bg-slate-600/80" />

        <section className="py-10 md:py-14">
          <h2 className="section-title">Зошто ние?</h2>
          <div className="mt-6 space-y-4">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-slate-700 bg-slate-800/60 p-5 md:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-700/80 mx-auto sm:mx-0">
                    <Image
                      src={item.icon}
                      alt=""
                      width={28}
                      height={28}
                      aria-hidden
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-lg text-slate-100">
                      {item.title}
                    </h3>
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
          <h2 className="section-title">БСЕ Компани низ бројки</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-5 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-sky-400">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-400 capitalize">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-slate-700 bg-slate-800/40 px-5 py-6 text-center sm:text-left">
          <p className="text-slate-300 text-sm md:text-base">
            Имате прашање или сакате понуда? Повикајте не, пишете ни или
            пополнете ја{' '}
            <a
              href="/contact"
              className="font-semibold text-sky-400 hover:text-sky-300 transition-colors underline-offset-2 hover:underline"
            >
              контакт формата
            </a>
            .
          </p>
          <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 text-sm md:text-base">
            <a
              href="tel:+38970264159"
              className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              070/264-159
            </a>
            <a
              href="tel:+38978264668"
              className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              078/264-668
            </a>
            <a
              href="mailto:contact@bsekompani.mk"
              className="font-semibold text-sky-400 hover:text-sky-300 transition-colors"
            >
              contact@bsekompani.mk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
