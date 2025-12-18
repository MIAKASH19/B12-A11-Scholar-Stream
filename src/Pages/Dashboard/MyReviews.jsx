import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

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
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosSecure.delete(`/reviews/${reviewId}`);
      queryClient.invalidateQueries(["myReviews", user.email]);
      alert("Review deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  const handleUpdate = async () => {
    if (updatedComment.trim() === "" || updatedRating === 0) {
      alert("Please provide rating and comment!");
      return;
    }
    try {
      await axiosSecure.patch(`/reviews/${selectedReview._id}`, {
        reviewComment: updatedComment,
        ratingPoint: updatedRating,
      });
      queryClient.invalidateQueries(["myReviews", user.email]);
      document.getElementById("edit_review_modal").close();
      alert("Review updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update review");
    }
  };

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Reviews ({reviews.length})</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100">
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
              <tr key={review._id}>
                <td>{idx + 1}</td>
                <td className="font-medium">{review.scholarshipName || "N/A"}</td>
                <td>{review.universityName}</td>
                <td>{review.reviewComment}</td>
                <td className="flex items-center">
                  {[1,2,3,4,5].map((star) => (
                    <FaStar
                      key={star}
                      className="mr-1"
                      color={review.ratingPoint >= star ? "#facc15" : "#d1d5db"}
                    />
                  ))}
                </td>
                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn text-lg hover:btn-info gap-2 tooltip tooltip-top " data-tip="Edit Review"
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
                    className="btn text-lg tooltip tooltip-top hover:btn-error gap-2" data-tip="Delete Review"
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

      <dialog id="edit_review_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Edit Review for {selectedReview?.universityName}
          </h3>

          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className="cursor-pointer transition-colors mx-1"
                color={updatedRating >= star ? "#facc15" : "#d1d5db"}
                onClick={() => setUpdatedRating(star)}
              />
            ))}
          </div>

          <textarea
            rows={4}
            className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("edit_review_modal").close()}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
