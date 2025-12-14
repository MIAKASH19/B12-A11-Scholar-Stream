import { motion } from "framer-motion";
import React from "react";

const ScholarCard = ({ scholarship, index }) => {
  return (
    <motion.div
      key={scholarship._id?.$oid || scholarship._id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ boxShadow: "0px 15px 25px rgba(0,0,0,0.2)" }}
      className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={
            scholarship.universityImage || "https://via.placeholder.com/400x200"
          }
          alt={scholarship.universityName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          {scholarship.scholarshipName}
        </h2>
        <p className="text-gray-600 mb-1 text-sm">
          <span className="font-medium">University:</span>{" "}
          {scholarship.universityName}
        </p>
        <p className="text-gray-600 mb-1 text-sm">
          <span className="font-medium">Country:</span>{" "}
          {scholarship.universityCountry}
        </p>
        <p className="text-gray-600 mb-1 text-sm">
          <span className="font-medium">Degree:</span> {scholarship.degree}
        </p>
        <p className="text-gray-600 mb-1 text-sm">
          <span className="font-medium">Scholarship Type:</span>{" "}
          {scholarship.scholarshipCategory}
        </p>
        <p className="text-gray-600 mb-4 text-sm">
          <span className="font-medium">Deadline:</span>{" "}
          {scholarship.applicationDeadline}
        </p>
        <div className="h-[1px] w-full bg-zinc-200 mb-4"></div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#264EA3] text-white px-4 py-2 rounded-full text-sm w-full font-medium hover:bg-blue-700 transition-colors duration-300"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ScholarCard;
