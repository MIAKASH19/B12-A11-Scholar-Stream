import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const { name, photoUrl, email, password } = data;

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        const userProfile = {
          displayName: name,
          photoURL: photoUrl,
        };

        updateUser(userProfile)
          .then(() => {
            const userInfo = {
              email,
              displayName: name,
              photoURL: photoUrl,
              uid: user.uid,
            };

            axiosSecure
              .post("/users", userInfo)
              .then(() => {
                navigate(location?.state || "/");
              })
              .catch((err) => {
                console.log("Database error:", err);
                setError("Failed to save user");
              });
          })
          .catch((err) => {
            console.log("Profile update error:", err);
            setError(err.message);
          });
      })
      .catch((err) => {
        console.log("Register error:", err);
        setError(err.message);
      });
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center h-fit md:px-10 px-4 py-20">
      <div className="md:w-1/2 w-full h-full flex items-center justify-center border border-zinc-200 shadow-2xl rounded-2xl">
        <div className="card md:w-4/5 w-full h-full py-6 pb-10">
          <h1 className="text-5xl font-semibold text-center">
            Create An Account
          </h1>
          <p className="text-zinc-500 mt-2 hidden lg:block text-sm text-center">
            Access your saved scholarships, track your applications, and explore
            new opportunities anytime, anywhere all in one streamlined
            platform.
          </p>

          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">
              <label className="mt-2 text-sm">Name</label>
              <input
                type="text"
                className="input w-full rounded-sm border-[#e5e5e5]"
                {...register("name", { required: true })}
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500">Name is required.</p>}

              <label className="mt-2 text-sm">Photo URL</label>
              <input
                type="text"
                className="input w-full rounded-sm border-[#e5e5e5]"
                {...register("photoUrl", { required: true })}
                placeholder="Photo URL"
              />
              {errors.photoUrl && (
                <p className="text-red-500">Photo URL is required.</p>
              )}

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
                <label className="mt-2 text-sm">Create Password</label>
                <input
                  type={show ? "text" : "password"}
                  className="input w-full rounded-sm border-[#e5e5e5]"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
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
                    lowercase letter, and 1 special character.
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
                Have an account?{" "}
                <Link
                  to="/login"
                  state={location?.state || null}
                  className="text-blue-800 hover:underline"
                >
                  Login
                </Link>
              </div>

              <button className="btn bg-blue-600 text-white mt-4">Register</button>

              <SocialLogin />

              {error && <p className="text-red-500 text-xs">{error}</p>}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
