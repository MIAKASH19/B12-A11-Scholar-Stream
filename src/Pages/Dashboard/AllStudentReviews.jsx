import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaStar } from "react-icons/fa";

const AllStudentReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

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
        <div className="text-center text-gray-500 py-20">
          No reviews found.
        </div>
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

                  <td className="text-sm text-gray-500">
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
                            review.ratingPoint >= star
                              ? "#facc15"
                              : "#e5e7eb"
                          }
                        />
                      ))}
                    </div>
                  </td>

                  <td className="text-sm">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-error btn-outline tooltip"
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
    </div>
  );
};

export default AllStudentReviews;
