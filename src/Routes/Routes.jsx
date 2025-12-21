import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home";
import AllScholarships from "../Pages/AllScholarships";
import ErrorPage from "../Pages/Errorpage";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "./../Layouts/DashboardLayout";
import MyApplications from "../Pages/Dashboard/MyApplications";
import ApplyScholarship from "../Pages/ApplyScholarship";
import MyProfile from "../Pages/Dashboard/MyProfile";
import MyReviews from "../Pages/Dashboard/MyReviews";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import MyPayments from "../Pages/Dashboard/MyPayments";
import ModeratorApply from "../Pages/ModeratorApply";
import ApproveModerator from "../Pages/Dashboard/ApproveModerator";
import LoadingPage from "../Pages/LoadingPage";
import AboutUs from "../Pages/AboutUs";
import StudentManagement from "../Pages/Dashboard/StudentManagement";
import Forbidden from "../Pages/Forbidden";
import AdminRoute from "./AdminRoute";
import AppliedApplication from "../Pages/Dashboard/AppliedApplications";
import AllStudentReviews from "../Pages/Dashboard/AllStudentReviews";
import ModeratorRoute from "./ModeratorRoute";
import AddScholarships from "../Pages/Dashboard/AddScholarships";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: ErrorPage,
    hydrateFallbackElement: <LoadingPage />,
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
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "/scholarship-details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/apply/:id",
        element: (
          <PrivateRoute>
            <ApplyScholarship></ApplyScholarship>
          </PrivateRoute>
        ),
      },
      {
        path: "moderator-apply",
        element: (
          <PrivateRoute>
            <ModeratorApply></ModeratorApply>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-applications",
        Component: MyApplications,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "my-payments",
        Component: MyPayments,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      // Moderator Routes
      {
        path: "applied-applications",
        element: (
          <ModeratorRoute>
            <AppliedApplication></AppliedApplication>
          </ModeratorRoute>
        ),
      },
      {
        path: "all-student-reviews",
        element: (
          <ModeratorRoute>
            <AllStudentReviews></AllStudentReviews>
          </ModeratorRoute>
        ),
      },
      // Admin Routes
      {
        path: "approve-moderators",
        element: (
          <AdminRoute>
            <AddScholarships></AddScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "approve-moderators",
        element: (
          <AdminRoute>
            <ApproveModerator></ApproveModerator>
          </AdminRoute>
        ),
      },
      {
        path: "students-management",
        element: (
          <AdminRoute>
            <StudentManagement></StudentManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
