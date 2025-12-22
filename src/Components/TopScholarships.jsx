import React, { useEffect, useState } from "react";
import ScholarCard from "./ScholarCard";
import useAxiosSecure from './../Hooks/useAxiosSecure';

const TopScholarships = () => {
  const [topScholarships, setTopScholarships] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/recent-scholarships')
      .then((res) => {
        setTopScholarships(res.data); 
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, []);

  return (
    <div className="min-h-screen md:p-10 p-7">
      <h1 className="text-center text-4xl md:text-6xl md:font-medium font-semibold border-b border-zinc-300 pb-4">
       Top Scholarships
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {topScholarships.map((scholarship, index) => (
          <div className="w-full" key={index}>
            <ScholarCard
              
              scholarship={scholarship}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
