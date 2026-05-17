export const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/70 px-4 py-3">
    <div className="mt-0.5 text-zinc-500">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </p>
      <p className="mt-1 wrap-break-word text-sm font-medium text-zinc-800">
        {value || "-"}
      </p>
    </div>
  </div>
);
