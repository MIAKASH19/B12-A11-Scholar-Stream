import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ScholarCard from "../Components/ScholarCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 6;

  useEffect(() => {
    axiosSecure
      .get(
        `http://localhost:3000/scholarships?limit=${limit}&skip=${
          currentPage * limit
        }`
      )
      .then((res) => {
        setScholarships(res.data.result);
        setTotalScholarships(res.data.total);
        const pages = Math.ceil(res.data.total / limit);
        setTotalPages(pages);
        // console.log(pages)
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, [currentPage]);

  return (
    <div className="max-w-7xl relative  mx-auto px-4 py-20 pt-30 overflow-hidden">
      <div className="bg-blue-200 w-100 h-70 absolute top-80 left-0 blur-2xl scale-200 rounded-full -z-1" />
      <div className="bg-pink-100 w-100 h-70 absolute top-80 right-0 blur-2xl scale-200 rounded-full -z-1" />
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
      <div className="mt-10  flex items-center justify-center gap-3">
        {currentPage > 0 && (
          <button onClick={()=> setCurrentPage(currentPage -1)} className="btn border border-zinc-300 bg-white   hover:bg-blue-600 hover:border-blue-600">
            Prev
          </button>
        )}
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`btn border border-zinc-300  hover:bg-blue-600 hover:border-blue-600 ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages - 1 && (
          <button onClick={()=> setCurrentPage(currentPage +1)} className="btn border border-zinc-300 bg-white   hover:bg-blue-600 hover:border-blue-600">
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
