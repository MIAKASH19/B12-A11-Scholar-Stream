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
import LoadingPage from "../Pages/LoadingPage";
import AboutUs from "../Pages/AboutUs";
import Forbidden from "../Pages/Forbidden";
//Moderator Routes Path
import ModeratorRoute from "./ModeratorRoute";
import AppliedApplication from "../Pages/Dashboard/Moderator/AppliedApplications";
import AllStudentReviews from "../Pages/Dashboard/Moderator/AllStudentReviews";
// Admin Routes Path
import AdminRoute from "./AdminRoute";
import AddScholarships from "../Pages/Dashboard/Admin/AddScholarships";
import ApproveModerator from "../Pages/Dashboard/Admin/ApproveModerator";
import MangeScholarships from "../Pages/Dashboard/Admin/ManageScholarships";
import StudentManagement from "../Pages/Dashboard/Admin/StudentManagement";
import Analytics from "../Pages/Dashboard/Admin/Analytics";
import ContactUs from "../Pages/ContactUs";

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
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancel",
        Component: PaymentCancel,
      },
      {
        path: "forbidden",
        Component: Forbidden,
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
      { path: "*", Component: ErrorPage },
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
        path: "add-scholarships",
        element: (
          <AdminRoute>
            <AddScholarships></AddScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <MangeScholarships></MangeScholarships>
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
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics></Analytics>
          </AdminRoute>
        ),
      },
      { path: "*", Component: ErrorPage },
    ],
  },
]);
