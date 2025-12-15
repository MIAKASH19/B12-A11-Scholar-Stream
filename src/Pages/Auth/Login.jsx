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

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <div className="bg-blue-200 w-100 h-70 absolute top-40 left-0 blur-2xl scale-200 rounded-full"></div>
      <div className="bg-pink-100 w-100 h-70 absolute bottom-40 right-0 blur-2xl scale-200 rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white border border-zinc-200 rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        <h1 className="text-3xl font-semibold text-center">Welcome Back</h1>
        <p className="text-sm text-center opacity-70 mt-2">
          Login to continue with Scholar-Stream
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-5">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm">Password</label>
            <input
              type={show ? "text" : "password"}
              className="w-full mt-1 px-4 py-2 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-9 cursor-pointer opacity-70"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-full hover:scale-105 transition shadow-lg"
          >
            Login
          </button>

          <SocialLogin />

          <p className="text-sm text-center opacity-80">
            New to Scholar-Stream?{" "}
            <Link
              to="/register"
              state={location?.state || null}
              className="font-medium underline"
            >
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
