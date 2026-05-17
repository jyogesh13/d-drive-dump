import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import type { Task, TaskFilters } from '../../types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';
import Pagination from './Pagination';

interface TaskListProps {
  readonly boardId?: string;
}

export default function TaskList({ boardId }: TaskListProps) {
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 10,
    status: '',
    priority: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const queryFilters: TaskFilters = {
    page: filters.page,
    limit: filters.limit,
    ...(filters.status && { status: filters.status }),
    ...(filters.priority && { priority: filters.priority }),
  };

  const { data, isLoading, isError, error } = useTasks(queryFilters);

  const tasks = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <FilterBar
          status={filters.status || ''}
          priority={filters.priority || ''}
          onStatusChange={(status) =>
            setFilters((prev) => ({ ...prev, status, page: 1 }))
          }
          onPriorityChange={(priority) =>
            setFilters((prev) => ({ ...prev, priority, page: 1 }))
          }
        />

        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98] shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Task
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 animate-pulse"
            >
              <div className="p-5 space-y-3">
                <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-700/50 rounded-lg" />
                <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-700/50 rounded-lg" />
                <div className="flex justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                  <div className="h-6 w-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {error?.response?.data?.message || 'Failed to load tasks'}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && tasks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
            No tasks yet
          </h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
            Create your first task to get started
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-blue-500/25 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Task
          </button>
        </div>
      )}

      {/* Task grid */}
      {!isLoading && !isError && tasks.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => setEditingTask(t)}
              />
            ))}
          </div>

          {/* Pagination */}
          {meta && (
            <Pagination
              page={meta.page}
              hasNextPage={meta.hasNextPage}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          )}
        </>
      )}

      {/* Create / Edit modal */}
      {(showCreateForm || editingTask) && (
        <TaskForm
          task={editingTask}
          boardId={boardId}
          onClose={() => {
            setShowCreateForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
