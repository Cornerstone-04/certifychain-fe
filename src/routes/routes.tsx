import Error404 from "@/pages/Error404";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    children: [{ path: "", element: <Home /> }],
  },
]);
