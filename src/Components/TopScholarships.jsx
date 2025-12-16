import React, { useEffect, useState } from "react";
import ScholarCard from "./ScholarCard";

const TopScholarships = () => {
  const [topScholarships, setTopScholarships] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/recent-scholarships")
      .then((res) => res.json())
      .then((data) => {
        setTopScholarships(data);
      })
      .catch((error) => {
        console.error("Failed to fetch scholarships:", error);
      });
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-center text-6xl font-medium border-b border-zinc-300 pb-4">
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
