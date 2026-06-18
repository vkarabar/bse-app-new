import type { Translator } from '@/lib/i18n/get-dictionary';

export const MOTORI_PORTI_HUB = {
  href: '/proizvodi/motori-porti',
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
  seeAlso: string;
  images: { id: number; title: string; imageSrc: string }[];
  intro: string[];
  models?: { title: string; items: string[] };
  prosTitle: string;
  pros: MotorFeature[];
};

const MOTOR_PATHS: Record<
  MotorVariant,
  {
    href: string;
    cardIcon: string;
    otherVariant: MotorVariant;
    imageSrc: string;
    pros: { icon: string; titleKey: string; textKey: string }[];
    modelItemKeys?: string[];
  }
> = {
  spanish: {
    href: '/proizvodi/motori-porti/spanski',
    cardIcon: '/motor2.png',
    otherVariant: 'italian',
    imageSrc: '/motori/motor1.png',
    modelItemKeys: ['productPages.motoriSpanish.models.item1'],
    pros: [
      {
        icon: '/speed_dark.svg',
        titleKey: 'productPages.motoriSpanish.pros.speed.title',
        textKey: 'productPages.motoriSpanish.pros.speed.text',
      },
      {
        icon: '/wifi-2.svg',
        titleKey: 'productPages.motoriSpanish.pros.wifi.title',
        textKey: 'productPages.motoriSpanish.pros.wifi.text',
      },
      {
        icon: '/award.svg',
        titleKey: 'productPages.motoriSpanish.pros.capacity.title',
        textKey: 'productPages.motoriSpanish.pros.capacity.text',
      },
    ],
  },
  italian: {
    href: '/proizvodi/motori-porti/italianski',
    cardIcon: '/motori/motori-it.jpg',
    otherVariant: 'spanish',
    imageSrc: '/motori/motori-it.jpg',
    modelItemKeys: [
      'productPages.motoriItalian.models.item1',
      'productPages.motoriItalian.models.item2',
      'productPages.motoriItalian.models.item3',
      'productPages.motoriItalian.models.item4',
      'productPages.motoriItalian.models.item5',
    ],
    pros: [
      {
        icon: '/award.svg',
        titleKey: 'productPages.motoriItalian.pros.quality.title',
        textKey: 'productPages.motoriItalian.pros.quality.text',
      },
      {
        icon: '/speed_dark.svg',
        titleKey: 'productPages.motoriItalian.pros.quiet.title',
        textKey: 'productPages.motoriItalian.pros.quiet.text',
      },
      {
        icon: '/wifi-2.svg',
        titleKey: 'productPages.motoriItalian.pros.complete.title',
        textKey: 'productPages.motoriItalian.pros.complete.text',
      },
    ],
  },
};

const MOTOR_TRANSLATION_PREFIX: Record<MotorVariant, string> = {
  spanish: 'productPages.motoriSpanish',
  italian: 'productPages.motoriItalian',
};

export const MOTOR_VARIANTS: MotorVariant[] = ['spanish', 'italian'];

export function buildMotorPageData(
  variant: MotorVariant,
  t: Translator,
): MotorPageData {
  const prefix = MOTOR_TRANSLATION_PREFIX[variant];
  const config = MOTOR_PATHS[variant];
  const otherPrefix = MOTOR_TRANSLATION_PREFIX[config.otherVariant];

  return {
    id: variant,
    href: config.href,
    cardIcon: config.cardIcon,
    navLabel: t(`${prefix}.navLabel`),
    title: t(`${prefix}.title`),
    metaDescription: t(`${prefix}.metaDescription`),
    breadcrumb: t(`${prefix}.breadcrumb`),
    seeAlso: t(`${prefix}.seeAlso`),
    otherLink: {
      href: MOTOR_PATHS[config.otherVariant].href,
      label: t(`${otherPrefix}.title`),
    },
    images: [
      {
        id: 1,
        title: t(`${prefix}.imageAlt`),
        imageSrc: config.imageSrc,
      },
    ],
    intro: [
      t(`${prefix}.intro.p1`),
      t(`${prefix}.intro.p2`),
      t(`${prefix}.intro.p3`),
    ],
    models: config.modelItemKeys
      ? {
          title: t(`${prefix}.models.title`),
          items: config.modelItemKeys.map((key) => t(key)),
        }
      : undefined,
    prosTitle: t(`${prefix}.prosTitle`),
    pros: config.pros.map((item) => ({
      icon: item.icon,
      title: t(item.titleKey),
      text: t(item.textKey),
    })),
  };
}

export function getMotorPageData(
  variant: MotorVariant,
  t: Translator,
): MotorPageData {
  return buildMotorPageData(variant, t);
}

export function getMotorVariantLabel(
  variant: MotorVariant,
  t: Translator,
): string {
  return t(`${MOTOR_TRANSLATION_PREFIX[variant]}.title`);
}

export function getMotorPageList(t: Translator): MotorPageData[] {
  return MOTOR_VARIANTS.map((variant) => buildMotorPageData(variant, t));
}
