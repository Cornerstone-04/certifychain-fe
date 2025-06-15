// src/routes/routes.tsx
import Error404 from "@/screens/Error404";
import { createBrowserRouter } from "react-router";
import Landing from "@/screens/landing/Landing";
import RegisterPage from "@/screens/auth/Register";
import LoginPage from "@/screens/auth/Login";
import UploadTab from "@/screens/UploadPage"; // Import UploadTab directly
import VerifyTab from "@/screens/VerifyPage"; // Import VerifyTab directly
import { AdminGuard } from "./AuthGuard"; // Import AdminGuard

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <Landing />, // Landing page is public
      },
      {
        path: "admin/login",
        element: <LoginPage />, // Login page (for admin access)
      },
      {
        path: "register", // Keeping register for now (e.g., initial admin setup)
        element: <RegisterPage />,
      },
      {
        path: "verify",
        element: <VerifyTab />, // Public verification page
      },
      {
        path: "admin/upload", // Admin-only upload page
        element: (
          <AdminGuard>
            <UploadTab />
          </AdminGuard>
        ),
      },
    ],
  },
]);
