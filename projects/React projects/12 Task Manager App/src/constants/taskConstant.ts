import type { TaskStatus, TaskPriority } from './index';

const statusLabels: Record<string, string> = {
  '': 'All Status',
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

const priorityLabels: Record<string, string> = {
  '': 'All Priority',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  'in-progress':
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  done: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
};

const priorityColors: Record<TaskPriority, string> = {
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  medium:
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

export { statusColors, priorityColors, statusLabels, priorityLabels };