import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const { name, photoUrl, email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            axiosSecure
              .post("/users", { email, displayName: name, photoURL: photoUrl, uid: user.uid })
              .then(() => navigate(location?.state || "/"))
              .catch((err) => setError("Failed to save user"));
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/30 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/30 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl w-full max-w-xl p-10 space-y-6 transition-colors"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create An Account
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Access your saved scholarships, track applications, and explore opportunities.
        </p>

        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.name && <p className="text-red-500 text-xs">Name is required</p>}
          </div>

          {/* Photo URL */}
          <div className="space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL"
              {...register("photoUrl", { required: true })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {errors.photoUrl && <p className="text-red-500 text-xs">Photo URL is required</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Your Email"
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
              placeholder="Create Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-10 cursor-pointer text-gray-500 dark:text-gray-400"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs">Password must be at least 6 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-xs">
                Password must contain uppercase, lowercase, and a special character
              </p>
            )}
          </div>

          {/* Links */}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" state={location?.state || null} className="text-blue-500 dark:text-blue-400 underline">
              Login
            </Link>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-medium hover:scale-105 transition shadow-lg"
            >
              Register
            </button>

            <button
              type="button"
              onClick={()=> navigate("/login")}
              className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:scale-105 transition shadow-md"
            >
              Quick Admin Register
            </button>
          </div>

          {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
