import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home";
import AllScholarships from "../Pages/AllScholarships";
import ErrorPage from "../Pages/Errorpage";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import PrivateRoute from "../Routes/PrivateRoute"
import DashboardLayout from './../Layouts/DashboardLayout';
import MyApplications from "../Pages/Dashboard/MyApplications";
import ApplyScholarship from "../Pages/ApplyScholarship"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: ErrorPage,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "all-scholarships",
        Component: AllScholarships,
      },
      {
        path: "/scholarship-details/:id",
        element: <PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute>,
      },
      {
        path: "/apply/:id",
        element: <PrivateRoute><ApplyScholarship></ApplyScholarship></PrivateRoute>,
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "my-application",
        Component: MyApplications,
      }
    ]
  }
]);
