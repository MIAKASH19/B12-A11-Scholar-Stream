import React from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import { MdOutlineRateReview, MdOutlineReviews, MdPayment } from "react-icons/md";
import { SiJirasoftware } from "react-icons/si";
import { Link, Outlet } from "react-router";
import useRole from "../Hooks/useRole";
import { LuFileStack } from "react-icons/lu";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open font-inter">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <h1 className="font-semibold flex items-center gap-2 ">
            {" "}
            <FaGoogleScholar className="text-blue-600" />
            Scholar-Stream Dashboard
          </h1>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-4">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Home"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-5"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden font-semibold">
                  Home
                </span>
              </Link>
            </li>

            {/* Our Lists Items */}

            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Applications"
                to="/dashboard/my-applications"
              >
                <SiJirasoftware className="text-xl" />
                <span className="is-drawer-close:hidden">My Applications</span>
              </Link>
            </li>
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Reviews"
                to="/dashboard/my-reviews"
              >
                <MdOutlineReviews className="text-xl" />
                <span className="is-drawer-close:hidden">My Reviews</span>
              </Link>
            </li>
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Payments"
                to="/dashboard/my-payments"
              >
                <MdPayment className="text-xl" />
                <span className="is-drawer-close:hidden">My Payments</span>
              </Link>
            </li>
            {(role === "moderator" || role === "admin") && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Applied Applications"
                  to="/dashboard/applied-applications"
                >
                  <LuFileStack className="text-xl" />
                  <span className="is-drawer-close:hidden">
                    Applied Applications
                  </span>
                </Link>
              </li>
            )}
            {(role === "moderator" || role === "admin") && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Student Reviews"
                  to="/dashboard/all-student-reviews"
                >
                  <MdOutlineRateReview className="text-xl"/>
                  <span className="is-drawer-close:hidden">
                    All Student Reviews 
                  </span>
                </Link>
              </li>
            )}

            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Profile"
                to="/dashboard/my-profile"
              >
                <CgProfile className="text-xl" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </Link>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Moderators"
                    to="/dashboard/approve-moderators"
                  >
                    <BsPersonWorkspace className="text-xl" />
                    <span className="is-drawer-close:hidden">
                      Approve Moderators
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Students Management"
                    to="/dashboard/students-management"
                  >
                    <FaUsers className="text-xl" />
                    <span className="is-drawer-close:hidden">
                      Students Management
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
