import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaCheckCircle,
  FaRegTrashAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import Swal from "sweetalert2";

const ApproveModerator = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);

  const {
    refetch,
    data: moderators = [],
    isLoading,
  } = useQuery({
    queryKey: ["approveModerator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderators");
      return res.data;
    },
  });

  const handleUpdateStatus = (id, status) => {
    axiosSecure
      .patch(`/moderators/${id}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Moderator ${status}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleDeleteApplication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This moderator application will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/moderators/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Application removed.", "success");
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
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#0b0f19] text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold mb-6">
        Moderator Applications ({moderators.length})
      </h1>

      {moderators.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No moderator applications found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow">
          <table className="table w-full">
            <thead className="bg-gray-100 dark:bg-[#15181f] text-gray-700 dark:text-gray-300">
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Age</th>
                <th>Study Level</th>
                <th>Message</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {moderators.map((app, index) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 dark:hover:bg-[#1f2937] transition"
                >
                  <td className="text-xs">{index + 1}</td>
                  <td className="text-xs">{app.name}</td>
                  <td className="text-xs text-gray-500 dark:text-gray-400">
                    {app.email}
                  </td>
                  <td className="text-xs">{app.profession}</td>
                  <td className="text-xs">{app.age}</td>
                  <td className="text-xs">{app.studyLevel}</td>
                  <td className="truncate max-w-30 text-xs">
                    {app.message}
                  </td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        app.status === "pending"
                          ? "badge-warning"
                          : app.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="flex gap-2 flex-wrap justify-center">
                    <button
                      className="btn btn-sm btn-success tooltip tooltip-top"
                      data-tip="Approve"
                      onClick={() =>
                        handleUpdateStatus(app._id, "approved")
                      }
                    >
                      <FaCheckCircle />
                    </button>

                    <button
                      className="btn btn-sm btn-error tooltip tooltip-top"
                      data-tip="Reject"
                      onClick={() =>
                        handleUpdateStatus(app._id, "rejected")
                      }
                    >
                      <FaTimesCircle />
                    </button>

                    <button
                      className="btn btn-sm btn-info tooltip tooltip-top"
                      data-tip="Details"
                      onClick={() => {
                        setSelectedApp(app);
                        document
                          .getElementById("detail_modal")
                          .showModal();
                      }}
                    >
                      <BiDetail />
                    </button>

                    <button
                      className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10 tooltip tooltip-top"
                      data-tip="Delete"
                      onClick={() =>
                        handleDeleteApplication(app._id)
                      }
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      <dialog id="detail_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl bg-white dark:bg-[#111827] text-gray-800 dark:text-gray-200">
          {selectedApp && (
            <>
              <h3 className="text-xl font-semibold mb-2">
                {selectedApp.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {selectedApp.email}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="Profession" value={selectedApp.profession} />
                <Info label="Age" value={selectedApp.age} />
                <Info
                  label="Study Level"
                  value={selectedApp.studyLevel}
                />
                <Info label="Message" value={selectedApp.message} />
                <Info label="Status" value={selectedApp.status} />
              </div>
            </>
          )}

          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() =>
                document.getElementById("detail_modal").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1f2937] p-4">
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {label}
    </p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ApproveModerator;
