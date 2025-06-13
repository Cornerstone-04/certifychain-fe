import Error404 from "@/screens/Error404";
import Home from "@/screens/Home";
import { createBrowserRouter } from "react-router";
import Landing from "@/screens/landing/Landing";
import RegisterPage from "@/screens/auth/Register";
import LoginPage from "@/screens/auth/Login";
import { AuthGuard, GuestGuard } from "./AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "register",
        element: (
          <GuestGuard>
            <RegisterPage />
          </GuestGuard>
        ),
      },
      {
        path: "login",
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        ),
      },
      {
        path: "home",
        element: (
          <AuthGuard>
            <Home />
          </AuthGuard>
        ),
      },
    ],
  },
]);
