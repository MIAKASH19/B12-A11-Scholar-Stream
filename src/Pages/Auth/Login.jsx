import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";

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
  const [error, setError] = useState(false);

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center h-fit md:px-10 px-4 py-10">
      <div className="md:w-2/5 w-full h-full flex items-center justify-center border border-zinc-200 shadow-2xl rounded-2xl">
        <div className="card md:w-4/5  w-full h-full py-6 pb-10">   
          <h1 className="text-3xl font-semibold text-center">
            Login Your Account
          </h1>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              

              <label className="mt-2 text-sm">Email</label>
              <input
                type="email"
                className="input w-full rounded-sm border-[#e5e5e5]"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email is required.</p>
              )}

              <div className="relative gap-2 flex flex-col">
                <label className="mt-2 text-sm">Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input w-full rounded-sm border-[#e5e5e5]"
                  {...register("password", {
                    required: true,
                    minLength: true,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/,
                  })}
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required.</p>
                )}

                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 6 characters.
                  </p>
                )}

                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must contain at least 1 uppercase letter, 1
                    lowercase letter, and 1 digit.
                  </p>
                )}

                <span
                  onClick={() => setShow(!show)}
                  className="absolute top-12 right-5 cursor-pointer"
                >
                  <FaEye className="text-lg" />
                </span>
              </div>

              <div className="mt-2">
                New to Scholar-Stream?{" "}
                <Link
                  to="/register"
                  state={location?.state || null}
                  className="text-blue-800 hover:underline"
                >
                  Register
                </Link>
              </div>

              <button type="submit" className="btn btn-neutral mt-4">Login</button>

              <SocialLogin />

              {error && <p className="text-red-500 text-xs">{error}</p>}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
