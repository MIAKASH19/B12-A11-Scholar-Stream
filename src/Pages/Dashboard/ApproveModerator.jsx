import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaRegTrashAlt, FaTimesCircle } from "react-icons/fa";
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
      .patch(`/moderators/${id}`, {
        status,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Moderator has been ${status}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteApplication = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This moderator application will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/moderators/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Application removed.", "success");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete.", "error");
        }
      }
    });
  };

  if (isLoading)
    return <div className="p-6">Loading Moderator applications...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Moderator Applications ({moderators.length})
      </h1>

      {moderators.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No moderator applications found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Sl</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Age</th>
                <th>Study Level</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderators.map((app, index) => (
                <tr key={app._id}>
                  <td className="text-xs">{index + 1}</td>
                  <td className="text-xs">{app.name}</td>
                  <td className="text-xs">{app.email}</td>
                  <td className="text-xs">{app.profession}</td>
                  <td className="text-xs">{app.age}</td>
                  <td className="text-xs">{app.studyLevel}</td>
                  <td className="truncate text-xs max-w-20">{app.message}</td>
                  <td>
                    <span
                      className={`badge capitalize rounded-sm  ${
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
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-success btn-md tooltip tooltip-top"
                      data-tip="Approve"
                      onClick={() => handleUpdateStatus(app._id, "approved")}
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      className="btn btn-error btn-md tooltip tooltip-top"
                      data-tip="Reject"
                      onClick={() => handleUpdateStatus(app._id, "rejected")}
                    >
                      <FaTimesCircle />
                    </button>
                    <button
                      className="btn btn-info btn-md tooltip tooltip-top"
                      data-tip="Details"
                      onClick={() => {
                        setSelectedApp(app);
                        document.getElementById("detail_modal").showModal();
                      }}
                    >
                      <BiDetail />
                    </button>
                    <button
                      className="btn text-lg hover:btn-error tooltip tooltip-top"
                      data-tip="Delete"
                      onClick={() => handleDeleteApplication(app._id)}
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
        <div className="modal-box max-w-3xl p-6 sm:p-8">
          {selectedApp && (
            <>
              <h3 className="text-xl font-semibold mb-3">{selectedApp.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{selectedApp.email}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="Profession" value={selectedApp.profession} />
                <Info label="Age" value={selectedApp.age} />
                <Info label="Study Level" value={selectedApp.studyLevel} />
                <Info label="Message" value={selectedApp.message} />
                <Info label="Status" value={selectedApp.status} />
              </div>
            </>
          )}
          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("detail_modal").close()}
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
  <div className="bg-base-100 border border-zinc-300 rounded-xl p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ApproveModerator;
