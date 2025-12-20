import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserSlash } from "react-icons/fa6";
import Swal from "sweetalert2";

const StudentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      console.log(res.data);
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
        axiosSecure.patch(`/users/${user._id}`, roleinfo).then((res) => {
          console.log(res.data);
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
        axiosSecure.patch(`/users/${user._id}`, roleinfo).then((res) => {
          console.log(res.data);
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

  if (isLoading) return <div>Loading users...</div>;
  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-semibold mb-6">
        Manage Students {users.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
                  <button className="btn btn-ghost btn-xs">details</button>
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
