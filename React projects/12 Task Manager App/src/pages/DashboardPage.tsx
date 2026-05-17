import { useAuthStore } from '../store/authStore';
import { useTasks } from '../hooks/useTasks';
import { useBoards } from '../hooks/useBoards';
import TaskList from '../features/tasks/TaskList';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  // Fetch all tasks (no filters) just for stat counts
  const { data: tasksData, isLoading: tasksLoading } = useTasks({ limit: 100 });
  const { data: boardsData, isLoading: boardsLoading } = useBoards();

  const allTasks = tasksData?.data || [];
  const totalTasks = allTasks.length;
  const inProgress = allTasks.filter((t) => t.status === 'in-progress').length;
  const completed = allTasks.filter((t) => t.status === 'done').length;
  const totalBoards = boardsData?.data?.length || 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: tasksLoading ? '…' : totalTasks,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-400',
      bgGlow: 'bg-blue-500/10',
    },
    {
      label: 'In Progress',
      value: tasksLoading ? '…' : inProgress,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-400',
      bgGlow: 'bg-amber-500/10',
    },
    {
      label: 'Completed',
      value: tasksLoading ? '…' : completed,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-green-400',
      bgGlow: 'bg-emerald-500/10',
    },
    {
      label: 'Boards',
      value: boardsLoading ? '…' : totalBoards,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.011.668-1.867 1.586-2.148" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-400',
      bgGlow: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-[Outfit,sans-serif] tracking-tight">
          Welcome back, {user?.username || 'User'} 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Here's an overview of your tasks and boards
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 p-5 hover:shadow-lg transition-all duration-300 group"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${stat.bgGlow} rounded-full blur-2xl -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500`}
            />
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg mb-3`}
              >
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Task list section */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          My Tasks
        </h2>
        <TaskList />
      </div>
    </div>
  );
}
