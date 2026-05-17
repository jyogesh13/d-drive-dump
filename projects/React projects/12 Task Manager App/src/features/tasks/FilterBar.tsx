
import { TASK_STATUSES, TASK_PRIORITIES } from '../../constants';
import { priorityLabels, statusLabels } from '../../constants/taskConstant';

interface FilterBarProps {
  readonly status: string;
  readonly priority: string;
  readonly onStatusChange: (status: string) => void;
  readonly onPriorityChange: (priority: string) => void;
}



export default function FilterBar({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status filter pills */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
        <button
          onClick={() => onStatusChange('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            status === ''
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          All
        </button>
        {TASK_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              status === s
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {statusLabels[s]}
          </button>
        ))}
      </div>

      {/* Priority dropdown */}
      <div className="relative">
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer transition-all duration-200"
        >
          {['', ...TASK_PRIORITIES].map((p) => (
            <option key={p} value={p}>
              {priorityLabels[p] || p}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  );
}
