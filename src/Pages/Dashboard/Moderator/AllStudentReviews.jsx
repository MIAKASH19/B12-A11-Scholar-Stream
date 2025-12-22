import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaStar, FaEye } from "react-icons/fa";

const AllStudentReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedReview, setSelectedReview] = useState(null);

  const handleView = (review) => {
    setSelectedReview(review);
    document.getElementById("review_view_modal").showModal();
  };

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this review?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    await axiosSecure.delete(`/reviews/${id}`);

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Review has been removed",
      timer: 1500,
      showConfirmButton: false,
    });

    queryClient.invalidateQueries(["all-reviews"]);
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        All Student Reviews ({reviews.length})
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No reviews found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="table w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Email</th>
                <th>University</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, idx) => (
                <tr key={review._id} className="hover">
                  <td>{idx + 1}</td>

                  <td className="font-medium">
                    {review.userName || "Anonymous"}
                  </td>

                  <td className="text-sm text-gray-500">{review.userEmail}</td>

                  <td>{review.universityName}</td>

                  <td className="max-w-50 truncate">{review.reviewComment}</td>

                  <td>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={14}
                          className="mr-1"
                          color={
                            review.ratingPoint >= star ? "#facc15" : "#e5e7eb"
                          }
                        />
                      ))}
                    </div>
                  </td>

                  <td className="text-sm">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </td>

                  <td className="flex justify-center gap-3">
                    <button
                      className="btn text-lg hover:btn-info tooltip tooltip-top"
                      data-tip="View Review"
                      onClick={() => handleView(review)}
                    >
                      <FaEye className="text-base" />
                    </button>

                    <button
                      className="btn text-lg hover:btn-error tooltip tooltip-top"
                      data-tip="Delete Review"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FaTrash className="text-base" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <dialog
            id="review_view_modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-2xl p-6 sm:p-8 rounded-2xl">
              {selectedReview && (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    Student Review Details
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        selectedReview.userImage ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="Student"
                      className="w-14 h-14 rounded-full border object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {selectedReview.userName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedReview.userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p>
                      <span className="font-medium text-gray-800">
                        University:
                      </span>{" "}
                      {selectedReview.universityName}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Date:</span>{" "}
                      {new Date(selectedReview.reviewDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Rating</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={18}
                          className="mr-1"
                          color={
                            selectedReview.ratingPoint >= star
                              ? "#facc15"
                              : "#e5e7eb"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Comment</p>
                    <div className="bg-base-200 p-4 rounded-xl text-sm leading-relaxed">
                      {selectedReview.reviewComment || "No comment provided"}
                    </div>
                  </div>
                </>
              )}

              <div className="modal-action mt-6">
                <button
                  className="btn btn-outline"
                  onClick={() =>
                    document.getElementById("review_view_modal").close()
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default AllStudentReviews;
