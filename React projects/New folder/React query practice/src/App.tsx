import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import RQFetch from "./pages/RQFetch";
import OldFetch from "./pages/OldFetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchIndividualTodo from "./ui/FetchIndividualTodo";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/trad", element: <OldFetch /> },
        { path: "/rq", element: <RQFetch /> },
        { path: "/rq/:id", element: <FetchIndividualTodo /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
