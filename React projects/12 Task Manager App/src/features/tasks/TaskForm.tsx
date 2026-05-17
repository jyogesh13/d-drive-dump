import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTask, useUpdateTask } from "../../hooks/useTasks";
import { TASK_PRIORITIES, TASK_STATUSES } from "../../constants";
import type { Task } from "../../types";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  assignedTo: z.string().optional(),
  boardId: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  readonly task?: Task | null;
  readonly boardId?: string;
  readonly onClose: () => void;
}

export default function TaskForm({ task, boardId, onClose }: TaskFormProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isEditing = !!task;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      status: "todo",
      assignedTo: "",
      boardId: boardId || "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().slice(0, 16)
          : "",
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo?._id || "",
        boardId: task.boardId || boardId || "",
      });
    }
  }, [task, reset, boardId]);

  const onSubmit = (data: TaskFormData) => {
    const payload = {
      title: data.title,
      description: data.description || undefined,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      priority: data.priority,
      assignedTo: data.assignedTo || undefined,
      boardId: data.boardId || undefined,
    };

    if (isEditing) {
      updateTask.mutate(
        {
          id: task._id,
          payload: { ...payload, status: data.status },
        },
        { onSuccess: () => onClose() },
      );
    } else {
      createTask.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  const isPending = createTask.isPending || updateTask.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {isEditing ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              {...register("title")}
              placeholder="Enter task title"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              {...register("description")}
              placeholder="Describe the task..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm resize-none"
            />
          </div>

          {/* Priority + Status row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <p className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Priority
              </p>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-1.5">
                    {TASK_PRIORITIES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => field.onChange(p)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                          field.value === p
                            ? p === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 ring-1 ring-red-300 dark:ring-red-500/30"
                              : p === "medium"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 ring-1 ring-amber-300 dark:ring-amber-500/30"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 ring-1 ring-blue-300 dark:ring-blue-500/30"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>

            {/* Status (only when editing) */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                >
                  {TASK_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s === "todo"
                        ? "To Do"
                        : s === "in-progress"
                          ? "In Progress"
                          : "Done"}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="task-duedate"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Due Date
            </label>
            <input
              id="task-duedate"
              type="datetime-local"
              {...register("dueDate")}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>

          {/* Server error */}
          {(createTask.isError || updateTask.isError) && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {(createTask.error as any)?.response?.data?.message ||
                (updateTask.error as any)?.response?.data?.message ||
                "Something went wrong. Please try again."}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {isEditing ? "Saving…" : "Creating…"}
                </span>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
