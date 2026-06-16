import { Metadata } from 'next';
import { Footer } from './(layout)/footer';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Производи | БСЕ Компани',
  description:
    'БСЕ Компани датира уште од 2013 година и од самиот почеток е ориентирана кон нудење на квалитетни услуги во индустријата задржувајќи ги ниските цени.',
};

const ProductsLayout = ({ children }: Props) => {
  return (
    <div className="mt-[72px] md:mt-0 min-h-[calc(100dvh-450px)]">
      {children}
    </div>
  );
};

export default ProductsLayout;
