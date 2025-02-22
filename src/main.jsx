import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, Home, QuizTest, ReviewTest } from "./pages";
import { SignIn, SignUp } from "./components";
import { AuthProvider } from "./contexts/authContext.jsx";
import AuthProtector from "./pages/AuthProtector.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtector><App /></AuthProtector>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "test",
        element: <QuizTest />,
      },
      {
        path: "review/:id",
        element: <ReviewTest />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthProtector><AuthLayout /></AuthProtector>,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
