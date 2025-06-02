import { Toaster } from "sonner";
import { router } from "./routes";
import { RouterProvider } from "react-router";

export default function App() {
  return (
    <>
      <Toaster position="top-right" closeButton />
      <RouterProvider router={router} />
    </>
  );
}
