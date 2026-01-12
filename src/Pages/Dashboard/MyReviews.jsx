import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (reviewId) => {
    const result = await Swal.fire({
      title: "Delete this Review?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/reviews/${reviewId}`);
      queryClient.invalidateQueries(["myReviews", user.email]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your review has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Review Delete Failed!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleUpdate = async () => {
    if (updatedComment.trim() === "" || updatedRating === 0) {
      Swal.fire({
        icon: "error",
        title: "Please provide rating and comment!",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }
    try {
      await axiosSecure.patch(`/reviews/${selectedReview._id}`, {
        reviewComment: updatedComment,
        ratingPoint: updatedRating,
      });
      queryClient.invalidateQueries(["myReviews", user.email]);
      document.getElementById("edit_review_modal").close();
      Swal.fire({
        icon: "success",
        title: "Review updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to update review",
        timer: 1500,
        showConfirmButton: false,
      });
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
    <div className="p-6 bg-white dark:bg-[#0b0f19] text-zinc-900 dark:text-zinc-300 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        My Reviews ({reviews.length})
      </h1>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          No Reviews found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl">
          <table className="table table-zebra w-full border border-zinc-700">
            <thead className="bg-gray-100 dark:bg-[#15181f] text-zinc-700 dark:text-zinc-300">
              <tr>
                <th>Sl</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Review Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr
                  key={review._id}
                  className="border border-zinc-700 dark:border-zinc-600"
                >
                  <td>{idx + 1}</td>
                  <td className="font-medium text-xs">{review.scholarshipName || "N/A"}</td>
                  <td className="text-xs">{review.universityName}</td>
                  <td className="text-xs">{review.reviewComment}</td>
                  <td className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className="mr-1"
                        color={review.ratingPoint >= star ? "#facc15" : "#9ca3af"}
                      />
                    ))}
                  </td>
                  <td className="text-xs">{new Date(review.reviewDate).toLocaleDateString()}</td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn text-lg dark:bg-[#121b33] dark:text-white shadow-none hover:btn-info gap-2 tooltip tooltip-top"
                      data-tip="Edit Review"
                      onClick={() => {
                        setSelectedReview(review);
                        setUpdatedComment(review.reviewComment);
                        setUpdatedRating(review.ratingPoint);
                        document.getElementById("edit_review_modal").showModal();
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn text-lg dark:bg-[#121b33] dark:text-white shadow-none hover:btn-error gap-2 tooltip tooltip-top"
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
        </div>
      )}

      {/* Edit Review Modal */}
      <dialog
        id="edit_review_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-3xl p-6 bg-white dark:bg-[#1a1e2a] text-gray-800 dark:text-gray-100 border border-zinc-700 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Edit Review for {selectedReview?.universityName}
          </h3>

          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className="cursor-pointer transition-colors mx-1"
                color={updatedRating >= star ? "#facc15" : "#9ca3af"}
                onClick={() => setUpdatedRating(star)}
              />
            ))}
          </div>

          <textarea
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 bg-gray-50 dark:bg-[#0b0f19] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 resize-none"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              className="btn btn-outline dark:border-zinc-600 hover:bg-[#0CB3FA]/20 shadow-none rounded-full dark:text-gray-200"
              onClick={() =>
                document.getElementById("edit_review_modal").close()
              }
            >
              Cancel
            </button>
            <button
              className="btn bg-[#0CB3FA] hover:bg-[#0CB3FA]/70 border-none rounded-full"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
