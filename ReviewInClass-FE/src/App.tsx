import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Review from "./pages/Review";
import Detail from "./pages/Detail";
import CreateReview from "./pages/CreateReview";
import { SearchProvider } from "./context/SearchContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: "review", element: <Review /> },
      { path: "review/:id", element: <Detail /> },
      { path: "create", element: <CreateReview /> },
    ],
  },
];

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
