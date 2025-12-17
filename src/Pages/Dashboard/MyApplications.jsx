import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);

  const { data: applications = [] } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-sm p-3">My Applications : {applications.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sl no.</th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Category</th>
              <th>Application Status</th>
              <th>Application Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <th>{index + 1}</th>
                <td className="text-sm">{application.universityName}</td>
                <td className="text-sm">{application.universityAddress}</td>
                <td className="text-sm">{application.feedback}</td>
                <td className="text-sm">{application.subjectCategory}</td>
                <td className="text-sm">{application.applicationStatus}</td>
                <td className="text-sm">{application.applicationFees}$</td>
                <td className="text-sm flex gap-1">
                  <button
                    onClick={() => {
                      setSelectedApp(application);
                      document.getElementById("my_modal_5").showModal();
                    }}
                    className="bg-green-500 px-2 py-1 text-white rounded-lg text-xs"
                  >
                    Detail
                  </button>

                  {application.applicationStatus === "pending" && (
                    <button className="bg-yellow-400 px-2 py-1 text-white rounded-lg text-xs">
                      Edit
                    </button>
                  )}
                  {application.applicationStatus === "pending" &&
                    application.paymentStatus === "unpaid" && (
                      <button className="bg-pink-500 px-2 py-1 text-white rounded-lg text-xs">
                        Pay
                      </button>
                    )}

                  {application.applicationStatus === "pending" && (
                    <button className="bg-red-500 px-2 py-1 text-white rounded-lg text-xs">
                      Delete
                    </button>
                  )}
                  {application.applicationStatus === "completed" && (
                    <button className="bg-blue-500 px-2 py-1 text-white rounded-lg text-xs">
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box max-w-3xl p-6 sm:p-8">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold tracking-tight">
                Application Details
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Complete information about your scholarship application
              </p>
            </div>

            {selectedApp && (
              <div className="space-y-6 text-sm">
                <div className="bg-base-200 rounded-xl p-5">
                  <p className="text-lg font-semibold mb-1">
                    {selectedApp.universityName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedApp.universityAddress}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-base-100 border border-zinc-300 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">
                      Subject Category
                    </p>
                    <p className="font-medium">{selectedApp.subjectCategory}</p>
                  </div>

                  <div className="bg-base-100 border border-zinc-300 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Degree</p>
                    <p className="font-medium">{selectedApp.degree}</p>
                  </div>

                  <div className="bg-base-100 border border-zinc-300 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Applied Date</p>
                    <p>{selectedApp.applicationDate}</p>
                  </div>

                  <div className="bg-base-100 border border-zinc-300 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Application Status
                    </p>
                    <span
                      className={`badge badge-lg ${
                        selectedApp.applicationStatus === "pending"
                          ? "badge-warning"
                          : selectedApp.applicationStatus === "completed"
                          ? "badge-success"
                          : "badge-info"
                      }`}
                    >
                      {selectedApp.applicationStatus}
                    </span>
                  </div>

                  <div className="bg-base-100 border border-zinc-300 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Payment Status</p>
                    <span
                      className={`badge badge-lg ${
                        selectedApp.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {selectedApp.paymentStatus}
                    </span>
                  </div>

                  <div className="bg-base-100 border border-zinc-300 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">
                      Application Fees
                    </p>
                    <p className="text-lg font-semibold">
                      ${selectedApp.applicationFees}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Moderator Feedback</p>
                  <div className="bg-base-200 rounded-xl p-5 leading-relaxed">
                    {selectedApp.feedback || "No feedback provided yet."}
                  </div>
                </div>
              </div>
            )}
            <div className="modal-action mt-8">
              <form method="dialog" className="w-full sm:w-auto">
                <button className="btn btn-outline w-full sm:w-32">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyApplications;
