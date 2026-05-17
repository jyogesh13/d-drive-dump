import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todoType";
import { useParams } from "react-router";
import { fetchTodoById } from "../api/Api";

const FetchIndividualTodo = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {data} = useQuery({
    queryKey: ["todos" , id],
    queryFn: () => fetchTodoById(id || "0"),
    initialData: () => {
      return queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((todo: Todo) => todo.id === Number(id));
    },
  });


  return (
    <div className="flex items-center justify-center ">
      <div className="bg-red-200 rounded-xl p-4 ">
        <h1>{data?.title}</h1>
        <p>by User:{data?.userId}</p>
        <p>{data?.completed && "Completed"}</p>
      </div>
    </div>
  );
};

export default FetchIndividualTodo;
