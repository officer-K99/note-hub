import { createBrowserRouter } from "react-router";

import AppLayout from "./components/layout/appLayout";
import AuthLayout from "./components/layout/authLayout";
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
  {
    path: "/auth/login",
    element: <AuthLayout />,
    // children:[
    //   {
    //     index: true,
    //     element: <Login />
    //   },
    //   {
    //     path: '/register',
    //     element: <Register />
    //   }
    // ]
  },
]);

export default router;
