import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import ReviewsSection from "../Components/ReviewSection";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Button from "../Components/Button";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleApply = () => {
    navigate(`/apply/${scholarship._id}`);
  };

  useEffect(() => {
    axiosSecure
      .get(`/scholarship-details/${id}`)
      .then((res) => {
        setScholarship(res.data);
        return axiosSecure.get(`/reviews?scholarshipId=${id}`);
      })
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!scholarship)
  return (
    <div className="w-full flex items-center justify-center h-[20vh] mt-10
      bg-white dark:bg-[#0b0f19]">
      <span className="loading loading-spinner text-info dark:text-blue-400"></span>
    </div>
  );


  return (
    <div className="min-h-screen relative overflow-hidden px-4 py-24 dark:bg-[#0b0f19] transition-colors">
      {/* Background blobs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-blue-200 blur-2xl scale-200 rounded-full dark:bg-[#0CB3FA]/20"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-pink-200 blur-2xl scale-200 rounded-full dark:bg-[#fd95e7]/20"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center max-w-5xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl tracking-tight font-medium leading-tight text-zinc-800 dark:text-white">
          {scholarship.scholarshipName}
        </h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {scholarship.universityName}, {scholarship.universityCountry}
        </p>
      </motion.div>

      {/* Scholarship Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative bg-white dark:bg-[#0b0f19] border border-zinc-200 dark:border-zinc-700 rounded-3xl shadow-xl dark:shadow-black/40 max-w-7xl mx-auto mt-16 overflow-hidden"
      >
        {/* University Image */}
        <div className="h-100 w-full overflow-hidden">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:p-10 p-5">
          {/* Categories */}
          <div className="flex gap-3 flex-wrap mb-8">
            {[
              { label: "Category", value: scholarship.scholarshipCategory },
              { label: "Degree", value: scholarship.degree },
              { label: "Subject", value: scholarship.subjectCategory },
            ].map((item, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm"
              >
                <h1 className="text-zinc-500 dark:text-white">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {item.label}:
                  </span>{" "}
                  {item.value}
                </h1>
              </div>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <Info label="University City" value={scholarship.universityCity} />
            <Info
              label="World Rank"
              value={`#${scholarship.universityWorldRank}`}
            />
            <Info label="Application Fee" value={`$${scholarship.applicationFees}`} />
            <Info label="Service Charge" value={`$${scholarship.serviceCharge}`} />
            <Info
              label="Tuition Fees"
              value={scholarship.tuitionFees ? `$${scholarship.tuitionFees}` : "Fully Funded"}
            />
            <Info label="Deadline" value={scholarship.applicationDeadline} />
          </div>

          {/* Apply Button */}
          <div className="mt-12 flex justify-center">
            <Button onClick={handleApply} text={"Apply Now"} />
          </div>
        </div>
      </motion.div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto mt-16">
        <ReviewsSection reviews={reviews} darkMode />
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 transition-colors">
    <p className="text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>
    <p className="font-medium text-zinc-800 dark:text-white">{value}</p>
  </div>
);


export default ScholarshipDetails;
