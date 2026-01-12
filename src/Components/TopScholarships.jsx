import React, { useEffect, useState } from "react";
import ScholarCard from "./ScholarCard";
import useAxiosSecure from "./../Hooks/useAxiosSecure";

const TopScholarships = () => {
  const [topScholarships, setTopScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/recent-scholarships")
      .then((res) => {
        setTopScholarships(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, []);

  return (
    <section
      className="min-h-screen md:p-10 p-7
        bg-white dark:bg-[#0b0f19]
        transition-colors"
    >
      {/* Section Title */}
      <h1
        className="text-center text-4xl md:text-6xl font-semibold md:font-medium
          pb-4 border-b
          border-zinc-300 dark:border-white/10
          text-gray-900 dark:text-white"
      >
        <span className="bg-linear-to-r from-[#0CB3FA] to-[#fd95e7] bg-clip-text text-transparent">
          Top
        </span>{" "}
        Scholarships
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {topScholarships.map((scholarship, index) => (
          <div key={index} className="w-full">
            <ScholarCard scholarship={scholarship} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopScholarships;
