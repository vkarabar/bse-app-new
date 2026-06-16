// import { Button } from '@/components/ui/button';
// import Image from 'next/image';

import Image from 'next/image';

// export const Footer = () => {
//   return (
//     <footer className="lg:block h-20 w-full border-5-2 bg-slate-800 border-slate-200 p-2">
//       <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
//         <Image
//           src="/BSE_NEW.svg"
//           height={50}
//           width={50}
//           alt="Logo"
//         />
//         <div>Контакт</div>
//         <a href="tel:+38970264159">070/264-159</a>
//         <a href="tel:+38970264159">078/264-668</a>
//       </div>
//     </footer>
//   );
// };

export const Footer = () => {
  const now = new Date();

  const nowYear = now.getFullYear();

  const routeVariants = {
    initial: {
      opacity: 0,
    },
    final: {
      opacity: 20,
    },
  };

  return (
    <div className="bg-slate-800 text-slate-50 pt-2 pb-2">
      <div className="containerr">
        <div className="pt-12 mb-20 flex flex-col items-center">
          <div className="h-[60px] w-[60px]">
            <Image
              src="/BSE_NEW.svg"
              alt="Footer logo"
              width={60}
              height={60}
            />
          </div>
          <p className="text-center mb-3">
            {' '}
            &copy; {nowYear} БСЕ Компани, сите права задржани.
          </p>
          <div className="flex flex-col items-center">
            <p className="mb-2 mt-6">Контакт:</p>
            <p className="mb-2 text-lg">
              <a href="tel:+38970264159">&#9900; 070/264-159</a>
            </p>
            <p className="mb-2 text-lg ">
              <a href="tel:+38978264668">&#9900; 078/264-668</a>
            </p>
          </div>
          <a
            href="mailto:contact@bsekompani.mk"
            className="text-sky-500"
          >
            contact@bsekompani.mk
          </a>
          <a
            href="/contact"
            className="mt-3 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            Контакт форма &rarr;
          </a>
          <p className="text-sm"></p>
        </div>
      </div>
    </div>
  );
};
