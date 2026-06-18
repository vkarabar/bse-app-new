import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  iconSrc: string;
  label: string;
  isNew?: boolean;
  newLabel?: string;
};

const ProductCard = ({ iconSrc, label, isNew, newLabel = 'Ново' }: Props) => {
  return (
    <div className="relative">
      {isNew && (
        <div className="absolute py-[5px] ml-1 mt-1 px-3 bg-green-500/90 rounded-tl-lg rounded-br-lg text-white">
          {newLabel}
        </div>
      )}
      <div
        className={cn(
          'h-[180px] lg:h-[240px] border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center px-4 py-6 pb-6 min-h-[140px] min-w-[200px]',
        )}
      >
        <Image
          src={iconSrc}
          alt={label}
          width={60}
          height={60}
        />
        <h2 className="text-nowrapfont-semibold text-xl mt-1 md:mt-2">
          {label}
        </h2>
      </div>
    </div>
  );
};

export default ProductCard;
