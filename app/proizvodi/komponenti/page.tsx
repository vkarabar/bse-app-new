import Image from 'next/image';

const KomponentiPage = () => {
  return (
    <div>
      <h1 className="section-title text-xl border-b-4 !mb-4 !md:mb-2">
        Компоненти
      </h1>
      <div className="grid lg:grid-cols-2 gap-y-4 lg:gap-y-6 lg:gap-x-6 mb-6">
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default">
          <div className="flex items-center gap-3">
            <h2 className="desc-title col-span-2">Мотори</h2>
            <Image
              src="/badge.svg"
              width={32}
              height={32}
              alt="badge"
            />
          </div>
          <p className="desc">
            Мотори со висока брзина кои за експресно време ја отвараат вашата
            врата.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default">
          <div className="flex items-center gap-3">
            <h2 className="desc-title col-span-2">Осовини</h2>
            <Image
              src="/badge.svg"
              width={32}
              height={32}
              alt="badge"
            />
          </div>
          <p className="desc">Осовини за гаражни врати со должина до 7m.</p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default">
          <div className="flex items-center gap-3">
            <h2 className="desc-title col-span-2">Ламели</h2>
            <Image
              src="/badge.svg"
              width={32}
              height={32}
              alt="badge"
            />
          </div>
          <p className="desc">
            Повеќе видови на ламели за изработка на гаражни врати.
          </p>
        </div>
        <div className="border-slate-300 border rounded-xl px-5 py-4 hover:bg-slate-100 hover:cursor-default">
          <div className="flex items-center gap-3">
            <h2 className="desc-title col-span-2">Други составни делови</h2>
            <Image
              src="/badge.svg"
              width={32}
              height={32}
              alt="badge"
            />
          </div>
          <p className="desc">
            Располагаме со сите составни делови за изработка на производите од
            нашата понуда.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KomponentiPage;
