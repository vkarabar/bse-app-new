export type ProductNavLink = {
  href: string;
  label: string;
  bold?: boolean;
};

export const PRODUCT_NAV_LINKS: ProductNavLink[] = [
  { href: '/proizvodi', label: 'Сите производи', bold: true },
  { href: '/proizvodi/vrati', label: 'Гаражни врати' },
  { href: '/proizvodi/motori-porti', label: 'Мотори за лизгачки порти' },
  { href: '/proizvodi/pergoli', label: 'Алуминиумски перголи' },
  { href: '/proizvodi/zavesi', label: 'PVC магнетни завеси' },
  { href: '/proizvodi/kontroleri', label: 'Wi-Fi управувачи' },
  { href: '/proizvodi/motori-vrati', label: 'Мотори за гаражни врати' },
  { href: '/proizvodi/komponenti', label: 'Компоненти' },
];
