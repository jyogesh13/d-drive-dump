import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePost, fetchPosts, updatePost } from "../api/Api";
import type { Todo } from "../types/todoType";
import { NavLink } from "react-router";
import Pagination from "../components/Pagination";
import { useState } from "react";

const RQFetch = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const { data, status, error } = useQuery({
    queryKey: ["todos", pageNumber + 1],
    queryFn: () => fetchPosts({ start: pageNumber, limit: 15 }),
    // staleTime: 1 * 60 * 60 * 1000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["todos", pageNumber + 1],
        (currElem: Todo[]) => {
          return currElem?.filter((todo) => todo.id !== id);
        },
      );
      console.log("deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id: number) => updatePost(id),
    onSuccess: (apiData, id) => {
        console.log(apiData)
      queryClient.setQueryData(
        ["todos", pageNumber + 1],
        (currElem: Todo[]) => {
          return currElem?.map((todo) => {
            return todo.id === id ? { ...apiData.data } : todo;
          });
        },
      );
      console.log("updated successfully");
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["todos"] });
    // },
  });

  return (
    <div className="">
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>{error.message}</p>}
      {status === "success" && (
        <>
          <div className="grid grid-cols-3 w-[60vw] mx-auto">
            {data?.map((todo: Todo) => {
              return (
                <div key={todo.id} className="border p-4 rounded-xl my-2 mx-2">
                  <NavLink to={`/rq/${todo.id}`}>
                    <p>{todo.id + " " + todo.title}</p>
                  </NavLink>
                  <p>{todo.userId}</p>
                  <p>{todo.completed}</p>
                  <button
                    className="bg-rose-500 text-white px-2 py-1 rounded-lg cursor-pointer mr-3"
                    onClick={() => updateMutation.mutate(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-rose-500 text-white px-2 py-1 rounded-lg cursor-pointer"
                    onClick={() => deleteMutation.mutate(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <Pagination setPageNumber={setPageNumber} pageNumber={pageNumber} />
        </>
      )}
    </div>
  );
};

export default RQFetch;
