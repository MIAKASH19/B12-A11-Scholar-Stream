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
    queryClient.invalidateQueries(["all-reviews"]);

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Review has been removed",
      timer: 1500,
      showConfirmButton: false,
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
    <div className="min-h-screen w-full px-4 py-8 bg-gray-50 dark:bg-[#0b0f19] text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold mb-6">
        All Student Reviews ({reviews.length})
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center py-24 text-gray-500 dark:text-gray-400">
          No reviews found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] shadow">
          <table className="table w-full">
            <thead className="bg-gray-100 dark:bg-[#15181f] text-gray-700 dark:text-gray-300">
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
                <tr
                  key={review._id}
                  className="hover:bg-gray-50 dark:hover:bg-[#1f2937] transition"
                >
                  <td>{idx + 1}</td>

                  <td className="font-medium">
                    {review.userName || "Anonymous"}
                  </td>

                  <td className="text-sm text-gray-500 dark:text-gray-400">
                    {review.userEmail}
                  </td>

                  <td>{review.universityName}</td>

                  <td className="max-w-50 truncate">
                    {review.reviewComment}
                  </td>

                  <td>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={14}
                          className="mr-1"
                          color={
                            review.ratingPoint >= star ? "#facc15" : "#4b5563"
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
                      className="btn btn-sm btn-ghost tooltip tooltip-top"
                      data-tip="View Review"
                      onClick={() => handleView(review)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="btn btn-sm btn-ghost text-red-500 hover:bg-red-500/10 tooltip tooltip-top"
                      data-tip="Delete Review"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          <dialog
            id="review_view_modal"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-2xl bg-white dark:bg-[#111827] text-gray-800 dark:text-gray-200 rounded-2xl">
              {selectedReview && (
                <>
                  <h3 className="text-xl font-semibold mb-5 text-center">
                    Student Review Details
                  </h3>

                  <div className="flex items-center gap-4 mb-5">
                    <img
                      src={
                        selectedReview.userImage ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      className="w-14 h-14 rounded-full border dark:border-gray-700 object-cover"
                    />
                    <div>
                      <p className="font-semibold">
                        {selectedReview.userName || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedReview.userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm mb-4">
                    <p>
                      <span className="font-medium">University:</span>{" "}
                      {selectedReview.universityName}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(
                        selectedReview.reviewDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm mb-1">Rating</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={18}
                          className="mr-1"
                          color={
                            selectedReview.ratingPoint >= star
                              ? "#facc15"
                              : "#4b5563"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm mb-1">Comment</p>
                    <div className="bg-gray-100 dark:bg-[#1f2937] p-4 rounded-xl text-sm">
                      {selectedReview.reviewComment ||
                        "No comment provided"}
                    </div>
                  </div>
                </>
              )}

              <div className="modal-action">
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
