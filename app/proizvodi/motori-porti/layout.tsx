import { Metadata } from 'next';
import { MOTORI_PORTI_HUB } from '@/lib/motori-porti-data';

export const metadata: Metadata = {
  title: `${MOTORI_PORTI_HUB.label} | БСЕ Компани`,
  description: MOTORI_PORTI_HUB.metaDescription,
};

type Props = {
  children: React.ReactNode;
};

const MotoriPortiLayout = ({ children }: Props) => {
  return children;
};

export default MotoriPortiLayout;
