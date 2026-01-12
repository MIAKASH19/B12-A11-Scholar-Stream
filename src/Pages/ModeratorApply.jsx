import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ModeratorApply = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleModeratorApply = (data) => {
    setLoading(true);

    axiosSecure
      .post("/moderators", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your application has been submitted",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/dashboard/moderator-applications");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message || "You have already applied!",
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Already Applied",
            text: "You have already applied as a Moderator.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to submit. Please try again.",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center h-fit px-4 py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 dark:bg-blue-700 blur-3xl rounded-full opacity-50" />
      <div className="absolute top-40 -right-40 w-96 h-96 bg-pink-200 dark:bg-pink-700 blur-3xl rounded-full opacity-50" />
      <div className="md:max-w-3xl w-full flex items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded-2xl px-4 bg-white dark:bg-gray-800 transition-colors">
        <div className="card md:w-4/5 w-full h-full py-6 pb-10">
          <h1 className="text-4xl font-semibold text-center text-gray-900 dark:text-gray-100">
            Apply for Moderator
          </h1>
          <p className="text-zinc-500 dark:text-gray-300 mt-2 text-sm text-center">
            Students can apply to become a Moderator. Admin will review and
            approve your application.
          </p>

          <form onSubmit={handleSubmit(handleModeratorApply)}>
            <fieldset className="fieldset mt-4">
              <label className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                className="input w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                defaultValue={user?.displayName || ""}
                {...register("name", { required: true })}
                readOnly
              />

              <label className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                className="input w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                defaultValue={user?.email || ""}
                {...register("email", { required: true })}
                readOnly
              />

              <label className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Profession
              </label>
              <input
                type="text"
                className="input w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                {...register("profession", { required: true })}
                placeholder="Your Profession"
              />
              {errors.profession && (
                <p className="text-red-500 text-xs mt-1">
                  Profession is required.
                </p>
              )}

              <label className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Age
              </label>
              <input
                type="number"
                className="input w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                {...register("age", { required: true, min: 18 })}
                placeholder="Your Age"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">
                  Valid age is required (18+).
                </p>
              )}

              <label className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Study Level
              </label>
              <select
                className="input w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                {...register("studyLevel", { required: true })}
              >
                <option value="">Select Study Level</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
              {errors.studyLevel && (
                <p className="text-red-500 text-xs mt-1">
                  Study level is required.
                </p>
              )}

              <label className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                Why do you want to become a Moderator?
              </label>
              <textarea
                className="input w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-32 p-2"
                {...register("message", { required: true, minLength: 10 })}
                placeholder="Write your reason here..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  Please provide a reason (at least 10 characters).
                </p>
              )}

              <button
                className="btn bg-blue-600 border-none rounded-full text-white mt-4 w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorApply;
