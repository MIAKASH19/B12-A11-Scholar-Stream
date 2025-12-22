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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleModeratorApply = (data) => {
    axiosSecure.post("/moderators", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your Application has been Submitted",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="w-full md:min-h-screen flex items-center justify-center h-fit px-4 my-20">
      <div className="md:max-w-3xl w-full flex items-center justify-center border border-zinc-200 shadow-2xl rounded-2xl px-4">
        <div className="card md:w-4/5 w-full h-full py-6 pb-10">
          <h1 className="text-4xl font-semibold text-center">
            Apply for Moderator
          </h1>
          <p className="text-zinc-500 mt-2 text-sm text-center">
            Students can apply to become a Moderator. Admin will review and
            approve your application.
          </p>

          <form onSubmit={handleSubmit(handleModeratorApply)}>
            <fieldset className="fieldset mt-4">
              <label className="mt-2 text-sm">Name</label>
              <input
                type="text"
                className="input w-full rounded-sm border-[#e5e5e5]"
                defaultValue={user?.displayName || ""}
                {...register("name", { required: true })}
                readOnly
              />

              <label className="mt-2 text-sm">Email</label>
              <input
                type="email"
                className="input w-full rounded-sm border-[#e5e5e5]"
                defaultValue={user?.email || ""}
                {...register("email", { required: true })}
                readOnly
              />

              <label className="mt-2 text-sm">Profession</label>
              <input
                type="text"
                className="input w-full rounded-sm border-[#e5e5e5]"
                {...register("profession", { required: true })}
                placeholder="Your Profession"
              />
              {errors.profession && (
                <p className="text-red-500 text-xs mt-1">
                  Profession is required.
                </p>
              )}

              <label className="mt-2 text-sm">Age</label>
              <input
                type="number"
                className="input w-full rounded-sm border-[#e5e5e5]"
                {...register("age", { required: true, min: 18 })}
                placeholder="Your Age"
              />
              {errors.age && (
                <p className="text-red-500 text-xs mt-1">
                  Valid age is required (18+).
                </p>
              )}

              <label className="mt-2 text-sm">Study Level</label>
              <select
                className="input w-full rounded-sm border-[#e5e5e5]"
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

              <label className="mt-2 text-sm">
                Why do you want to become a Moderator?
              </label>
              <textarea
                className="input w-full rounded-sm border-[#e5e5e5] h-32 p-2"
                {...register("message", { required: true, minLength: 10 })}
                placeholder="Write your reason here..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  Please provide a reason (at least 10 characters).
                </p>
              )}

              <button className="btn bg-blue-600 text-white mt-4 w-full">
                Submit Application
              </button>

            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorApply;
