import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Register from "../Pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        path: "register",
        Component: Register,
      }
    ]
  },
]);
