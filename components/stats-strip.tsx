type Stat = {
  value: string;
  label: string;
};

type Props = {
  stats: Stat[];
};

export function StatsStrip({ stats }: Props) {
  return (
    <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-600/80 bg-slate-700/40 px-4 py-5 text-center transition-colors hover:border-sky-500/50 hover:bg-slate-700/70"
        >
          <p className="text-2xl md:text-3xl font-bold text-sky-400 tabular-nums">
            {stat.value}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-snug">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
