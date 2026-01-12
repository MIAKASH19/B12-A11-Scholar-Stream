import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { motion } from "framer-motion";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (data) => {
    setError("");
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location?.state || "/");
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  // Quick admin login
  const handleAdminLogin = () => {
    const adminData = { email: "admin@scholarstream.com", password: "Admin123!" };
    setValue("email", adminData.email);
    setValue("password", adminData.password);
    handleLogin(adminData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/30 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/30 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-md p-10 space-y-6 transition-colors"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Login to continue with ScholarStream
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
          </div>

          {/* Password */}
          <div className="relative space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-10 cursor-pointer text-gray-500 dark:text-gray-400"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-medium hover:scale-105 transition shadow-lg"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleAdminLogin}
              className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:scale-105 transition shadow-md"
            >
              Quick Admin Login
            </button>
          </div>

          {/* Social login */}
          <SocialLogin />

          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
            New to ScholarStream?{" "}
            <Link to="/register" className="font-medium underline text-blue-500 dark:text-blue-400">
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
