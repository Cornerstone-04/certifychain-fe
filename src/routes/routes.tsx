import Error404 from "@/screens/Error404";
import { createBrowserRouter } from "react-router";
import Landing from "@/screens/landing/Landing";
import RegisterPage from "@/screens/auth/Register";
import LoginPage from "@/screens/auth/Login";
import UploadPage from "@/screens/UploadPage";
import VerifyPage from "@/screens/VerifyPage";
import { AdminGuard, GuestGuard } from "./AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestGuard>
        <Landing />
      </GuestGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestGuard>
        <RegisterPage />
      </GuestGuard>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <GuestGuard>
        <LoginPage />
      </GuestGuard>
    ),
  },
  {
    path: "/verify",
    element: <VerifyPage />,
  },
  {
    path: "/admin/upload",
    element: (
      <AdminGuard>
        <UploadPage />
      </AdminGuard>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
