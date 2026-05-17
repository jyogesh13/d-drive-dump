import { useForm } from "react-hook-form";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useToggleTask,
} from "../hooks/useTask";
import { SquarePen, Trash2 } from "lucide-react";

const TaskPage = () => {
  const { data, isLoading } = useTasks();
  const createTask = useCreateTask();
  const toggleTask = useToggleTask();
  const deleteTask = useDeleteTask();
  const { register, handleSubmit,resetField } = useForm<{ title: string }>();
  const onsubmit = (values: { title: string }) => {
    if (values.title === "") return;
    createTask.mutate(values.title);
    resetField("title")
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="">
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          {...register("title", { required: true })}
          name="title"
          id = "title"
          placeholder="Enter your task here"
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {data?.map((task) => {
          return (
            <div key={task.id} className="p-2 border w-fit flex gap-2 ">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask.mutate(task.id)}
              />
              <span className={`ml-2 ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </span>
              <button
                className="text-rose-500"
                onClick={() => deleteTask.mutate(task.id)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button className="text-green-500">
                <SquarePen className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskPage;
