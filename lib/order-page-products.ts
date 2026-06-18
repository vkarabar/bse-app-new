import type { OrderProduct } from '@/lib/orders';
import type { MotorVariant } from '@/lib/motori-porti-data';

export type OrderPageProductId =
  | 'vrati'
  | 'pergoli'
  | 'zavesi'
  | 'motori-porti';

export type OrderPageProduct = {
  id: OrderPageProductId;
  href: string;
  iconSrc: string;
  labelKey:
    | 'nav.garageDoors'
    | 'nav.pergolas'
    | 'nav.pvcCurtains'
    | 'nav.slidingGateMotors';
  isNew?: boolean;
  orderProduct: OrderProduct;
};

export const ORDER_PAGE_PRODUCTS: OrderPageProduct[] = [
  {
    id: 'vrati',
    href: '/proizvodi/vrati',
    iconSrc: '/vrataIcon.svg',
    labelKey: 'nav.garageDoors',
    orderProduct: 'vrati',
  },
  {
    id: 'pergoli',
    href: '/proizvodi/pergoli',
    iconSrc: '/pergoli.png',
    labelKey: 'nav.pergolas',
    isNew: true,
    orderProduct: 'pergoli',
  },
  {
    id: 'zavesi',
    href: '/proizvodi/zavesi',
    iconSrc: '/zavesi.png',
    labelKey: 'nav.pvcCurtains',
    isNew: true,
    orderProduct: 'zavesi',
  },
  {
    id: 'motori-porti',
    href: '/proizvodi/motori-porti',
    iconSrc: '/motor2.png',
    labelKey: 'nav.slidingGateMotors',
    orderProduct: 'motori-porti',
  },
];

export const MOTOR_VARIANT_OPTIONS: {
  id: MotorVariant;
  iconSrc: string;
  labelKey: string;
}[] = [
  {
    id: 'spanish',
    iconSrc: '/motor2.png',
    labelKey: 'productPages.motoriSpanish.navLabel',
  },
  {
    id: 'italian',
    iconSrc: '/motor2.png',
    labelKey: 'productPages.motoriItalian.navLabel',
  },
];

export function getOrderPageProduct(id: string | null | undefined) {
  if (!id) return undefined;
  return ORDER_PAGE_PRODUCTS.find((product) => product.id === id);
}

export function isValidMotorVariant(
  value: string | null | undefined,
): value is MotorVariant {
  return value === 'spanish' || value === 'italian';
}
