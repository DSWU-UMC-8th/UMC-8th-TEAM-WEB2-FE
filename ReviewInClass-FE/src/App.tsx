import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Review from "./pages/Review";
import Detail from "./pages/Detail";
import CreateReview from "./pages/CreateReview";

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
