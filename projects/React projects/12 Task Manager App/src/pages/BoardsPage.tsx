export default function BoardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-[Outfit,sans-serif] tracking-tight">
            Boards
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your collaborative workspaces
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 animate-pulse"
          />
        ))}
      </div>
      <p className="text-center text-sm text-slate-400 dark:text-slate-500">
        Board functionality coming in Phase 3
      </p>
    </div>
  );
}
