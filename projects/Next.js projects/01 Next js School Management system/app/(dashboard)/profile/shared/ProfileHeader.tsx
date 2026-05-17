import Image from "next/image";
import type { Role } from "../types";

const StatChip = ({ label, value }: { label: string; value: string | number }) => (
  <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm transition hover:border-zinc-300">
    <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">{label}</p>
    <p className="mt-1 text-lg font-semibold text-zinc-900">{value}</p>
  </div>
);

export const ProfileHeader = ({
  role,
  name,
  username,
  image,
  subtitle,
  stats,
}: {
  role: Role;
  name: string;
  username: string;
  image?: string | null;
  subtitle?: string;
  stats: { label: string; value: string | number }[];
}) => (
  <div className="relative overflow-hidden rounded-4xl border border-zinc-200/80 bg-linear-to-br from-white via-zinc-50 to-zinc-100/80 p-5 shadow-sm sm:p-7">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(244,244,245,0.9),transparent_28%)]" />
    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-[1.75rem] border border-white/70 bg-zinc-200 shadow-sm">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-zinc-600">
              {name.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <div className="mb-3 inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {role}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{name}</h1>
          <p className="mt-1 text-sm text-zinc-500">@{username}</p>
          {subtitle && <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => <StatChip key={s.label} {...s} />)}
      </div>
    </div>
  </div>
);