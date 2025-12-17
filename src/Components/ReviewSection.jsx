import React from "react";
import { motion } from "framer-motion";

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.784-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

const ReviewCard = ({ review }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg flex flex-col gap-4"
  >
    <div className="flex items-center gap-4">
      <img
        src={review.userImage}
        alt={review.userName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{review.userName}</p>
        <p className="text-xs text-gray-500">{review.reviewDate}</p>
      </div>
    </div>

    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= Math.round(review.ratingPoint)} />
      ))}
      <span className="text-sm text-gray-500 ml-2">
        {review.ratingPoint.toFixed(1)}
      </span>
    </div>

    <p className="text-gray-700 text-sm">{review.reviewComment}</p>
  </motion.div>
);

const ReviewsSection = ({ reviews=[] }) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Student Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
