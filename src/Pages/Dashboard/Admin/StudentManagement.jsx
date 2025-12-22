import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { GoSearch } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

const StudentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const {
    refetch,
    data: users = [],
    isLoading
  } = useQuery({
    queryKey: ["Users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${encodeURIComponent(searchText)}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Student Will Be Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Make him!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleinfo = { role: "admin" };
        axiosSecure.patch(`/users/${user._id}/role`, roleinfo).then((res) => {
          // console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName || user.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Student Will Remove From  Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Remove him!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const roleinfo = { role: "student" };
        axiosSecure.patch(`/users/${user._id}/role`, roleinfo).then((res) => {
          // console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName || user.name} is a Student Now!`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );

  return (
    <div className="px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold mb-6">
          Manage Students {users.length}
        </h1>

        <div className="relative w-full md:w-[50%]">
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            value={searchText}
            type="text"
            placeholder="Search Students..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 text-lg">
            <GoSearch />
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl">
        <table className="table">
          <thead>
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {user.displayName || user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="flex items-center gap-3">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => {
                        handleRemoveAdmin(user);
                      }}
                      className="btn bg-red-400 tooltip tooltip-top "
                      data-tip="Remove Admin"
                    >
                      <FaUserSlash className="text-lg" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-400 tooltip tooltip-top "
                      data-tip="Make Admin"
                    >
                      <FaUserShield className="text-lg" />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn hover:bg-error tooltip tooltip-top "
                    data-tip="Delete User"
                  >
                    <FaRegTrashAlt className="text-lg" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
