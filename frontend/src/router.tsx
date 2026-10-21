import { createBrowserRouter } from "react-router";

import AppLayout from "./components/layout/appLayout";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NotePage from "./pages/NotePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/notes/new",
        element: <CreateNotePage />,
      },
      {
        path: "/notes/:id",
        element: <NotePage />,
      },
    ],
  },
]);

export default router;
