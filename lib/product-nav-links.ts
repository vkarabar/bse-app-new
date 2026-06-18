export type ProductNavLinkKey =
  | 'allProducts'
  | 'garageDoors'
  | 'slidingGateMotors'
  | 'pergolas'
  | 'pvcCurtains'
  | 'wifiControllers'
  | 'garageDoorMotors'
  | 'components';

export type ProductNavLink = {
  href: string;
  key: ProductNavLinkKey;
  bold?: boolean;
};

export const PRODUCT_NAV_LINKS: ProductNavLink[] = [
  { href: '/proizvodi', key: 'allProducts', bold: true },
  { href: '/proizvodi/vrati', key: 'garageDoors' },
  { href: '/proizvodi/motori-porti', key: 'slidingGateMotors' },
  { href: '/proizvodi/pergoli', key: 'pergolas' },
  { href: '/proizvodi/zavesi', key: 'pvcCurtains' },
  { href: '/proizvodi/kontroleri', key: 'wifiControllers' },
  { href: '/proizvodi/motori-vrati', key: 'garageDoorMotors' },
  { href: '/proizvodi/komponenti', key: 'components' },
];
