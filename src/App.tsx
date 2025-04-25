import { Toaster } from "sonner";
import { router } from "./routes/routes";
import { RouterProvider } from "react-router";

export default function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}
