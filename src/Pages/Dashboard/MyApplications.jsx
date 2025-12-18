import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { Link } from "react-router";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const [editApp, setEditApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleUpdateApplication = async () => {
    try {
      const res = await axiosSecure.patch(`/applications/${editApp._id}`, {
        email: user.email,
        universityName: editApp.universityName,
        subjectCategory: editApp.subjectCategory,
        degree: editApp.degree,
      });

      if (res.data.modifiedCount > 0) {
        alert("Application updated!");
        document.getElementById("edit_modal").close();
        queryClient.invalidateQueries(["myApplications", user.email]);
      }
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const handleDeleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axiosSecure.delete(
        `/applications/${id}?email=${user.email}`
      );

      if (res.data.deletedCount > 0) {
        alert("Application deleted successfully!");
        queryClient.invalidateQueries(["myApplications", user.email]);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete application");
    }
  };

  const handleSubmitReview = async () => {
    if (reviewRating === 0 || reviewComment.trim() === "") {
      alert("Please provide rating and comment!");
      return;
    }

    try {
      const response = await axiosSecure.post(`/reviews`, {
        scholarshipId: selectedApp.scholarshipId,
        scholarshipName: selectedApp.scholarshipName,
        applicationId: selectedApp.applicationId,
        userImage: user.photoURL,
        userName: user.displayName,
        userEmail: user.email,
        universityName: selectedApp.universityName,
        ratingPoint: reviewRating,
        reviewComment: reviewComment,
      });

      console.log(response);

      if (response.data.success) {
        alert("Review submitted!");
        document.getElementById("my_review_modal").close();
        setReviewRating(0);
        setReviewComment("");
        queryClient.invalidateQueries(["myApplications", user.email]);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("You already submitted a review for this application.");
      } else {
        console.error(error);
        alert("Failed to submit review. Try again later.");
      }
    }
  };

  if (isLoading) return <div className="p-6">Loading applications...</div>;

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-semibold mb-6">
        My Applications ({applications.length})
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Sl</th>
              <th>University</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Category</th>
              <th>App. Status</th>
              <th>Pay. Status</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td className="font-medium text-xs">{app.universityName}</td>
                <td className="font-medium text-xs">{app.universityAddress}</td>
                <td className="font-medium text-xs">
                  {app.feedback || "No feedback yet"}
                </td>
                <td className="font-medium text-xs">{app.subjectCategory}</td>
                <td>
                  <span
                    className={`badge font-semibold rounded-sm capitalize ${
                      app.applicationStatus === "pending"
                        ? "badge-warning"
                        : app.applicationStatus === "completed"
                        ? "badge-success"
                        : "badge-info"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                </td>
                <td className="text-xs ">
                  <h1
                    className={`${
                      app.paymentStatus == "paid" ? "bg-green-500" : "bg-error"
                    } rounded-sm px-3 py-2 w-fit font-semibold capitalize`}
                  >
                    {app.paymentStatus}
                  </h1>
                </td>
                <td className="font-semibold text-xs">${app.totalCost}</td>
                <td className="flex gap-2 flex-wrap">
                  <button
                    className="btn text-lg hover:btn-success tooltip tooltip-top"
                    data-tip="Details"
                    onClick={() => {
                      setSelectedApp(app);
                      document.getElementById("detail_modal").showModal();
                    }}
                  >
                    <BiDetail />
                  </button>
                  {app.applicationStatus === "pending" && (
                    <>
                      <button
                        className="btn text-lg hover:btn-warning tooltip tooltip-top"
                        data-tip="Edit"
                        onClick={() => {
                          setEditApp(app);
                          document.getElementById("edit_modal").showModal();
                        }}
                      >
                        <FaEdit />
                      </button>

                      {/* Edit MOdal */}
                      <dialog
                        id="edit_modal"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box max-w-xl">
                          {editApp && (
                            <>
                              <h3 className="text-xl font-semibold mb-4">
                                Edit Application
                              </h3>

                              <label className="block mb-2">
                                University Name
                              </label>
                              <input
                                type="text"
                                className="input input-bordered w-full mb-4"
                                value={editApp.universityName}
                                onChange={(e) =>
                                  setEditApp({
                                    ...editApp,
                                    universityName: e.target.value,
                                  })
                                }
                              />

                              <label className="block mb-2">
                                Subject Category
                              </label>
                              <input
                                type="text"
                                className="input input-bordered w-full mb-4"
                                value={editApp.subjectCategory}
                                onChange={(e) =>
                                  setEditApp({
                                    ...editApp,
                                    subjectCategory: e.target.value,
                                  })
                                }
                              />

                              <div className="modal-action">
                                <button
                                  className="btn btn-outline"
                                  onClick={() =>
                                    document
                                      .getElementById("edit_modal")
                                      .close()
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-primary"
                                  onClick={handleUpdateApplication}
                                >
                                  Update
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </dialog>

                      {app.paymentStatus === "unpaid" && (
                        <Link to={`/dashboard/payment/${app._id}`}>
                          <button
                            className="btn text-lg hover:btn-primary tooltip tooltip-top "
                            data-tip="Payment"
                          >
                            <MdPayment />
                          </button>
                        </Link>
                      )}
                      {app.applicationStatus === "pending" && (
                        <button
                          className="btn text-lg hover:btn-error tooltip tooltip-top"
                          data-tip="Delete"
                          onClick={() => handleDeleteApplication(app._id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      )}

                      {app.applciationStatus === "completed" && (
                        <button
                          className="btn text-lg hover:btn-info tooltip tooltip-top "
                          data-tip="Add Review"
                          onClick={() => {
                            setSelectedApp(app);
                            setReviewComment("");
                            setReviewRating(0);
                            document
                              .getElementById("my_review_modal")
                              .showModal();
                          }}
                        >
                          <IoIosAddCircleOutline />
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <dialog id="detail_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl p-6 sm:p-8">
          {selectedApp && (
            <>
              <h3 className="text-xl font-semibold mb-3">
                {selectedApp.universityName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {selectedApp.universityAddress}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Info label="Subject" value={selectedApp.subjectCategory} />
                <Info label="Degree" value={selectedApp.degree} />
                <Info
                  label="Applied Date"
                  value={selectedApp.applicationDate}
                />
                <Info label="Status" value={selectedApp.applicationStatus} />
                <Info label="Payment" value={selectedApp.paymentStatus} />
                <Info
                  label="Application Fees"
                  value={`$${selectedApp.applicationFees}`}
                />
              </div>
              <div className="mt-4">
                <p className="font-medium mb-1">Moderator Feedback:</p>
                <div className="bg-base-200 p-3 rounded">
                  {selectedApp.feedback || "No feedback yet"}
                </div>
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

      {/* Add Review Modal */}
      <dialog
        id="my_review_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-3xl p-6 sm:p-8">
          {selectedApp && (
            <>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Add Review for {selectedApp.universityName}
              </h3>

              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={28}
                    className="cursor-pointer mx-1 transition-colors"
                    color={reviewRating >= star ? "#facc15" : "#d1d5db"}
                    onClick={() => setReviewRating(star)}
                  />
                ))}
              </div>
              <textarea
                rows={4}
                placeholder="Write your comment..."
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    document.getElementById("my_review_modal").close()
                  }
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitReview}
                >
                  Submit
                </button>
              </div>
            </>
          )}
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

export default MyApplications;
