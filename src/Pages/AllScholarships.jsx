import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ScholarCard from "../Components/ScholarCard";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/scholarships")
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 pt-30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-medium mb-4 text-gray-800">
          Explore All Scholarships
        </h1>
        <p className="text-gray-600 max-w-6xl mx-auto text-sm">
          Discover verified local and international scholarships to fund your
          education. Browse through our curated collection and find
          opportunities that match your degree, subject, and career goals. Apply
          directly from here and never miss a deadline!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((scholarship, index) => (
          <ScholarCard
            key={scholarship._id?.$oid || scholarship._id}
            scholarship={scholarship}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AllScholarships;
