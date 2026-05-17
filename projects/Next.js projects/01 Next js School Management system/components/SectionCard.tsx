export const SectionCard = ({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="rounded-3xl border border-zinc-200/80 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
        {icon}
      </div>
      <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
      {description && <p className="text-xs text-zinc-500">{description}</p>}
    </div>
    {children}
  </section>
);
