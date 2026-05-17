import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import TaskPage from "./pages/TaskPage";

const App = () => {
  const queryClient =  new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TaskPage />,
    },
  ]);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
