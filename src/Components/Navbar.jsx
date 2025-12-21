import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { FaGoogleScholar } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role = "student" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      console.log(res.data);
      return res.data?.role || "student";
    },
  });

  const links = (
    <>
      <Link to="/" className="text-black">
        Home
      </Link>
      <Link to="/all-scholarships" className="text-black">
        All Scholarship
      </Link>
      <Link to="/moderator-apply" className="text-black">
        Be a Moderator
      </Link>
      {user && (
        <Link to="/dashboard/my-applications" className="text-black">
          Dashboard
        </Link>
      )}
      <Link to="/about-us" className="text-black">
        About Us
      </Link>
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
      text: "You have been logged out successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Logout failed. Please try again.",
    });
  }
};


  return (
    <div className="navbar bg-white fixed top-0 left-0 shadow-sm px-10 z-99">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="font-semibold flex items-center gap-2 text-xl">
          <FaGoogleScholar className="text-blue-600" />
          Scholar-Stream
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-5">{links}</ul>
      </div>
      <div className="navbar-end gap-4 text-zinc-800 lg:flex md:pr-0 pr-5">
        {user ? (
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-400 hover:ring-indigo-500 transition-all duration-200 cursor-pointer"
            >
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                className="w-full h-full object-cover"
                alt="User Avatar"
              />
            </div>

            <div
              tabIndex="-1"
              className="dropdown-content w-50 bg-white rounded-xl shadow-2xl border border-gray-200 mt-2 p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="User Avatar"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
              </div>
              <Link
                to="/dashboard/my-profile"
                className="px-3 py- rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium text-gray-700"
              >
                My Profile
              </Link>

              <button
                onClick={handleSignOut}
                className=" px-3 py-2 bg-blue-600 rounded-full text-white font-medium  hover:bg-red-600 transition-colors duration-400 ease-in-out"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to={"/register"}
              className="bg-blue-600 rounded-full text-sm text-white hover:bg-white hover:text-blue-600 transition-all border hover:border-blue-600 duration-300 px-5 py-2"
            >
              Register
            </Link>
            <Link
              to={"/login"}
              className="bg-white border border-blue-600 rounded-full text-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 px-5 py-2"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
