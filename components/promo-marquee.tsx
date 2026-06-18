type Props = {
  items: string[];
};

export function PromoMarquee({ items }: Props) {
  const segment = items.map((item) => `★ ${item}`).join(' ');

  return (
    <div
      className="overflow-hidden bg-sky-500 text-slate-900 py-2.5 border-b border-sky-600"
      aria-hidden
    >
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="marquee-content px-4 text-xs sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap"
          >
            {segment}
          </span>
        ))}
      </div>
    </div>
  );
}
