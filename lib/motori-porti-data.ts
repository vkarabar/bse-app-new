export const MOTORI_PORTI_HUB = {
  href: '/proizvodi/motori-porti',
  label: 'Мотори за лизгачки порти',
  metaDescription:
    'Шпански и италијански мотори за лизгачки порти — изберете модел според вашите потреби.',
} as const;

export type MotorVariant = 'spanish' | 'italian';

export type MotorFeature = {
  icon: string;
  title: string;
  text: string;
};

export type MotorPageData = {
  id: MotorVariant;
  href: string;
  cardIcon: string;
  navLabel: string;
  title: string;
  metaDescription: string;
  breadcrumb: string;
  otherLink: { href: string; label: string };
  images: { id: number; title: string; imageSrc: string }[];
  intro: string[];
  models?: { title: string; items: string[] };
  prosTitle: string;
  pros: MotorFeature[];
  consTitle?: string;
  cons?: MotorFeature[];
};

export const MOTOR_PAGES: Record<MotorVariant, MotorPageData> = {
  spanish: {
    id: 'spanish',
    href: '/proizvodi/motori-porti/spanski',
    cardIcon: '/motor2.png',
    navLabel: 'Шпански мотори',
    title: 'Шпански мотори за лизгачки порти',
    metaDescription:
      'Ултра брз шпански мотор за лизгачки порти со Wi-Fi управување — капацитет до 800 kg.',
    breadcrumb: 'Шпански мотори',
    otherLink: {
      href: '/proizvodi/motori-porti/italianski',
      label: 'Италијански мотори за лизгачки порти',
    },
    images: [
      {
        id: 1,
        title: 'Шпански мотор за лизгачка порта',
        imageSrc: '/motori/motor1.png',
      },
    ],
    intro: [
      'Ултра брзи шпански мотори за лизгачки порти со врвни перформанси.',
      'Овозможуваат брзо и непречено отворање и затварање преку далечински уред или мобилен телефон.',
      'Целосно се произведени од висококвалитетни материјали со што Ви гарантираме долготрајност.',
    ],
    models: {
      title: 'Модел:',
      items: ['Мотор со капацитет до 800 kg'],
    },
    prosTitle: 'Предности',
    pros: [
      {
        icon: '/speed_dark.svg',
        title: 'Ултра брза работа',
        text: 'Висока оперативна брзина — идеално кога често ја користите порта.',
      },
      {
        icon: '/wifi-2.svg',
        title: 'Wi-Fi управување',
        text: 'Контрола преку мобилен телефон, без дополнителен хардвер.',
      },
      {
        icon: '/award.svg',
        title: 'Висок капацитет',
        text: 'Еден модел со капацитет до 800 kg — погоден за повеќето лизгачки порти.',
      },
    ],
  },
  italian: {
    id: 'italian',
    href: '/proizvodi/motori-porti/italianski',
    cardIcon: '/motori/motori-it.jpg',
    navLabel: 'Италијански мотори Oxygen',
    title: 'Италијански мотори за лизгачки порти',
    metaDescription:
      'Италијански OXYGEN мотори за лизгачки порти — комплет од 300 € со контролна табла, далечински, фото-ќелии и 4 m шини.',
    breadcrumb: 'Италијански мотори',
    otherLink: {
      href: '/proizvodi/motori-porti/spanski',
      label: 'Шпански мотори за лизгачки порти',
    },
    images: [
      {
        id: 1,
        title: 'Италијански OXYGEN мотор за лизгачка порта',
        imageSrc: '/motori/motori-it.jpg',
      },
    ],
    intro: [
      'Италијански OXYGEN мотори — 100% Made in Italy со докажан квалитет.',
      'Комплет од 300 € — мотор со контролна табла, далечински, фото-ќелии, трепкачко светло и 4 m шини.',
      'Тивка и стабилна работа, наменети за порти до 600 kg.',
    ],
    models: {
      title: 'Во цената од 300 € е вклучено:',
      items: [
        '1 мотор + контролна табла',
        '2 далечински управувачи',
        '2 фото-ќелии',
        '1 трепкачко светло',
        '4 метри шини',
      ],
    },
    prosTitle: 'Предности',
    pros: [
      {
        icon: '/award.svg',
        title: 'Италијански квалитет',
        text: 'Premium изработка и компоненти — докажена доверливост на европскиот пазар.',
      },
      {
        icon: '/speed_dark.svg',
        title: 'Тивка работа',
        text: 'Оптимизиран механизам — мирно отворање и затварање без непотребен шум.',
      },
      {
        icon: '/wifi-2.svg',
        title: 'Комплет решение',
        text: 'Сè потребно за монтажа е во пакетот — помалку дополнителни нарачки.',
      },
    ],
  },
};

export const MOTOR_PAGE_LIST = Object.values(MOTOR_PAGES);

export function getMotorVariantLabel(id: MotorVariant): string {
  return MOTOR_PAGES[id]?.title ?? id;
}

export function getMotorPageData(variant: MotorVariant): MotorPageData {
  return MOTOR_PAGES[variant];
}
