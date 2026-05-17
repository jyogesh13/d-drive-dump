export const TagList = ({
  items,
  emptyLabel,
}: {
  items: { id: number | string; name: string }[];
  emptyLabel?: string;
}) => (
  <div className="flex flex-wrap gap-2">
    {items.length ? (
      items.map((i) => (
        <span
          key={i.id}
          className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700"
        >
          {i.name}
        </span>
      ))
    ) : (
      <p className="text-sm text-zinc-500">{emptyLabel ?? "None assigned"}</p>
    )}
  </div>
);
