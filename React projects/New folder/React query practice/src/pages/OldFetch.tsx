import { useEffect, useState } from "react";
import { fetchPost } from "../api/Api";

type Todo = {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
};

const OldFetch = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTodosData = async () => {

    try {
      const res = await fetchPost();
      setIsLoading(false);
      if (res.status === 200) setTodos(res.data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    }
  };
  useEffect(() => {
    (() => {
      getTodosData();
    })();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-3 justify-center ">
        {isLoading && <p>Loading...</p>}
        {todos?.map((todo: Todo) => {
          return (
            <div key={todo.id} className="border p-4 rounded-xl my-2 mx-2">
              <p>{todo.title}</p>
              <p>{todo.userId}</p>
              <p>{todo.completed}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OldFetch;
