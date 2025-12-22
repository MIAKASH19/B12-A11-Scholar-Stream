import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import ReviewsSection from "../Components/ReviewSection";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply/${scholarship._id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/scholarship-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarship(data);

        return fetch(`http://localhost:3000/reviews?scholarshipId=${id}`);
      })
      .then((res) => res.json())
      .then((reviewsData) => {
        setReviews(reviewsData);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!scholarship)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-24">
      <div className="bg-blue-200 w-100 h-70 absolute top-40 left-0 blur-2xl scale-200 rounded-full"></div>
      <div className="bg-pink-100 w-100 h-70 absolute top-40 right-0 blur-2xl scale-200 rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-5xl mx-auto"
      >
        <h1 className="text-5xl font-medium leading-tight">
          {scholarship.scholarshipName}
        </h1>
        <p className="mt-4 text-sm opacity-80">
          {scholarship.universityName}, {scholarship.universityCountry}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative bg-white border border-zinc-200 rounded-3xl shadow-xl max-w-7xl mx-auto mt-16 overflow-hidden"
      >
        <div className="h-100 w-full overflow-hidden">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:p-10 p-5">
          <div className="flex gap-3 flex-wrap mb-8">
            <div className="px-3 py-2 rounded-full border border-zinc-300 text-sm">
              <h1>
                <span className="text-zinc-500">Category :</span>{" "}
                {scholarship.scholarshipCategory}
              </h1>
            </div>
            <div className="px-3 py-2 rounded-full border border-zinc-300 text-sm">
              <h1>
                <span className="text-zinc-500">Degree :</span>{" "}
                {scholarship.degree}
              </h1>
            </div>
            <div className="px-3 py-2 rounded-full border border-zinc-300 text-sm">
              <h1>
                <span className="text-zinc-500">Subject :</span>{" "}
                {scholarship.subjectCategory}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <Info label="University City" value={scholarship.universityCity} />
            <Info
              label="World Rank"
              value={`#${scholarship.universityWorldRank}`}
            />
            <Info
              label="Application Fee"
              value={`$${scholarship.applicationFees}`}
            />
            <Info
              label="Service Charge"
              value={`$${scholarship.serviceCharge}`}
            />
            <Info
              label="Tuition Fees"
              value={
                scholarship.tuitionFees
                  ? `$${scholarship.tuitionFees}`
                  : "Fully Funded"
              }
            />
            <Info label="Deadline" value={scholarship.applicationDeadline} />
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl  mx-auto mt-16">
        <ReviewsSection reviews={reviews} />
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="border border-zinc-200 rounded-xl p-5">
    <p className="opacity-60 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ScholarshipDetails;
