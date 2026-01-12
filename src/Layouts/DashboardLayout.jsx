import React from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { CgFileDocument, CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";
import {
  MdOutlineRateReview,
  MdOutlineReviews,
  MdPayment,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../Hooks/useRole";
import { LuFileStack } from "react-icons/lu";
import { RiGraduationCapLine, RiStickyNoteAddLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { ChevronRight, MoveRight, Users } from "lucide-react";
import DarkModeToggle from './../Components/DarkModeToggle';

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open font-inter">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar flex justify-between items-center px-6 w-full bg-[#fdfdfd] dark:bg-[#0b0f19] dark:text-zinc-100 border-b border-[#0CB3FA]/30">
          <div className="flex  items-center">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="text-sm px-3 py-2 cursor-pointer"
            >
              <ChevronRight />
            </label>
            <Link to="/" className="font-semibold flex items-center gap-2 ">
              {" "}
              <FaGoogleScholar className="text-blue-600" />
              Scholar-Stream Dashboard
            </Link>
          </div>
          <DarkModeToggle />
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
        <div className="flex min-h-full flex-col items-start bg-[#fdfdfd] dark:bg-[#0b0f19] dark:text-zinc-100 border-r border-[#0CB3FA]/30 text-[#0CB3FA] is-drawer-close:w-16 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-2">

            <div className="flex items-center justify-between  border-b border-zinc-100">
              <h1 className="text-2xl is-drawer-close:hidden is-drawer-open:block p-2 bg-linear-to-r from-[#0CB3FA] to-[#fd95e7] bg-clip-text text-transparent capitalize">
                {role}
              </h1>

            </div>


            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                }
                data-tip="My Applications"
                to="/dashboard/my-applications"
              >
                <CgFileDocument className="text-xl" />
                <span className="is-drawer-close:hidden">My Applications</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                }
                data-tip="My Reviews"
                to="/dashboard/my-reviews"
              >
                <MdOutlineReviews className="text-xl" />
                <span className="is-drawer-close:hidden">My Reviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                }
                data-tip="My Payments"
                to="/dashboard/my-payments"
              >
                <MdPayment className="text-xl" />
                <span className="is-drawer-close:hidden">My Payments</span>
              </NavLink>
            </li>
            {(role === "moderator" || role === "admin") && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                  }
                  data-tip="Applied Applications"
                  to="/dashboard/applied-applications"
                >
                  <LuFileStack className="text-xl" />
                  <span className="is-drawer-close:hidden">
                    Applied Applications
                  </span>
                </NavLink>
              </li>
            )}
            {(role === "moderator" || role === "admin") && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                  }
                  data-tip="All Student Reviews"
                  to="/dashboard/all-student-reviews"
                >
                  <MdOutlineRateReview className="text-xl" />
                  <span className="is-drawer-close:hidden">
                    All Student Reviews
                  </span>
                </NavLink>
              </li>
            )}

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                    }
                    data-tip="Add Scholarships"
                    to="/dashboard/add-scholarships"
                  >
                    <RiStickyNoteAddLine className="text-xl" />
                    <span className="is-drawer-close:hidden">
                      Add Scholarships
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                    }
                    data-tip="Manage Scholarships"
                    to="/dashboard/manage-scholarships"
                  >
                    <RiGraduationCapLine className="text-xl" />
                    <span className="is-drawer-close:hidden">
                      Manage Scholarships
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                    }
                    data-tip="Approve Moderators"
                    to="/dashboard/approve-moderators"
                  >
                    <BsPersonWorkspace className="text-xl" />
                    <span className="is-drawer-close:hidden">
                      Approve Moderators
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                    }
                    data-tip="Students Management"
                    to="/dashboard/students-management"
                  >
                    <Users className="text-lg" />
                    <span className="is-drawer-close:hidden">
                      Students Management
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                    }
                    data-tip="Analytics"
                    to="/dashboard/analytics"
                  >
                    <TbBrandGoogleAnalytics className="text-xl" />
                    <span className="is-drawer-close:hidden">
                      Analytics
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded
     ${isActive ? "bg-[#cfedfa] text-[#0CB3FA]" : "text-gray-700 dark:text-zinc-200 hover:bg-blue-100 dark:hover:bg-blue-100/20"}`
                }
                data-tip="My Profile"
                to="/dashboard/my-profile"
              >
                <CgProfile className="text-xl" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
