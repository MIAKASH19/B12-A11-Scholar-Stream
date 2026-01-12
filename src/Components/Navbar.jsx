import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { FaGoogleScholar } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Button from "./Button";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role = "student" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "student";
    },
  });

  const navClass = ({ isActive }) =>
    `py-2 pl-3 font-medium transition-colors duration-300
     ${isActive
      ? "text-[#0CB3FA]"
      : "text-gray-800 dark:text-gray-300 hover:text-[#0CB3FA]"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navClass}>Home</NavLink>
      <NavLink to="/all-scholarships" className={navClass}>All Scholarships</NavLink>
      <NavLink to="/moderator-apply" className={navClass}>Apply as Moderator</NavLink>

      {user && (
        <NavLink to="/dashboard/my-applications" className={navClass}>
          My Dashboard
        </NavLink>
      )}

      <NavLink to="/about-us" className={navClass}>About Us</NavLink>
      <NavLink to="/contact-us" className={navClass}>Contact Us</NavLink>
    </>
  );

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from this account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#155DFC",
      cancelButtonColor: "#E7000B",
      confirmButtonText: "Log Out",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await signOutUser();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Logout failed. Please try again.",
      });
    }
  };

  return (
    <div className="navbar fixed top-0 left-0 z-99 w-full flex items-center justify-between
      bg-white dark:bg-[#0b0f19]
      border-b border-gray-100 dark:border-white/10
      shadow-sm dark:shadow-black/40
      px-10 sm:px-0 md:px-8 transition-colors">

      {/* Left */}
      <div className="navbar-start flex items-center -ml-10 sm:ml-0">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-gray-800 dark:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 20 20" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content mt-3 w-52 p-2 rounded-box shadow-xl
              bg-white dark:bg-[#121826] border dark:border-white/10"
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="font-semibold flex items-center gap-2 md:text-xl text-sm text-gray-900 dark:text-white">
          <FaGoogleScholar className="text-[#0CB3FA] text-lg" />
          Scholar_Stream
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5">{links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-4 -pr-10 text-gray-800 dark:text-gray-200">
        <DarkModeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#0CB3FA] cursor-pointer"
            >
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              tabIndex="-1"
              className="dropdown-content mt-2 w-56 p-4 rounded-xl shadow-2xl
                bg-white dark:bg-[#121826]
                border border-gray-200 dark:border-white/10
                flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/10">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {role}
                  </p>
                </div>
              </div>

              <Link
                to="/dashboard/my-applications"
                className="px-3 py-2 rounded-lg font-medium
                  text-gray-700 dark:text-gray-300
                  hover:bg-indigo-50 dark:hover:bg-white/10">
                My Dashboard
              </Link>

              <Button text="Log Out" onClick={handleSignOut} />
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/register"
              className="md:px-5 px-2 text-xs py-2 rounded-full md:text-sm
                bg-blue-600 text-white
                hover:bg-transparent hover:text-blue-600
                border border-blue-600 transition">
              Register
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 rounded-full hidden md:block text-sm
                bg-white dark:bg-transparent
                text-blue-600
                border border-blue-600
                hover:bg-blue-600 hover:text-white transition">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
