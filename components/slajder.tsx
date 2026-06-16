/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils';
import { Carousel } from 'flowbite-react';
import Image from 'next/image';

type Props = {
  sliki: { id: number; title: string; imageSrc: string }[];
  time?: number;
  className?: string;
};

function Slajder({ sliki = [], time = 5000, className }: Props) {
  if (sliki.length === 1)
    return (
      <div
        className={
          className
            ? className
            : cn`w-[340px] h-[210px] sm:w-[430px] sm:h-[280px] md:w-[390px] md:h-[250px] lg:w-[520px] lg:h-[310px] z-10 ${className}`
        }
      >
        <Image
          className="rounded-xl"
          src={`${sliki[0].imageSrc}`}
          alt={sliki[0].title}
          width={520}
          height={310}
        />
      </div>
    );

  return (
    <div className="h-[250px] sm:h-[290px] md:h-[250px] lg:h-[340px] z-10 rounded-2xl overflow-hidden flex flex-1 justify-center items-center">
      <Carousel slideInterval={time}>
        {sliki?.map((sl) => {
          return (
            <Image
              className="rounded-xl"
              key={sl.id}
              src={`${sl.imageSrc}`}
              alt={sl.title}
              width={800}
              height={800}
            />
          );
        })}
      </Carousel>
    </div>
  );
}

export default Slajder;
