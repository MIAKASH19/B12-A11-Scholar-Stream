import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const handleUpdateProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const updatedUser = { displayName: name, photoURL };
  //     const res = await axiosSecure.put(`/users/${user.email}`, updatedUser);

  //     if (res.data.success) {
  //       alert("Profile updated successfully!");
  //       setUser({ ...user, ...updatedUser });
  //     } else {
  //       alert("Failed to update profile.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong. Try again.");
  //   }
  //   setLoading(false);
  // };

  const { data: scholarUser = {}, isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center h-[20vh] mt-10">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );

  return (
  <div className="max-w-7xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>

    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-8">
      {/* Role Badge */}
      <span
        className={`absolute top-6 right-6 px-4 py-1 rounded-full text-sm font-medium capitalize
        ${
          scholarUser.role === "admin"
            ? "bg-red-100 text-red-600"
            : scholarUser.role === "moderator"
            ? "bg-indigo-100 text-indigo-600"
            : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {scholarUser.role}
      </span>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="relative">
          <img
            src={scholarUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={scholarUser.displayName}
            className="w-36 h-36 rounded-full object-cover ring-4 ring-indigo-500/30 shadow-lg"
          />
        </div>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Full Name
              </p>
              <p className="text-lg font-semibold text-gray-800">
                {scholarUser.displayName || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Email Address
              </p>
              <p className="text-lg font-medium text-gray-700 break-all">
                {scholarUser.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Account Role
              </p>
              <p className="text-lg font-semibold capitalize text-indigo-600">
                {scholarUser.role}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                Account Status
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default MyProfile;
