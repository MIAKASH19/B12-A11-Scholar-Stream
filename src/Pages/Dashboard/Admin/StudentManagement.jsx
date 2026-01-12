import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { GoSearch } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { UserCheck, UserX } from "lucide-react";

const StudentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["Users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchText=${encodeURIComponent(searchText)}`
      );
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This student will be promoted to Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Yes, make Admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/users/${user._id}/role`,
          { role: "admin" }
        );
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName || user.name} is now an Admin`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This admin will be demoted to Student!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, remove Admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/users/${user._id}/role`,
          { role: "student" }
        );
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName || user.name} is now a Student`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${user._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "User has been removed.", "success");
        }
      }
    });
  };

  if (isLoading)
  return (
    <div className="w-full flex items-center justify-center h-screen pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );


  return (
    <div className="min-h-screen px-6 py-6 bg-gray-50 dark:bg-[#0b0f19] text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">
          Manage Students ({users.length})
        </h1>

        {/* Search */}
        <div className="relative w-full md:w-[50%]">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder="Search students..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f2937] px-5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
            <GoSearch />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 shadow">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-[#15181f] text-gray-700 dark:text-gray-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-[#1f2937] transition"
              >
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-11 w-11">
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                    <div className="font-medium">
                      {user.displayName || user.name}
                    </div>
                  </div>
                </td>

                <td className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </td>

                <td className="capitalize">
                  <span className="badge badge-outline">
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm btn-error tooltip tooltip-top"
                      data-tip="Remove Admin"
                    >
                      <UserX size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm btn-success tooltip tooltip-top"
                      data-tip="Make Admin"
                    >
                      <UserCheck size={18} />
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10 tooltip tooltip-top"
                    data-tip="Delete User"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-16 text-gray-500 dark:text-gray-400"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
