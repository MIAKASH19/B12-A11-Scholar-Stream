import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const links = (
    <>
      <Link to="/" className="text-black">Home</Link>
      <Link to="/all-scholarships" className="text-black">All Scholarship</Link>
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {})
      .catch();
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
        <a className="btn btn-ghost text-xl">Scholar-Stream</a>
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
              className=" w-10 h-10 rounded-full overflow-hidden"
            >
              <img src={user.photoURL} className="w-full h-full object-cover" />
            </div>
            <div
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-3xl z-1 w-52 p-4 shadow-xl border border-zinc-200"
            >
              <h1 className="opacity-80 mb-2 ">{user.displayName}</h1>
              <p className="border-b border-zinc-200 pb-2 text-xs">
                {user.email}
              </p>
              <button
                onClick={handleSignOut}
                className="bg-black text-white transition-all duration-300-2 rounded-3xl mt-3 py-2"
              >
                Sign Out
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
