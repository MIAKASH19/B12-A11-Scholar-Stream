import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaCommentDots } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const AppliedApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applied-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applied-applications");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/applications/status/${id}`, {
      applicationStatus: status,
    });
    queryClient.invalidateQueries(["applications"]);
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/applications/status/${id}`, {
          applicationStatus: "rejected",
        });
        queryClient.invalidateQueries(["applications"]);
        Swal.fire("Rejected!", "Application removed.", "success");
      }
    });
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please write feedback before submitting.",
      });
    }

    try {
      await axiosSecure.patch(`/applications/feedback/${selectedApp._id}`, {
        feedback,
      });

      Swal.fire({
        icon: "success",
        title: "Feedback Submitted",
        text: "Feedback has been added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setFeedback("");
      document.getElementById("feedback_modal").close();
      queryClient.invalidateQueries(["applications"]);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
  return (
    <div className="w-full flex items-center justify-center h-screen pt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-[#0b0f19] dark:text-zinc-300 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">
        Applied Applications ({applications.length})
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="table w-full border border-zinc-300 dark:border-zinc-600">
          <thead className="bg-gray-100 dark:bg-[#15181f] text-zinc-700 dark:text-zinc-300">
            <tr>
              <th>Sl</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr
                key={app._id}
                className="border border-zinc-700 dark:border-zinc-600"
              >
                <td>{index + 1}</td>
                <td className="font-medium">{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td>
                  {app.feedback ? (
                    <span className="text-green-600 dark:text-green-400">Given</span>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">Not Yet</span>
                  )}
                </td>
                <td>
                  <select
                    className="select select-sm select-bordered dark:bg-[#15181f] dark:text-zinc-300"
                    value={app.applicationStatus}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`badge capitalize rounded-sm py-4 ${
                      app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn text-md dark:bg-[#121b33] dark:text-white shadow-none tooltip"
                    data-tip="View Details"
                    onClick={() => {
                      setSelectedApp(app);
                      document.getElementById("details_modal").showModal();
                    }}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn text-md dark:bg-[#121b33] dark:text-white shadow-none tooltip"
                    data-tip="Give Feedback"
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedback(app.feedback || "");
                      document.getElementById("feedback_modal").showModal();
                    }}
                  >
                    <FaCommentDots />
                  </button>

                  <button
                    className="btn text-md dark:bg-[#121b33] dark:text-white shadow-none btn-error tooltip"
                    data-tip="Reject"
                    onClick={() => handleReject(app._id)}
                  >
                    <IoMdRemoveCircleOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-xl rounded-2xl shadow-2xl bg-white dark:bg-[#15181f] dark:text-zinc-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-zinc-100">
              Application Details
            </h3>
          </div>

          <div className="space-y-4 text-sm text-gray-700 dark:text-zinc-300">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-400">Name</span>
              <span className="col-span-2 font-semibold">{selectedApp?.userName}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-400">Email</span>
              <span className="col-span-2 break-all">{selectedApp?.userEmail}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium text-gray-500 dark:text-gray-400">University</span>
              <span className="col-span-2">{selectedApp?.universityName}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <span className="font-medium text-gray-500 dark:text-gray-400">Status</span>
              <span
                className={`col-span-2 inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium capitalize
                ${
                  selectedApp?.applicationStatus === "approved"
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400"
                    : selectedApp?.applicationStatus === "rejected"
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                    : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                }`}
              >
                {selectedApp?.applicationStatus}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <span className="font-medium text-gray-500 dark:text-gray-400">Payment</span>
              <span
                className={`col-span-2 inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium capitalize
                ${
                  selectedApp?.paymentStatus === "paid"
                    ? "bg-indigo-100 text-green-600 dark:bg-indigo-900 dark:text-green-400"
                    : "bg-gray-200 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {selectedApp?.paymentStatus}
              </span>
            </div>

            <div>
              <p className="font-medium text-gray-500 dark:text-gray-400 mb-1">Feedback</p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 dark:bg-[#0f1117] dark:border-zinc-700 dark:text-zinc-300">
                {selectedApp?.feedback || "No feedback yet"}
              </div>
            </div>
          </div>

          <div className="modal-action mt-6">
            <button
              className="btn btn-outline text-md dark:border-zinc-600 dark:text-zinc-300"
              onClick={() => document.getElementById("details_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box bg-white dark:bg-[#15181f] dark:text-zinc-300">
          <h3 className="text-lg font-bold mb-3">Write Feedback</h3>

          <textarea
            className="textarea w-full dark:bg-[#0f1117] dark:text-zinc-300 dark:border-zinc-700"
            rows="4"
            value={feedback}
            placeholder="Write Feedback for this application"
            onChange={(e) => setFeedback(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn btn-outline hover:bg-[#0CB3FA]/20 shadow-none rounded-full"
              onClick={() => document.getElementById("feedback_modal").close()}
            >
              Cancel
            </button>
            <button
              className="btn bg-[#0CB3FA] hover:bg-[#0CB3FA]/70 border-none rounded-full text-white"
              onClick={handleFeedbackSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AppliedApplications;
