import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import ReviewsSection from "../Components/ReviewSection";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [review, setReviews] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/scholarship-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarship(data);

        fetch(`http://localhost:3000/reviews?scholarshipId=${id}`)
          .then((res) => res.json())
          .then((reviewsData) => {
            const filteredReviews = reviewsData.filter(
              (review) => review.universityName === data.universityName
            );
            setReviews(filteredReviews);
          });
      });
  }, [id]);

  if (!scholarship) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading scholarship details...
      </div>
    );
  }

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
        <div className="h-[400px] w-full overflow-hidden">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-10">
          <div className="flex gap-3 flex-wrap mb-8">
            <Tag text={scholarship.scholarshipCategory} />
            <Tag text={scholarship.degree} />
            <Tag text={scholarship.subjectCategory} />
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
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition">
              Apply Now
            </button>
          </div>
        </div>
      </motion.div>

      <ReviewsSection reviews={review}></ReviewsSection>
    </div>
  );
};

const Tag = ({ text }) => (
  <span className="px-4 py-1 rounded-full border border-zinc-300 text-sm">
    {text}
  </span>
);

const Info = ({ label, value }) => (
  <div className="border border-zinc-200 rounded-xl p-5">
    <p className="opacity-60 mb-1">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default ScholarshipDetails;
