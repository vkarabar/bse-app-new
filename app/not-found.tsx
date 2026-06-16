import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-72 md:py-72 bg-slate-800">
      <Image
        src="/notfound.svg"
        alt="not found"
        width={60}
        height={60}
      />
      <h3 className="text-lg md:text-xl text-center px-8 text-slate-100">
        Почитувани, страната која ја баравте не постои.
      </h3>
      <Link href="/">
        <button className="btn-main-inv text-slate-50">
          Вратете се на почетна
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
