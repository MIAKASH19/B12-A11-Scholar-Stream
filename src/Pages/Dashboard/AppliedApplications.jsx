import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEye, FaCommentDots, FaTimes } from "react-icons/fa";
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
      text: "This application will Rejected!",
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
        Swal.fire("Reject!", "Application removed.", "success");
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

  if (isLoading) return <div>Loading applications...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Applied Applications ({applications.length})
      </h2>

      <div className="overflow-x-auto rounded-2xl">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
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
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>

                <td>
                  {app.feedback ? (
                    <span className="text-green-600">Given</span>
                  ) : (
                    <span className="text-gray-400">Not Yet</span>
                  )}
                </td>

                <td>
                  <select
                    className="select select-sm select-bordered"
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
                    className="btn text-md tooltip"
                    data-tip="View Details"
                    onClick={() => {
                      setSelectedApp(app);
                      document.getElementById("details_modal").showModal();
                    }}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn text-md tooltip"
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
                    className="btn text-md btn-error tooltip"
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

      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-xl rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Application Details
            </h3>
          </div>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium text-gray-500">Name</span>
              <span className="col-span-2 font-semibold">
                {selectedApp?.userName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium text-gray-500">Email</span>
              <span className="col-span-2 break-all">
                {selectedApp?.userEmail}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="font-medium text-gray-500">University</span>
              <span className="col-span-2">{selectedApp?.universityName}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <span className="font-medium text-gray-500">Status</span>
              <span
                className={`col-span-2 inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium capitalize
            ${
              selectedApp?.applicationStatus === "approved"
                ? "bg-emerald-100 text-emerald-600"
                : selectedApp?.applicationStatus === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
              >
                {selectedApp?.applicationStatus}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 items-center">
              <span className="font-medium text-gray-500">Payment</span>
              <span
                className={`col-span-2 inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium capitalize
            ${
              selectedApp?.paymentStatus === "paid"
                ? "bg-indigo-100 text-green-600"
                : "bg-gray-200 text-gray-600"
            }`}
              >
                {selectedApp?.paymentStatus}
              </span>
            </div>

            <div>
              <p className="font-medium text-gray-500 mb-1">Feedback</p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700">
                {selectedApp?.feedback || "No feedback yet"}
              </div>
            </div>
          </div>

          <div className="modal-action mt-6">
            <button
              className="btn btn-outline text-md"
              onClick={() => document.getElementById("details_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="feedback_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-3">Write Feedback</h3>

          <textarea
            className="textarea  w-full"
            rows="4"
            value={feedback}
            placeholder="Write Feedback for this application"
            onChange={(e) => setFeedback(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn btn-outline border-gray-400"
              onClick={() => document.getElementById("feedback_modal").close()}
            >
              Cancel
            </button>
            <button
              className="btn bg-blue-600 text-white"
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
