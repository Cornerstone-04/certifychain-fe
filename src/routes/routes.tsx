import Error404 from "@/screens/Error404";
import Home from "@/screens/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    children: [{ path: "", element: <Home /> }],
  },
]);
