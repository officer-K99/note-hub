import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "./components/layout/appLayout";
import AuthLayout from "./components/layout/authLayout";
import RequireAuth from "./components/guards/requireAuth";
import GuestOnly from "./components/guards/guestOnly";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NotePage from "./pages/NotePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "notes/new", element: <CreateNotePage /> },
          { path: "notes/:id", element: <NotePage /> },
        ],
      },
    ],
  },
  {
    element: <GuestOnly />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
